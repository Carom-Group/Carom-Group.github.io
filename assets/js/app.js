const menu = document.querySelector('#mobile-menu');
const menu_links = document.querySelector('.navbar_menu');
const nav_logo = document.querySelector('#navbar_logo');

// display the mobile menu
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

/*

const slider = document.querySelector('#slider-menu');
//const slider_link = document.querySelector('.selection_card');
const slider_link_1 = document.querySelector('.selection_card');
const slider_link_2 = document.querySelector('.selection_card:nth-child(2)');
const slider_link_3 = document.querySelector('.selection_card:nth-child(3)');
const slider_link_4 = document.querySelector('.selection_card:nth-child(4)');


// display the slide menu
const slide_menu = () => {
    slider.classList.toggle('is-active');
    slider_link_1.classList.toggle('active');
    slider_link_2.classList.toggle('active');
    slider_link_3.classList.toggle('active');
    slider_link_4.classList.toggle('active');
};

slider.addEventListener('click', slide_menu);

*/

// active menu logic for scroll
const highlight_menu = () => {
    const target_highlight = document.querySelector('.highlight');
    const home_menu = document.querySelector('#home-page');
    const about_menu = document.querySelector('#about-page');
    const services_menu = document.querySelector('#tools-page');
    let scroll_postion = window.scrollY;
    console.log(scroll_postion);

    // adding the highlight class to menu
    if(window.innerWidth > 960 && scroll_postion < 660) {
        home_menu.classList.add('highlight');
        about_menu.classList.remove('highlight');
        return;           
    } else if (window.innerWidth > 960 && scroll_postion < 1400){
        about_menu.classList.add('highlight');
        home_menu.classList.remove('highlight');
        services_menu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scroll_postion < 3145) {
        services_menu.classList.add('highlight');
        about_menu.classList.remove('highlight');
        return;
    }

    if ((target_highlight && window.innerWidth < 960 && scroll_postion < 600) || target_highlight) {
        target_highlight.classList.remove('highlight');
    }

};

window.addEventListener('scroll', highlight_menu);
window.addEventListener('click', highlight_menu);


// for the home page
const tools_menu = document.querySelector('#tools-page');

const tools_slider_link_1 = document.querySelector('.services_card');
const tools_slider_link_2 = document.querySelector('.services_card:nth-child(2)');
const tools_slider_link_3 = document.querySelector('.services_card:nth-child(3)');
const tools_slider_link_4 = document.querySelector('.services_card:nth-child(4)');

// display the slide menu
const tools_slide_menu = () => {
    tools_menu.classList.toggle('is-active');
    tools_slider_link_1.classList.toggle('active');
    tools_slider_link_2.classList.toggle('active');
    tools_slider_link_3.classList.toggle('active');
    tools_slider_link_4.classList.toggle('active');
};

tools_menu.addEventListener('click', tools_slide_menu);



// for the selection page
const slider = document.querySelector('#slider-menu');
//const slider_link = document.querySelector('.selection_card');
const slider_link_1 = document.querySelector('.selection_card');
const slider_link_2 = document.querySelector('.selection_card:nth-child(2)');
const slider_link_3 = document.querySelector('.selection_card:nth-child(3)');
const slider_link_4 = document.querySelector('.selection_card:nth-child(4)');


// display the slide menu
const slide_menu = () => {
    slider.classList.toggle('is-active');
    slider_link_1.classList.toggle('active');
    slider_link_2.classList.toggle('active');
    slider_link_3.classList.toggle('active');
    slider_link_4.classList.toggle('active');
};

slider.addEventListener('click', slide_menu);
