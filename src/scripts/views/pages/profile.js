import { getUserId } from '../../utils/decode-token';
import { getCookie, eraseCookie } from '../../utils/cookie-helper';
import { userAPI } from '../../data/route.api';

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
      profile_pic: profilePic,
    } = userData;
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
                <p><s>Gender: Perempuan</s></p>
                <br />
                <div class="address">
                  <s>
                    <h3>Alamat</h3>
                    <p>Jl. Coklat IX xx, rw xx</p>
                    <p>Kode Pos</p>
                    <p>Kota Jakarta</p>
                    <p>Provinsi Jawa Barat</p>
                    <p>Indonesia</p>
                  </s>
                </div>
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
                <img src="" alt="Profile Image">
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
              <label for="phone">No. Telp</label>
              <input type="text" id="phone" name="phone" class="form-control">
            </div>
            <div class="form-group">
              <label for="gender">Jenis kelamin (Optional)</label>
              <select id="gender" name="gender" class="form-control">
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            <div class="form-group">
              <label for="address">Alamat</label>
              <textarea id="address" name="address" class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label for="postal-code">Kode Pos</label>
              <input type="text" id="postal-code" name="postal-code" class="form-control">
            </div>
            <div class="form-group">
              <label for="city">Kota</label>
              <input type="text" id="city" name="city" class="form-control">
            </div>
            <div class="form-group">
              <label for="country">Negara</label>
              <select id="country" name="country" class="form-control">
                <option value="indonesia">Indonesia</option>
                <option value="other">Lainnya</option>
              </select>
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

        eraseCookie('jwt');

        const jwt = getCookie('jwt');
        if (!jwt) {
          window.location.href = '#/login';
        }
      });
    }
  },
};

export default Profile;
