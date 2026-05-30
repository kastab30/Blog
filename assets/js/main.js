window.tailwind = window.tailwind || {};
window.tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ["Inter", "sans-serif"],
              serif: ["Playfair Display", "serif"],
              oswald: ["Oswald", "sans-serif"],
            },
            colors: {
              accent: "#ff8c00",
              lightbg: "#f8f9fa",
            },
            backgroundImage: {
              "hero-glow":
                "radial-gradient(circle at 50% 30%, #fdf2d8 0%, rgba(255, 255, 255, 0) 65%)",
            },
          },
        },
      };
