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

  async afterRender() {
    const displayProfile = async () => {
      const content = document.querySelector('.content');
      if (content) {
        content.innerHTML = await this.render();
      }
    };

    displayProfile();
  },
};

export default Profile;
