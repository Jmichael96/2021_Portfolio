let SpecialtyTyper = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

SpecialtyTyper.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span id="specialtyTyper" class="specialtyTyper">' + this.txt + '</span>';

    let that = this;
    // controls the speed of the typing
    let delta = 100 - Math.random() * 200;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        // adding class once the text has finished to create a blinking cursor
        document.getElementById('specialtyTyper').classList += ' specialtyCursorBlinker';
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
function initSpecialtyContent() {
    // start typing out the about text
    let elements = document.getElementsByClassName('txt-rotate-specialties');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new SpecialtyTyper(elements[i], JSON.parse(toRotate), period);
        }
    }
    // inject CSS
    let css = document.createElement("style");
    // css.type = "text/css";
    css.innerHTML = ".txt-rotate-specialties > .specialtyTyper { border-right: 2px solid #a74300; padding-right: .2rem; }";
    document.body.appendChild(css);
};


$(window).on('load', function () {
    let hasReached = false;
    $(window).on('scroll', function () {
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $('#specialtiesTitle').each(function () {
            /* Check the location of each desired element */
            let objectBottom = $(this).offset().top + $(this).outerHeight();
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom - 100 && !hasReached) {
                // image.style.display = 'block';
                initSpecialtyContent();
                hasReached = true;
            }
        });
    });
    //    3d canvas
    try {
        TagCanvas.Start('myCanvas', 'tags', {
            textColour: 'white',
            outlineColour: 'transparent',
            bgOutlineThickness: 0,
            reverse: true,
            depth: 0.05,
            decel: .98,
            maxSpeed: 0.04,
            initial: [0.1, -0.1],
            pinchZoom: true,
            zoomMax: 1,
            shuffleTags: true,
            zoom: .85
        });
    } catch (e) {
        // something went wrong, hide the canvas container
        document.getElementById('myCanvasContainer').style.display = 'none';
    }
});