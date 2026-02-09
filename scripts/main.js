// ------>> Global selector references

// Button that toggles the theme
const themeToggle = document.querySelector('[data-theme-toggle]');
// Data empty state
const emptyState = document.querySelector('[data-empty-state]');

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
    if(!searchInput.value.trim()) {
       displaySearchError("Please enter a username.");
       return
    }
    displaySearchError("");
    // Hook API call here..
}

// Clear error message when user types
const handleSearchInput = () => {
    if(searchInput.value.trim()){
        displaySearchError("");
    }
}

searchForm.addEventListener('submit', handleSearchSubmit);
searchInput.addEventListener('input', handleSearchInput);