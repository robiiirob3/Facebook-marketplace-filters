// ==UserScript==
// @name         Hide Facebook Marketplace Images
// @namespace    hide-mp-images
// @version      1.0
// @description  Hides <img> and background images on Facebook Marketplace pages.
// @match        https://www.facebook.com/marketplace*
// @match        https://facebook.com/marketplace*
// @run-at        document-idle
// ==/UserScript==

(function () {
  const href = () => (location.href || '').toLowerCase();

  const isMarketplace = () => href().includes('facebook.com/marketplace');

  const hideAllImages = () => {
    if (!isMarketplace()) return;

    // Hide normal <img> elements
    document.querySelectorAll('img').forEach(img => {
      img.style.visibility = 'hidden';
      img.style.opacity = '0';

      // Try to reduce layout impact
      try {
        if (img.width && img.height) {
          img.style.width = img.width + 'px';
          img.style.height = img.height + 'px';
        }
      } catch {}
    });

    // Hide CSS background images (often used for lazy/placeholder UIs)
    document.querySelectorAll('*').forEach(el => {
      try {
        const cs = getComputedStyle(el);
        const bg = cs && cs.backgroundImage;
        if (bg && bg !== 'none') el.style.backgroundImage = 'none';
      } catch {}
    });
  };

  hideAllImages();

  // Facebook updates the DOM dynamically
  const mo = new MutationObserver(() => hideAllImages());
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
