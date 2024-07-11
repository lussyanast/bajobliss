const Profile = {
  async render() {
    return `
      <div class="content">
        <div class="profile-content">
          <div class="profile">
            <h1>My Profile</h1>
            <div class="profile-details">
              <div class="profile-image">
                <img src="" alt="Profile Image">
              </div>
              <div class="profile-info">
                <h2>Lorem Ipsum</h2>
                <p>Email: lorem@ipsum.com</p>
                <p>Phone: +628123456789</p>
                <p>Gender: Perempuan</p>
                <div class="address">
                  <h3>Alamat</h3>
                  <p>Jl. Coklat IX xx, rw xx</p>
                  <p>Kode Pos</p>
                  <p>Kota Jakarta</p>
                  <p>Provinsi Jawa Barat</p>
                  <p>Indonesia</p>
                </div>
                <button class="edit-profile-btn">Edit Profile</button>
              </div>
            </div>
          </div>
          <a class="logout" href="#home">Log Out</a>
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
  },
};

export default Profile;
