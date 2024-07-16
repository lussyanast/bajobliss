import { productCategoryAPI } from '../../data/route.api';

const Category = {
  async render() {
    let categories = [];
    try {
      const response = await productCategoryAPI.getCategories();
      categories = response.data;
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }

    return `
      <section class="category-section">
        <h2 class="category-title">Category</h2>
        <div class="category-grid">
          ${categories.map((category) => `
            <div class="category-item">
              <div class="category-image">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <img src="${category.icon || ''}" alt="${category.name}">
              </div>
              <p class="category-text">${category.name}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  async afterRender() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item) => {
      item.addEventListener('click', () => {
        window.location.href = '#/products';
      });
    });
  },
};

export default Category;
