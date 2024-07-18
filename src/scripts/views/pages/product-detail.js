import { productAPI, productReviewAPI, userCartAPI } from '../../data/route.api';
import UrlParser from '../../routes/url-parser';

const ProductDetail = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const productId = url.id;

    let products = {};

    try {
      const productResponse = await productAPI.getProduct(productId);
      products = productResponse.data;

      const productReviewsResponse = await productReviewAPI.getReview(productId);
      products[0].reviews = productReviewsResponse.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
    }

    const {
      product_id: id,
      name,
      description,
      price,
      pictures,
      category,
      stock,
      weight,
      variants,
      reviews,
    } = products[0];

    return `
      <div class="product-detail">
        <div class="product-header">
          <h2>Detail product page</h2>
        </div>
        <div class="product-main">
          <div class="product-image">
            <img src="${pictures ? pictures[0].picture : 'default-image-url'}" alt="Product Image" />
          </div>
          <div class="product-info">
            <nav class="breadcrumb">
              <a href="#/category">Product</a> > <a href="#/products/${category?.category_id || 'all'}">${category?.name || 'Category'}</a> > ${name || 'Product Name'}
            </nav>
            <h1>${name || 'Product Name'}</h1>
            <p class="price">${price ? this.formatRupiah(price) : 'Rp 0'}</p>
            <div class="variants">
              <h3>Variant</h3>
              ${variants?.length > 0 ? product.variants.map((variant) => `<button class="variant-button">${variant}</button>`).join('') : 'No variants available'}
            </div>
            <div class="quantity">
              <h3>Quantity</h3>
              <button id="decrease-quantity">-</button>
              <input type="number" id="quantity" value="1" min="1" />
              <button id="increase-quantity">+</button>
            </div>
            <div class="actions">
              <button class="add-to-cart" data-id="${id}">ADD TO CART</button>
              <button class="buy-now" data-id="${id}">BUY IT NOW</button>
            </div>
            <div class="reviews">
              <span>${reviews.length} review(s)</span>
            </div>
          </div>
        </div>
        <div class="product-description">
          <h2>Description</h2>
          <p>${description || 'No description available.'}</p>
        </div>
        <div class="customer-reviews">
          <h2>Customer Reviews</h2>
          <button>WRITE YOUR REVIEW</button>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const decreaseButton = document.getElementById('decrease-quantity');
    const increaseButton = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');

    if (decreaseButton && increaseButton && quantityInput) {
      decreaseButton.addEventListener('click', () => {
        if (quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value, 10) - 1;
        }
      });

      increaseButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value, 10) + 1;
      });
    }

    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', async () => {
        const productId = addToCartButton.getAttribute('data-id');
        const quantity = quantityInput.value;

        try {
          const addCart = await userCartAPI.createUserCart({
            product_id: productId,
            quantity,
          });

          alert(addCart.data.message);
        } catch (error) {
          const { statusCode, message } = error.response.data;

          if (statusCode === 401 && message === 'Missing authentication') {
            alert(message);
            window.location.href = '#/login';

            return;
          }

          console.log('Error adding product to cart:', error);
          alert(message);
        }
      });
    }

    const buyNowButton = document.querySelector('.buy-now');
    if (buyNowButton) {
      buyNowButton.addEventListener('click', () => {
        const productId = buyNowButton.getAttribute('data-id');
        const quantity = quantityInput.value;
        // Buy now functionality
        console.log(`Buy now: Product ID ${productId}, Quantity ${quantity}`);
      });
    }
  },

  formatRupiah(value) {
    const numberFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return numberFormat.format(value);
  },
};

export default ProductDetail;
