// for the spinner to render waiting on all html content to be fully loaded
document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    document.querySelector('body').style.visibility = 'hidden';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('#loader').style.visibility = 'visible';
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
          $('#headerName').append(`<span style="margin: 0 1.5rem;">${char}</span>`);
          return;
        }
        $('#headerName').append(`<span class="nameChar" style="animation-delay: ${.5 + index / 4}s;">${char}</span>`);

      });

      // ! RENDERING THE HEADER TEXT
      setTimeout(() => {
        renderHeaderText();
      }, 4500);
      // document.getElementById('introNameVid').style.display = 'block';
      // document.getElementById('videoName').innerHTML = `<video id="introNameVid" defaultMuted autoplay="autoplay" muted><source src="./assets/images/bg/officialName.mp4" type="video/mp4">Your browser does not support the video tag.</video>`
    }, 2000);
  }
};

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
  var target = $($(this).attr('href'));
  if (target.length) {
    var scrollTo = target.offset().top - 30;
    $('body, html').animate({ scrollTop: scrollTo + 'px' }, 800);
  }
});