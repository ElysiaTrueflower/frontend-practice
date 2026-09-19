const html = document.documentElement;
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function setTheme() {
    if (mediaQuery.matches) {
        html.setAttribute('data-bs-theme', 'dark');
    } else {
        html.setAttribute('data-bs-theme', 'light');
    }
}
setTheme();
mediaQuery.addEventListener('change', setTheme);
