const Login = {
  async render() {
    return `
      <div class="login-page">
      <h2>LOG IN</h2>
        <div class="login-content">
          <form class="login-form">
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" class="form-control" required>
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
    
  },
};

export default Login;
