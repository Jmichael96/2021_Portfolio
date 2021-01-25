$(window).on('load', function () {
    // resizing the nav to the appropriate specs
    resizeNavHandler();
})

// call this function when the window is resizing
window.onresize = function (e) {
    e.preventDefault();
    // resizing the nav to the appropriate specs
    resizeNavHandler();
}

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

function openNav() {
    document.getElementById("smOpenNav").style.width = "100%";
};

function closeNav() {
    document.getElementById("smOpenNav").style.width = "0%";
};

// adding navbar effect for changing color on scroll
$(window).on('scroll', () => {
    const nav = document.getElementById('nav');
    const scrollBtn = document.getElementById('scrollTopIcon');

    if (this.scrollY <= 100) {
        nav.style.height = '4rem';
        nav.style.backgroundColor = '#000000b0'
        scrollBtn.style.display = 'none';
    }
    else {
        nav.style.height = '3rem';
        nav.style.backgroundColor = 'black';
        scrollBtn.style.display = 'block';
    };
});

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