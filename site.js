const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const mobile = window.matchMedia('(max-width: 760px)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobile.matches && !open;
}

menuButton.hidden = false;
setMenu(false);
mobile.addEventListener('change', () => setMenu(false));
menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') === 'false');
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && mobile.matches) {
    const destination = document.querySelector(link.hash);
    destination.setAttribute('tabindex', '-1');
    destination.focus({ preventScroll: true });
    setMenu(false);
  }
});
document.querySelector('.site-header').addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

const slideControls = document.querySelector('.hero-controls');
const slideButtons = slideControls.querySelectorAll('[data-slide-button]');
const slides = document.querySelectorAll('[data-slide]');
const slideImages = document.querySelectorAll('[data-slide-image]');

slideControls.hidden = false;
slideControls.addEventListener('click', (event) => {
  const button = event.target.closest('[data-slide-button]');
  if (!button) return;

  const selectedSlide = button.dataset.slideButton;
  for (const slide of slides) slide.hidden = slide.dataset.slide !== selectedSlide;
  for (const image of slideImages) image.hidden = image.dataset.slideImage !== selectedSlide;
  for (const control of slideButtons) control.setAttribute('aria-pressed', String(control === button));
});
