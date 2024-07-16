const Signup = {
    async render() {
    return `
    <div class="signup-page">
        <h2>CREATE ACCOUNT</h2>
        <div class="signup-content">
            <form class="signup-form">
            <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" id="name" name="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" class="form-control" required>
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
    
    },
};

export default Signup;
