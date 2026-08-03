document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const slider = document.querySelector('.slider-control');
  const afterContainer = document.querySelector('.after-container');
  const sliderLine = document.querySelector('.slider-line');
  const sliderButton = document.querySelector('.slider-button');
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox img');
  const closeLightbox = document.querySelector('.close-lightbox');
  const faqItems = document.querySelectorAll('.faq-item');

  const syncSlider = (value) => {
    const v = Math.max(0, Math.min(100, Number(value) || 0));
    if (afterContainer) afterContainer.style.width = `${v}%`;
    if (sliderLine) sliderLine.style.left = `${v}%`;
    if (sliderButton) sliderButton.style.left = `${v}%`;
  };

  if (slider) {
    syncSlider(slider.value);
    slider.addEventListener('input', (e) => syncSlider(e.target.value));
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuButton.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(menuButton.classList.contains('open')));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuButton.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((other) => other.classList.remove('active'));
      item.classList.toggle('active', !isActive);
    });
  });

  const close = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImage) lightboxImage.src = '';
  };

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || 'Expanded repair photo';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  if (closeLightbox) closeLightbox.addEventListener('click', close);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
});
