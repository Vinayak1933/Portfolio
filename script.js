/**
 * PORTFOLIO BY VINAYAK — JAVASCRIPT CORE
 * 
 * Modular, vanilla JavaScript implementation:
 * 1. Configuration & Content Registry
 * 2. Interactive Three.js 3D Visual Centerpiece (with performance guards & fallback)
 * 3. Navigation & Mobile Drawer
 * 4. IntersectionObserver Scroll Animations & Active Nav Tracking
 * 5. Project Details Modal Dialog
 * 6. Resume Modal & Document Verifier
 * 7. Contact Form Handling & Validation
 * 8. Toast Notification Utility
 */

'use strict';

/* ==========================================================================
   1. CONFIGURATION & CONTENT REGISTRY
   Easily update personal links, documents, and contact handles here.
   ========================================================================== */
const CONFIG = {
  profile: {
    name: 'Vinayak',
    title: 'Computer Science & AI Student',
    university: 'Rishihood University',
    location: 'Sonipat, Haryana, India'
  },
  contact: {
    // Exact verified Instagram profile
    instagram: 'https://www.instagram.com/vinayak_k31/',
    
    // Set email when available. If empty or null, contact features gracefully
    // guide visitors to Instagram or the interactive message preparer.
    email: '', 
    
    // Set GitHub and LinkedIn URLs when available.
    // They remain hidden automatically until valid URLs are provided.
    github: '', 
    linkedin: '',
    
    // Optional backend form endpoint (e.g. Formspree / EmailJS / custom server).
    // When empty, the form drafts an email directly in the user's mail client.
    formEndpoint: ''
  },
  resume: {
    // Relative or absolute path to resume PDF placed in root directory
    filePath: 'resume.pdf'
  }
};

/* ==========================================================================
   2. DOM READY INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initDynamicYear();
  initContactChannels();
  initNavbarBehavior();
  initMobileMenu();
  initScrollSpyAndReveals();
  initProjectModal();
  initResumeModal();
  initContactForm();
  initThreeJsHeroVisual();
});

/* ==========================================================================
   3. DYNAMIC CONTENT & SOCIAL CHANNELS
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initContactChannels() {
  // 1. Email display & copy button
  const displayEmailText = document.getElementById('display-email-text');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (CONFIG.contact.email && CONFIG.contact.email.trim() !== '') {
    if (displayEmailText) {
      displayEmailText.textContent = CONFIG.contact.email;
    }
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(CONFIG.contact.email)
          .then(() => showToast('Email copied to clipboard!'))
          .catch(() => showToast(`Contact: ${CONFIG.contact.email}`));
      });
    }
  } else {
    if (displayEmailText) {
      displayEmailText.textContent = 'Contact via Form / Instagram';
    }
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
          showToast('Please submit an inquiry via the form below or on Instagram.');
        }
      });
    }
  }

  // 2. GitHub channel
  const githubLink = document.getElementById('github-channel-link');
  if (githubLink && CONFIG.contact.github && CONFIG.contact.github.trim() !== '') {
    githubLink.href = CONFIG.contact.github;
    githubLink.classList.remove('hidden-channel');
  }

  // 3. LinkedIn channel
  const linkedinLink = document.getElementById('linkedin-channel-link');
  if (linkedinLink && CONFIG.contact.linkedin && CONFIG.contact.linkedin.trim() !== '') {
    linkedinLink.href = CONFIG.contact.linkedin;
    linkedinLink.classList.remove('hidden-channel');
  }
}

/* ==========================================================================
   4. NAVIGATION & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbarBehavior() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial state
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const backdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu || !backdrop) return;

  const openMenu = () => {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   5. SCROLL SPY & REVEAL ANIMATIONS
   ========================================================================== */
function initScrollSpyAndReveals() {
  // A. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: immediately show all if observer is unsupported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // B. Active Nav Link Tracking (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      threshold: 0.35
    });

    sections.forEach(section => spyObserver.observe(section));
  }
}

