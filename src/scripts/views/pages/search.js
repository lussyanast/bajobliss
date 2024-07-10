const Search = {
  async render() {
    return `
      <div class="search-content">
        <div class="search-container">
          <input type="text" id="searchInput" placeholder="Search here...">
          <button id="searchButton"><i class="fas fa-search"></i></button>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
      
    });
  },
};

export default Search;
