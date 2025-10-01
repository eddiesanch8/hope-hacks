console.log("hello from the client-side for main html page");
// const token = localStorage.getItem("access_token");
// // --------------------------- getting items from the DOM ----------------------------------- \\
// const userSearch = document.querySelector("[data-user-search]");
// const searchBtn = document.getElementById("dashboard__button");
// const userForm = document.querySelector("[data-form]");
// const logoutBtn = document.querySelector("#logout");
// const articles = document.querySelector("[data-article-container]");
// // --------------------------- Declaring Functions ---------------------------------------- \\

// function createArticle(obj) {
//   // Creates new section and gets Parent Grid
//   const parentContainer = document.querySelector("[data-article-container]");
//   const newSection = document.createElement("section");

//   // Inner html for every section
//   let article = `
//         <img src="${obj.urlToImage}" alt=""/>
//         <p>${obj.author}</p>
//         <p>${obj.title}</p>
//         <p >
//           ${obj.description}
//         </p>
//         <a href="${obj.url}"> Link to Article </a>
//         <button class="product-btn">Favorite</button>
//         `;
//   newSection.innerHTML = article;
//   // add to parent grid
//   parentContainer.append(newSection);
// }

// // es6 js allows us to create async functions which are great for handling api calls
// async function getSearch(search) {
//   try {
//     const response = await fetch(
//       // here we are fetching to our protected route. We set up middleware on the search endpoint
//       //   that is why we have the authorization header which uses the JWT token that was created on login.

//       `/search?search=${encodeURIComponent(search)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     // handles an error if we don't get the output we are looking for
//     if (!response.ok) {
//       alert("Please Sign Up or Login!");
//       // throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     // the data for right now is just a string which you pass into the function but it is returned as json
//     const data = await response.json();
//     console.log(data);
//     data.forEach((article) => {
//       createArticle(article);
//     });
//     // from there we can dynamically use whatever data is pulled
//   } catch (error) {
//     console.error("Error fetching search data:", error);
//   }
// }
// // -------------------------------- Event Handlers -------------------------------------------- \\

// // for example, in this form that we created for the front end...
// userForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   //   we are getting user input
//   const searchTerm = userSearch.value.trim();
//   if (searchTerm === "") {
//     alert("Please provide a search");
//     return;
//   }
//   // then calling on the previously defined function
//   getSearch(searchTerm);
// });

// // this clears our token from local storage. Technically "loging" us out. Its kind of hacky but for the purposes of this project, this is a fine solution
// logoutBtn.addEventListener("click", () => {
//   localStorage.removeItem("access_token");
//   localStorage.clear();
//   window.location.href = "/login";
// });
