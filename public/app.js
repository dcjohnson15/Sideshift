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
  r_e("message_bar").classList.remove("is-hidden");

  r_e("message_bar").innerHTML = msg;

  setTimeout(() => {
    r_e("message_bar").innerHTML = "";
    r_e("message_bar").classList.add("is-hidden");
  }, 3000);
}

// fetchuserdata DEBUG
function fetchUserData() {
  const user = firebase.auth().currentUser;
  if (user) {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data(); // Return user data
        } else {
          console.log("No such document!");
          return null; // Return null if document doesn't exist
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
        throw error; // Rethrow the error to be caught by the caller
      });
  } else {
    console.error("User not authenticated!");
    return Promise.reject(new Error("User not authenticated")); // Return a rejected promise
  }
}

function updateUserInfoDisplay(data) {
  document.getElementById("displayName").textContent = data.fullName || "";
  document.getElementById("phonenumber").textContent = data.phone || "";
  document.getElementById("eduEmail").textContent = data.email || "";
  document.getElementById("year").textContent = data.year || "";
  document.getElementById("major").textContent = data.majors || "";
  document.getElementById("hometown").textContent = data.hometown || "";
  document.getElementById("funFact").textContent = data.funfact || "";
  document.getElementById("jobExp1").textContent = data.jobExp1 || "";
  document.getElementById("jobRole1").textContent = data.jobRole1 || "";
  document.getElementById("jobExp2").textContent = data.jobExp2 || "";
  document.getElementById("jobRole2").textContent = data.jobRole2 || "";

  if (data.profilePicUrl) {
    document.getElementById("displayHeadshot").src = data.profilePicUrl;
    document.getElementById("displayHeadshot").style.display = "block"; // Show the image element
  }
}

// Display employer info
function updateUserInfoDisplay2(data) {
  document.getElementById("companyName").textContent = data.companyName || "";
  document.getElementById("email").textContent = data.email || "";
  document.getElementById("industry").textContent = data.industry || "";
  document.getElementById("size").textContent = data.size || "";
  document.getElementById("address").textContent = data.address || "";
  document.getElementById("phonenumber2").textContent = data.phone || "";
  if (data.profilePicUrl) {
    document.getElementById("displayLogo").src = data.profilePicUrl;
    document.getElementById("displayLogo").style.display = "block"; // Show the image element
  }
}

// Function to populate form fields with user data
function populateFormFields(data) {
  document.getElementById("editCname").value = data.companyName || "";
  document.getElementById("editCemail").value = data.email || "";
  document.getElementById("editCindustry").value = data.industry || "";
  document.getElementById("editCsize").value = data.size || "";
  document.getElementById("editCaddress").value = data.address || "";
  document.getElementById("editCphone").value = data.phone || "";

  // Set profile picture if available
  if (data.profilePicUrl) {
    document.getElementById("preview2").src = data.profilePicUrl;
    document.getElementById("preview2").style.display = "block";
  } else {
    // If profile picture is not available, hide the preview
    document.getElementById("preview2").style.display = "none";
  }
}

// function to populate forms with student data
function populateStudentForm(data) {
  document.getElementById("editName").value = data.fullName || "";
  document.getElementById("editEmail").value = data.email || "";
  document.getElementById("editPhone").value = data.phone || "";
  document.getElementById("editMajors").value = data.majors || "";
  document.getElementById("editHometown").value = data.hometown || "";
  document.getElementById("editFunFact").value = data.funfact || "";
  document.getElementById("jobExp1_title").value = data.jobExp1 || "";
  document.getElementById("jobExp1_desc").value = data.jobRole1 || "";
  document.getElementById("jobExp2_title").value = data.jobRole2 || "";
  document.getElementById("jobExp2_desc").value = data.jobExp2 || "";
  document.getElementById("editYearInSchool").value = data.year || "";
  document.getElementById("editHours").value = data.hours || "";

  if (data.profilePicUrl) {
    document.getElementById("preview").src = data.profilePicUrl;
    document.getElementById("preview").style.display = "block"; // Show the image element
  }
}

