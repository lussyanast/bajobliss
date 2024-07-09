const Faq = {
  async render() {
    return `
      <div class="content"></div>
    `;
  },

  async afterRender() {
    const displayFaq = () => {
      const content = document.querySelector('.content');
      let htmlContent = `
        <section class="jumbotron-faq">
          <div class="faq-desc">
            <h1>FREQUENTLY ASKED QUESTION</h1>
            <p>Do you have any questions about BajoBliss products and services? Find the various information available below.</p>
          </div>
        </section>
        <section class="faq-list">
          <div class="faq-item">
            <button class="faq"><p>Lorem Ipsum</p><i class="fas fa-chevron-down"></i></button>
            <div class="faq-panel">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq"><p>Lorem Ipsum</p><i class="fas fa-chevron-down"></i></button>
            <div class="faq-panel">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq"><p>Lorem Ipsum</p><i class="fas fa-chevron-down"></i></button>
            <div class="faq-panel">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </section>
      `;

      content.innerHTML = htmlContent;
    };

    displayFaq();

    const faqButtons = document.querySelectorAll('.faq');
    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        const panel = button.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    });
  },
};

export default Faq;
