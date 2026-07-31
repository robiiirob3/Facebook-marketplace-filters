// ==UserScript==
// @name         Hide Images on FastPeopleSearch
// @namespace    hide-fps-images
// @version      1.0
// @description  Hides img elements and background images on fastpeople-search.com.
// @match        https://fastpeople-search.com/*
// @match        http://fastpeople-search.com/*
// @run-at        document-idle
// ==/UserScript==

(function () {
  const hide = () => {
    // Hide <img>
    document.querySelectorAll('img').forEach(img => {
      img.style.visibility = 'hidden';
      img.style.opacity = '0';
      try {
        if (img.width && img.height) {
          img.style.width = img.width + 'px';
          img.style.height = img.height + 'px';
        }
      } catch {}
    });

    // Hide background images
    document.querySelectorAll('*').forEach(el => {
      try {
        const cs = getComputedStyle(el);
        const bg = cs.backgroundImage;
        if (bg && bg !== 'none') el.style.backgroundImage = 'none';
      } catch {}
    });
  };

  hide();
  new MutationObserver(hide).observe(document.documentElement, { childList: true, subtree: true });
})();
