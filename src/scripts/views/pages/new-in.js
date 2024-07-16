import { productAPI } from '../../globals/config.js';

const NewIn = {
  async render() {
    let products = [];
    try {
      const response = await productAPI.getProducts();
      products = response.data;
    } catch (error) {
      console.error('Error fetching new products: ', error);
    }

    return `
      <div class="product-content">
        <section class="product-section">
          <div class="product-header">
            <h2 class="product-title">New In (${products.length})</h2>
            <button class="filter-button">Filter</button>
          </div>
          <div class="product-grid">
            ${products.map(product => `
              <div class="product-item">
                <div class="product-image">
                  <img src="${product.gambar}" alt="${product.nama}">
                </div>
                <div class="product-info">
                  <p class="product-text">${product.nama}</p>
                  <p class="product-description">${product.deskripsi}</p>
                  <div class="product-price-stock">
                    <p class="product-price">Rp. ${product.harga}</p>
                    <p class="product-stock">Stock: ${product.stock || 'N/A'}</p>
                  </div>
                  <div class="product-rating">
                    <span class="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span class="rating-count">(${product.reviewsCount || 0} reviews)</span>
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
    productItems.forEach(item => {
      item.addEventListener('click', () => {
        window.location.href = '#/product-detail';
      });
    });
  },
};

export default NewIn;
