/* ==========================================================================
   NAVALHA DE OURO — LANDING PAGE
   Índice:
   1. Menu mobile (off-canvas)
   2. Header: sombra ao rolar + navegação ativa (scrollspy)
   3. Botão "voltar ao topo"
   4. Revelação de elementos ao rolar (IntersectionObserver)
   5. Contadores animados (faixa de estatísticas)
   6. Filtro da galeria
   7. Lightbox da galeria
   8. Slider de depoimentos
   9. Formulário de contato -> WhatsApp
   10. Diversos (ano no rodapé)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Menu mobile ---------- */
  (function mobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    if (!hamburger || !menu || !backdrop) return;

    function openMenu() {
      menu.classList.add('is-open');
      backdrop.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    backdrop.addEventListener('click', closeMenu);

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
  })();

  /* ---------- 2. Header ao rolar + link ativo ---------- */
  (function headerScroll() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function onScroll() {
      if (window.scrollY > 12) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => spy.observe(section));
  })();

  /* ---------- 3. Voltar ao topo ---------- */
  (function backToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  })();

  /* ---------- 4. Revelação ao rolar ---------- */
  (function scrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach((el) => observer.observe(el));
  })();

  /* ---------- 5. Contadores animados ---------- */
  (function statCounters() {
    const nums = document.querySelectorAll('.stat__num');
    if (!nums.length) return;

    function animateCount(el) {
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.count.split('.')[1] || '').length;
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
      }

      if (prefersReducedMotion) {
        el.textContent = decimals ? target.toFixed(decimals) : target;
      } else {
        requestAnimationFrame(tick);
      }
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(animateCount);
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    nums.forEach((el) => observer.observe(el));
  })();

  /* ---------- 6. Filtro da galeria ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));

  (function galleryFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (!buttons.length || !galleryItems.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;
        galleryItems.forEach((item) => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('is-hidden', !match);
        });
      });
    });
  })();

  /* ---------- 7. Lightbox da galeria ---------- */
  (function galleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const imageEl = document.getElementById('lightboxImage');
    const captionEl = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const backdrop = document.getElementById('lightboxBackdrop');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (!lightbox || !galleryItems.length) return;

    let currentIndex = 0;

    function visibleItems() {
      return galleryItems.filter((item) => !item.classList.contains('is-hidden'));
    }

    function render() {
      const items = visibleItems();
      const item = items[currentIndex];
      if (!item) return;
      const caption = item.dataset.caption || '';
      const toneClass = Array.from(item.classList).find((c) => c.startsWith('tone-')) || '';
      imageEl.className = 'lightbox__image ' + toneClass;
      imageEl.innerHTML = `<span>${item.querySelector('span').innerHTML}</span>`;
      captionEl.textContent = caption;
    }

    function open(index) {
      currentIndex = index;
      render();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function step(delta) {
      const items = visibleItems();
      currentIndex = (currentIndex + delta + items.length) % items.length;
      render();
    }

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const items = visibleItems();
        open(items.indexOf(item));
      });
    });

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  })();

  /* ---------- 8. Slider de depoimentos ---------- */
  (function testimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    const track = document.getElementById('testimonialTrack');
    const dotsWrap = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    if (!slider || !track) return;

    const slides = Array.from(track.children);
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function startAutoplay() {
      if (prefersReducedMotion) return;
      stopAutoplay();
      timer = setInterval(next, 5500);
    }
    function stopAutoplay() { if (timer) clearInterval(timer); }

    nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    goTo(0);
    startAutoplay();
  })();

  /* ---------- 9. Formulário de contato -> WhatsApp ---------- */
  (function contactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    if (!form) return;

    const WHATSAPP_NUMBER = '5521971237725';

    const validators = {
      name: (value) => value.trim().length >= 2,
      phone: (value) => value.replace(/\D/g, '').length >= 10,
      service: (value) => value.trim().length > 0
    };

    function setInvalid(field, invalid) {
      const wrapper = field.closest('.field');
      if (wrapper) wrapper.classList.toggle('is-invalid', invalid);
    }

    function validateField(field) {
      const check = validators[field.name];
      if (!check) return true;
      const valid = check(field.value);
      setInvalid(field, !valid);
      return valid;
    }

    ['name', 'phone', 'service'].forEach((fieldName) => {
      const field = form.elements[fieldName];
      if (field) field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = ['name', 'phone', 'service'].map((n) => form.elements[n]);
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        feedback.textContent = 'Revise os campos destacados antes de enviar.';
        feedback.style.color = '#7B2D3B';
        return;
      }

      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      const service = form.elements.service.value;
      const message = form.elements.message.value.trim();

      const text = [
        `Olá! Meu nome é ${name}.`,
        `Tenho interesse em: ${service}.`,
        `Meu telefone: ${phone}.`,
        message ? `Mensagem: ${message}` : null
      ].filter(Boolean).join('\n');

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      feedback.textContent = 'Perfeito! Abrindo o WhatsApp para você confirmar o envio...';
      feedback.style.color = '#2F7D46';

      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  })();

  /* ---------- 10. Diversos ---------- */
  (function misc() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();

});
