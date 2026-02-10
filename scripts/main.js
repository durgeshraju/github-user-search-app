// ------>> Global Helper for selector references
const getEl = (s) => document.querySelector(s);

// ----->> Helpers

// Data Search Error Message
const displaySearchError = (msg = "") => {
   const searchErrorElement = document.querySelector('[data-search-error]');
   if(!searchErrorElement) {
       return;
   }
   searchErrorElement.textContent = msg;
}

// Data empty state
const setEmptyStateMessage = (message = "") => {    
    const emptyState = document.querySelector('[data-empty-state]');
    if(!emptyState){
        return;
    }
    emptyState.textContent = message;
}


// Toggle between `light || dark` theme modes

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
getEl('[data-theme-toggle]').addEventListener('click', themeChanger);


// API data binding helpers in UI

const setText = (element, value ) => {
    if(!element) return;
    element.textContent = value;
}

const setImage = (element, value) => {
    if(!element) return;
    element.src = value;
}

// ----->> API Setup

// API URL

const githubGetUser = "https://api.github.com/users/";

// Data Fetching process handling

const getUserDetails = async (username) => {
  try{
    const url = githubGetUser + username;  
    const response = await fetch(url);
    if(!response.ok){
        setEmptyStateMessage("No GitHub user found with your search query.");
        return;
    }
    getEl('[data-search-btn]').setAttribute('disabled', true);
    getEl('[data-search-btn]').textContent = "loading.."
       const data = await response.json();
        setTimeout(() => {
            userDetails(data);
            getEl('[data-search-input]').value = '';
            const card = getEl('.card');
            if(card) card.classList.toggle("is-hidden");            
            getEl('[data-search-btn]').removeAttribute('disabled', false);
            getEl('[data-search-btn]').textContent = "Search";
    }, 2000);
  }
  catch(error){
    console.error(error.message)
  }
}


// Profile card elements (data-* hooks)

const profileEls = {
  avatar: getEl('[data-avatar]'),
  name: getEl('[data-name]'),
  tUsername: getEl('[data-username]'),
  bio: getEl('[data-bio]'),
  repos: getEl('[data-repos]'),
  followers: getEl('[data-followers]'),
  following: getEl('[data-following]'),
  location: getEl('[data-location]'),
  twitter: getEl('[data-twitter]'),
  blogLink: getEl('[data-blog-link]'),
  company: getEl(['data-company'])
}


// Updating the data in to userDetails card

const userDetails = (data) => {
  setImage(profileEls.avatar, data.avatar_url);
  setText(profileEls.name, data.name);
  setText(profileEls.tUsername, data.twitter_username);
  setText(profileEls.bio, data.bio);
  setText(profileEls.repos, data.public_repos);
  setText(profileEls.followers, data.followers);
  setText(profileEls.following, data.following);
  setText(profileEls.location, data.location);
  setText(profileEls.twitter, data.twitter_username);
  setText(profileEls.blogLink, data.blog);
  setText(profileEls.company, data.company);
}

// Handle search form submit

const handleSearchSubmit = (e) => {
    e.preventDefault();    
    const username = getEl('[data-search-input]').value.trim();    
    if(!username){
        displaySearchError("Please enter a username.");
        return;
    } else {
        getUserDetails(username);
    }
}

// Clear error message when user types
const handleSearchInput = () => {
    if(getEl('[data-search-input]').value.trim()){
        displaySearchError("");        
    }
}

getEl('[data-search-form]').addEventListener('submit', handleSearchSubmit);
getEl('[data-search-input]').addEventListener('input', handleSearchInput);