// Add click event listener to the "editEmployer" element
document.getElementById("editEmployer").addEventListener("click", () => {
  // Call fetchUserData to get user data and then populate form fields
  fetchUserData()
    .then((userData) => {
      populateFormFields(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});

// Add click event listener to the "editStudent" element
document.getElementById("editStudent").addEventListener("click", () => {
  // Call fetchUserData to get user data and then populate form fields
  fetchUserData()
    .then((userData) => {
      populateStudentForm(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});

function previewImage() {
  var file = document.getElementById("editProfilePic").files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById("preview").style.display = "block";
    document.getElementById("preview").src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    document.getElementById("preview").src = "";
  }
}

// function to fill in custom desired hours
function handleSelectionChange() {
  var select = document.getElementById("editHours");
  if (select.value === "custom") {
    var customHours = prompt("Please enter your desired custom hours:");
    if (customHours !== null && customHours !== "") {
      // Check if the custom value already exists
      let exists = Array.from(select.options).some(
        (option) => option.value === customHours
      );
      if (!exists) {
        // Create a new option element and add it to the dropdown
        var newOption = new Option(customHours + " hours", customHours);
        select.add(newOption);
      }
      // Select the newly added option
      select.value = customHours;
    }
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
      configure_message_bar(
        `Successfully Signed Up! Don't forget to input the rest of your information!`
      );
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
      configure_message_bar(
        `Successfully Signed Up! Don't forget to input the rest of your information!`
      );
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
                <a href="#" id="edit_post" class="card-footer-item button is-link" onclick="toggleSection('jobposteditForm')">Edit Information</a>
                <a href="#" class="card-footer-item button is-link" onclick="viewApplicants('${doc.id}')">View Applicants</a>
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

  // Get references to filter form inputs
  const searchQuery = document
    .getElementById("search_query")
    .value.trim()
    .toLowerCase();
  const wageFilter =
    parseFloat(document.getElementById("wage_filter").value) || 0;
  const daysFilter = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((input) => input.nextSibling.textContent.trim());
  const hoursFilter =
    parseFloat(document.getElementById("hours_filter").value) || 0;

  // Construct the query based on filter values
  let query = jobPostCollection;
  if (searchQuery) {
    query = query
      .where("company", "<=", searchQuery)
      .where("company", "<=", searchQuery + "\uf8ff");
  }
  if (wageFilter) {
    const wageFilterInt = parseInt(wageFilter);
    query = query.where("wage", "<=", wageFilterInt);
  }
  if (daysFilter.length > 0) {
    query = query.where("days", "array-contains-any", daysFilter);
  }
  if (hoursFilter) {
    const hoursFilterInt = parseInt(hoursFilter);
    query = query.where("hours", "<=", hoursFilterInt);
  }

  // Fetch documents from job_post collection
  query
    .get()
    .then((querySnapshot) => {
      jobPostingsContainer.innerHTML = "";

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
          <a href="#" class="card-footer-item button is-link" onclick="applyJob('${doc.id}')">Apply</a>
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

function applyJob(jobId) {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection("applications")
      .add({
        jobID: jobId,
        userID: user.uid,
        status: "applied",
      })
      .then(() => {
        alert("Application submitted!");
      })
      .catch((error) => {
        console.error("Error applying to job:", error);
        alert("Failed to apply.");
      });
  }
}

// View applicants for employers
function viewApplicants(jobId) {
  const applicantsContainer = document.getElementById("applicantsList");
  applicantsContainer.innerHTML = ""; // Clear previous content

  db.collection("applications")
    .where("jobID", "==", jobId)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        applicantsContainer.innerHTML = "<p>No applicants yet.</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        db.collection("users")
          .doc(doc.data().userID)
          .get()
          .then((userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              const applicantDiv = document.createElement("div");
              applicantDiv.className = "box";
              applicantDiv.innerHTML = `
              <article class="media">
                <figure class="media-left">
                  <p class="image is-128x128">
                    <img src="${
                      userData.profilePicUrl || "default-profile.png"
                    }" alt="Profile Image">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Name:</strong> ${userData.name || "N/A"}
                      <br>
                      <strong>Email:</strong> ${userData.email || "N/A"}
                      <br>
                      <strong>Phone Number:</strong> ${userData.phone || "N/A"}
                      <br>
                      <strong>Year in School:</strong> ${userData.year || "N/A"}
                      <br>
                      <strong>Major(s):</strong> ${userData.majors || "N/A"}
                      <br>
                      <strong>Hometown:</strong> ${userData.hometown || "N/A"}
                      <br>
                      <strong>Fun Fact:</strong> ${userData.funFact || "N/A"}
                      <br>
                      <strong>Job Experience (1):</strong> ${
                        userData.jobExp1 || "N/A"
                      } - ${userData.jobRole1 || "N/A"}
                      <br>
                      <strong>Job Experience (2):</strong> ${
                        userData.jobExp2 || "N/A"
                      } - ${userData.jobRole2 || "N/A"}
                    </p>
                  </div>
                </div>
                <div class="media-right">
                    <button class="button is-success" onclick="confirmApplicant('${
                      doc.id
                    }')">Confirm</button>
                    <button class="button is-danger" onclick="denyApplicant('${
                      doc.id
                    }')">Deny</button>
                  </div>
              </article>
            `;
              applicantsContainer.appendChild(applicantDiv);
            }
          });
      });
      toggleModal("applicantsDisplay", true); // Show the modal with applicants
    })
    .catch((error) => {
      console.error("Error getting applicants:", error);
      applicantsContainer.innerHTML = "<p>Error loading applicants.</p>";
    });
}

function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  if (show) {
    modal.classList.add("is-active");
  } else {
    modal.classList.remove("is-active");
  }
}

// Function to clear innerHTML of jobPosts container
function clearActivePosts() {
  const jobPostingsContainer = document.getElementById("job_postings");
  jobPostingsContainer.innerHTML = ""; // Clear innerHTML
}

// Function to fetch job postings from Firestore FOR ADMIN
function fetchAdminPostings() {
  const jobPostingsContainer = document.getElementById("admin_postings");

  // Get a reference to the job_post collection
  const jobPostCollection = db.collection("job_post");

  // Get references to filter form inputs
  const searchQuery = document
    .getElementById("search_query")
    .value.trim()
    .toLowerCase();
  const wageFilter =
    parseFloat(document.getElementById("wage_filter").value) || 0;
  const daysFilter = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((input) => input.nextSibling.textContent.trim());
  const hoursFilter =
    parseFloat(document.getElementById("hours_filter").value) || 0;

  // Construct the query based on filter values
  let query = jobPostCollection;
  if (searchQuery) {
    query = query
      .where("company", "<=", searchQuery)
      .where("company", "<=", searchQuery + "\uf8ff");
  }
  if (wageFilter) {
    const wageFilterInt = parseInt(wageFilter);
    query = query.where("wage", "<=", wageFilterInt);
  }
  if (daysFilter.length > 0) {
    query = query.where("days", "array-contains-any", daysFilter);
  }
  if (hoursFilter) {
    const hoursFilterInt = parseInt(hoursFilter);
    query = query.where("hours", "<=", hoursFilterInt);
  }

  // Fetch documents from job_post collection
  query
    .get()
    .then((querySnapshot) => {
      jobPostingsContainer.innerHTML = "";

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
          <!-- Add a delete button inside the footer of each job posting card -->
            <footer class="card-footer">
                <a class="card-footer-item delete-post is-red">Delete</a> <!-- New delete button -->
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

// Add event listener to handle delete button clicks
document.querySelectorAll(".delete-post").forEach((item) => {
  item.addEventListener("click", () => {
    console.log("Clicked!");
  });
});

// function to update student user profile
function updateUserProfile(user) {
  const updatedData = {
    fullName: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value,
    majors: document.getElementById("editMajors").value,
    hometown: document.getElementById("editHometown").value,
    funfact: document.getElementById("editFunFact").value,
    year: document.getElementById("editYearInSchool").value,
    jobExp1: document.getElementById("jobExp1_title").value,
    jobRole1: document.getElementById("jobExp1_desc").value,
    jobExp2: document.getElementById("jobExp2_title").value,
    jobRole2: document.getElementById("jobExp2_desc").value,
  };

  const file = document.getElementById("editProfilePic").files[0];
  if (file && file.type.match("image.*")) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(
      "profilePictures/" + user.uid + "/" + file.name
    );

    fileRef
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL(); // Get URL of the uploaded file
      })
      .then((url) => {
        updatedData.profilePicUrl = url; // Save URL to the profile data
        return db
          .collection("users")
          .doc(user.uid)
          .set(updatedData, { merge: true });
      })
      .then(() => {
        updateUserInfoDisplay(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  } else {
    db.collection("users")
      .doc(user.uid)
      .set(updatedData, { merge: true })
      .then(() => {
        updateUserInfoDisplay(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  }
}

// function to update employer user profile
function updateUserProfile2(user) {
  const updatedData = {
    companyName: document.getElementById("editCname").value,
    email: document.getElementById("editCemail").value,
    industry: document.getElementById("editCindustry").value,
    size: document.getElementById("editCsize").value,
    address: document.getElementById("editCaddress").value,
    phone: document.getElementById("editCphone").value,
  };

  const file = document.getElementById("editLogoPic").files[0];
  console.log(file);
  if (file && file.type.match("image.*")) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(
      "profilePictures/" + user.uid + "/" + file.name
    );

    fileRef
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL(); // Get URL of the uploaded file
      })
      .then((url) => {
        updatedData.profilePicUrl = url; // Save URL to the profile data
        return db
          .collection("users")
          .doc(user.uid)
          .set(updatedData, { merge: true });
      })
      .then(() => {
        updateUserInfoDisplay2(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        configure_message_bar(`Error updating your profile.`);
      });
    fileRef
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL(); // Get URL of the uploaded file
      })
      .then((url) => {
        updatedData.profilePicUrl = url; // Save URL to the profile data
        return db
          .collection("users")
          .doc(user.uid)
          .set(updatedData, { merge: true });
      })
      .then(() => {
        updateUserInfoDisplay2(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        configure_message_bar(`Error updating your profile.`);
      });
  } else {
    db.collection("users")
      .doc(user.uid)
      .set(updatedData, { merge: true })
      .then(() => {
        updateUserInfoDisplay2(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
    db.collection("users")
      .doc(user.uid)
      .set(updatedData, { merge: true })
      .then(() => {
        updateUserInfoDisplay2(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  }
}
// have barely edited this just copied it from above to start working on it
// function to update job post info
function updateJobPost(user) {
  const updatedData = {
    name: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value,
    majors: document.getElementById("editMajors").value,
    hometown: document.getElementById("editHometown").value,
    funfact: document.getElementById("editFunFact").value,
    year: document.getElementById("editYearInSchool").value,
    jobExp1: document.getElementById("jobExp1_title").value,
    jobRole1: document.getElementById("jobExp1_desc").value,
    jobExp2: document.getElementById("jobExp2_title").value,
    jobRole2: document.getElementById("jobExp2_desc").value,
  };

  const file = document.getElementById("editProfilePic").files[0];
  if (file && file.type.match("image.*")) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(
      "profilePictures/" + user.uid + "/" + file.name
    );

    fileRef
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL(); // Get URL of the uploaded file
      })
      .then((url) => {
        updatedData.profilePicUrl = url; // Save URL to the profile data
        return db
          .collection("users")
          .doc(user.uid)
          .set(updatedData, { merge: true });
      })
      .then(() => {
        updateUserInfoDisplay(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  } else {
    db.collection("users")
      .doc(user.uid)
      .set(updatedData, { merge: true })
      .then(() => {
        updateUserInfoDisplay(updatedData); // Update UI
        configure_message_bar(`Successfully Updated Profile!`);
      })
      .catch((error) => {
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
          r_e("user_email").innerHTML = auth.currentUser.email;
        } else if (userData.role === "business") {
          toggleSection("businessHomepage");
          configure_navbar(user);
          fetchActivePosts();
          r_e("user_email").innerHTML = auth.currentUser.email;
        } else if (userData.role === "admin") {
          toggleSection("admin");
          configure_navbar(user);
          fetchAdminPostings();
          r_e("user_email").innerHTML = auth.currentUser.email;
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  } else {
    toggleSection("landing"); // User is not signed in
    clearActivePosts();
    configure_navbar(user);
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
      toggleSection("studentHomepage");
      configure_message_bar("Successfully updated student info");
    } else {
      configure_message_bar(`No user logged in!`);
    }
  });

// submitting employer data to firebase
document
  .getElementById("editProfileForm2")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    if (user) {
      updateUserProfile2(user);
      toggleSection("businessHomepage");
      configure_message_bar("Successfully updated employer info");
    } else {
      configure_message_bar(`No user logged in!`);
    }
  });

// filter
document
  .getElementById("filter_form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    fetchJobPostings(); // Call the filtering function
  });

document.getElementById("reset_filters").addEventListener("click", function () {
  // Clear filter form
  document.getElementById("filter_form").reset();

  // Fetch all job postings again
  fetchJobPostings();
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
      configure_message_bar(`Successfully Signed In!`);
      // reset form
      r_e("signin_form").reset();
    })
    .catch((err) => {
      configure_message_bar(
        `Please double check your credentials or create an account!`
      );
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

// add job post from the form to db
document
  .getElementById("employerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the ID of the currently logged-in user
    const currentUserID = firebase.auth().currentUser.uid;

    // Get form values
    const job_title = document.getElementById("job_title").value;
    const company = document.getElementById("company").value;
    const days = Array.from(
      document.querySelectorAll("input[name='days[]']:checked")
    ).map((day) => day.value);
    const description = document.getElementById("description").value;
    const experience = document.getElementById("experience").value;
    const totalhours = parseFloat(document.getElementById("totalhours").value);
    const img_link = document.getElementById("img_link").value;
    const location = document.getElementById("location").value;
    const posted_date = document.getElementById("posted_date").value;
    const wage = parseFloat(document.getElementById("wage").value);

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
        wage: wage,
      })
      .then(() => {
        configure_message_bar(`Job posted successfully!`);
        // Reset form after submission
        document.getElementById("employerForm").reset();

        // Go back to the homepage (assuming you have a function named toggleSection)
        toggleSection("businessHomepage");
      })
      .catch((error) => {
        configure_message_bar(`There was an error when creating your job post`);
      });
  });

//fetching studentuser data
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

//fetching employer user data
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          updateUserInfoDisplay2(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
});
