// ------>> Global selector references

// Button that toggles the theme
const themeToggle = document.querySelector('[data-theme-toggle]');
// Search form element
const searchForm = document.querySelector('[data-search-form]');
// Data empty state
const emptyState = document.querySelector('[data-empty-state]');

// Data Search Input
const searchInput = document.querySelector('[data-search-input]');


// ----->> Helpers

// Data Search Error Message

const displaySearchError = (msg = "") => {
   const searchErrorElement = document.querySelector('[data-search-error]');
   if(!searchErrorElement) {
       return;
   }
   searchErrorElement.textContent = msg;
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

const searchUser = (e) => {
    e.preventDefault();    
    if(!searchInput.value.trim()) {
       displaySearchError("Please enter a username.");
    } else {
        displaySearchError('Hook the API call here..');
    }
}

searchForm.addEventListener('submit', searchUser);