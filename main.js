(function(){
  // Mobile menu
  const burger = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-panel]');
  if(burger && panel){
    burger.addEventListener('click', () => {
      const isOpen = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!isOpen));
      panel.style.display = isOpen ? 'none' : 'block';
      burger.setAttribute('aria-expanded', String(!isOpen));
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > 920){
        panel.setAttribute('data-open', 'false');
        panel.style.display = 'none';
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Gallery lightbox
  const lb = document.querySelector('[data-lightbox]');
  const lbImg = document.querySelector('[data-lightbox-img]');
  const lbTitle = document.querySelector('[data-lightbox-title]');
  const lbClose = document.querySelector('[data-lightbox-close]');

  function openLB(src, title){
    if(!lb || !lbImg || !lbTitle) return;
    lbImg.src = src;
    lbTitle.textContent = title || 'Kép';
    lb.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeLB(){
    if(!lb) return;
    lb.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    if(lbImg) lbImg.src = '';
  }

  document.querySelectorAll('[data-gallery-item]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-src');
      const title = el.getAttribute('data-title');
      openLB(src, title);
    });
  });

  if(lbClose) lbClose.addEventListener('click', closeLB);
  if(lb){
    lb.addEventListener('click', (e) => {
      if(e.target === lb) closeLB();
    });
  }
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLB();
  });
})();
