// Function to toggle the visibility of sections based on the given section ID.
function toggleSection(sectionId) {
  // Select all sections with the class .section
  const sections = document.querySelectorAll(".section");
  // Select the navbar to change its color depending on the active section
  const navbar = document.getElementById("navbar");

  // Loop through all sections to remove the active class, hiding them
  sections.forEach((section) => {
    section.classList.remove("is-active");
  });

  // Add the is-active class to the section that should be visible
  document.getElementById(sectionId).classList.add("is-active");

  // Change the navbar class based on the active section
  // If on the landing page, set the navbar to be primary, otherwise info
  if (sectionId == "landing") {
    navbar.className = "navbar is-info";
  } else {
    navbar.className = "navbar is-info";
  }
}

// Call this function when the content is loaded to show active section
document.addEventListener("DOMContentLoaded", (event) => {
  // Initially show only show the landing page
  toggleSection("landing");
});


// .custom-centered {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// Function to handle employer sign-up
function signUpEmployer(event) {
  event.preventDefault();

  const companyName = document.getElementById('c_name').value;
  const companyEmail = document.getElementById('c_email').value;
  const password = document.getElementById('c_password').value;
  const confirmPassword = document.getElementById('c_password2').value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Add employer data to Firestore
  db.collection("employers").doc(companyEmail).set({
    companyName: companyName,
    email: companyEmail,
    password: password
  })
    .then(() => {
      console.log("Employer added successfully.");
      // Redirect or show success message
    })
    .catch((error) => {
      console.error("Error adding employer: ", error);
    });
}

// Function to handle student sign-up
function signUpStudent(event) {
  event.preventDefault();

  const fullName = document.getElementById('s_name').value;
  const educationalEmail = document.getElementById('s_email').value;
  const password = document.getElementById('s_password').value;
  const confirmPassword = document.getElementById('s_password2').value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Add student data to Firestore
  db.collection("users").doc(educationalEmail).set({
    fullName: fullName,
    email: educationalEmail,
    password: password
  })
    .then(() => {
      console.log("Student added successfully.");
      // Redirect or show success message
    })
    .catch((error) => {
      console.error("Error adding student: ", error);
    });
}

// Add event listeners to sign-up buttons
document.getElementById('ssu_button').addEventListener('click', signUpStudent);
document.getElementById('esu_button').addEventListener('click', signUpEmployer);

