// for the spinner to render waiting on all html content to be fully loaded
document.onreadystatechange = function () {
    const body = document.querySelector('body');
    const nav = document.querySelector('nav');
    const sideNav = document.getElementById('sideNav');
    const pageLoader = document.getElementById('portfolioLoader');

    if (document.readyState !== 'complete') {
        body.style.visibility = 'hidden';
        nav.style.display = 'none';
        sideNav.style.visibility = 'hidden';
        pageLoader.style.visibility = 'visible';
    } else {
        setTimeout(() => {
            body.style.visibility = 'visible';
            nav.style.display = 'flex';
            sideNav.style.visibility = 'visible';
            pageLoader.style.visibility = 'hidden';
        }, 2000);
    }
};

$(window).on("load", function () {
    // resizing the nav to the appropriate specs
    resizeNavHandler();
    window.onscroll = () => {
        // ! NAVBAR
        const nav = document.getElementById('nav');
        if (this.scrollY <= 100) {
            nav.style.height = '4rem';
            nav.style.backgroundColor = '#000000b0'
        }
        else {
            nav.style.height = '3rem';
            nav.style.backgroundColor = 'black';
        };
    };
    // footer date
    document.getElementById('footerDate').innerHTML = `${new Date().getFullYear()}`;

});
// call this function when the window is resizing
window.onresize = function () {
    // resizing the nav to the appropriate specs
    resizeNavHandler();
}
// navbar on window resize
function resizeNavHandler() {
    let desktopNav = document.getElementById('desktopNav');
    let mobileNav = document.getElementById('mobileNav');
    if (window.innerWidth >= 1025) {
        desktopNav.style.display = 'flex';
        mobileNav.style.display = 'none';
    } else if (window.innerWidth <= 1024) {
        desktopNav.style.display = 'none';
        mobileNav.style.display = 'flex';
    }
};
// toggle the mobile menu button
$('#mobileNavBtn').click(function () {
    $(this).toggleClass('open');
});
// toggle the side nav sliding in
$('#mobileNavBtn').click(function () {
    $('#sideNav').toggleClass('activeNav');
});
// toggle the nav and mobile menu button when clicking on a button inside the side nav
$('.mobileLink').click(function () {
    $('#mobileNavBtn').toggleClass('open');
    $('#sideNav').toggleClass('activeNav');
});
