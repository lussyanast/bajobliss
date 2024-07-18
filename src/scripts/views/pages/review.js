const Review = {
    async render() {
      return `
        <div class="review-page">
          <div class="review-content">
            <div class="review-container">
              <h2 class="review-title">Review Detail Page</h2>
              <div class="review-form-container">
                <textarea id="reviewText" placeholder="Write your review here..."></textarea>
                <button id="submitReviewButton" class="submit-button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      `;
    },
  
    async afterRender() {
      document.getElementById('submitReviewButton').addEventListener('click', () => {
        const reviewText = document.getElementById('reviewText').value;
        if (reviewText) {
          console.log('Review submitted:', reviewText);
        } else {
          console.log('Please write a review before submitting.');
        }
      });
    }
  };
  
  export default Review;