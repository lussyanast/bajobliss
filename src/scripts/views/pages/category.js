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
          <div class="category-item">
            <div class="category-image">
              <i class="fa fa-picture-o" aria-hidden="true"></i>
              <img src="https://via.placeholder.com/150" alt="Category Image">
            </div>
            <p class="category-text">All Categories</p>
          </div>
          ${categories.map(({ category_id: categoryId, icon, name }) => `
            <div class="category-item" id="${categoryId}">
              <div class="category-image">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <img src="${icon || ''}" alt="${name}">
              </div>
              <p class="category-text">${name}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  async afterRender() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const categoryId = event.currentTarget.id || 'all';
        window.location.href = `#/products/${categoryId}`;
      });
    });
  },
};

export default Category;
