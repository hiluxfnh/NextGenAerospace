// DOM Elements
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const langButtons = document.querySelectorAll(".lang-btn");
const fontControlBtn = document.getElementById("font-control-btn");
const fontControls = document.getElementById("font-controls");
const fontButtons = document.querySelectorAll(".font-btn");
const contrastBtn = document.getElementById("contrast-btn");
const dyslexiaBtn = document.getElementById("dyslexia-btn");
const ttsBtn = document.getElementById("tts-btn");
const aiBubble = document.getElementById("ai-bubble");
const aiChat = document.getElementById("ai-chat");
const closeChat = document.getElementById("close-chat");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendMessage = document.getElementById("send-message");
const highlightCards = document.querySelectorAll(".highlight-card");
const counterNumbers = document.querySelectorAll(".counter-number");
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card[data-category]");

// Navigation
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");

    // Update active nav link
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");

    // Show target page
    pages.forEach((page) => {
      page.classList.remove("active");
      if (page.id === targetPage) {
        page.classList.add("active");
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// Highlight cards navigation
highlightCards.forEach((card) => {
  card.addEventListener("click", () => {
    const targetPage = card.getAttribute("data-page");

    // Update active nav link
    navLinks.forEach((nav) => {
      nav.classList.remove("active");
      if (nav.getAttribute("data-page") === targetPage) {
        nav.classList.add("active");
      }
    });

    // Show target page
    pages.forEach((page) => {
      page.classList.remove("active");
      if (page.id === targetPage) {
        page.classList.add("active");
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// Language Toggle
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    langButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // In a real implementation, this would change all text content
    alert(
      `Language switched to ${button.textContent}. In a full implementation, all text would be translated.`
    );
  });
});

// Font Controls
fontControlBtn.addEventListener("click", () => {
  fontControls.classList.toggle("active");
});

fontButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const size = button.getAttribute("data-size");

    switch (size) {
      case "small":
        document.documentElement.style.setProperty("--font-size", "14px");
        break;
      case "normal":
        document.documentElement.style.setProperty("--font-size", "16px");
        break;
      case "large":
        document.documentElement.style.setProperty("--font-size", "18px");
        break;
    }

    // Apply to all elements
    document.body.style.fontSize = `var(--font-size)`;
  });
});

// High Contrast Mode
contrastBtn.addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
  contrastBtn.textContent = document.body.classList.contains("high-contrast")
    ? "C✓"
    : "C";
});

// Dyslexia-Friendly Mode
dyslexiaBtn.addEventListener("click", () => {
  document.body.classList.toggle("dyslexia-friendly");
  dyslexiaBtn.textContent = document.body.classList.contains(
    "dyslexia-friendly"
  )
    ? "D✓"
    : "D";
});

// Text-to-Speech
let ttsActive = false;
let ttsUtterance = null;

ttsBtn.addEventListener("click", () => {
  if (!ttsActive) {
    // Get current page content
    const activePage = document.querySelector(".page.active");
    const pageTitle = activePage.querySelector("h1").textContent;
    const pageContent = Array.from(activePage.querySelectorAll("p"))
      .map((p) => p.textContent)
      .join(". ");

    const textToRead = `${pageTitle}. ${pageContent}`;

    // Check if browser supports speech synthesis
    if ("speechSynthesis" in window) {
      ttsUtterance = new SpeechSynthesisUtterance(textToRead);
      window.speechSynthesis.speak(ttsUtterance);
      ttsBtn.classList.add("tts-active");
      ttsActive = true;

      // Reset when speech ends
      ttsUtterance.onend = () => {
        ttsBtn.classList.remove("tts-active");
        ttsActive = false;
      };
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  } else {
    // Stop speech
    window.speechSynthesis.cancel();
    ttsBtn.classList.remove("tts-active");
    ttsActive = false;
  }
});

// AI Assistant
aiBubble.addEventListener("click", () => {
  aiChat.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
  aiChat.classList.remove("active");
});

// AI Responses
const aiResponses = {
  greeting: "Hello! I'm your NextGen AI assistant. How can I help you today?",
  courses:
    "We offer courses for all levels - from Nyota Junior for kids to Sayari Pro for professionals. Check our Courses page for details!",
  programs:
    "We have three main programs: Nyota Junior for kids, Sayari Pro for youth/professionals, and Orbit Lady for women in STEM.",
  contact:
    "You can reach us through our Contact page or email info@nextgenaerospace.africa",
  default:
    "I'm sorry, I don't have an answer for that yet. Please contact our team for more specific questions.",
};

sendMessage.addEventListener("click", () => {
  sendUserMessage();
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendUserMessage();
  }
});

function sendUserMessage() {
  const message = chatInput.value.trim();
  if (message) {
    // Add user message to chat
    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user-message");
    userMessage.textContent = message;
    chatBody.appendChild(userMessage);

    // Clear input
    chatInput.value = "";

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Generate AI response after a short delay
    setTimeout(() => {
      let response = aiResponses.default;

      if (
        message.toLowerCase().includes("hello") ||
        message.toLowerCase().includes("hi")
      ) {
        response = aiResponses.greeting;
      } else if (message.toLowerCase().includes("course")) {
        response = aiResponses.courses;
      } else if (message.toLowerCase().includes("program")) {
        response = aiResponses.programs;
      } else if (message.toLowerCase().includes("contact")) {
        response = aiResponses.contact;
      }

      const aiMessage = document.createElement("div");
      aiMessage.classList.add("chat-message", "ai-message");
      aiMessage.textContent = response;
      chatBody.appendChild(aiMessage);

      // Scroll to bottom
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }
}

// Animated Counter
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
}

// Initialize counters when page loads
window.addEventListener("load", () => {
  animateCounter(document.getElementById("kids-counter"), 12500);
  animateCounter(document.getElementById("courses-counter"), 47);
  animateCounter(document.getElementById("women-counter"), 3200);
  animateCounter(document.getElementById("countries-counter"), 18);
  animateCounter(document.getElementById("community-counter"), 28500);
});

// Course Filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active filter button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    // Show/hide courses based on filter
    courseCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Footer navigation
const footerLinks = document.querySelectorAll(".footer-links a");
footerLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");

    if (targetPage) {
      // Update active nav link
      navLinks.forEach((nav) => {
        nav.classList.remove("active");
        if (nav.getAttribute("data-page") === targetPage) {
          nav.classList.add("active");
        }
      });

      // Show target page
      pages.forEach((page) => {
        page.classList.remove("active");
        if (page.id === targetPage) {
          page.classList.add("active");
        }
      });

      // Scroll to top
      window.scrollTo(0, 0);
    }
  });
});
