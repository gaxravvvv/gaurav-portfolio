/**
 * ==========================================================================
 * GAURAV SEHRA - PORTFOLIO INTERACTIVITY SCRIPT
 * Theme: Mechanical Engineering & Technology Portfolio
 * ==========================================================================
 */

// Central Configuration for Quick Editing
const PORTFOLIO_CONFIG = {
  name: "Gaurav",
  course: "B.Tech Mechanical Engineering (1st Year)",
  university: "JECRC University, Jaipur, Rajasthan",
  batch: "2026–2030",
  email: "gaurav.sehra.mecheng@example.com", // [EDITABLE PLACEHOLDER]
  linkedin: "https://linkedin.com/in/your-profile", // [EDITABLE PLACEHOLDER]
  github: "https://github.com/your-username", // [EDITABLE PLACEHOLDER]
  location: "Jaipur, Rajasthan, India"
};

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNavbar();
  initCanvasNodes();
  initTypewriter();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  initPlaceholderHighlighter();
  initCopyActions();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar scroll background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll Spy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    "1st Year B.Tech Student at JECRC University",
    "CAD & 3D Modeling Explorer",
    "Basketball Player & Strategic Gamer",
    "Mechatronics & Robotics Enthusiast",
    "Passionate Problem Solver & Innovator"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseTime = 1800;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. BACKGROUND CANVAS (MECHANICAL NODES & BLUEPRINT GRID)
   ========================================================================== */
