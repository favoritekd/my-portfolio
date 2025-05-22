const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const successMessage = document.getElementById("form-message");
const errorMessage = document.getElementById("error-message");
const loadingMessage = document.getElementById("loading-message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Hide previous messages and show loading
  [successMessage, errorMessage].forEach(el => el.style.display = "none");
  loadingMessage.style.display = "block";
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      successMessage.style.display = "block";
      setTimeout(() => successMessage.style.display = "none", 5000); // Auto-hide
    } else {
      const errorData = await response.json();
      errorMessage.textContent = errorData.message || "Something went wrong. Please try again.";
      errorMessage.style.display = "block";
    }
  } catch (err) {
    errorMessage.textContent = "Network error. Please try again.";
    errorMessage.style.display = "block";
  } finally {
    loadingMessage.style.display = "none";
    submitBtn.disabled = false;
  }
});
