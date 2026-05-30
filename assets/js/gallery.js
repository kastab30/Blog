async function fetchAndRenderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  try {
    const response = await fetch('assets/js/data.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const galleryData = await response.json();

    let htmlContent = '';
    galleryData.forEach((item, index) => {
      const delay = (index % 4) * 120;
      const alt = escapeHTML(item.name || `Gallery image ${index + 1}`);
      const sizes = item.autoClass?.includes('col-span-2')
        ? '(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw'
        : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';

      htmlContent += `
        <button type="button" class="gallery-item opacity-0 [transform:rotateY(90deg)] transition-all duration-1000 ease-out group relative overflow-hidden rounded-2xl shadow-md cursor-pointer bg-neutral-100 ${item.autoClass || ''}" style="transition-delay: ${delay}ms;" data-full-src="${item.src}" data-alt="${alt}">
          <img
            src="${item.preview}"
            srcset="${item.srcset}"
            sizes="${sizes}"
            alt="${alt}"
            width="${item.width}"
            height="${item.height}"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span class="text-white font-oswald text-xl uppercase tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${alt}</span>
          </div>
        </button>
      `;
    });

    container.innerHTML = htmlContent;
    setupGalleryLightbox(container);

    const observerOptions = {
      root: null,
      rootMargin: '100px 0px',
      threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', '[transform:rotateY(90deg)]');
          entry.target.classList.add('opacity-100', '[transform:rotateY(0deg)]');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    const galleryItems = container.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      observer.observe(item);
    });

  } catch {
    container.innerHTML = `<p class="col-span-full text-center text-red-500">Failed to load gallery.</p>`;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function setupGalleryLightbox(container) {
  const lightbox = document.createElement('div');
  lightbox.className = 'fixed inset-0 z-[9998] hidden items-center justify-center bg-black/90 p-4 opacity-0 transition-opacity duration-300';
  lightbox.innerHTML = `
    <button type="button" class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close gallery image">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <img alt="" class="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl" decoding="async">
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('button');

  const close = () => {
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      image.removeAttribute('src');
    }, 300);
    document.body.classList.remove('overflow-hidden');
  };

  container.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      image.src = item.dataset.fullSrc;
      image.alt = item.dataset.alt || 'Gallery image';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      requestAnimationFrame(() => lightbox.classList.remove('opacity-0'));
      document.body.classList.add('overflow-hidden');
    });
  });

  closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) close();
  });
}

document.addEventListener('DOMContentLoaded', fetchAndRenderGallery);
