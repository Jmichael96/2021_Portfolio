// for the spinner to render waiting on all html content to be fully loaded
document.onreadystatechange = function () {
  const body = document.querySelector('body');
  const nav = document.querySelector('nav');
  const sideNav = document.getElementById('sideNav');
  const aboutSection = document.getElementById('aboutSection');
  const specialtiesSection = document.getElementById('specialtiesSection');
  const projSection = document.getElementById('projectSection');
  const contactSection = document.getElementById('contactSection');
  const pageLoader = document.getElementById('portfolioLoader');
  const planetBg = document.querySelector('.planetBg');

  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('mobileCanvas').style.display = 'none';
  }

  if (document.readyState !== 'complete') {
    body.style.visibility = 'hidden';
    nav.style.display = 'none';
    sideNav.style.visibility = 'hidden';
    aboutSection.style.visibility = 'hidden';
    specialtiesSection.style.visibility = 'hidden';
    projSection.style.visibility = 'hidden';
    contactSection.style.visibility = 'hidden';
    pageLoader.style.visibility = 'visible';
    planetBg.style.display = 'none';
  } else {
    setTimeout(() => {
      body.style.visibility = 'visible';
      nav.style.display = 'flex';
      sideNav.style.visibility = 'visible';
      aboutSection.style.visibility = 'visible';
      specialtiesSection.style.visibility = 'visible';
      projSection.style.visibility = 'visible';
      contactSection.style.visibility = 'visible';
      pageLoader.style.visibility = 'hidden';
      planetBg.style.display = 'block';
      // ! RENDERING THE NAME
      let nameString = 'jeffrey vanhorn';
      nameString.split('').map(function (char, index) {
        // check if there is a white space char in the string
        if (char.indexOf(' ') >= 0) {
          $('#headerName').append(`<span class="whiteSpace">${char}</span>`);
          return;
        }
        $('#headerName').append(`<span class="nameChar" style="animation-delay: ${.5 + index / 6}s;">${char}</span>`);
      });

      // ! RENDERING THE HEADER TEXT
      setTimeout(() => {
        renderHeaderText();
      }, 3000);
    }, 2000);
  }
};

$(window).on("load", function () {
  // resizing the nav to the appropriate specs
  resizeNavHandler();
  window.onscroll = () => {
    //  ! FADE IN EFFECT
    let windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function () {
      /* Check the location of each desired element */
      let objectBottom = $(this).offset().top + $(this).outerHeight();
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom + 100) {
        //object comes into view (scrolling down)
        if ($(this).css("opacity") == 0) { $(this).fadeTo(500, 1); }
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity") == 1) { $(this).fadeTo(500, 0); }
      }
    });
    // ! NAVBAR
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
    scrollProgressBar();
  };
  // footer date
  document.getElementById('footerDate').innerHTML = `${new Date().getFullYear()}`;

  // scrollProgressBar();
});
// call this function when the window is resizing
window.onresize = function () {
  // resizing the nav to the appropriate specs
  resizeNavHandler();
}
// render the header text html to the dom
function renderHeaderText() {
  document.getElementById('headerTextRender').innerHTML = `<div id="headerTextWrap">
  <div class="headerTextDash"></div>
  <p id="headerText">full-stack developer</p>
  <div class="headerTextDash"></div>
  </div>`;
};
// smooth scroll function
$('.js-link').click(function (e) {
  e.preventDefault();
  let target = $($(this).attr('href'));
  if (target.length) {
    let scrollTo = target.offset().top - 30;
    $('body, html').animate({ scrollTop: scrollTo + 'px' }, 1500);
  }
});
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

// progress bar handler
const scrollProgressBar = () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
};