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
            <h2 class="product-title">Product (xx)</h2>
            <button class="filter-button">Filter</button>
          </div>
          <div class="product-grid" id="productGrid">
            <!-- Products will be injected here -->
          </div>
          <div class="pagination">
            <button class="page-button">1</button>
            <button class="page-button">2</button>
            <button class="page-button">3</button>
            <!-- More pagination buttons as needed -->
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
    // Simulasi pencarian produk, ganti dengan API request yang sesuai
    const dummyResults = [
      {
        id: 1, name: 'Product 1', description: 'Description 1', price: '$10', stock: '20', rating: 4.5, reviews: 22,
      },
      {
        id: 2, name: 'Product 2', description: 'Description 2', price: '$20', stock: '15', rating: 4.0, reviews: 18,
      },
      // Tambahkan produk lainnya sesuai kebutuhan
    ];
    return dummyResults;
  },

  displayResults(results) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = results.map((product) => `
      <div class="product-item">
        <div class="product-image"><i class="fas fa-image"></i></div>
        <div class="product-info">
          <h3 class="product-text">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price-stock">
            <span class="product-price">${product.price}</span>
            <span class="product-stock">Stock: ${product.stock}</span>
          </div>
          <div class="product-rating">
            <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}</span>
            <span class="rating-count">${product.reviews} reviews</span>
          </div>
        </div>
      </div>
    `).join('');
  },
};

export default Search;
