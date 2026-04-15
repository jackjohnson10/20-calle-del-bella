/* ===== Navigation Scroll ===== */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ===== Mobile Menu ===== */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link, .mobile-cta').forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== Scroll Reveal ===== */
var reveals = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(function(el) { revealObserver.observe(el); });

/* ===== Gallery Lightbox ===== */
var allPhotos = [];
for (var i = 1; i <= 41; i++) {
  var num = i < 10 ? '0' + i : '' + i;
  allPhotos.push('assets/gallery/photo-' + num + '.jpeg');
}

var lightbox = document.getElementById('lightbox');
var lbImage = document.getElementById('lbImage');
var lbCounter = document.getElementById('lbCounter');
var currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  lbImage.src = allPhotos[currentIndex];
  lbImage.alt = 'Photo ' + (currentIndex + 1) + ' of ' + allPhotos.length;
  lbCounter.textContent = (currentIndex + 1) + ' / ' + allPhotos.length;
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % allPhotos.length;
  updateLightbox();
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
  updateLightbox();
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', nextPhoto);
document.getElementById('lbPrev').addEventListener('click', prevPhoto);

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox || e.target.classList.contains('lb-content')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
});

// Gallery items click
document.querySelectorAll('.gallery-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var index = parseInt(this.getAttribute('data-index'));
    openLightbox(index);
  });
});

// View All Photos button
document.getElementById('viewAllPhotos').addEventListener('click', function() {
  openLightbox(0);
});

/* ===== Renders Carousel ===== */
var rendersScroll = document.getElementById('rendersScroll');
var rendersLeft = document.getElementById('rendersLeft');
var rendersRight = document.getElementById('rendersRight');

rendersRight.addEventListener('click', function() {
  rendersScroll.scrollBy({ left: 600, behavior: 'smooth' });
});
rendersLeft.addEventListener('click', function() {
  rendersScroll.scrollBy({ left: -600, behavior: 'smooth' });
});

/* ===== Contact Form ===== */
var form = document.getElementById('contactForm');
var formStatus = document.getElementById('formStatus');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  formStatus.textContent = 'Sending...';
  formStatus.style.color = 'var(--text-muted)';

  var formData = new FormData(form);
  var data = {};
  formData.forEach(function(value, key) { data[key] = value; });

  fetch('https://formsubmit.co/ajax/jack@posterity44.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function(response) { return response.json(); })
  .then(function(result) {
    if (result.success) {
      formStatus.textContent = 'Thank you. Your inquiry has been sent.';
      formStatus.style.color = 'var(--gold)';
      form.reset();
    } else {
      formStatus.textContent = 'Something went wrong. Please call (928) 202-2720.';
      formStatus.style.color = '#cc6666';
    }
  })
  .catch(function() {
    formStatus.textContent = 'Something went wrong. Please call (928) 202-2720.';
    formStatus.style.color = '#cc6666';
  });
});

/* ===== Smooth scroll for nav links ===== */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 70;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
