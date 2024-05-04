document.addEventListener("DOMContentLoaded", function () {
  generateReviewCards();

  const addReviewForm = document.getElementById('add-review-form');
  addReviewForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const rating = parseInt(document.getElementById('rating').value);
    const comment = document.getElementById('comment').value;


    const newReview = { name, date , rating, comment };
    reviewData.push(newReview);

    generateReviewCards();
    addReviewForm.reset();
  });
  
  function generateReviewCards() {
    const reviewsContainer = document.querySelector('.reviews');
    reviewsContainer.innerHTML = '';

    reviewData.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.classList.add('review-card');
      reviewCard.innerHTML = `
        <h3>${review.name}</h3>
        <p>${formatDate(review.date)}</p>
        <div class="rating">${generateRatingStars(review.rating)}</div>
        <p>${review.comment}</p>
      `;
      reviewsContainer.appendChild(reviewCard);
    });
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function generateRatingStars(rating) {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return `${fullStars}${emptyStars}`;
  }
});
