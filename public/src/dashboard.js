console.log("hello");
const token = localStorage.getItem("access_token");
const userName = localStorage.getItem("first_name");
console.log("is this your name?", userName);
// --------------------------- getting items from the DOM ----------------------------------- \\
const userSearch = document.querySelector("[data-user-search]");
const searchBtn = document.getElementById("dashboard__button");
const userForm = document.querySelector("[data-form]");
const logoutBtn = document.getElementById("logout");
const articles = document.querySelector("[data-article-container]");
// --------------------------- Declaring Functions ---------------------------------------- \\
// empty out the parent container
function createArticle(obj) {
  // Creates new section and gets Parent Grid
  const articleContainer = document.querySelector("[data-article-container]");
  const newSection = document.createElement("article");
  newSection.classList.add("articles__item");
  // Inner html for every section
  let article = `
        <img class="article__img" src="${obj.urlToImage}" alt=""/>
        <h3 class="article__title">${obj.title}</h3>
        <p class="article__author">${obj.author}</p>
        <p class="article__description">
          ${obj.description}
        </p>
        <a href="${obj.url}"> Link to Article </a>
        `;
  newSection.innerHTML = article;
  // add to parent grid
  articleContainer.append(newSection);
}

// es6 js allows us to create async functions which are great for handling api calls
async function getSearch(search) {
  try {
    const response = await fetch(
      // here we are fetching to our protected route. We set up middleware on the search endpoint
      //   that is why we have the authorization header which uses the JWT token that was created on login.

      `/search?search=${encodeURIComponent(search)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // handles an error if we don't get the output we are looking for
    if (!response.ok) {
      alert("Please Sign Up or Login!");
      // throw new Error(`HTTP error! status: ${response.status}`);
    }
    // the data for right now is just a string which you pass into the function but it is returned as json
    const data = await response.json();
    data.forEach(createArticle);
    // from there we can dynamically use whatever data is pulled
  } catch (error) {
    console.error("Error fetching search data:", error);
  }
}
// -------------------------------- Event Handlers -------------------------------------------- \\

// for example, in this form that we created for the front end...
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   we are getting user input
  const searchTerm = userSearch.value.trim();
  if (searchTerm === "") {
    alert("Please provide a search");
    return;
  }
  const articleContainer = document.querySelector("[data-article-container]");
  if (articleContainer.hasChildNodes()) {
    articleContainer.replaceChildren();
  }
  // then calling on the previously defined function
  getSearch(searchTerm);
});

// this clears our token from local storage. Technically "loging" us out. Its kind of hacky but for the purposes of this project, this is a fine solution
logoutBtn.addEventListener("click", () => {
  window.location.href = "/";
  localStorage.removeItem("access_token");
  localStorage.clear();
  window.location.href = "/";
});
