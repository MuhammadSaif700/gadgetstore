// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Active Navigation Link on Scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Contact Form Submission with Web3Forms
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const messageDiv = document.getElementById("form-message");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    messageDiv.innerHTML = "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        messageDiv.innerHTML =
          '<p style="color: #00d4ff; font-weight: 600;">✓ Thank you! Your message has been sent successfully.</p>';
        contactForm.reset();
      } else {
        messageDiv.innerHTML =
          '<p style="color: #ff4444; font-weight: 600;">✗ Something went wrong. Please try again.</p>';
      }
    } catch (error) {
      messageDiv.innerHTML =
        '<p style="color: #ff4444; font-weight: 600;">✗ Network error. Please check your connection.</p>';
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Animation on Scroll (Simple Implementation)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".feature-card, .product-card, .service-card, .gallery-item"
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Add loading class to body when page loads
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Set initial body opacity
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";
