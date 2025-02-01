const formData = {
    email: "",
    message: ""
};

const feedbackForm = document.querySelector(".feedback-form");
const emailInput = feedbackForm.elements.email;
const messageInput = feedbackForm.elements.message;
const localStorageKey = "feedback";

loadFormData();

feedbackForm.addEventListener("input", handleInput);
feedbackForm.addEventListener("submit", handleSubmit);

function handleInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();

  if (emailInput.value.trim() === "" || messageInput.value.trim() === "") {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  feedbackForm.reset();

  formData.email = "";
  formData.message = "";
}

function loadFormData() {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailInput.value = parsedData.email || "";
    messageInput.value = parsedData.message || "";

    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
  }
}
