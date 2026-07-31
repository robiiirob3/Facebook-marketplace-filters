(() => {
  const href = location.href.toLowerCase();
  if (!href.includes('facebook.com/marketplace')) return;

  const hideImages = () => {
    document.querySelectorAll('img').forEach(img => {
      img.style.visibility = 'hidden';
      img.style.opacity = '0';
    });

    // Some Marketplace images are used as CSS backgrounds
    document.querySelectorAll('*').forEach(el => {
      try {
        const cs = getComputedStyle(el);
        const bg = cs.backgroundImage;
        if (bg && bg !== 'none') el.style.backgroundImage = 'none';
      } catch {}
    });
  };

  hideImages();

  const mo = new MutationObserver(hideImages);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
