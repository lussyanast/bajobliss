/* eslint-disable camelcase */
import { setCookie } from '../../utils/cookie-helper';
import { authAPI } from '../../data/route.api';

const Login = {
  async render() {
    return `
      <div class="login-page">
        <h2>LOG IN</h2>
        <div class="login-content">
          <form class="login-form" id="loginForm">
            <div class="form-group">
              <label for="username">Username *</label>
              <input type="text" id="username" name="username" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password *</label>
              <input type="password" id="password" name="password" class="form-control" required>
            </div>
            <div class="form-group">
              <a href="#" class="forgot-password">Forgot your password?</a>
            </div>
            <button type="submit" class="login-btn">Log In</button>
          </form>
        </div>
        <div class="signup-container">
            <p class="signup-text">Don't have an account?</p>
            <a href="#/signup" class="signup-link">Create Account</a>
          </div>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const identifier = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await authAPI.login({ identifier, password });
        if (response.status === 200) {
          const { expire_in, token } = response.data;
          const expiryDate = new Date(expire_in * 1000);

          setCookie('jwt', token, expiryDate);
          window.location.href = '#/profile';
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          alert(data.message);

          return;
        }
        console.error('Error logging in: ', error);
        alert('Internal server error');
      }
    });
  },
};

export default Login;
