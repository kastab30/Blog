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

        posts.forEach((post) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content;
            const imgTag = tempDiv.querySelector("img");
            const imageUrl = imgTag
                ? imgTag.src
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f6f1e8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23111111' font-family='Arial' font-size='28'%3EKastab Blog%3C/text%3E%3C/svg%3E";

            output += `
  <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">
    
    <img src="${imageUrl}"
         alt="${post.title}"
         width="600"
         height="400"
         loading="lazy"
         decoding="async"
         class="w-full h-56 object-cover" />

    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold mb-3 leading-snug">
        <a href="${post.link}" target="_blank" rel="noopener noreferrer"
           class="hover:text-accent transition duration-200">
          ${post.title}
        </a>
      </h3>

      <p class="text-sm text-gray-500 mb-4">
        ${new Date(post.pubDate).toDateString()}
      </p>

      <div class="mt-auto">
        <a href="${post.link}" target="_blank" rel="noopener noreferrer"
           class="text-accent font-medium hover:underline">
           View More
        </a>
      </div>
    </div>

  </div>
`;
        });

        blogGrid.innerHTML = output;
    } catch {
        const blogGrid = document.querySelector("#blogs .grid");
        if (blogGrid) blogGrid.innerHTML = `<p class="col-span-full text-center text-neutral-600">Latest posts are temporarily unavailable.</p>`;
    }
}

loadMediumPosts();
