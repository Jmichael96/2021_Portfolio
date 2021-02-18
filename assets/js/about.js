$(window).on('load', function () {
    // used to make sure the initiate function is only called once
    let hasReached = false;
    $(window).on('scroll', function () {
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $('#personalImg').each(function () {

            /* Check the location of each desired element */
            let objectBottom = $(this).offset().top + $(this).outerHeight();
            // let textTag = document.getElementById('aboutTxt');
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom + 100 && !hasReached) {
                let p = document.getElementById('aboutTxt');
                p.innerHTML = '';
                let n = 0;
                let str = `I'm a recent graduate from the University of Texas' coding boot camp. Since graduation I've been a freelance developer working with my own clients and with other small companies on a variety of projects. Additionally, I've been continuing my education through online platforms and extended learning courses. Outside of work, my free time is spent powerlifting, disc golfing, and expanding my knowledge in graphic design.`;
                let typeAbout = setInterval(function () {
                    n = n + 1;
                    p.innerHTML = str.slice(0, n) + ' <span style="color: #c75000; font-size: 1.2rem;">|</span>';
                    if (n === str.length) {
                        clearInterval(typeAbout);
                        p.innerHTML = str;
                        n = 0;
                        setInterval(function () {

                            if (n === 0) {
                                p.innerHTML = str + ' <span style="color: #c75000; font-size: 1.2rem;">|</span>'
                                n = 1;
                            } else {
                                p.innerHTML = str + '<span style="color: transparent; font-size: 1.2rem;">|</span>'
                                n = 0;
                            };
                        }, 500);
                    };
                    // changing the interval milliseconds dictates the speed of the typer
                }, 20)
                hasReached = true;
                // fade in the about image
                document.getElementById('personalImg').style.opacity = 1;
            }
        });
    });
});