function initCanvasNodes() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, maxDist: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Create mechanical node points
  const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw node circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const p2 = nodes[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse pointer
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < mouse.maxDist) {
          const mAlpha = (1 - mdist / mouse.maxDist) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. PROJECT FILTERING
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
const PROJECT_DATA = {
  'portfolio-web': {
    title: "Personal Engineering Portfolio Website",
    category: "Web & Digital Skills",
    tools: ["HTML5 (Semantic)", "CSS3 (Flexbox & Grid)", "Vanilla JavaScript", "HTML5 Canvas API", "Glassmorphism"],
    description: "Designed and developed a modern, high-performance, responsive personal portfolio website with a premium mechanical engineering theme, dark navy background, white text, and electric cyan/blue accents.",
    highlights: [
      "Engineered an interactive HTML5 background canvas rendering floating mechanical kinematic nodes and proximity linkages.",
      "Implemented smooth navigation with an active scroll-spy using IntersectionObserver and responsive mobile drawer.",
      "Built an innovative 'Edit Hints' toggle system that visually highlights all customizable placeholder fields.",
      "Ensured zero-dependency architecture with standalone SVG graphics for 100% offline and cross-browser reliability."
    ],
    status: "Completed & Active (Live Project)"
  },
  'future-cad': {
    title: "3D CAD Modeling & Kinematics [Future Project Placeholder]",
    category: "CAD & Kinematics (Future)",
    tools: ["SolidWorks / AutoCAD", "3D Parametric Modeling", "Kinematic Analysis", "GD&T Standards"],
    description: "Editable placeholder for your upcoming computer-aided design or mechanical simulation project at JECRC University.",
    highlights: [
      "[Placeholder: Enter component modeling dimensions, gear modules, or linkage constraints.]",
      "[Placeholder: Describe kinematic velocity analysis and joint degree-of-freedom calculations.]",
      "[Placeholder: Outline 2D engineering drawing views, section cuts, and tolerance specifications.]",
      "[Placeholder: Note finite element analysis (FEA) or stress concentration factors investigated.]"
    ],
    status: "Editable Placeholder (Ready for your upcoming coursework)"
  },
  'future-robotics': {
    title: "Mechatronics & Robotics Prototype [Future Project Placeholder]",
    category: "Robotics & IoT (Future)",
    tools: ["Arduino / Microcontroller", "Sensors & Actuators", "C / C++ Firmware", "Hardware Prototyping"],
    description: "Editable placeholder for your upcoming mechatronics, robotics, or automated embedded systems project.",
    highlights: [
      "[Placeholder: Interfacing ultrasonic/IR/IMU sensors with microcontrollers.]",
      "[Placeholder: Motor driver PWM calibration and differential steering algorithms.]",
      "[Placeholder: Chassis design, weight balance, and 3D printed mount fabrication.]",
      "[Placeholder: Embedded firmware logic and safety collision interrupt routines.]"
    ],
    status: "Editable Placeholder (Ready for your upcoming prototype)"
  },
  'future-mechanical': {
    title: "Thermal Engineering / Workshop Fabrication [Future Project Placeholder]",
    category: "Thermal & Workshop (Future)",
    tools: ["Lathe Machining", "Thermodynamics", "Heat Transfer Analysis", "Precision Metrology"],
    description: "Editable placeholder for your hands-on workshop manufacturing, lathe machining, or thermal engineering investigation.",
    highlights: [
      "[Placeholder: Spindle speed, depth of cut, and surface finish metrics achieved on center lathe.]",
      "[Placeholder: Dimensional accuracy validation within micrometer/caliper tolerance limits.]",
      "[Placeholder: Heat transfer rate calculations or thermodynamic efficiency evaluations.]",
      "[Placeholder: Workshop safety compliance and chip formation analysis.]"
    ],
    status: "Editable Placeholder (Ready for your upcoming lab practical)"
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalDetailBtns = document.querySelectorAll('[data-project-key]');

  if (!modalBackdrop) return;

  function openModal(key) {
    const data = PROJECT_DATA[key];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.description;
    document.getElementById('modal-status').textContent = data.status;

    // Tools tags
    const toolsContainer = document.getElementById('modal-tools');
    toolsContainer.innerHTML = '';
    data.tools.forEach(tool => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tool;
      toolsContainer.appendChild(tag);
    });

    // Highlights list
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      highlightsContainer.appendChild(li);
    });

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      openModal(key);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. CONTACT FORM & SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in your name, email, and message.");
      return;
    }

    // Compose formatted mailto link
    const mailtoUrl = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject || 'Connecting with Gaurav'}`
    )}&body=${encodeURIComponent(
      `Hi Gaurav,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent via Portfolio Website`
    )}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    showToast("Opening your email client... Message ready to send!");
    form.reset();
  });
}

/* ==========================================================================
   7. COPY ACTIONS & TOAST NOTIFICATION
   ========================================================================== */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('[data-copy-target]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-target');
      copyToClipboard(textToCopy);
      showToast(`Copied to clipboard: "${textToCopy}"`);
    });
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy error', err);
    }
    document.body.removeChild(textArea);
  }
}

function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   8. PLACEHOLDER HIGHLIGHTER TOGGLE (CUSTOMIZATION ASSISTANT)
   ========================================================================== */
function initPlaceholderHighlighter() {
  const toggleBtn = document.getElementById('toggle-placeholders-btn');
  const noticeBar = document.getElementById('placeholder-notice-bar');

  if (!toggleBtn) return;

  // Check saved preference
  const isEnabled = localStorage.getItem('highlightPlaceholders') === 'true';
  if (isEnabled) {
    document.body.classList.add('highlight-placeholders');
    toggleBtn.classList.add('active');
    toggleBtn.innerHTML = '<span>✏️ Hide Hints</span>';
    if (noticeBar) noticeBar.classList.add('visible');
  }

  toggleBtn.addEventListener('click', () => {
    const active = document.body.classList.toggle('highlight-placeholders');
    toggleBtn.classList.toggle('active', active);
    localStorage.setItem('highlightPlaceholders', active);

    if (active) {
      toggleBtn.innerHTML = '<span>✏️ Hide Hints</span>';
      if (noticeBar) noticeBar.classList.add('visible');
      showToast("Placeholders highlighted with dashed amber borders! Click on sections to edit.");
    } else {
      toggleBtn.innerHTML = '<span>✏️ Edit Hints</span>';
      if (noticeBar) noticeBar.classList.remove('visible');
      showToast("Edit hints hidden. Viewing clean portfolio preview.");
    }
  });
}
