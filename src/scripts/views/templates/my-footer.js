class MyFooter extends HTMLElement {
  constructor() {
    super();

    const footer = document.createElement('footer');
    footer.innerHTML = this.render();
    this.appendChild(footer);
  }

  render() {
    return `
        <div class="foo-bar">
            <div class="foo-name">
                <h1>BajoBliss</h1>
                <a>info@bajobliss.com</a>
            </div>
            <div class="foo-web">
                <h4>BajoBliss</h4>
                <a href="#/new">New</a>
                <a href="#/category">Categories</a>
                <a href="#/faq">FAQ</a>
            </div>
            <div class="foo-bajo">
                <h4>Follow Us</h4>
                <a href="#"><i class="fab fa-instagram"></i> bajobliss.id</a>
                <a href="#"><i class="fab fa-twitter"></i> bajoblissid</a>
                <a href="#"><i class="fab fa-facebook"></i> BajoBliss</a>
            </div>
        </div>
        <p class="credit">©️2024, BajoBliss</p>
    `;
  }
}

customElements.define('my-footer', MyFooter);
