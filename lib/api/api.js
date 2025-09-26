require("dotenv").config();
// API CAll
async function getArticle(userSearch) {
  try {
    // grabbing input from the user
    const apiKey = process.env.API_TOKEN;
    const url = `https://newsapi.org/v2/everything?sortBy=popularity&apiKey=${apiKey}&q='ai'+${userSearch}`;

    const externalApiResponse = await fetch(url);
    if (!externalApiResponse.ok) {
      throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
    }
    // parse through incoming response from API call
    const data = await externalApiResponse.json();
    const articles = data.articles;
    const topTen = articles.filter((article, index) => {
      if (index < 10) {
        return article;
      }
    });
    return topTen;
  } catch (error) {
    console.error("Error fetching external data:", error);
    res.status(500).send("Error fetching external data");
  }
}

module.exports = getArticle;
