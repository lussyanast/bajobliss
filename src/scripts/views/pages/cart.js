const Cart = {
  async render() {
    return `
      <div class="product-content">
      <section class="product-section">
        <div class="product-header">
          <h2 class="product-title">Your Cart (xx)</h2>
          <button class="filter-button">Filter</button>
        </div>
        <div class="product-grid">
          ${Array(9).fill(`
            <div class="product-item">
              <div class="product-image">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
              </div>
              <div class="product-info">
                <p class="product-text">Lorem ipsum</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin vel ligula quis tristique.</p>
                <div class="product-price-stock">
                  <p class="product-price">Rp. xxx.xxx,-</p>
                  <p class="product-stock">Stock: xxx</p>
                </div>
                <div class="product-rating">
                  <span class="rating-count">(xx reviews)</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
    `;
  },

  async afterRender() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
      item.addEventListener('click', () => {
        window.location.href = '#/product-detail';
      });
    });
  },
};

export default Cart;
