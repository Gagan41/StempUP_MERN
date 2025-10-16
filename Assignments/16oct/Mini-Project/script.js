console.log("✅ script.js loaded successfully!");

// ---------- Global Welcome Banner ----------
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) {
    const banner = document.createElement("div");
    banner.style.background = "#3949ab";
    banner.style.color = "white";
    banner.style.padding = "0.6rem";
    banner.style.fontWeight = "bold";
    banner.style.textAlign = "center";
    banner.style.borderBottom = "3px solid #1a237e";
    banner.textContent = getPageMessage();
    header.after(banner);
  }
});

// Helper to show page-specific banner text
function getPageMessage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("services")) return "💼 Explore our top services!";
  if (path.includes("investors")) return "📈 Investor Zone – Get Started Today!";
  return "🌟 Welcome to Our Homepage!";
}

// ---------- Mission Toggle (Home Only) ----------
const missionSection = document.querySelector("#mission-heading");
if (missionSection) {
  missionSection.addEventListener("click", () => {
    missionSection.textContent =
      missionSection.textContent === "Our Mission"
        ? "Our Vision for the Future"
        : "Our Mission";
  });
}

// ---------- Hero Image Hover Effect ----------
const heroImage = document.querySelector("img[alt='Hero Image']");
if (heroImage) {
  heroImage.addEventListener("mouseenter", () => {
    heroImage.style.transform = "scale(1.05)";
    heroImage.style.transition = "transform 0.3s ease";
  });
  heroImage.addEventListener("mouseleave", () => {
    heroImage.style.transform = "scale(1)";
  });
}

// ---------- Dynamic Testimonials ----------
const testimonials = [
  "“Excellent quality and great service!”",
  "“They delivered more than promised!”",
  "“Absolutely recommend to everyone.”",
];

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");
  if (footer) {
    const testimonialSection = document.createElement("section");
    testimonialSection.innerHTML = "<h2>Client Testimonials</h2>";
    const ul = document.createElement("ul");
    testimonials.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    testimonialSection.appendChild(ul);
    footer.before(testimonialSection);
  }
});

// ---------- Smooth Scroll ----------
document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ---------- Footer Live Clock ----------
const footerPara = document.querySelector("footer p");
if (footerPara) {
  setInterval(() => {
    const now = new Date();
    footerPara.textContent = `© ${now.getFullYear()} ApexCorp Global | Time: ${now.toLocaleTimeString()}`;
  }, 1000);
}
