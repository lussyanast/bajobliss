/* eslint-disable indent */
import { productAPI, productReviewAPI } from '../../data/route.api';

const NewIn = {
  async render() {
    let products = [];

    try {
      const response = await productAPI.getProducts();
      products = response.data;

      const productReviewsPromises = products.map(async ({ product_id: productId }) => {
        const reviewResponse = await productReviewAPI.getReview(productId);
        return reviewResponse.data;
      });

      const productReviews = await Promise.all(productReviewsPromises);
      products = products.map((product, index) => {
        const updatedProduct = { ...product };
        updatedProduct.reviews = productReviews[index];
        return updatedProduct;
      });
    } catch (error) {
      console.error('Error fetching new products: ', error);
    }

    return `
      <div class="product-content">
        <section class="product-section">
          <div class="product-header">
            <h2 class="product-title">New In (${products.slice(0, 9).length})</h2>
            <button class="filter-button">Filter</button>
          </div>
          <div class="product-grid">
          ${products.slice(0, 9).map(({
            product_id: productId,
            name,
            description,
            price,
            stock,
            pictures,
            reviews,
          }) => `
              <div class="product-item" data-id=${productId}>
                <div class="product-image">
                  <img src="${pictures[0].picture}" alt="${name}">
                </div>
                <div class="product-info">
                  <p class="product-text">${name}</p>
                  <p class="product-description">${description}</p>
                  <div class="product-price-stock">
                    <p class="product-price">${this.formatRupiah(price)}</p>
                    <p class="product-stock">Stock: ${stock || 'N/A'}</p>
                  </div>
                  <div class="product-rating">
                    <span class="rating-count">(${reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
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

export default NewIn;
