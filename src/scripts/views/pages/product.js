/* eslint-disable indent */
import { productAPI, productCategoryAPI, productReviewAPI } from '../../data/route.api';
import UrlParser from '../../routes/url-parser';

const Product = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const categoryId = url.id;

    let products = [];
    let categories = [];

    try {
      const productResponse = categoryId !== 'all'
      ? await productAPI.getProduct(categoryId)
      : await productAPI.getProducts();
      products = productResponse.data;

      const categoryResponse = await productCategoryAPI.getCategories();
      categories = categoryResponse.data;

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
      console.error('Error fetching data:', error);
    }

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
              ${categories.map(({ category_id: id, name }) => `
                  <option value="${id}" ${id === categoryId ? 'selected' : ''}>${name}</option>
              `).join('')}
            </select>
          </div>
          <div class="product-grid" id="productGrid">
          ${products.map(({
            product_id: id, name, description, price, stock, pictures, reviews,
          }) => `
              <div class="product-item" data-id=${id}>
                <div class="product-image">
                  <img src="${pictures[0]?.picture || 'default-image-url'}" alt="${name}">
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
    const categoryFilter = document.getElementById('categoryFilter');
    const productItems = document.querySelectorAll('.product-item');

    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      window.location.href = `#/products/${selectedCategory}`;
    });

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

export default Product;
