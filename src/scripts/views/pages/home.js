import Category from './category';
import NewIn from './new-in';

import { feedbackAPI } from '../../data/route.api';
import { getUserId } from '../../utils/decode-token';

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
    const userId = getUserId();
    console.log(userId);

    let disabled = '';
    let name = '';
    let msg = '';

    if (!userId) {
      name = '-';
      msg = 'Please login to give feedback';
      disabled = 'disabled';
    } else {
      name = userId;
      msg = '';
      disabled = 'required';
    }

    return `
      <section class="feedback">
        <h2>Feedback</h2>
        <form class="feedback-form" id="feedback-form">
          <div class="form-group">
            <label for="name">User ID:</label>
            <input type="text" id="name" name="name" value=${name} disabled>
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="4" ${disabled}>${msg}</textarea>
          </div>
          <button type="submit" class="submit-btn" ${disabled}>Submit</button>
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

      const message = document.getElementById('message').value;
      try {
        const feedback = await feedbackAPI.createFeedback({ message });
        alert(feedback.data.message);
        document.getElementById('feedback-form').reset();
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert('Failed to submit feedback. Please try again.');
        console.error(error);
      }
    };

    document.getElementById('feedback-form').addEventListener('submit', handleFormSubmit);

    display();
  },
};

export default Home;
