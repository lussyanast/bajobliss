const Profile = {
  async render() {
    return `
      <div class="content"></div>
    `;
  },

  async afterRender() {
    const displayProfile = () => {
      const content = document.querySelector('.content');
      let htmlContent = '';

      htmlContent += `
        <div class="profile">
            <h1>Profile</h1>
        </div>
      `;

      content.innerHTML = htmlContent;
    };

    displayProfile();
  },
};

export default Profile;
