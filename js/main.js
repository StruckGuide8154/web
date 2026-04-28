/* ============================================================
   MAN VS MAN BARBERS — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav scroll ── */
  const nav = document.querySelector('.nav');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 70);
    scrollTopBtn?.classList.toggle('show', y > 400);
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ── Hamburger / mobile menu ── */
  const burger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  burger?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      burger?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Fade-up observer ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* ── Newsletter submit ── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value?.trim();
      if (email) {
        form.innerHTML = '<p class="newsletter-success">You\'re on the list. We\'ll be in touch. ✓</p>';
      }
    });
  });

  /* ── Contact form submit ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      contactForm.innerHTML = `
        <div style="padding:3rem;text-align:center;background:var(--grey-dark);">
          <p style="color:var(--gold);font-family:var(--font-h);font-size:1.5rem;margin-bottom:0.75rem;">Message Received</p>
          <p style="color:var(--white-dim);">Thanks for getting in touch. Mohammad will get back to you within 24 hours.</p>
        </div>`;
    });
  }

  /* ── Gallery lightbox ── */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');

  document.querySelectorAll('.gal-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = item.dataset.src || item.querySelector('img')?.src || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox?.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });

  /* ── Active nav link ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Shop filter buttons ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.product-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── Gallery filters ── */
  const galFilterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  galFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.gal-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

})();
