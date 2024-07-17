import { productAPI } from '../../data/route.api';

const Search = {
  async render() {
    return `
      <div class="search-page">
        <div class="search-content">
          <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search here...">
            <button id="searchButton"><i class="fas fa-search"></i></button>
          </div>
        </div>
        <div class="product-section">
          <div class="product-header">
            <h2 class="product-title">Product (<span id="productCount">0</span>)</h2>
            <button class="filter-button">Filter</button>
          </div>
          <div class="product-grid" id="productGrid">
            <!-- Products will be injected here -->
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', async () => {
      const query = document.getElementById('searchInput').value;
      if (query) {
        const results = await this.searchProducts(query);
        this.displayResults(results);
      }
    });
  },

  async searchProducts(query) {
    try {
      const response = await productAPI.getProducts(); // Panggil API untuk mendapatkan produk
      const products = response.data; // Asumsikan data produk ada di response.data
      // Filter produk berdasarkan query
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      return filteredProducts;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  },

  displayResults(results) {
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    
    productCount.innerText = results.length;

    if (results.length === 0) {
      productGrid.innerHTML = '<p>No products found.</p>';
      return;
    }

    productGrid.innerHTML = results.map((product) => `
      <div class="product-item">
        <div class="product-image">
          <img src="${product.pictures && product.pictures.length > 0 ? product.pictures[0].picture : 'default.jpg'}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-text">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price-stock">
            <span class="product-price">${this.formatRupiah(product.price)}</span>
            <span class="product-stock">Stock: ${product.stock || 'N/A'}</span>
          </div>
          <div class="product-rating">
            <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}</span>
            <span class="rating-count">(${product.reviewsCount || 0} reviews)</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  formatRupiah(value) {
    const numberFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return numberFormat.format(value);
  },
};

export default Search;