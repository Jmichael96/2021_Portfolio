let TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span id="typer" class="typeWrap">' + this.txt + '</span>';

    let that = this;
    // controls the speed of the typing
    let delta = 100 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        // adding class once the text has finished to create a blinking cursor
        document.getElementById('typer').classList += ' cursorBlinker';
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
function initiateTyping() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // inject CSS
    let css = document.createElement("style");
    // css.type = "text/css";
    css.innerHTML = ".txt-rotate > .typeWrap { border-right: 2px solid #a74300; padding-right: .2rem; }";
    document.body.appendChild(css);
}
// getting the bottom coordinates to the element
let $el = $('#aboutCard');  //record the elem so you don't crawl the DOM everytime  
let bottom = $el.position().top + $el.outerHeight(true); // passing "true" will also include the top and bottom margin

// console.log(bottom);
$(window).on('load', function () {
    $(window).on('scroll', function () {
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        // let image = document.getElementById('personalImg');
        $('#aboutCard').each(function () {
            /* Check the location of each desired element */
            let objectBottom = $(this).offset().top + $(this).outerHeight();
            let textTag = document.getElementById('aboutTxt');
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom - 100) {
                // image.style.display = 'block';
                initiateTyping();
                $(window).off('scroll');
            } 
        })        
    });
});