/* ==========================================================================
   6. THREE.JS INTERACTIVE 3D VISUAL (HERO CENTERPIECE)
   With WebGL verification, responsive resizing, mouse parallax, and fallback
   ========================================================================== */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function initThreeJsHeroVisual() {
  const canvas = document.getElementById('hero-canvas');
  const fallback = document.getElementById('canvas-fallback');
  const container = document.getElementById('visual-wrapper');

  if (!canvas || !container) return;

  // Verify WebGL and Three.js availability
  if (!isWebGLAvailable() || typeof THREE === 'undefined') {
    // Keep kinetic CSS fallback active
    return;
  }

  // Check user reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let scene, camera, renderer;
  let coreMesh, wireframeMesh, particleSystem, ring1, ring2;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let isVisible = true;
  let animationFrameId;

  try {
    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLightCyan.position.set(5, 5, 5);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0x818cf8, 2, 50);
    pointLightPurple.position.set(-5, -5, -3);
    scene.add(pointLightPurple);

    // 5. Geometric Polyhedron (Nucleus)
    // Inner Solid Core
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0e1c38,
      emissiveIntensity: 0.5
    });
    coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer Glowing Wireframe Lattice
    const wireframeGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    scene.add(wireframeMesh);

    // 6. Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.5
    });
    ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.3, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.4
    });
    ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 7. Particle Constellation
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Distribute particles randomly in a spherical shell
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.045,
      transparent: true,
      opacity: 0.75
    });

    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Three.js successfully initialized: fade out the CSS fallback
    if (fallback) {
      fallback.classList.add('loaded-three');
    }

    // 8. Mouse & Pointer Parallax
    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      // Normalize between -1 and 1
      mouseX = (clientX / rect.width) * 2 - 1;
      mouseY = -(clientY / rect.height) * 2 + 1;

      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.5;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });

    // 9. Window Resize Handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener('resize', onResize, { passive: true });

    // 10. IntersectionObserver to pause rendering when offscreen
    if ('IntersectionObserver' in window) {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animationFrameId) {
              animate();
            }
          });
        }, { threshold: 0.05 });
        heroObserver.observe(heroSection);
      }
    }

    // 11. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle spin (if reduced motion is not requested)
      if (!prefersReducedMotion) {
        const baseSpeed = 0.35;
        coreMesh.rotation.y += baseSpeed * delta;
        coreMesh.rotation.x += (baseSpeed * 0.6) * delta;

        wireframeMesh.rotation.y += (baseSpeed * 1.2) * delta;
        wireframeMesh.rotation.x -= (baseSpeed * 0.8) * delta;

        ring1.rotation.z += 0.2 * delta;
        ring2.rotation.z -= 0.15 * delta;

        particleSystem.rotation.y += 0.08 * delta;

        // Gentle breathing pulsation
        const pulse = Math.sin(elapsedTime * 1.5) * 0.04;
        wireframeMesh.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      }

      // Smooth interpolation towards cursor parallax target
      coreMesh.rotation.y += (targetRotationY - coreMesh.rotation.y) * 0.03;
      coreMesh.rotation.x += (targetRotationX - coreMesh.rotation.x) * 0.03;
      wireframeMesh.rotation.y += (targetRotationY - wireframeMesh.rotation.y) * 0.03;
      wireframeMesh.rotation.x += (targetRotationX - wireframeMesh.rotation.x) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

  } catch (error) {
    console.warn('Three.js scene initialization failed, falling back to CSS animation:', error);
    if (fallback) {
      fallback.classList.remove('loaded-three');
    }
  }
}

