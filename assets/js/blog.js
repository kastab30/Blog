const mediumProfile = "kastab";

async function loadMediumPosts() {
    try {
        const rssUrl = `https://medium.com/feed/@${mediumProfile}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const posts = data.items.slice(0, 12);

        const blogGrid = document.querySelector("#blogs .grid");
        let output = "";

        posts.forEach((post, idx) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content;
            const imgTag = tempDiv.querySelector("img");
            const imageUrl = imgTag
                ? imgTag.src
                : "https://via.placeholder.com/600x400";

            output += `
  <article class="glass-card rounded-xl overflow-hidden flex flex-col animate-on-scroll" style="transition-delay:${Math.min(idx * 70, 420)}ms">
    
    <img src="${imageUrl}" 
         alt=""
         loading="lazy"
         class="w-full h-48 sm:h-52 md:h-56 object-cover" />

    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold mb-3 leading-snug text-white">
        <a href="${post.link}" target="_blank"
           rel="noreferrer"
           class="hover:text-accent transition duration-200">
          ${post.title}
        </a>
      </h3>

      <p class="text-sm text-gray-300/80 mb-4">
        ${new Date(post.pubDate).toDateString()}
      </p>

      <div class="mt-auto pt-2">
        <a href="${post.link}" target="_blank"
           rel="noreferrer"
           class="text-accent font-medium hover:underline">
           View More
        </a>
      </div>
    </div>

  </article>
`;
        });

        blogGrid.innerHTML = output;

        // Re-observe newly injected cards for scroll animations
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        blogGrid.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    } catch (error) {
        console.error("Error fetching Medium posts:", error);
    }
}

loadMediumPosts();
