tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
        serif: ["Orbitron", "sans-serif"],
        oswald: ["Orbitron", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      colors: {
        accent: "#00f3ff",
        purple: "#bc13fe",
        dark: "#0a0a0f",
        cardbg: "rgba(15, 15, 25, 0.7)",
        lightbg: "#11111a",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(188, 19, 254, 0.15) 0%, rgba(10, 10, 15, 0) 65%)",
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.add('transition-all', 'duration-300', 'fixed', 'top-0', 'left-1/2', '-translate-x-1/2', 'w-full', 'z-50');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('bg-dark/90', 'backdrop-blur-md', 'py-3', 'border-b', 'border-accent/20');
        nav.classList.remove('py-6');
      } else {
        nav.classList.remove('bg-dark/90', 'backdrop-blur-md', 'py-3', 'border-b', 'border-accent/20');
        nav.classList.add('py-6');
      }
    });
  }

  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});