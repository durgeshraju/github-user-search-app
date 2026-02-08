// Button that toggles the theme

const themeToggle = document.querySelector('[data-theme-toggle]');

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