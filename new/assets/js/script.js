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
                : "https://via.placeholder.com/600x400";

            output += `
  <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">
    
    <img src="${imageUrl}" 
         class="w-full h-56 object-cover" />

    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold mb-3 leading-snug">
        <a href="${post.link}" target="_blank"
           class="hover:text-accent transition duration-200">
          ${post.title}
        </a>
      </h3>

      <p class="text-sm text-gray-500 mb-4">
        ${new Date(post.pubDate).toDateString()}
      </p>

      <div class="mt-auto">
        <a href="${post.link}" target="_blank"
           class="text-accent font-medium hover:underline">
           View More
        </a>
      </div>
    </div>

  </div>
`;
        });

        blogGrid.innerHTML = output;
    } catch (error) {
        console.error("Error fetching Medium posts:", error);
    }
}

loadMediumPosts();
