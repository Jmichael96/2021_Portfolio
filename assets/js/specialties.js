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
                // initSpecialtyContent();
                let p = document.getElementById('specialtiesTitle');
                p.innerHTML = '';
                let n = 0;
                let str = 'Specialties & Experience';
                let typeSpecialty = setInterval(function () {
                    n = n + 1;
                    p.innerHTML = str.slice(0, n) + ' <span style="color: #c75000; font-size: 2.2rem;">|</span>';
                    if (n === str.length) {
                        clearInterval(typeSpecialty);
                        p.innerHTML = str;
                        n = 0;
                        setInterval(function () {

                            if (n === 0) {
                                p.innerHTML = str + ' <span style="color: #c75000; font-size: 2.2rem;">|</span>';
                                n = 1;
                            } else {
                                p.innerHTML = str + '<span style="color: transparent; font-size: 2.2rem;">|</span>';
                                n = 0;
                            };
                        }, 500);
                    };
                }, 40)
                hasReached = true;
            }
        });
    });
    //    3d canvas
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
});