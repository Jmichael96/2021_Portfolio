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
                let p = document.getElementById('formTitle');
                p.innerHTML = '';
                let n = 0;
                let str = 'Send A Message';
                let typeSpecialty = setInterval(function () {
                    n = n + 1;
                    p.innerHTML = str.slice(0, n) + ' <span style="color: #c75000; font-size: 2.2rem;">|</span>';
                    if (n === str.length) {
                        clearInterval(typeSpecialty);
                        p.innerHTML = str;
                        n = 0;
                        setInterval(function () {

                            if (n === 0) {
                                p.innerHTML = str + '<span style="color: #c75000; font-size: 2.2rem;">|</span>'
                                n = 1;
                            } else {
                                p.innerHTML = str + '<span style="color: transparent; font-size: 2.2rem;">|</span>'
                                n = 0;
                            };
                        }, 500);
                    };
                }, 60)
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