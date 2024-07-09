const Home = {
  async render() {
    return `
      <div class="content">
      </div>
    `;
  },

  async afterRender() {
    const display = () => {
      const content = document.querySelector('.content');
      let htmlContent = '';

      htmlContent += `
        <section class="jumbotron">
              <h1>BajoBliss</h1>
          </section>
          <section class="new-in">
              <h1>New In</h1>
              <div id="new-in"></div>
          </section>
          <section class="category">
              <h1>Category</h1>
              <div id="category"></div>
          </section>
      `;

      content.innerHTML = htmlContent;
    };

    display();
  },
};

export default Home;
