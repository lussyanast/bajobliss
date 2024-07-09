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
            <button class="faq"><p>Apa itu Bajobliss?</p><i class="fas fa-chevron-down"></i></button>
            <div class="faq-panel">
              <p>Bajobliss merupakan sebuah platform komersil yang memfasilitasi 
                pembelian secara online untuk mempermudah aktivitas berbelanja produk 
                khas Labuan Bajo.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq"><p>Produk apa saja yang ada di Bajobliss?</p><i class="fas fa-chevron-down"></i></button>
            <div class="faq-panel">
              <p>Produk yang dihadirkan dalam platform Bajobliss adalah produk khas Labuan Bajo, 
              seperti souvenir, camilan, makanan kering, dan berbagai oleh-oleh khas Labuan Bajo.</p>
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
