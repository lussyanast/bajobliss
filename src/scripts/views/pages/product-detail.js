const ProductDetail = {
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
        <div class="productDetail">
          
        </div>
        <div class="productDesc">
        </div>
      `;

      content.innerHTML = htmlContent;
    };

    displayProducts();
  },
};

export default ProductDetail;
