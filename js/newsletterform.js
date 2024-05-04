const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailInput = newsletterForm.querySelector('#email');
  const nameInput = newsletterForm.querySelector('#name');

  const email = emailInput.value;
  const name = nameInput.value;

  if (isValidEmail(email)) {
    try {
      const response = await submitFormData(email, name);

      if (response.ok) {
        alert('Thank you for joining our newsletter!');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }

    // Clear the form
    emailInput.value = '';
    nameInput.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
});

// Check if email is valid
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Submit form data
async function submitFormData(email, name) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);

  const response = await fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData,
  });

  return response;
}
