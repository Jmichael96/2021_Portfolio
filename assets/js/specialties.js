$(window).on('load', function () {
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