/* ==========================================================================
   7. PROJECT DETAILS MODAL
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const openBtn = document.getElementById('open-project-modal-btn');
  const closeBtn = document.getElementById('close-project-modal-btn');
  const dismissBtn = document.getElementById('modal-dismiss-btn');

  if (!modal || !openBtn) return;

  let previousActiveElement = null;

  const openModal = () => {
    previousActiveElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop outside dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. RESUME MODAL & DOCUMENT VERIFIER
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const footerResumeBtn = document.getElementById('footer-resume-btn');
  const closeBtn = document.getElementById('close-resume-modal-btn');
  const dismissBtn = document.getElementById('resume-dismiss-btn');
  const toContactBtn = document.getElementById('resume-to-contact-btn');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const handleResumeClick = (e) => {
    e.preventDefault();

    // Check if resume.pdf exists by sending a lightweight HEAD request
    fetch(CONFIG.resume.filePath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // File exists: trigger download or open in new tab
          window.open(CONFIG.resume.filePath, '_blank', 'noopener,noreferrer');
        } else {
          // File does not exist yet: display informational modal
          openModal();
        }
      })
      .catch(() => {
        // Network or file protocol fallback: display informational modal
        openModal();
      });
  };

  if (navResumeBtn) navResumeBtn.addEventListener('click', handleResumeClick);
  if (footerResumeBtn) footerResumeBtn.addEventListener('click', handleResumeClick);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  if (toContactBtn) {
    toContactBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. CONTACT FORM HANDLING & VALIDATION
   Truthful behavior: validates fields and prepares mail client or backend submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const subjectInput = document.getElementById('message-subject');
  const messageInput = document.getElementById('message-body');
  const feedbackEl = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorId, condition) => {
    const errorEl = document.getElementById(errorId);
    if (!condition) {
      input.classList.add('is-invalid');
      if (errorEl) errorEl.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('visible');
      return true;
    }
  };

  // Real-time input clearing on change
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) {
        field.classList.remove('is-invalid');
        const err = form.querySelector(`#${field.id.replace('sender-', '').replace('message-', '')}-error`);
        if (err) err.classList.remove('visible');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate inputs
    const isNameValid = validateField(nameInput, 'name-error', nameInput.value.trim().length > 1);
    const isEmailValid = validateField(emailInput, 'email-error', emailRegex.test(emailInput.value.trim()));
    const isSubjectValid = validateField(subjectInput, 'subject-error', subjectInput.value.trim().length > 2);
    const isMessageValid = validateField(messageInput, 'message-error', messageInput.value.trim().length > 5);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      if (feedbackEl) {
        feedbackEl.className = 'form-feedback error';
        feedbackEl.textContent = 'Please review the highlighted fields before sending.';
      }
      return;
    }

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Check if an external API endpoint is configured
    if (CONFIG.contact.formEndpoint && CONFIG.contact.formEndpoint.trim() !== '') {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(CONFIG.contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: senderName, email: senderEmail, subject: subject, message: message })
      })
      .then(res => {
        if (res.ok) {
          feedbackEl.className = 'form-feedback success';
          feedbackEl.textContent = 'Thank you! Your message has been sent successfully.';
          form.reset();
        } else {
          throw new Error('Endpoint returned error');
        }
      })
      .catch(() => {
        feedbackEl.className = 'form-feedback error';
        feedbackEl.textContent = 'Network error. Please try reaching out directly via Instagram.';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Draft &amp; Send Message</span>`;
      });

    } else {
      // Default: Prepare formatted mailto link
      // Constructs a clean, prefilled mail client request with verified details
      const recipient = CONFIG.contact.email && CONFIG.contact.email.trim() !== '' 
        ? CONFIG.contact.email 
        : '';

      const bodyText = `Hi Vinayak,\n\n${message}\n\nFrom: ${senderName}\nContact Email: ${senderEmail}`;
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      // Open user's email client
      window.location.href = mailtoUrl;

      if (feedbackEl) {
        feedbackEl.className = 'form-feedback success';
        feedbackEl.innerHTML = `
          <strong>Draft created!</strong> Opening your email client to send this message.<br>
          <em>You can also connect directly with Vinayak on Instagram at <strong>@vinayak_k31</strong>.</em>
        `;
      }

      showToast('Opening your default email client...');
    }
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout;
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('visible');
  toast.setAttribute('aria-hidden', 'false');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
    toast.setAttribute('aria-hidden', 'true');
  }, duration);
}

