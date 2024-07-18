import { getCookie } from '../../utils/cookie-helper';

class MenuBar extends HTMLElement {
  constructor() {
    super();

    const menu = document.createElement('header');
    menu.innerHTML = this.render();
    this.appendChild(menu);
  }

  connectedCallback() {
    this._setupProfileLink();
    this._setupCartLink();
  }

  render() {
    return `
        <div class="app-name">
            <h1>BajoBliss</h1>
        </div>
        <nav class="nav-web">
            <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#/new">New</a></li>
                <li><a href="#/category">Categories</a></li>
                <li><a href="#/faq">FAQ</a></li>
            </ul>  
        </nav>
        <nav class="nav-user">
            <ul>
                <li><a href="#/search"><i class="fas fa-search"></i></a></li>
                <li><a href="#" id="cartLink"><i class="fas fa-shopping-cart"></i></a></li>
                <li><a href="#" id="profileLink"><i class="fas fa-user"></i></a></li>
            </ul>
        </nav>
    `;
  }

  _setupProfileLink() {
    const profileLink = this.querySelector('#profileLink');
    profileLink.addEventListener('click', (event) => {
      event.preventDefault();

      const isLoggedIn = !!getCookie('jwt');
      if (isLoggedIn) {
        window.location.href = '#/profile';
      } else {
        window.location.href = '#/login';
      }
    });
  }

  _setupCartLink() {
    const cartLink = this.querySelector('#cartLink');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();

      const isLoggedIn = !!getCookie('jwt');
      if (isLoggedIn) {
        window.location.href = '#/cart';
      } else {
        window.location.href = '#/login';
      }
    });
  }
}

customElements.define('menu-bar', MenuBar);
