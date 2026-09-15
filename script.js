/* Theme initialization happens inline in index.html to prevent a flash. */
(function () {
  'use strict';

  var root = document.documentElement;
  var themeButton = document.getElementById('theme-toggle');
  var themeColor = document.getElementById('theme-color');
  var colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  var themeOrder = ['system', 'light', 'dark'];

  function activeTheme(preference) {
    return preference === 'system' ? (colorScheme.matches ? 'dark' : 'light') : preference;
  }

  function updateThemeButton(preference) {
    var next = themeOrder[(themeOrder.indexOf(preference) + 1) % themeOrder.length];
    var label = 'Theme: ' + preference + '. Switch to ' + next + ' theme';
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', 'Theme: ' + preference);
  }

  function applyTheme(preference, persist) {
    root.dataset.themePreference = preference;
    if (preference === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.dataset.theme = preference;
    }

    if (persist) {
      try {
        if (preference === 'system') {
          localStorage.removeItem('theme-preference');
        } else {
          localStorage.setItem('theme-preference', preference);
        }
      } catch (error) {}
    }

    themeColor.setAttribute('content', activeTheme(preference) === 'dark' ? '#111315' : '#ffffff');
    updateThemeButton(preference);
  }

  applyTheme(root.dataset.themePreference || 'system', false);

  themeButton.addEventListener('click', function () {
    var current = root.dataset.themePreference || 'system';
    var next = themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
    applyTheme(next, true);
  });

  function followSystemTheme() {
    if ((root.dataset.themePreference || 'system') === 'system') {
      themeColor.setAttribute('content', colorScheme.matches ? '#111315' : '#ffffff');
    }
  }

  if (colorScheme.addEventListener) {
    colorScheme.addEventListener('change', followSystemTheme);
  } else {
    colorScheme.addListener(followSystemTheme);
  }

  /* Mobile navigation */
  var header = document.querySelector('.site-header');
  var menuButton = document.getElementById('menu-toggle');
  var navigation = document.getElementById('primary-navigation');

  function setMenu(open) {
    header.dataset.menuOpen = String(open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  menuButton.addEventListener('click', function () {
    setMenu(header.dataset.menuOpen !== 'true');
  });

  navigation.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('click', function (event) {
    if (header.dataset.menuOpen === 'true' && !header.contains(event.target)) setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) setMenu(false);
  });

  /* Email copy */
  var copyButton = document.getElementById('copy-email');
  var copyResetTimer;

  function legacyCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    var copied = document.execCommand('copy');
    field.remove();
    return copied;
  }

  copyButton.addEventListener('click', function () {
    var email = copyButton.dataset.email;
    var copyPromise = navigator.clipboard && window.isSecureContext
      ? navigator.clipboard.writeText(email)
      : Promise.resolve(legacyCopy(email));

    copyPromise.then(function () {
      copyButton.textContent = 'Copied';
      window.clearTimeout(copyResetTimer);
      copyResetTimer = window.setTimeout(function () {
        copyButton.textContent = 'Copy Email';
      }, 1800);
    }).catch(function () {
      copyButton.textContent = 'Select Email Above';
      window.clearTimeout(copyResetTimer);
      copyResetTimer = window.setTimeout(function () {
        copyButton.textContent = 'Copy Email';
      }, 2200);
    });
  });

  /* Enable research PDF links only when the files are present. */
  document.querySelectorAll('[data-file-link]').forEach(function (item) {
    var path = item.dataset.fileLink;
    fetch(path, { method: 'HEAD', cache: 'no-store' }).then(function (response) {
      if (!response.ok) return;
      var link = document.createElement('a');
      link.className = 'resource-link';
      link.href = path;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.dataset.linkLabel;
      item.replaceWith(link);
    }).catch(function () {});
  });

  /* WeChat modal */
  var modal = document.getElementById('wechat-modal');
  var openModalButtons = document.querySelectorAll('[data-wechat-open]');
  var closeModalButton = document.getElementById('wechat-close');
  var qrImage = document.getElementById('wechat-qr-image');
  var qrPlaceholder = document.getElementById('wechat-qr-placeholder');
  var lastModalTrigger = null;

  var qrProbe = new Image();
  qrProbe.onload = function () {
    qrImage.hidden = false;
    qrPlaceholder.hidden = true;
  };
  qrProbe.src = qrImage.getAttribute('src');

  openModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      lastModalTrigger = button;
      if (typeof modal.showModal === 'function') {
        modal.showModal();
        closeModalButton.focus();
      }
    });
  });

  closeModalButton.addEventListener('click', function () {
    modal.close();
  });

  modal.addEventListener('click', function (event) {
    var box = modal.getBoundingClientRect();
    var outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (outside) modal.close();
  });

  modal.addEventListener('close', function () {
    if (lastModalTrigger) lastModalTrigger.focus();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && header.dataset.menuOpen === 'true') setMenu(false);
  });
})();
