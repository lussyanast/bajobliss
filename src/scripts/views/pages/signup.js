import { userAPI } from '../../data/route.api';

const Signup = {
  async render() {
    return `
      <div class="signup-page">
        <h2>CREATE ACCOUNT</h2>
        <div class="signup-content">
          <form class="signup-form" id="signupForm">
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" id="name" name="name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="username">Username *</label>
              <input type="text" id="username" name="username" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone *</label>
              <input type="text" id="phone" name="phone" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password *</label>
              <input type="password" id="password" name="password" class="form-control" required>
            </div>
            <button type="submit" class="signup-btn">CREATE</button>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const userId = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;

      const payload = {
        user_id: userId,
        name,
        email,
        user_phone: phone,
        password,
      };

      try {
        const response = await userAPI.createUser(payload);
        if (response.status === 201) {
          alert(response.data.message);
          window.location.href = '#/login';
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          alert(data.message);

          return;
        }
        console.error('Error creating user: ', error);
        alert('Internal server error');
      }
    });
  },
};

export default Signup;
