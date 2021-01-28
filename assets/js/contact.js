let ContactTyper = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

ContactTyper.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span id="contactTyper" class="contactTyper">' + this.txt + '</span>';

    let that = this;
    // controls the speed of the typing
    let delta = 100 - Math.random() * 200;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        // adding class once the text has finished to create a blinking cursor
        document.getElementById('contactTyper').classList += ' contactCursorBlinker';
        // ! turning off the deleting text
        // this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {

        this.isDeleting = false;
        this.loopNum++;
        // controls the pause at the beginning of the empty string
        // and dictates when it starts again
        delta = 100;
    }

    // this is time it takes between each letter typed
    setTimeout(function () {
        that.tick();
    }, delta);
};

// for handling the start of the typing in the about section
function initContactContent() {
    // start typing out the about text
    let elements = document.getElementsByClassName('txt-rotate-contact');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new ContactTyper(elements[i], JSON.parse(toRotate), period);
        }
    }
    // inject CSS
    let css = document.createElement("style");
    // css.type = "text/css";
    css.innerHTML = ".txt-rotate-contact > .contactTyper { border-right: 2px solid #c75000; padding-right: .2rem; }";
    document.body.appendChild(css);
};


// let map = tt.map({
//     key: 'idwJh8J0x9cq7vGdT0SgaIkuv0Gdb1pM',
//     container: 'map',
//     basePath: '/',
//     style: '/custommap.json',
//     source: 'vector',
//     center: [-97, 29],
//     zoom: 4
// });

$(window).on('load', function () {
    let hasReached = false;
    $(window).on('scroll', function () {
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $('#formTitle').each(function () {
            /* Check the location of each desired element */
            let objectBottom = $(this).offset().top + $(this).outerHeight();
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom - 100 && !hasReached) {
                // image.style.display = 'block';
                initContactContent();
                hasReached = true;
            }
        });
    });
    // adding these to keep bots away
    let email1 = 'jeffrey.';
    let email2 = 'vanhorn';
    let email3 = '@yahoo.com';

    $('.locationEmail').attr('href', `mailto:${email1}${email2}${email3}`);
});

// function createMarker(position, color, popupText) {
//     let markerElement = document.createElement('div');
//     markerElement.className = 'marker';

//     let markerContentElement = document.createElement('div');
//     markerContentElement.className = 'marker-content';
//     markerContentElement.style.backgroundColor = color;
//     markerElement.appendChild(markerContentElement);

//     // add marker to map
//     new tt.Marker({ scale: 1.3 })
//         .setLngLat(position)
//         .addTo(map);
// };

// createMarker([-95.461195, 30.168032], '#3b4e74', 'The Woodlands, TX');