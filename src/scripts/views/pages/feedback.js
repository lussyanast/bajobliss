const Feedback = {
  async render() {
    return `
      <div class="content">
          <section class="feedback">
              <form id="feedbackForm">
                  <div>
                      <label for="name">Name</label>
                      <input type="text" id="name" name="name" required>
                  </div>
                  <div>
                      <label for="email">Email <span class="required">*</span></label>
                      <input type="email" id="email" name="email" required>
                  </div>
                  <div>
                      <label for="message">Message</label>
                      <textarea id="message" name="message"></textarea>
                  </div>
                  <div>
                      <button type="submit">Submit</button>
                  </div>
              </form>
          </section>
      </div>
    `;
  },

  async afterRender() {
    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // Handle form submission
      console.log('Form submitted');
    });
  },
};

export default Feedback;
