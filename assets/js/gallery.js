async function fetchAndRenderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  try {

    const response = await fetch('../Blog/assets/js/data.json'); 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const galleryData = await response.json();

    const processedData = await Promise.all(galleryData.map(item => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          let autoClass = "";
          if (ratio > 1.3) autoClass = "md:col-span-2"; 
          else if (ratio < 0.8) autoClass = "md:row-span-2"; 
          resolve({ ...item, autoClass });
        };

        img.onerror = () => resolve({ ...item, autoClass: "" });
        img.src = item.src;
      });
    }));

    let htmlContent = '';
    processedData.forEach((item, index) => {
      const delay = (index % 4) * 150; 

      htmlContent += `
        <div class="gallery-item opacity-0 [transform:rotateY(90deg)] transition-all duration-1000 ease-out group relative overflow-hidden rounded-2xl shadow-md cursor-pointer ${item.autoClass}" style="transition-delay: ${delay}ms;">
          <img src="${item.src}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span class="text-white font-oswald text-xl uppercase tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${item.name}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = htmlContent;


    const observerOptions = {
      root: null,
      rootMargin: '0px',
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

  } catch (error) {
    console.error("Gallery Error:", error);
    container.innerHTML = `<p class="col-span-full text-center text-red-500">Failed to load gallery.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderGallery);