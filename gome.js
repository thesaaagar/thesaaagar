/**
 * ==========================================================================
 * Google Material Design 3 (M3) - Master Controller Script
 * Handles Interactive Logic for Sections 1 to 34
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     5, 6 & 27: RIPPLE EFFECT (Buttons, FAB, Cards, Chips)
     ========================================================================== */
  const rippleElements = document.querySelectorAll('.button, .fab, .icon-btn, .chip, .card, .ripple-surface');
  
  rippleElements.forEach(el => {
    el.addEventListener('click', function (e) {
      // Prevent child elements like chip-remove from bubbling
      if (e.target.closest('.chip-remove')) return;

      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;
      const rect = this.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = 'currentColor';
      circle.style.opacity = '0.2';
      circle.style.transform = 'scale(0)';
      circle.style.animation = 'm3-ripple 0.6s linear';
      circle.style.pointerEvents = 'none';

      // Ensure target has relative positioning
      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      this.style.overflow = 'hidden';

      const ripple = this.querySelector('.m3-ripple-effect');
      if (ripple) ripple.remove();

      circle.classList.add('m3-ripple-effect');
      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });

  // Inject keyframe animation for ripple
  if (!document.getElementById('m3-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'm3-ripple-style';
    style.textContent = `
      @keyframes m3-ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ==========================================================================
     7: FORM CONTROLS (Segmented Buttons, Range Slider Bubble)
     ========================================================================== */
  // Segmented Buttons
  document.querySelectorAll('.segmented-group').forEach(group => {
    const buttons = group.querySelectorAll('.segment-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        group.dispatchEvent(new CustomEvent('change', { detail: { value: btn.dataset.value || btn.textContent.trim() } }));
      });
    });
  });

  // Range Slider Value Bubble
  document.querySelectorAll('.range-container').forEach(container => {
    const range = container.querySelector('input[type="range"]');
    const bubble = container.querySelector('.range-bubble');
    if (range && bubble) {
      const updateBubble = () => {
        const val = range.value;
        const min = range.min ? range.min : 0;
        const max = range.max ? range.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.textContent = val;
        bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
      };
      range.addEventListener('input', updateBubble);
      updateBubble();
    }
  });

  /* ==========================================================================
     8 & 25: CHIPS & FILTER CHIPS (Selection & Removal)
     ========================================================================== */
  // Single/Multi Select Filter Chips
  document.querySelectorAll('.filter-group, .chip-group').forEach(group => {
    group.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip, .chip:not(.chip-input)');
      if (chip && !e.target.closest('.chip-remove')) {
        chip.classList.toggle('selected');
        chip.classList.toggle('chip-active');
      }
    });
  });

  // Removable Chips
  document.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.chip-remove');
    if (removeBtn) {
      const chip = removeBtn.closest('.chip');
      if (chip) {
        chip.style.transform = 'scale(0.8)';
        chip.style.opacity = '0';
        chip.style.transition = '0.2s';
        setTimeout(() => chip.remove(), 200);
      }
    }
  });

  /* ==========================================================================
     10: FILE UPLOAD (Drag-and-Drop & Instant Preview)
     ========================================================================== */
  const dropZones = document.querySelectorAll('.upload-card, .file-upload-label');

  dropZones.forEach(zone => {
    const fileInput = zone.querySelector('input[type="file"]') || zone.nextElementSibling?.querySelector('input[type="file"]');
    
    ['dragenter', 'dragover'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
      });
    });

    zone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length && fileInput) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  /* ==========================================================================
     11: TABS, ACCORDION (FAQ) & DETAILS
     ========================================================================== */
  // Tab Navigation
  document.querySelectorAll('.tabs-container').forEach(tabBar => {
    const buttons = tabBar.querySelectorAll('.tab-button');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('tab-active'));
        btn.classList.add('tab-active');

        // Match content container
        const parent = tabBar.parentElement;
        const contents = parent.querySelectorAll('.tab-content');
        contents.forEach((content, cIndex) => {
          content.classList.toggle('active', cIndex === index);
        });
      });
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Auto-collapse siblings if inside accordion
      const container = item.closest('.faq-container');
      if (container) {
        container.querySelectorAll('.faq-item').forEach(sibling => sibling.classList.remove('active'));
      }
      
      if (!isActive) item.classList.add('active');
    });
  });

  /* ==========================================================================
     12: DIALOGS / MODALS & BOTTOM SHEETS
     ========================================================================== */
  // Modal Open/Close System
  window.openDialog = function(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) dialog.classList.add('active');
  };

  window.closeDialog = function(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) dialog.classList.remove('active');
  };

  // Close modal on background click
  document.querySelectorAll('.dialog-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  });

  // Close buttons
  document.querySelectorAll('.dialog-close, [data-close-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.dialog-backdrop');
      if (modal) modal.classList.remove('active');
    });
  });

  // Bottom Sheet Controller
  window.toggleBottomSheet = function(sheetId) {
    const sheet = document.getElementById(sheetId);
    const backdrop = document.querySelector(`.bottom-sheet-backdrop[data-target="${sheetId}"]`);
    if (sheet) {
      sheet.classList.toggle('open');
      if (backdrop) backdrop.classList.toggle('active');
    }
  };

  /* ==========================================================================
     13: SNACKBAR & LIVE TOAST NOTIFICATIONS
     ========================================================================== */
  window.showSnackbar = function(message, duration = 4000) {
    let container = document.querySelector('.snackbar-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'snackbar-container';
      document.body.appendChild(container);
    }

    const snackbar = document.createElement('div');
    snackbar.className = 'snackbar';
    snackbar.innerHTML = `
      <span>${message}</span>
      <button class="snackbar-close"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(snackbar);

    const removeSnackbar = () => {
      snackbar.style.opacity = '0';
      snackbar.style.transform = 'translateY(20px)';
      snackbar.style.transition = '0.2s ease';
      setTimeout(() => snackbar.remove(), 200);
    };

    snackbar.querySelector('.snackbar-close').addEventListener('click', removeSnackbar);
    setTimeout(removeSnackbar, duration);
  };

  /* ==========================================================================
     15: DROPDOWN MENUS
     ========================================================================== */
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('[data-toggle="dropdown"], .button, .icon-btn');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        document.querySelectorAll('.dropdown-menu.show').forEach(m => {
          if (m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show');
      });
    }
  });

  // Click outside to close dropdowns
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
  });

  /* ==========================================================================
     21 & 32: CLIPBOARD COPY HANDLER
     ========================================================================== */
  document.querySelectorAll('.input-action-btn, [data-copy-target]').forEach(btn => {
    btn.addEventListener('click', async () => {
      let textToCopy = '';
      const targetSelector = btn.getAttribute('data-copy-target');
      
      if (targetSelector) {
        const target = document.querySelector(targetSelector);
        textToCopy = target?.value || target?.innerText || '';
      } else {
        const input = btn.closest('.input-action-group')?.querySelector('.input');
        textToCopy = input?.value || '';
      }

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const icon = btn.querySelector('i');
        if (icon) {
          const originalClass = icon.className;
          icon.className = 'fa-solid fa-check';
          setTimeout(() => { icon.className = originalClass; }, 1500);
        }
        if (typeof showSnackbar === 'function') {
          showSnackbar('Copied to clipboard!');
        }
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });

  /* ==========================================================================
     29: SORTABLE LIST ITEMS (Drag-and-Drop)
     ========================================================================== */
  const sortableLists = document.querySelectorAll('.sortable-list, .list-group-sortable');
  
  sortableLists.forEach(list => {
    let draggedItem = null;

    list.querySelectorAll('.sortable-item').forEach(item => {
      item.setAttribute('draggable', 'true');

      item.addEventListener('dragstart', () => {
        draggedItem = item;
        setTimeout(() => item.style.opacity = '0.5', 0);
      });

      item.addEventListener('dragend', () => {
        setTimeout(() => {
          item.style.opacity = '1';
          draggedItem = null;
        }, 0);
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
          list.appendChild(draggedItem);
        } else {
          list.insertBefore(draggedItem, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.sortable-item:not([style*="opacity: 0.5"])')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  });

  /* ==========================================================================
     33: BEFORE/AFTER COMPARISON SPLIT SLIDER
     ========================================================================== */
  document.querySelectorAll('.split-view').forEach(splitView => {
    const divider = splitView.querySelector('.split-divider');
    const beforeImage = splitView.querySelector('.split-before');
    let isDragging = false;

    if (divider && beforeImage) {
      const moveDivider = (xPos) => {
        const rect = splitView.getBoundingClientRect();
        let position = ((xPos - rect.left) / rect.width) * 100;
        if (position < 0) position = 0;
        if (position > 100) position = 100;

        divider.style.left = `${position}%`;
        beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
      };

      divider.addEventListener('mousedown', () => isDragging = true);
      window.addEventListener('mouseup', () => isDragging = false);
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveDivider(e.clientX);
      });

      // Mobile Touch Support
      divider.addEventListener('touchstart', () => isDragging = true);
      window.addEventListener('touchend', () => isDragging = false);
      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveDivider(e.touches[0].clientX);
      });
    }
  });

  /* ==========================================================================
     34: INTERACTIVE ACCENT COLOR PICKER
     ========================================================================== */
  document.querySelectorAll('.color-swatch-group').forEach(group => {
    const swatches = group.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        const selectedColor = swatch.getAttribute('data-color') || swatch.style.backgroundColor;
        if (selectedColor) {
          document.documentElement.style.setProperty('--md-primary', selectedColor);
        }
      });
    });
  });

});
