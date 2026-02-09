// ------>> Global selector references

// Button that toggles the theme
const themeToggle = document.querySelector('[data-theme-toggle]');
// Data Search Input
const searchInput = document.querySelector('[data-search-input]');
// Search form element
const searchForm = document.querySelector('[data-search-form]');

// ----->> Helpers

// Data Search Error Message

const displaySearchError = (msg = "") => {
   const searchErrorElement = document.querySelector('[data-search-error]');
   if(!searchErrorElement) {
       return;
   }
   searchErrorElement.textContent = msg;
}

const setEmptyStateMessage = (message = "") => {
    // Data empty state
    const emptyState = document.querySelector('[data-empty-state]');
    if(!emptyState){
        return;
    }
    emptyState.textContent = message;
}

// ----->> API Setup

// API URL

const githubGetUser = "https://api.github.com/users/";

const getUserDetails = async (username) => {
  try{
    const url = githubGetUser + username;  
    const response = await fetch(url);
    if(!response.ok){
        setEmptyStateMessage("No GitHub user found with your search query.");
        return;
    }
       const data = await response.json();       
       userDetails(data);
  }
  catch(error){
    console.error(error.message)
  }
}


// Profile card elements (data-* hooks)

const profileEls = {
  avatar: document.querySelector('[data-avatar]'),  
}


const userDetails = (data) => {
  console.log("Data to display in UI:", data);  
  profileEls.avatar.src = data.avatar_url;
}


// Toggle between light and dark themes

const themeChanger = () => {
   const htmlDataTheme = document.documentElement;
   const themeLabel = document.querySelector('[data-theme-label]');
    if(htmlDataTheme.dataset.theme === 'dark'){
        htmlDataTheme.dataset.theme = 'light'
        if(themeLabel) themeLabel.textContent = "DARK";
    }
    else {
        htmlDataTheme.dataset.theme = 'dark'
        if(themeLabel) themeLabel.textContent = "LIGHT";
    }
}

// Run theme change when the button is clicked
themeToggle.addEventListener('click', themeChanger);

// Handle search form submit

const handleSearchSubmit = (e) => {
    e.preventDefault();    
    const username = searchInput.value.trim();    
    if(!username){
        displaySearchError("Please enter a username.");
        return;
    } else {
        getUserDetails(username);
        //emptyState.classList.add('is-hidden');
        //userCard.classList.remove('card--hidden');
    }
}

// Clear error message when user types
const handleSearchInput = () => {    
    if(searchInput.value.trim()){
        displaySearchError("");        
    }
}

searchForm.addEventListener('submit', handleSearchSubmit);
searchInput.addEventListener('input', handleSearchInput);