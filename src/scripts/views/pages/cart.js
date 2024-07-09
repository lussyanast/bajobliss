const Cart = {
  async render() {
    return `
      <div class="content"></div>
    `;
  },

  async afterRender() {
    const displayCarts = () => {
      const content = document.querySelector('.content');
      let htmlContent = '';

      htmlContent += `
        <div class="product-list">
          <div class="product-item">
            <h1>Cart</h1>
          </div>
        </div>
      `;

      content.innerHTML = htmlContent;
    };

    displayCarts();
  },
};

export default Cart;
