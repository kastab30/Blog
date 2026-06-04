async function renderFeaturedOn() {
  const track = document.getElementById('featured-on-track');
  if (!track) return;

  try {
    const response = await fetch('assets/js/featuredOn.json');
    if (!response.ok) throw new Error('Unable to load featured logos');
    const logos = await response.json();
    const loopItems = [...logos, ...logos];

    track.innerHTML = loopItems.map((item, index) => {
      const image = `
        <img
          src="${item.logo}"
          alt="${item.alt || item.name}"
          width="220"
          height="80"
          loading="lazy"
          decoding="async"
        >
      `;

      if (item.link) {
        return `
          <a class="featured-logo" href="${item.link}" target="_blank" rel="noopener noreferrer" aria-label="${item.name}" data-featured-item="${index}">
            ${image}
          </a>
        `;
      }

      return `
        <span class="featured-logo" aria-label="${item.name}" data-featured-item="${index}">
          ${image}
        </span>
      `;
    }).join('');
  } catch {
    track.innerHTML = '<p class="featured-empty">Add media logos in assets/js/featuredOn.json.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderFeaturedOn);
