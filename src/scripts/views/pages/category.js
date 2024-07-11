const Category = {
  async render() {
    return `
      <div class="content">
      </div>
    `;
  },

  async afterRender() {
    const displayCategories = () => {
      const content = document.querySelector('.content');
      let htmlContent = '';

      htmlContent += `
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

      content.innerHTML = htmlContent;
    };

    displayCategories();
  },
};

export default Category;
