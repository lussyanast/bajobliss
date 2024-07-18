import Category from './category';
import NewIn from './new-in';
import { feedbackAPI } from '../../data/route.api';

const Home = {
  async render() {
    return `
      <div class="content">
        ${this.renderJumbotron()}
        ${this.renderNewIn()}
        ${this.renderCategory()}
        ${this.renderFeedback()}
      </div>
    `;
  },

  renderJumbotron() {
    return `
      <section class="jumbotron">
        <h1>BajoBliss</h1>
      </section>
    `;
  },

  renderNewIn() {
    return `
      <section class="new-in">
        <div id="new-in"></div>
      </section>
    `;
  },

  renderCategory() {
    return `
      <section class="category">
        <div id="category"></div>
      </section>
    `;
  },

  renderFeedback() {
    return `
      <section class="feedback">
        <h2>Feedback</h2>
        <form class="feedback-form" id="feedback-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </section>
    `;
  },

  async afterRender() {
    const display = async () => {
      const newInContainer = document.getElementById('new-in');
      const categoryContainer = document.getElementById('category');

      newInContainer.innerHTML = await NewIn.render();
      categoryContainer.innerHTML = await Category.render();

      await NewIn.afterRender();
      await Category.afterRender();
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const feedbackData = { name, email, message };

      try {
        await feedbackAPI.createFeedback(feedbackData);
        alert('Feedback submitted successfully!');
        document.getElementById('feedback-form').reset();
      } catch (error) {
        alert('Failed to submit feedback. Please try again.');
        console.error(error);
      }
    };

    document.getElementById('feedback-form').addEventListener('submit', handleFormSubmit);

    display();
  },
};

export default Home;