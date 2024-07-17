import { productAPI, productCategoryAPI } from '../../data/route.api';

const Product = {
  async render() {
    let products = [];
    let categories = [];
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    const rupiah = (value) => {
      const numberFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      });

      return numberFormat.format(value);
    };

    try {
      // Fetch categories for the filter
      const categoryResponse = await productCategoryAPI.getCategories();
      categories = categoryResponse.data;

      // Fetch products based on category
      if (categoryId && categoryId !== 'all') {
        const response = await productAPI.getProductsByCategory(categoryId);
        products = response.data;
      } else {
        const response = await productAPI.getProducts();
        products = response.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    const categoryOptions = categories.map(category => `
      <option value="${category.id}" ${category.id == categoryId ? 'selected' : ''}>${category.name}</option>
    `).join('');

    return `
      <div class="product-content">
        <section class="featured-product">
          <div class="featured-product-image">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
            <p class="featured-product-text">Lorem ipsum</p>
          </div>
        </section>
        <section class="product-section">
          <div class="product-header">
            <h2 class="product-title">Product (${products.length})</h2>
            <select id="categoryFilter" class="filter-button">
              <option value="all">All Categories</option>
              ${categoryOptions}
            </select>
          </div>
          <div class="product-grid" id="productGrid">
            ${products.map((product) => `
              <div class="product-item">
                <div class="product-image">
                  <img src="${product.pictures[0]?.picture || 'default-image-url'}" alt="${product.name}">
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
    const categoryFilter = document.getElementById('categoryFilter');
    const productItems = document.querySelectorAll('.product-item');

    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      window.location.href = `#/products?category=${selectedCategory}`;
    });

    productItems.forEach((item) => {
      item.addEventListener('click', () => {
        window.location.href = '#/product-detail';
      });
    });
  },
};

export default Product;
