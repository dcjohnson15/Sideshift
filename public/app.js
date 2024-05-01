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

// configure the message bar
function configure_message_bar(msg) {
  // make msg bar visible
  r_e('message_bar').classList.remove('is-hidden');

  r_e('message_bar').innerHTML = msg;

  setTimeout(() => {
    r_e('message_bar').innerHTML = "";
    r_e('message_bar').classList.add('is-hidden');
  }, 3000);
}

function toggleSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.add("is-active");
      section.style.display = "block"; // Ensure it's visible
    } else {
      section.classList.remove("is-active");
      section.style.display = "none"; // Ensure it's hidden
    }
  });
}

// Function to display student information
function fetchUserData() {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          fillEditForm(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }
}

function updateUserInfoDisplay(data) {
  document.getElementById("displayName").textContent = data.name || "";
  document.getElementById("eduEmail").textContent = data.email || "";
  document.getElementById("age").textContent = data.age || "";
  document.getElementById("year").textContent = data.year || "";
  document.getElementById("major").textContent = data.majors || "";
  document.getElementById("hometown").textContent = data.hometown || "";
  document.getElementById("aboutme").textContent = data.aboutMe || "";
  if (data.profilePicUrl) {
    document.getElementById("displayHeadshot").src = data.profilePicUrl;
    document.getElementById("displayHeadshot").style.display = 'block'; // Show the image element
  }
};

function previewImage() {
  var file = document.getElementById("editProfilePic").files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById('preview').style.display = 'block';
    document.getElementById('preview').src = reader.result;
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    document.getElementById('preview').src = "";
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
      toggleSection("studentHomepage"); // Redirect to student home
      configure_message_bar(`Successfully Signed Up! Don't forget to input the rest of your information!`);
    })
    .catch((error) => {
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
      toggleSection("businessHomepage"); // Redirect to business home
      configure_message_bar(`Successfully Signed Up! Don't forget to input the rest of your information!`);
    })
    .catch((error) => {
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
                <a id="edit_post" class="card-footer-item">Edit</a>
                <a id="view_applicants" class="card-footer-item">View Applicants</a> 
              </footer>
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

function updateUserProfile(user) {
  const updatedData = {
    name: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value,
    age: document.getElementById("editAge").value,
    majors: document.getElementById("editMajors").value,
    hometown: document.getElementById("editHometown").value,
    aboutMe: document.getElementById("editAboutMe").value,
  };

  const file = document.getElementById("editProfilePic").files[0];
  if (file && file.type.match('image.*')) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child('profilePictures/' + user.uid + '/' + file.name);

    fileRef.put(file).then((snapshot) => {
      return snapshot.ref.getDownloadURL(); // Get URL of the uploaded file
    }).then((url) => {
      updatedData.profilePicUrl = url; // Save URL to the profile data
      return db.collection("users").doc(user.uid).set(updatedData, { merge: true });
    }).then(() => {
      updateUserInfoDisplay(updatedData); // Update UI
      configure_message_bar(`Successfully Updated Profile!`);
    }).catch((error) => {
      console.error("Error updating profile: ", error);
    });
  } else {
    db.collection("users").doc(user.uid).set(updatedData, { merge: true }).then(() => {
      updateUserInfoDisplay(updatedData); // Update UI
      configure_message_bar(`Successfully Updated Profile!`);
    }).catch((error) => {
      console.error("Error updating profile: ", error);
    });
  }
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
      configure_message_bar(`Successfully Signed In!`);
      // reset form
      r_e("signin_form").reset();
    })
    .catch((err) => {
      configure_message_bar(`Please double check your credentials or create an account!`);
    });
});

// Sign out user,
r_e("signout_nav").addEventListener("click", () => {
  // Display a successful signout message to user
  auth.signOut().then(() => {
    configure_message_bar(`Successfully Signed Out!`);
  });
});

// // track user authentification status with on authstatechanged
// auth.onAuthStateChanged((user) => {
//   //check if user is signed in or out
//   if (user) {
//     toggleSection("studentHomepage");
//     fetchJobPostings();
//     // display message, configure nav bar, and toggle right section
//     console.log("User Signed In!");
//     configure_navbar(user);
//   } else {
//     console.log("User Signed Out!");
//     configure_navbar(user);
//     toggleSection("landing");
//   }
// });

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
        if (userData.role === "student") {
          toggleSection("studentHomepage");
          fetchJobPostings();
          configure_navbar(user);
          r_e('user_email').innerHTML = auth.currentUser.email;
        } else if (userData.role === "business") {
          toggleSection("businessHomepage");
          configure_navbar(user);
          fetchActivePosts();
          r_e('user_email').innerHTML = auth.currentUser.email;
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  } else {
    toggleSection("landing"); // User is not signed in
    clearActivePosts();
    configure_navbar(user)
  }
});

// submitting student data to firebase
document
  .getElementById("editProfileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    if (user) {
      updateUserProfile(user);
    } else {
      configure_message_bar(`No user logged in!`);
    }
  });

// add job post from the form to db
document.getElementById("employerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the ID of the currently logged-in user
  const currentUserID = firebase.auth().currentUser.uid;

  // Get form values
  const job_title = document.getElementById("job_title").value;
  const company = document.getElementById("company").value;
  const days = Array.from(document.querySelectorAll("input[name='days[]']:checked")).map(day => day.value);
  const description = document.getElementById("description").value;
  const experience = document.getElementById("experience").value;
  const totalhours = document.getElementById("totalhours").value;
  const img_link = document.getElementById("img_link").value;
  const location = document.getElementById("location").value;
  const posted_date = document.getElementById("posted_date").value;
  const wage = document.getElementById("wage").value;

  // Add job application data to Firestore
  db.collection("job_post")
    .add({
      employerID: currentUserID,
      title: job_title,
      company: company,
      days: days,
      description: description,
      experience: experience,
      hours: totalhours,
      img_link: img_link,
      location: location,
      posted_date: posted_date,
      wage: wage
    })
    .then(() => {
      configure_message_bar(`Job posted successfully!`);
      // Reset form after submission
      document.getElementById("employerForm").reset();

      // Go back to the homepage (assuming you have a function named toggleSection)
      toggleSection('businessHomepage');
    })
    .catch((error) => {
      configure_message_bar(`There was an error when creating your job post`);
    });
});

//fetching user data
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          updateUserInfoDisplay(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
});




