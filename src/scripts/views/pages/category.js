const Category = {
  async render() {
    return `
        <section class="category-section">
        <h2 class="category-title">Category</h2>
        <div class="category-grid">
          ${Array(9).fill(`
            <div class="category-item">
              <div class="category-image">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <img src="">
              </div>
              <p class="category-text">Lorem ipsum</p>
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
