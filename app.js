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
  navbar.className =
    sectionId === "landing" ? "navbar is-primary" : "navbar is-info";
}

// Call this function when the content is loaded to show active section
document.addEventListener("DOMContentLoaded", (event) => {
  // Initially show only show the landing page
  toggleSection("landing");
});
