import { v4 as uuidv4 } from 'uuid';
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
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;

      const user_id = uuidv4(); // Generate user_id

      const payload = { user_id, name, username, email, password, user_phone: phone };
      console.log('Payload:', payload);

      try {
        const response = await userAPI.createUser(payload);
        console.log('Response:', response);

        if (response.status === 201) {
          // Redirect to home page
          window.location.href = '#/home';
        } else {
          // Handle error, show message to user
          alert('Failed to create account. Please try again.');
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Error response data:', error.response.data);
          alert(`Failed to create account: ${error.response.data.message}`);
        } else if (error.request) {
          // No response was received from the server
          console.error('Error request:', error.request);
          alert('No response from server. Please try again later.');
        } else {
          // Other errors
          console.error('Error creating account:', error.message);
          alert('An error occurred. Please try again.');
        }
      }
    });
  },
};

export default Signup;
