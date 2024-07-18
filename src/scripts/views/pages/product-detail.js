import { productAPI } from '../../data/route.api';

const ProductDetail = {
  async render() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    let product = {};

    try {
      const response = await productAPI.getProduct(productId);
      product = response.data;
      console.log('Product Data:', product); // Log untuk memastikan data produk
    } catch (error) {
      console.error('Error fetching product details:', error);
    }

    const rupiah = (value) => {
      const numberFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      });

      return numberFormat.format(value);
    };

    return `
      <div class="product-detail">
        <div class="product-header">
          <h2>Detail product page</h2>
        </div>
        <div class="product-main">
          <div class="product-image">
            <img src="${product.pictures && product.pictures.length > 0 ? product.pictures[0].picture : 'default-image-url'}" alt="Product Image" />
          </div>
          <div class="product-info">
            <nav class="breadcrumb">
              <a href="#">Home</a> > <a href="#/category">${product.category?.name || 'Category'}</a> > ${product.name || 'Product Name'}
            </nav>
            <h1>${product.name || 'Product Name'}</h1>
            <p class="price">${product.price ? rupiah(product.price) : 'Rp 0'}</p>
            <div class="variants">
              <h3>Variant</h3>
              ${product.variants && product.variants.length > 0 ? product.variants.map(variant => `<button class="variant-button">${variant}</button>`).join('') : 'No variants available'}
            </div>
            <div class="quantity">
              <h3>Quantity</h3>
              <button id="decrease-quantity">-</button>
              <input type="number" id="quantity" value="1" min="1" />
              <button id="increase-quantity">+</button>
            </div>
            <div class="actions">
              <button class="add-to-cart" data-id="${product.id}">ADD TO CART</button>
              <button class="buy-now" data-id="${product.id}">BUY IT NOW</button>
            </div>
            <div class="reviews">
              <span>${product.reviewsCount || 0} review(s)</span>
            </div>
          </div>
        </div>
        <div class="product-description">
          <h2>Description</h2>
          <p>${product.description || 'No description available.'}</p>
        </div>
        <div class="customer-reviews">
          <h2>Customer Reviews</h2>
          <a href="#/review" class="review-link">
            <button class="review-button">WRITE YOUR REVIEW</button>
          </a>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const decreaseButton = document.getElementById('decrease-quantity');
    const increaseButton = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');

    if (decreaseButton && increaseButton && quantityInput) {
      decreaseButton.addEventListener('click', () => {
        if (quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
        }
      });

      increaseButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
    }

    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        const productId = addToCartButton.getAttribute('data-id');
        const quantity = quantityInput.value;
        // Add to cart functionality
        console.log(`Add to cart: Product ID ${productId}, Quantity ${quantity}`);
      });
    }

    const buyNowButton = document.querySelector('.buy-now');
    if (buyNowButton) {
      buyNowButton.addEventListener('click', () => {
        const productId = buyNowButton.getAttribute('data-id');
        const quantity = quantityInput.value;
        // Buy now functionality
        console.log(`Buy now: Product ID ${productId}, Quantity ${quantity}`);
      });
    }
  },
};

export default ProductDetail;
