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
            <p class="signup-link">Or <a href="#/create-account">Create Account</a></p>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await authAPI.login({ username, password });
        
        if (response.status === 200) {
          // Simpan status login di localStorage
          localStorage.setItem('isLoggedIn', 'true');
          // Redirect ke halaman profil
          window.location.href = '#/profile';
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
      }
    });
  },
};

export default Login;
