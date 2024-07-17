import { productAPI } from '../../data/route.api';

const NewIn = {
  async render() {
    let products = [];

    const rupiah = (value) => {
      const numberFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      });

      return numberFormat.format(value);
    };

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
            ${products.map((product) => `
              <div class="product-item">
                <div class="product-image">
                  <img src="${product.pictures[0].picture}" alt="${product.name}">
                </div>
                <div class="product-info">
                  <p class="product-text">${product.name}</p>
                  <p class="product-description">${product.description}</p>
                  <div class="product-price-stock">
                    <p class="product-price">${rupiah(product.price)}</p>
                    <p class="product-stock">Stock: ${product.stock || 'N/A'}</p>
                  </div>
                  <div class="product-rating">
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
    productItems.forEach((item) => {
      item.addEventListener('click', () => {
        window.location.href = '#/product-detail';
      });
    });
  },
};

export default NewIn;
