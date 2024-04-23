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

// configure the navbar to only show certain elements when signed in/out
function configure_navbar(user) {
  let signedin = document.querySelectorAll(`.signedin`);
  let signedout = document.querySelectorAll(`.signedout`);

  // check user status
  if (user) {
    // show all signedin links
    signedin.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    // hide all signedout links
    signedout.forEach((link) => {
      link.classList.add("is-hidden");
    });
  } else {
    // show all signedout links
    signedout.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    // hide all signedin links
    signedin.forEach((link) => {
      link.classList.add("is-hidden");
    });
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
// function signUpEmployer(event) {
//   event.preventDefault();

//   const companyName = document.getElementById("c_name").value;
//   const companyEmail = document.getElementById("c_email").value;
//   const password = document.getElementById("c_password").value;
//   const confirmPassword = document.getElementById("c_password2").value;

//   // Check if passwords match
//   if (password !== confirmPassword) {
//     alert("Passwords do not match.");
//     return;
//   }

//   // Add employer data to Firestore
//   db.collection("employers")
//     .doc(companyEmail)
//     .set({
//       companyName: companyName,
//       email: companyEmail,
//       password: password,
//     })
//     .then(() => {
//       console.log("Employer added successfully.");
//       // Redirect or show success message
//     })
//     .catch((error) => {
//       console.error("Error adding employer: ", error);
//     });
// }

// // Function to handle student sign-up
// function signUpStudent(event) {
//   event.preventDefault();

//   const fullName = document.getElementById("s_name").value;
//   const educationalEmail = document.getElementById("s_email").value;
//   const password = document.getElementById("s_password").value;
//   const confirmPassword = document.getElementById("s_password2").value;

//   // Check if passwords match
//   if (password !== confirmPassword) {
//     alert("Passwords do not match.");
//     return;
//   }

//   // Add student data to Firestore
//   db.collection("users")
//     .doc(educationalEmail)
//     .set({
//       fullName: fullName,
//       email: educationalEmail,
//       password: password,
//     })
//     .then(() => {
//       console.log("Student added successfully.");
//       // Redirect or show success message
//     })
//     .catch((error) => {
//       console.error("Error adding student: ", error);
//     });

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(educationalEmail, password)
//     .then((userCredential) => {
//       // User account created successfully
//       const user = userCredential.user;
//       console.log("User created:", user);
//       // Optionally, redirect the user to a different page
//     })
//     .catch((error) => {
//       // Handle errors
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error("Error creating user:", errorMessage);
//     });
// }

// adjusted student and business signup functions

function signUpStudent(event) {
  event.preventDefault(); // Add this if not already present

  const fullName = document.getElementById("s_name").value;
  const educationalEmail = document.getElementById("s_email").value;
  const password = document.getElementById("s_password").value;
  const confirmPassword = document.getElementById("s_password2").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(educationalEmail, password)
    .then((userCredential) => {
      // Store additional user info in Firestore with role
      return firebase
        .firestore()
        .collection("users")
        .doc(userCredential.user.uid)
        .set({
          fullName: fullName,
          email: educationalEmail,
          role: "student",
        });
    })
    .then(() => {
      console.log("Student account created with role.");
      toggleSection("studentHomepage"); // Redirect to student home
    })
    .catch((error) => {
      console.error("Error signing up student: ", error);
      alert(error.message); // Display error message to user
    });
}

function signUpEmployer(event) {
  event.preventDefault(); // Add this if not already present

  const companyName = document.getElementById("c_name").value;
  const companyEmail = document.getElementById("c_email").value;
  const password = document.getElementById("c_password").value;
  const confirmPassword = document.getElementById("c_password2").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(companyEmail, password)
    .then((userCredential) => {
      // Store additional user info in Firestore with role
      return firebase
        .firestore()
        .collection("users")
        .doc(userCredential.user.uid)
        .set({
          companyName: companyName,
          email: companyEmail,
          role: "business",
        });
    })
    .then(() => {
      console.log("Business account created with role.");
      toggleSection("businessHomepage"); // Redirect to business home
    })
    .catch((error) => {
      console.error("Error signing up business: ", error);
      alert(error.message); // Display error message to user
    });
}

// Function to display active posts on comapny page
function fetchActivePosts() {
  const activePosts = document.getElementById("active_posts");

  // Get a reference to the job_post collection
  const jobPostCollection = db.collection("job_post");

  // Get the ID of the currently logged-in user
  const currentUserID = firebase.auth().currentUser.uid;

  // Fetch documents from job_post collection
  jobPostCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Extract data from each document
        const data = doc.data();

        // Check if the employerID matches the ID of the currently logged-in user
        if (data.employerID === currentUserID) {
          // Create card element
          const card = document.createElement("div");
          card.classList.add("card");

          // Populate card with data from Firestore
          card.innerHTML = `<!-- Job listing card 1 -->
            <div class="column is-full">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4 has-text-black">${data.position}</p>
                      <div class="content">6 applications</div>
                    </div>
                    <div class="media-right">
                      <p class="title is-4 has-text-black">${data.pay}</p>
                      <p class="is-pulled-right">3-4 days per week</p>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item">Edit</a>
                </footer>
              </div>
            </div>`;

          // Get the first child of the container
          const firstChild = activePosts.firstChild;

          // Insert the card before the first child
          // activePosts.insertBefore(card, firstChild);`
          activePosts.appendChild(card);
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

// Function to clear innerHTML of activePosts container
function clearActivePosts() {
  const activePostsContainer = document.getElementById("active_posts");
  activePostsContainer.innerHTML = ""; // Clear innerHTML
}

// Function to fetch job postings from Firestore
function fetchJobPostings() {
  const jobPostingsContainer = document.getElementById("job_postings");

  // Get a reference to the job_post collection
  const jobPostCollection = db.collection("job_post");

  // Fetch documents from job_post collection
  jobPostCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Extract data from each document
        const data = doc.data();

        // Create card element
        const card = document.createElement("div");
        card.classList.add("card");

        // Populate card with data from Firestore
        card.innerHTML = `
      <div class="column is-full">
        <div class="card">
          <div class="card-content">
              <div class="media">
                  <div class="media-content">
                      <p class="title is-4 has-text-black">${data.company}: ${data.title}</p>
                      <p class="content">Expected hours/week: ${data.hours}</p>
                      <p class="content">Required Experience: ${data.experience}</p>
                      <p class="content">Wage: $${data.wage}/hour </p>
                      <p class="content">Days of Week: ${data.days} </p>
                      <p class="content">Description: ${data.description} </p>
                  </div>
                  <div class="media-right">
                      <figure class="image is-96x96 is rounded"> <!-- Adjust size as needed -->
                          <img src="${data.img_link}" alt="Job Image">
                      </figure>
                  </div>
              </div>
          </div>
          <footer class="card-footer">
              <a id="apply" class="card-footer-item">Apply</a>
          </footer>
      </div>`;

        // Append card to container
        jobPostingsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

// Function to clear innerHTML of jobPosts container
function clearActivePosts() {
  const jobPostingsContainer = document.getElementById("job_postings");
  jobPostingsContainer.innerHTML = ""; // Clear innerHTML
}

// Call this function when the content is loaded to show active section
document.addEventListener("DOMContentLoaded", (event) => {
  // Initially show only show the landing page
  toggleSection("landing");
});

// Add event listeners to sign-up buttons
document.getElementById("ssu_button").addEventListener("click", signUpStudent);
document.getElementById("esu_button").addEventListener("click", signUpEmployer);

// Add data from the job posting form into the job_post collection
document
  .getElementById("employerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const desiredHours = document.getElementById("desiredHours").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const requiredExperience =
      document.getElementById("requiredExperience").value;

    // Add job post data to Firestore
    db.collection("job_post")
      .add({
        desiredHours: desiredHours,
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        requiredExperience: requiredExperience,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // Reset form after successful submission
        document.getElementById("employerForm").reset();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });

// Sign in user
r_e("signin_form").addEventListener("submit", (e) => {
  e.preventDefault();

  // grab email and password
  let email = r_e("si_email").value;
  let password = r_e("si_password").value;

  // call the firebase function to sign in user
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Signed In successfully");
      // reset form
      r_e("signin_form").reset();
    })
    .catch((err) => {
      console.log("Error with sign in", err);
    });
});

// Sign out user,
r_e("signout_nav").addEventListener("click", () => {
  // Display a successful signout message to user
  activePosts.innerHTML = ``;
  auth.signOut().then(() => {
    console.log("Signed Out");
  });
});

// track user authentification status with on authstatechanged
auth.onAuthStateChanged((user) => {
  //check if user is signed in or out
  if (user) {
    toggleSection("studentHomepage");
    fetchJobPostings();
    // display message, configure nav bar, and toggle right section
    console.log("User Signed In!");
    configure_navbar(user);
  } else {
    console.log("User Signed Out!");
    configure_navbar(user);
    toggleSection("landing");
  }
});

// Establiishing if user is Business or Student based off sign up
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const userData = doc.data();
        console.log(userData);
        if (userData.role === "student") {
          toggleSection("studentHomepage");
          configure_navbar(user);
        } else if (userData.role === "business") {
          toggleSection("businessHomepage");
          configure_navbar(user);
          fetchActivePosts();
        } else {
          toggleSection("landing");
          configure_navbar(user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  } else {
    toggleSection("landing"); // User is not signed in
    clearActivePosts();
  }
});
