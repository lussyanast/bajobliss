const Product = {
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
          <h1>Product</h1>
          </div>
        </div>
      `;

      content.innerHTML = htmlContent;
    };

    displayProducts();
  },
};

export default Product;
