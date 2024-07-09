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
        <section class="category">
            <h2>Category</h2>
            <div id="category"></div>
        </section>
      `;

      content.innerHTML = htmlContent;
    };

    displayCategories();
  },
};

export default Category;
