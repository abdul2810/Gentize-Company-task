const dropdown = document.querySelector('.nav-dropdown');
const toggle = dropdown?.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown?.querySelector('.dropdown-menu');

toggle?.addEventListener('click', (e) => {
  const isOpen = dropdown.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  dropdownMenu.setAttribute('aria-hidden', String(!isOpen));

  if (window.innerWidth <= 768) {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = mainNav.classList.toggle('open');

  if (window.innerWidth <= 768) {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
});

document.addEventListener('click', (e) => {
  if (!dropdown) return;

  const clickedInsideDropdown = dropdown.contains(e.target);
  const clickedOtherNavLink = [...document.querySelectorAll('.main-nav ul li:not(.nav-dropdown)')].some(item => item.contains(e.target));

  if (!clickedInsideDropdown || clickedOtherNavLink) {
    dropdown.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    dropdownMenu?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
});

// Select all navigation links inside the main nav (including dropdown links)
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

// When a nav link is clicked on mobile
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const mainNav = document.querySelector('.main-nav');
    const dropdown = document.querySelector('.nav-dropdown');

    // Close the mobile menu if open
    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
    }

    // Close the Services dropdown if open
    if (dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      toggle?.setAttribute('aria-expanded', 'false');
      dropdownMenu?.setAttribute('aria-hidden', 'true');
    }

    // Remove body no-scroll to enable background scrolling again
    document.body.classList.remove('no-scroll');
  });
});


//Hero Class Slider
const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active", "exit"));

    slides[i].classList.add("active");
}

function hideSlide(i) {
    slides[i].classList.add("exit");
}

function startSlider() {
    showSlide(index);

    setInterval(() => {
        hideSlide(index);

        setTimeout(() => {
            index = (index + 1) % slides.length;
            showSlide(index);
        }, 1000);

    }, 6000);
}

setTimeout(startSlider, 2000);

document.querySelectorAll(".circle").forEach(circle => {
    let target = parseInt(circle.getAttribute("data-percent"));
    let progressCircle = circle.querySelector("svg circle:last-child");
    let text = circle.querySelector(".circle-text");

    let radius = 45;
    let circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    // Animate stroke from 0 → target%
    setTimeout(() => {
        const offset = circumference - (target / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }, 200);

    // Animate the number (0 → target)
    let count = 0;
    let speed = 20;

    let interval = setInterval(() => {
        if (count < target) {
            count++;
            text.textContent = count + "%";
        } else {
            clearInterval(interval);
        }
    }, speed);
});

document.querySelectorAll('.num').forEach(num => {
    let target = +num.dataset.target;
    let count = 0;
    let speed = 20;

    function update() {
        if (count < target) {
            count++;
            num.textContent = count;
            setTimeout(update, speed);
        }
    }
    update();
});

// add subtle scale-in for hero image
document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.hero-image');
    if (img) {
        img.style.transform = 'translateY(10px) scale(0.98)';
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 700ms';
            img.style.transform = 'translateY(0) scale(1)';
            img.style.opacity = '1';
        }, 120);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const bg = document.querySelector('.consult-bg');
    const left = document.querySelector('.consult-left');
    const form = document.getElementById('consultForm');

    // Fade in background immediately (quick)
    setTimeout(() => bg.classList.add('visible'), 120);

    // After image visible, show left text after 2s
    setTimeout(() => left.classList.add('visible'), 2000);

    // Simple form handling
    form?.addEventListener('submit', function (e) {
        e.preventDefault();
        // basic validation (already required in inputs)
        const name = form.fullname.value.trim();
        const phone = form.phone.value.trim();
        const service = form.service.value;
        const email = form.email.value.trim();

        if (!name || !phone || !service || !email) {
            alert('Please fill all required fields.');
            return;
        }

        // simulate success
        alert('Thank you — your consultation request has been sent.');
        form.reset();
    });
});

// animate counter when visible
const counterEl = document.querySelector('.count');
if (counterEl) {
    const observerCounter = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +counterEl.dataset.target;
                let cur = 0;
                const step = Math.max(1, Math.floor(target / 60));
                const i = setInterval(() => {
                    cur += step;
                    counterEl.textContent = cur >= target ? target : cur;
                    if (cur >= target) clearInterval(i);
                }, 20);
                observerCounter.disconnect();
            }
        });
    }, { threshold: 0.5 });
    observerCounter.observe(counterEl);
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

let idx = 0;
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');

function goTo(i) {
    testimonials.forEach((t, j) => t.classList.toggle('active', j === i));
    idx = i;
}

prevBtn?.addEventListener('click', () => goTo((idx - 1 + testimonials.length) % testimonials.length));
nextBtn?.addEventListener('click', () => goTo((idx + 1) % testimonials.length));

// auto-advance
setInterval(() => goTo((idx + 1) % testimonials.length), 6000);


document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

/* TESTIMONIAL SLIDER — FIXED (no conflict) */
let testSlides = document.querySelectorAll(".testimonial-slide");
let testIndex = 0;

function showTestimonial(i) {
    testSlides.forEach(slide => slide.classList.remove("active"));
    testSlides[i].classList.add("active");
    testIndex = i;
}

document.querySelector(".test-next").onclick = () => {
    testIndex = (testIndex + 1) % testSlides.length;
    showTestimonial(testIndex);
};

document.querySelector(".test-prev").onclick = () => {
    testIndex = (testIndex - 1 + testSlides.length) % testSlides.length;
    showTestimonial(testIndex);
};

/* Auto slide every 5 seconds */
setInterval(() => {
    testIndex = (testIndex + 1) % testSlides.length;
    showTestimonial(testIndex);
}, 5000);

/* ----------------------------------------------------
   SELECTORS
---------------------------------------------------- */
const track = document.querySelector(".carousel-track");
const blogSlides = Array.from(track.children);

let index1 = 0;
let interval = 5000;
let slideInterval;
1
/* ----------------------------------------------------
   CLONE FIRST SLIDE FOR INFINITE LOOP
---------------------------------------------------- */
const firstClone = blogSlides[0].cloneNode(true);
track.appendChild(firstClone);

/* ----------------------------------------------------
   AUTO SLIDE FUNCTION
---------------------------------------------------- */
function autoSlide() {
  index1++;
  track.style.transition = "transform 0.6s ease";
  track.style.transform = `translateX(-${index1 * 100}%)`;

  // When reaching the clone → jump back to slide 1
  if (index1 === blogSlides.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index1 = 0;
      track.style.transform = "translateX(0)";
    }, 600);
  }
}

/* ----------------------------------------------------
   START AUTO SLIDE
---------------------------------------------------- */
slideInterval = setInterval(autoSlide, interval);

/* ----------------------------------------------------
   MANUAL — NEXT BUTTON
---------------------------------------------------- */
document.querySelector(".next").addEventListener("click", () => {
  clearInterval(slideInterval);

  autoSlide(); // move to next slide manually

  slideInterval = setInterval(autoSlide, interval); // restart auto
});

/* ----------------------------------------------------
   MANUAL — PREVIOUS BUTTON
---------------------------------------------------- */
document.querySelector(".prev").addEventListener("click", () => {
  clearInterval(slideInterval);

  if (index1 === 0) {
    index1 = blogSlides.length;
    track.style.transition = "none";
    track.style.transform = `translateX(-${index1 * 100}%)`;
  }

  setTimeout(() => {
    index1--;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index1 * 100}%)`;
  }, 20);

  slideInterval = setInterval(autoSlide, interval);
});
