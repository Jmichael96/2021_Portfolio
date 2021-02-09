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
                }, 40)
                hasReached = true;
            }
        });
    });
    // adding these to keep bots away
    let email1 = 'jeffrey.';
    let email2 = 'vanhorn';
    let email3 = '@yahoo.com';

    $('.locationEmail').attr('href', `mailto:${email1}${email2}${email3}`);
    document.getElementById('mapImg').style.display = 'block';
    document.getElementById('map').style.display = 'none';
    // if there is not a mobile device being used render the tom tom map. else render an image
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // map styles and initiation
        // let map = tt.map({
        //     key: 'idwJh8J0x9cq7vGdT0SgaIkuv0Gdb1pM',
        //     container: 'map',
        //     basePath: '/',
        //     style: '/custommap.json',
        //     source: 'vector',
        //     center: [-97, 29],
        //     zoom: 4
        // });

        // // adding a marker to the tom tom map
        // function createMarker(position, color) {
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
    } else {
        // display the map image and remove the map api
        document.getElementById('mapImg').style.display = 'block';
        document.getElementById('map').style.display = 'none';
    }
});

// on form submit
document.getElementById('submitFormBtn').onclick = (e) => {
    let name = $('#nameInput').val();
    let email = $('#emailInput').val().trim().toLowerCase();
    let message = $('messageInput').val();

    if (!name && !email && !message) {
        openErrModal('Please fill out each form input');
        return;
    }

    if (!name) {
        openErrModal('Please add a name');
        return;
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !emailRegex.test(email)) {
        openErrModal('Please enter a valid email');
        return;
    }
    if (!message) {
        openErrModal('Please enter a message');
        return;
    }
    openRobotModal();
};

// ! ANTI-ROBOT MODAL
const openRobotModal = () => {
    document.getElementById('robotModalOverlay').classList.add('is-robot-modal-visible');
    document.getElementById('robotModal').classList.add('is-robot-modal-visible');
};
// the x button inside the robot modal to close it
document.getElementById('robotModalCloseBtn').addEventListener('click', function () {
    document.getElementById('robotModalOverlay').classList.remove('is-robot-modal-visible');
    document.getElementById('robotModal').classList.remove('is-robot-modal-visible');
});
// for if the user clicks anywhere outside the  robot modal modal it will close the modal
document.getElementById('robotModalOverlay').addEventListener('click', function () {
    document.getElementById('robotModalOverlay').classList.remove('is-robot-modal-visible');
    document.getElementById('robotModal').classList.remove('is-robot-modal-visible');
});

// ! ERR MODAL
const openErrModal = (msg) => {
    document.getElementById('errOverlay').classList.add('is-visible');
    document.getElementById('errModal').classList.add('is-visible');
    document.getElementById('modalMessage').innerHTML = msg;
};

// the x button inside the modal to close it
document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('errOverlay').classList.remove('is-visible');
    document.getElementById('errModal').classList.remove('is-visible');
});
// for if the user clicks anywhere outside the modal it will close the modal
document.getElementById('errOverlay').addEventListener('click', function () {
    document.getElementById('errOverlay').classList.remove('is-visible');
    document.getElementById('errModal').classList.remove('is-visible');
});