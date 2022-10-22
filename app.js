

// navbar section
const menu = document.querySelector('#mobile-menu');
const menu_links = document.querySelector('.navbar_menu');
const nav_logo = document.querySelector('#navbar_logo');

// display by default
const mobile_menu = () => {
    menu.classList.toggle('is-active');
    menu_links.classList.toggle('active');
};

menu.addEventListener('click', mobile_menu);


// closing the mobile menu
const hide_mobile_menu = () => {
    const menu_bars = document.querySelector('.is-active');
    if(window.innerWidth <= 768 && menu_bars) {
        menu.classList.toggle('is-active');
        menu_links.classList.remove('active');
    }
}

menu_links.addEventListener('click', hide_mobile_menu);
nav_logo.addEventListener('click', hide_mobile_menu);