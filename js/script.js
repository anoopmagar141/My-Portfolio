document.addEventListener("DOMContentLoaded", () => {
  // Apply the saved theme immediately when the DOM is ready
  applySavedTheme(); 
  displayGreeting();
  initHamburgerMenu();
  initProjectDetailsToggle();
  attachEventListeners();
});

//  Toggle Dark/Light Mode
function toggleMode() {
  const body = document.body;
  const icon = document.getElementById("mode-icon");

  if (!icon) return;

  // Toggle dark mode on the body
  const isDarkMode = body.classList.toggle("dark-mode");

  // Toggle the icon between sun and moon based on the mode
  icon.classList.toggle("fa-sun", !isDarkMode);
  icon.classList.toggle("fa-moon", isDarkMode);

  // Save the theme preference in localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

//  Apply Saved Theme Preference
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const body = document.body;
  const icon = document.getElementById("mode-icon");

  // Immediately apply the saved theme by adding the class
  body.classList.toggle("dark-mode", savedTheme === "dark");

  // Update the icon based on the saved theme
  if (icon) {
    icon.classList.toggle("fa-sun", savedTheme !== "dark");
    icon.classList.toggle("fa-moon", savedTheme === "dark");
  }
}

//  Add event listener to the mode toggle button
document.getElementById("mode-toggle").addEventListener("click", toggleMode);

// Apply saved theme on page load
window.addEventListener("load", applySavedTheme);

//  Display Greeting Based on Time
function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    const hour = new Date().getHours();
    greetingElement.textContent =
      hour < 12 ? "Good morning!" :
      hour < 18 ? "Good afternoon!" :
      "Good evening!";
  }
}

//  Hamburger Menu Toggle
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
}

// 🛠 Expand Project Details on Click
function initProjectDetailsToggle() {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", function () {
      this.classList.toggle("active");

      const projectURL = this.getAttribute("data-url");
      if (projectURL) {
        window.location.href = projectURL;
      }
    });
  });
}

//  Message Sending Simulation
function sendMessage() {
  const messageBox = document.getElementById("chat-box");
  const message = messageBox.value.trim();

  if (message) {
    alert(`Message sent: ${message}`);
    messageBox.value = "";
  } else {
    alert("Please type a message.");
  }
}

//  Attach Event Listeners
function attachEventListeners() {
  const modeToggleBtn = document.getElementById("mode-toggle");
  if (modeToggleBtn) {
    modeToggleBtn.addEventListener("click", toggleMode);
  }

  const socialToggle = document.querySelector(".social-toggle");
  const socialLinks = document.querySelector(".social-links");
  if (socialToggle && socialLinks) {
    socialToggle.addEventListener("click", () => socialLinks.classList.toggle("active"));
  }
}



document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.querySelector('.video-overlay');
  
  // This function will handle the fade-in animation
  setTimeout(function() {
    overlay.style.opacity = 1; // Ensure the overlay is visible after loading
  }, 500); // Delay the fade-in for smooth appearance
});




document.addEventListener("DOMContentLoaded", () => {
  // Call the function to initialize the chart
  initSkillsChart();
});

// Function to initialize the chart
function initSkillsChart() {
  const ctx = document.getElementById('skillsChart').getContext('2d');
// Updated Chart data with all 16 skills
const data = {
  labels: [
    'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Python', 'Git', 'Docker', 
    'SQL', 'Java', 'Bootstrap', 'Angular', 'figma', 'GitHub', 'Laravel', 'NPM'
  ],
  datasets: [{
    label: 'Skill Proficiency',
    data: [95, 90, 80, 75, 74, 78, 95, 90, 75, 80, 74, 90, 90, 90, 78, 75], // Example proficiency values (in percentage)
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
};

  // Chart options
  const options = {
    responsive: true,
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100, // max proficiency
        stepSize: 10
      }
    }
  };

  // Create the chart
  new Chart(ctx, {
    type: 'radar', // Choose chart type (radar, bar, etc.)
    data: data,
    options: options
  });
}

// circular ring
document.addEventListener("DOMContentLoaded", function() {
  const progressRings = document.querySelectorAll('.progress-ring');

  progressRings.forEach(function(ring) {
    const value = ring.getAttribute('data-value');
    const circle = ring.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;

    const offset = circumference - (circumference * value) / 100;
    circle.style.strokeDashoffset = offset;

    // Toggle the display of the percentage on click
    ring.addEventListener('click', function() {
      const percentageDisplay = ring.querySelector('h3');
      if (percentageDisplay.style.display === "none" || percentageDisplay.style.display === "") {
        percentageDisplay.style.display = "block";
      } else {
        percentageDisplay.style.display = "none";
      }
    });

    // Display tooltip with skill name and proficiency
    const skillName = ring.querySelector('h3').innerText;
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = `${skillName}: ${value}%`;
    ring.appendChild(tooltip);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.getElementById('navbar'); // Assuming the navbar has this id
  const sections = document.querySelectorAll('section'); // All sections on the page

  // Add event listener to each nav link to handle click and smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default behavior of the anchor tag

      // Remove the active class from all links
      navLinks.forEach(link => link.classList.remove('active-section'));

      // Add the active class to the clicked link
      this.classList.add('active-section');

      // Scroll to the target section
      const targetId = this.getAttribute('href').substring(1); // Extract section id
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
        const targetPosition = targetSection.offsetTop - navbarHeight; // Adjust position

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active link based on scroll position
  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Highlight the active section link in the navbar
    navLinks.forEach(link => {
      link.classList.remove('active-section');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active-section');
      }
    });
  });
});
