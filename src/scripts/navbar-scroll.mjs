const header = document.querySelector('.site-header');

if (header) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sync = () => {
    const scrolled = window.scrollY > 8;
    header.classList.toggle('is-scrolled', scrolled);
  };

  sync();

  window.addEventListener('scroll', sync, {
    passive: true,
  });

  if (reduceMotion) {
    header.style.transitionDuration = '1ms';
  }
}
