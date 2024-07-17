const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')
const { Sequelize } = require('sequelize');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getOrder = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const orders = await db.Order.findAll();
    return h.response(orders).code(200);
  } catch (error) {
    console.log('Error during get orders:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getOrderById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { id } = request.params;
    
    let order;
    const include = [
      {
        model: db.OrderItem,
        as: 'items',
        attributes: ['order_item_id', 'product_id', 'quantity', 'total_price', 'total_weight'],
      },
      {
        model: db.OrderShipment,
        as: 'shipment',
        attributes: ['order_shipment_id', 'address_id', 'weight', 'courier', 'tracking_number', 'cost'],
      },
      {
        model: db.Payment,
        as: 'payment',
        attributes: ['payment_id', 'payment_method', 'status', 'merchant_id'],
      },
      {
        model: db.Voucher,
        as: 'voucher',
        attributes: ['voucher_id', 'code', 'value'],
      }
    ];
    const exclude = ['order_shipment_id', 'voucher_id', 'payment_id', 'deleted_at'];

    order = await db.Order.findByPk(id, {
      include,
      attributes: { exclude }
    });    
    if (order & decodedToken.role === 'user' && decodedToken.user_id !== order.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }
    if (!order) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      order = await db.Order.findAll({
        where: { user_id: id },
        include,
        attributes: { exclude }
      });
      if (!order) {
        return Boom.notFound('Order not found');
      }
    }

    return h.response(order).code(200);
  } catch (error) {
    console.log('Error during get order by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createOrder = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { user_id, item, shipment, voucher_id, payment } = request.payload;

    if (decodedToken.role === 'user' && decodedToken.user_id !== user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const user = await db.User.findByPk(user_id);
    if (!user) {
      return Boom.notFound('User not found');
    }

    const address = await db.UserAddress.findByPk(shipment.address_id);
    if (!address) {
      return Boom.notFound('Address not found');
    }
    if (address.user_id !== user_id) {
      return Boom.badRequest('Address not belong to user');
    }

    let itemPriceTotal = 0;
    let itemWeightTotal = 0;
    const products = await db.Product.findAll({
      where: {
        product_id: item.map(item => item.product_id)
      }
    });

    for (let i = 0; i < item.length; i++) {
      const product = products.find(prod => prod.product_id === item[i].product_id);
      if (!product) {
        return Boom.notFound('Product not found');
      }
      if (product.stock < item[i].quantity) {
        return Boom.badRequest('Product out of stock');
      }

      itemPriceTotal += product.price * item[i].quantity;
      itemWeightTotal += product.weight * item[i].quantity;
    }

    let voucher = null;
    if (voucher_id) {
      voucher = await db.Voucher.findByPk(voucher_id);
      if (!voucher) {
        return Boom.notFound('Voucher not found');
      }
      if (voucher.is_active === false) {
        return Boom.badRequest('Voucher is not active');
      }
    }

    const newOrder = await sequelize.transaction(async (t) => {
      const order = await db.Order.create({
        order_id: `order_${nanoid()}`,
        user_id : user_id ? user_id : decodedToken.user_id,
        order_shipment_id: null,
        voucher_id: voucher_id ? voucher_id : null,
        item_price: itemPriceTotal,
        total_price: 0,
        payment_id: null,
      }, { transaction: t });

      const orderItems = item.map(item => {
        const product = products.find(prod => prod.product_id === item.product_id);
        return {
          order_item_id: `oi_${nanoid()}`,
          order_id: order.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          total_weight: product.weight * item.quantity,
          total_price: product.price * item.quantity,
        };
      });
      await db.OrderItem.bulkCreate(orderItems, { transaction: t });
      for (let i = 0; i < item.length; i++) {
        const product = products.find(prod => prod.product_id === item[i].product_id);
        await product.update({ stock: product.stock - item[i].quantity }, { transaction: t });
      }

      const orderShipment = await db.OrderShipment.create({
        order_shipment_id: `shipment_${nanoid()}`,
        order_id: order.order_id,
        address_id: shipment.address_id,
        weight: itemWeightTotal,
        courier: shipment.courier,
        tracking_number: shipment.tracking_number ? shipment.tracking_number : null,
        cost: shipment.cost,
      }, { transaction: t });

      await order.update({
        order_shipment_id: orderShipment.order_shipment_id
      }, { transaction: t });

      const orderPayment = await db.Payment.create({
        payment_id: `payment_${nanoid()}`,
        order_id: order.order_id,
        payment_method: payment.method,
        status: 'pending',
        merchant_id: payment.merchant_id ? payment.merchant_id : null,
      }, { transaction: t });

      await order.update({
        payment_id: orderPayment.payment_id 
      },{ transaction: t });

      let totalPrice = itemPriceTotal + shipment.cost;
      if (voucher) {
        if (voucher.target === 'shipment') {
          totalPrice -= calculateDiscount(shipment.cost, voucher.value);
        } 

        if (voucher.target === 'item') {
          totalPrice -= calculateDiscount(itemPriceTotal, voucher.value);
        }
      }

      await order.update({ total_price: totalPrice }, { transaction: t });
      return order;
    },{
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      retry: {
        max: 3,
        match: [
          Sequelize.ConnectionErrors.DEADLOCK,
          Sequelize.ConnectionErrors.TIMEOUT,
        ],
      },
   });

    const order = await db.Order.findAll({
      where: { order_id: newOrder.order_id },
      include: [
        {
          model: db.OrderItem,
          as: 'items',
          attributes: ['order_item_id', 'product_id', 'quantity', 'total_price', 'total_weight'],
        },
        {
          model: db.OrderShipment,
          as: 'shipment',
          attributes: ['order_shipment_id', 'address_id', 'weight', 'courier', 'tracking_number', 'cost'],
        },
        {
          model: db.Payment,
          as: 'payment',
          attributes: ['payment_id', 'payment_method', 'status', 'merchant_id'],
        },
        {
          model: db.Voucher,
          as: 'voucher',
          attributes: ['voucher_id', 'code', 'value'],
        }
      ],
      attributes: { 
        exclude: ['order_shipment_id', 'voucher_id', 'payment_id', 'deleted_at']
      }
    });

    return h.response({
      message: 'Order created successfully',
      data: order
    }).code(201);
  } catch (error) {
    console.log('Error during create order:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateOrder = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { orderId } = request.params;
    const { user_id, item, shipment, voucher_id, payment } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const existingOrder = await db.Order.findByPk(orderId);
    if (!existingOrder) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('Order not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== existingOrder.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (user_id) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      const user = await db.User.findByPk(user_id);
      if (!user) {
        return Boom.notFound('User not found');
      }
    }

    if (shipment.address_id) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      const address = await db.UserAddress.findByPk(shipment.address_id);
      if (!address) {
        return Boom.notFound('Address not found');
      }
      if (address.user_id !== user_id) {
        return Boom.badRequest('Address does not belong to user');
      }
    }

    let products
    let itemPriceTotal = 0;
    let itemWeightTotal = 0;
    if (item) {
      products = await db.Product.findAll({
        where: {
          product_id: item.map(item => item.product_id)
        }
      });

      for (let i = 0; i < item.length; i++) {
        const product = products.find(prod => prod.product_id === item[i].product_id);
        if (!product) {
          return Boom.notFound('Product not found');
        }
        if (product.stock < item[i].quantity) {
          return Boom.badRequest('Product out of stock');
        }

        itemPriceTotal += product.price * item[i].quantity;
        itemWeightTotal += product.weight * item[i].quantity;
      }
    }

    let voucher = null;
    if (voucher_id) {
      voucher = await db.Voucher.findByPk(voucher_id);
      if (!voucher) {
        return Boom.notFound('Voucher not found');
      }
      if (voucher.is_active === false) {
        return Boom.badRequest('Voucher is not active');
      }
    }

    await sequelize.transaction(async (t) => {
      await existingOrder.update({
        user_id,
        item_price: itemPriceTotal,
      }, { transaction: t });

      const orderItems = item.map(item => {
        const product = products.find(prod => prod.product_id === item.product_id);
        return {
          order_item_id: `oi_${nanoid()}`,
          order_id: existingOrder.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          total_weight: product.weight * item.quantity,
          total_price: product.price * item.quantity,
        };
      });
      await db.OrderItem.bulkCreate(orderItems, { transaction: t });

      for (let i = 0; i < item.length; i++) {
        const product = products.find(prod => prod.product_id === item[i].product_id);
        await product.update({ stock: product.stock - item[i].quantity }, { transaction: t });
      }

      const orderShipment = await db.OrderShipment.findByPk(existingOrder.order_shipment_id);
      await orderShipment.update({
        address_id: shipment.address_id,
        weight: itemWeightTotal,
        courier: shipment.courier,
        tracking_number: shipment.tracking_number ? shipment.tracking_number : null,
        cost: shipment.cost,
      }, { transaction: t });

      const orderPayment = await db.Payment.findByPk(existingOrder.payment_id);
      await orderPayment.update({
        payment_method: payment.method,
        merchant_id: payment.merchant_id ? payment.merchant_id : null,
      }, { transaction: t });

      let totalPrice = itemPriceTotal + shipment.cost;
      if (voucher) {
        if (voucher.target === 'shipment') {
          totalPrice -= calculateDiscount(shipment.cost, voucher.value);
        }

        if (voucher.target === 'item') {
          totalPrice -= calculateDiscount(itemPriceTotal, voucher.value);
        }
      }

      await existingOrder.update({ total_price: totalPrice }, { transaction: t });
    }, {
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      retry: {
        max: 3,
        match: [
          Sequelize.ConnectionErrors.DEADLOCK,
          Sequelize.ConnectionErrors.TIMEOUT,
        ],
      },
    });

    const updatedOrder = await db.Order.findByPk(orderId, {
      include: [
        {
          model: db.OrderItem,
          as: 'items',
          attributes: ['order_item_id', 'product_id', 'quantity', 'total_price', 'total_weight'],
        },
        {
          model: db.OrderShipment,
          as: 'shipment',
          attributes: ['order_shipment_id', 'address_id', 'weight', 'courier', 'tracking_number', 'cost'],
        },
        {
          model: db.Payment,
          as: 'payment',
          attributes: ['payment_id', 'payment_method', 'status', 'merchant_id'],
        },
        {
          model: db.Voucher,
          as: 'voucher',
          attributes: ['voucher_id', 'code', 'value'],
        }
      ],
      attributes: {
        exclude: ['order_shipment_id', 'voucher_id', 'payment_id', 'deleted_at']
      }
    });

    return h.response({
      message: 'Order updated successfully',
      data: updatedOrder
    }).code(200);
  } catch (error) {
    console.log('Error during update order:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteOrder = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { orderId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const order = await db.Order.findByPk(orderId);
    if (!order) {
      return Boom.notFound('Order not found');
    }

    await order.destroy();
    return h.response({ message: 'Order deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete order:', error);
    return Boom.badImplementation('Internal server error');
  }
};

function calculateDiscount(price, discount) {
  if (!discount) {
    return 0;
  }
  if (discount > 1) {
    return discount;
  } else {
    return price * discount;
  }
}

module.exports = {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
