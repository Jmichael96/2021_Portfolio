// for the spinner to render waiting on all html content to be fully loaded
document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    document.querySelector('body').style.visibility = 'hidden';
    // the navbar
    document.querySelector('nav').style.display = 'none';
    document.querySelector('#loader').style.visibility = 'visible';
    // about section
    // document.querySelector('#aboutTxt').style.display = 'none';
    // document.getElementById('introNameVid').style.display = 'none';
  } else {
    setTimeout(() => {
      document.querySelector('#loader').style.display = 'none';
      document.querySelector('nav').style.display = 'flex';
      document.querySelector('body').style.visibility = 'visible';
      // ! RENDERING THE NAME
      let nameString = 'jeffrey vanhorn';
      nameString.split('').map(function (char, index) {
        // check if there is a white space char in the string
        if (char.indexOf(' ') >= 0) {
          $('#headerName').append(`<span class="whiteSpace">${char}</span>`);
          return;
        }
        $('#headerName').append(`<span class="nameChar" style="animation-delay: ${.5 + index / 5.5}s;">${char}</span>`);
      });

      // ! RENDERING THE HEADER TEXT
      setTimeout(() => {
        renderHeaderText();
      }, 3500);
      // document.getElementById('introNameVid').style.display = 'block';
      // document.getElementById('videoName').innerHTML = `<video id="introNameVid" defaultMuted autoplay="autoplay" muted><source src="./assets/images/bg/officialName.mp4" type="video/mp4">Your browser does not support the video tag.</video>`

      // ! STRICTLY FOR THE ABOUT TEXT TYPING TO START ONCE PAGE HAS FINISHED LOADING
      // initiateTyping();
    }, 2000);

    // about section
    // document.querySelector('#aboutTxt').style.display = 'flex';
  }
};

$(window).on("load", function () {
  window.onscroll = () => {
    let windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function () {
      /* Check the location of each desired element */
      let objectBottom = $(this).offset().top + $(this).outerHeight();
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom - 100) {
        //object comes into view (scrolling down)
        if ($(this).css("opacity") == 0) { $(this).fadeTo(500, 1); }
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity") == 1) { $(this).fadeTo(500, 0); }
      }
    });
  }
});

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
    $('body, html').animate({ scrollTop: scrollTo + 'px' }, 800);
  }
});