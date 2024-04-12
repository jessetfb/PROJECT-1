const apikey = "d08f6920db8a4901b56c27c7f2cdc95e";

const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `
    https://newsapi.org/v2/top-headlines?sources=techcrunch&pagesize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogcontainer.innerHTML = "";
  articles.forEach((article) => {
    const blogcard = createBlogCard(article);
    blogcontainer.appendChild(blogcard);
  });
}

function createBlogCard(article) {
  const blogcard = document.createElement("div");
  blogcard.classList.add("blog-card");
  const img = document.createElement("img");
  img.src = article.urlToImage;
  img.alt = article.title;
  const title = document.createElement("h2");
  title.textContent = article.title;
  const description = document.createElement("p");
  description.textContent = article.description;

  blogcard.appendChild(img);
  blogcard.appendChild(title);
  blogcard.appendChild(description);

  blogcard.addEventListener("click", () => {
    displayFullContent(blogcard, article);
  });

  return blogcard;
}

function displayFullContent(blogcard, article) {
  const img = document.createElement("img");
  img.src = article.urlToImage;
  img.alt = article.title;

  const title = document.createElement("h2");
  title.textContent = article.title;

  const description = document.createElement("p");
  description.textContent = article.description;

  const content = document.createElement("p");
  content.textContent = article.content;

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", () => {
    blogcard.innerHTML = ""; 
    blogcard.appendChild(img);
    blogcard.appendChild(title);
    blogcard.appendChild(description);
    blogcard.appendChild(closeButton); 
  });

  blogcard.innerHTML = ""; 
  blogcard.appendChild(img);
  blogcard.appendChild(title);
  blogcard.appendChild(description);
  blogcard.appendChild(content);
  blogcard.appendChild(closeButton);
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
