import { productAPI } from '../../globals/config.js';

const Category = {
  async render() {
    let categories = [];
    try {
      const response = await productAPI.getCategories();
      categories = response.data;
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }

    return `
      <section class="category-section">
        <h2 class="category-title">Category</h2>
        <div class="category-grid">
          ${categories.map(category => `
            <div class="category-item">
              <div class="category-image">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <img src="${category.image || ''}" alt="${category.nama}">
              </div>
              <p class="category-text">${category.nama}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  async afterRender() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        window.location.href = '#/products';
      });
    });
  },
};

export default Category;
