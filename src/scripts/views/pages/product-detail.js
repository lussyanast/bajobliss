const ProductDetail = {
  async render() {
    return `
      <div class="product-detail">
        <div class="product-header">
          <h2>Detail product page</h2>
        </div>
        <div class="product-main">
          <div class="product-image">
            <img src="" alt="Product Image" />
          </div>
          <div class="product-info">
            <nav class="breadcrumb">
              <a href="#">Home</a> > <a href="#">Lorem</a> > Lorem
            </nav>
            <h1>Lorem Ipsum</h1>
            <p class="price">Rp. xxx.xxx,-</p>
            <div class="variants">
              <h3>Variant</h3>
              <button>Lorem</button>
              <button>Lorem</button>
              <button>Lorem</button>
            </div>
            <div class="quantity">
              <h3>Quantity</h3>
              <button>-</button>
              <input type="number" value="1" min="1" />
              <button>+</button>
            </div>
            <div class="actions">
              <button class="add-to-cart">ADD TO CART</button>
              <button class="buy-now">BUY IT NOW</button>
            </div>
            <div class="reviews">
              <span>⭐⭐⭐⭐⭐ 2 review</span>
            </div>
          </div>
        </div>
        <div class="product-description">
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor fermentum felis, eget blandit magna mollis ut...</p>
        </div>
        <div class="customer-reviews">
          <h2>Customer Reviews</h2>
          <button>WRITE YOUR REVIEW</button>
        </div>
      </div>
    `;
  },

  async afterRender() {
  },
};

export default ProductDetail;
