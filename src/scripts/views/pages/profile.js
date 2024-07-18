/* eslint-disable camelcase */
import { getUserId } from '../../utils/decode-token';
import { getCookie, eraseCookie } from '../../utils/cookie-helper';
import { userAPI } from '../../data/route.api';

let profilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';

const Profile = {
  async render() {
    let userData;

    try {
      const response = await userAPI.getUser(getUserId());
      userData = response.data;
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }

    const {
      user_id: userId,
      name,
      email,
      user_phone: phone,
      profile_pic,
    } = userData;

    if (profile_pic) {
      profilePic = profile_pic;
    }

    return `
      <div class="content">
        <div class="profile-content">
          <div class="profile">
            <h1>My Profile</h1>
            <div class="profile-details">
              <div class="profile-image">
                <img src=${profilePic} alt="${name}">
              </div>
              <div class="profile-info">
                <h2>${name}</h2>
                <p>User ID: ${userId}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <br />
                <button class="edit-profile-btn">Edit Profile</button>
              </div>
            </div>
          </div>
          <button class="logout" id="logout">Log Out</a>
        </div>
      </div>
    `;
  },

  async renderEditProfile() {
    return `
      <div class="content">
        <div class="profile-content">
          <h1>My Profile</h1>
          <form class="edit-profile-form">
            <div class="form-group">
              <div class="profile-image">
                <img src=${profilePic}' alt="Profile Image">
                <br />
                <button type="button" class="upload-photo-btn">Upload Photo</button>
              </div>
            </div>
            <div class="form-group">
              <label for="name">Nama</label>
              <input type="text" id="name" name="name" class="form-control">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" class="form-control">
            </div>
            <div class="form-group">
              <label for="phone">Nomor Telepon</label>
              <input type="text" id="phone" name="phone" class="form-control">
            </div>
            <button type="submit" class="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const displayProfile = async () => {
      const content = document.querySelector('.content');
      if (content) {
        content.innerHTML = await this.render();
      }
    };

    const displayEditProfile = async () => {
      const content = document.querySelector('.content');
      if (content) {
        content.innerHTML = await this.renderEditProfile();
      }
    };

    await displayProfile();

    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        await displayEditProfile();
      });
    }

    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (confirm('Are you sure you want to log out?')) {
          if (getCookie('jwt')) {
            eraseCookie('jwt');
            profilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
          }
          window.location.href = '#/login';
        }

        const jwt = getCookie('jwt');
        if (!jwt) {
          window.location.href = '#/login';
        }
      });
    }
  },
};

export default Profile;
