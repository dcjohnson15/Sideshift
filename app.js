function r_e(id) {
  return document.querySelector(`#${id}`);
}
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

// Add data from the job posting form into the job_post collection
document.getElementById('employerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form values
  const desiredHours = document.getElementById('desiredHours').value;
  const jobTitle = document.getElementById('jobTitle').value;
  const jobDescription = document.getElementById('jobDescription').value;
  const requiredExperience = document.getElementById('requiredExperience').value;

  // Add job post data to Firestore
  db.collection("job_post").add({
    desiredHours: desiredHours,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    requiredExperience: requiredExperience
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      // Reset form after successful submission
      document.getElementById('employerForm').reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

// // Sign in user, and display message on mesage bar
// r_e("si_button").addEventListener('submit', (e) => {
//   e.preventDefault();

//   // grab email and password
//   let email = r_e("si_email").value;
//   let password = r_e("si_password").value;

//   // call the firebase finction to sign in user
//   auth.signInWithEmailAndPassword(email, password).then((user) => {

//     console.log("Signed In successfully");
//     // reset form
//     r_e("si_form").reset();

//     // // close modal
//     // r_e("signin").classList.remove(`is-active`);

//   }).catch(err => {
//     signin.querySelector('.error').innerHTML = err.message;
//   })
// })

// // Sign out user, 
// r_e('signout_nav').addEventListener('click', () => {
//   // Display a successful signout message to user

//   auth.signOut().then(() => {
//     console.log("Signed Out")
//   })
// })


