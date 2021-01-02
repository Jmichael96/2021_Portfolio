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
      // document.getElementById('introNameVid').style.display = 'block';
      document.getElementById('videoName').innerHTML = `<video id="introNameVid" defaultMuted autoplay="autoplay" muted><source src="./assets/images/bg/officialName.mp4" type="video/mp4">Your browser does not support the video tag.</video>`
    }, 2000);
  }
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