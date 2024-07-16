import Category from './category';
import NewIn from './new-in';

const Home = {
  async render() {
    return `
      <div class="content">
      </div>
    `;
  },

  async afterRender() {
    const display = async () => {
      const content = document.querySelector('.content');
      let htmlContent = '';

      htmlContent += `
        <section class="jumbotron">
          <h1>BajoBliss</h1>
        </section>
        <section class="new-in">
          <div id="new-in"></div>
        </section>
        <section class="category">
          <div id="category"></div>
        </section>
      `;

      content.innerHTML = htmlContent;

      // Render content for new-in and category sections
      const newInContainer = document.getElementById('new-in');
      const categoryContainer = document.getElementById('category');

      newInContainer.innerHTML = await NewIn.render();
      categoryContainer.innerHTML = await Category.render();

      await NewIn.afterRender();
      await Category.afterRender();
    };

    display();
  },
};

export default Home;
