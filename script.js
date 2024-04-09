 
  const apikey = "d08f6920db8a4901b56c27c7f2cdc95e";

  const blogcontainer = document.getElementById("blog-container");
  const searchField = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  async function fetchRandomNews() {
    try {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
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
        const articles = await FetchNewsQuery(query);
        displayBlogs(articles);
      } catch (error) {
        console.log("Error fetching news by querry", error);
      }
    }
  });
  async function FetchNewsQuery(query) {
    try {
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      return data.articles;
    } catch (error) {
      console.error("Error fetching random news", error);
      return [];
    }
  }
  
  function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
      const blogcard = document.createElement("div");
      blogcard.classList.add("blog-card");
      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;
      const title = document.createElement("h2");
      const truncatedTitle =
        article.title.length > 30
          ? article.title.slice(0, 30) + "...."
          : article.title;
      title.textContent = truncatedTitle;
      const description = document.createElement("p");
      const truncatedDes =
        article.description.length > 120
          ? article.description.slice(0, 120) + "...."
          : +article.description;
      description.textContent = truncatedDes;
  
      blogcard.appendChild(img);
      blogcard.appendChild(title);
      blogcard.appendChild(description);
      blogcard.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });
      blogcontainer.appendChild(blogcard);
    });
  }
  
  (async () => {
    try {
      const articles = await fetchRandomNews();
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching random news", error);
    }
  })();
  
  
  