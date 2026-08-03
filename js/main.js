document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const faqItems = document.querySelectorAll('.faq-item');
  const slider = document.querySelector('.slider-control');
  const afterContainer = document.querySelector('.after-container');
  const sliderLine = document.querySelector('.slider-line');
  const sliderButton = document.querySelector('.slider-button');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const closeLightbox = document.querySelector('.close-lightbox');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  const syncSlider = (value) => {
    if (!afterContainer || !sliderLine || !sliderButton) return;
    afterContainer.style.width = `${value}%`;
    sliderLine.style.left = `${value}%`;
    sliderButton.style.left = `${value}%`;
  };

  if (slider && afterContainer) {
    syncSlider(slider.value);
    slider.addEventListener('input', (e) => syncSlider(e.target.value));
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
      const expanded = menuToggle.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', String(expanded));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const b = i.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (lightbox && lightboxImg && closeLightbox) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Expanded repair photo';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const close = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    };

    closeLightbox.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) close();
    });
  }
});
