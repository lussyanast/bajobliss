// eslint-disable-next-line no-unused-vars
import { getUserId } from '../../utils/decode-token';
import { userCartAPI, productAPI, productReviewAPI } from '../../data/route.api';

const Cart = {
  async render() {
    try {
      const userId = getUserId();
      if (!userId) {
        alert('Please login first');
        window.location.href = '#/login';

        return {};
      }

      const userCart = await userCartAPI.getUserCart(userId);
      const productGridHtml = await this.renderProductGrid(userCart);

      return `
        <div class="product-content">
          <section class="product-section">
            <div class="product-header">
              <h2 class="product-title">Your Cart (${userCart.data.length})</h2>
              <button class="filter-button">Filter</button>
            </div>
            <div class="product-grid">
              ${productGridHtml}
            </div>
          </section>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering cart:', error);
      throw error;
    }
  },

  async renderProductGrid(userCart) {
    try {
      const productPromises = userCart.data.map(async (item) => {
        const { product_id: productId, quantity } = item;

        const product = await productAPI.getProduct(productId);
        const {
          name, description, price, stock, pictures,
        } = product.data[0];

        const productReviews = await productReviewAPI.getReview(productId);
        const reviewLength = productReviews.data.length;

        return `
          <div class="product-item" data-id=${productId}>
            <div class="product-image">
              <img src="${pictures[0].picture}">
            </div>
            <div class="product-info">
              <p class="product-text">${name}</p>
              <p class="product-description">${description}</p>
              <div class="product-price-stock">
                <p class="product-price">${this.formatRupiah(price)}</p>
                <p class="product-stock">Stock: ${stock}</p>
              </div>
              <div class="product-rating">
                <span class="rating-count">(${reviewLength} reviews)</span>
              </div>
            </div>
          </div>
        `;
      });

      const productHtml = await Promise.all(productPromises);
      return productHtml.join('');
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async afterRender() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item) => {
      item.addEventListener('click', () => {
        const productId = item.getAttribute('data-id');
        window.location.href = `#/product-detail/${productId}`;
      });
    });
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

export default Cart;
