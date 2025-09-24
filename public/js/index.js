console.log("hello from the client-side for main html page");
// --------------------------- getting items from the DOM ------------- \\
const userSearch = document.querySelector("[data-input]");
const userBtn = document.querySelector("[data-button]");
const userForm = document.querySelector("[data-form]");
const hiddenMsg = document.querySelector("[data-hidden]");

// this is an example of a function that we can use to connect to an endpoint on our server...
// so whats really going on?

// es6 js allows us to create async functions which are great for handling api calls
async function getSearch(search) {
  try {
    const response = await fetch(
      // here we store our fetch to our server api with a custom route on our localhost...
      // normally this would work with /search?search=${}
      // but if were using live server instead of rendering from the server... for now this will work. We can fix it later...

      `/search?search=${encodeURIComponent(search)}`
    );
    // handles an error if we don't get the output we are looking for
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // the data for right now is just a string which you pass into the function but it is returned as json
    const data = await response.json();
    // {search: 'no data...'} is our object, so you just grab the .search off of the data variable that is provided
    hiddenMsg.textContent = data.search;
    // from there we can dynamically use whatever data is pulled
  } catch (error) {
    console.error("Error fetching search data:", error);
  }
}

// for example, in this form that we created for the front end...
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   we are getting user input
  const searchTerm = userSearch.value.trim();
  // then calling on the previously defined function
  getSearch(searchTerm);
});
