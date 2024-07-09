const Search = {
  async render() {
    return `
      <div class="content"></div>
    `;
  },

  async afterRender() {
    const displayProducts = () => {
      const content = document.querySelector('.content');
      let htmlContent = '';

      htmlContent += `
        <div class="product-list">
          <div class="product-item">
            <h1>Search</h1>
          </div>
        </div>
      `;

      content.innerHTML = htmlContent;
    };

    displayProducts();
  },
};

export default Search;
