var canvas, canvas2, canvas3, canvas4, canvas5, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function initPlanets() {

    canvas = document.getElementById("moonCanvas");
    canvas2 = document.getElementById('marsCanvas');
    canvas3 = document.getElementById('neptuneCanvas');
    canvas4 = document.getElementById('jupiterCanvas');
    canvas5 = document.getElementById('callistoCanvas');

    // moon
    var comp = AdobeAn.getComposition("A3AB6E8092563F44A2D2FE775D5778E1");
    // mars
    var comp2 = AdobeAn.getComposition("D7E3423B551E00458CD72DB4C211F4E1");
    // neptune
    var comp3 = AdobeAn.getComposition('D3ABBD737DF5094980460F0B3F29EB51');
    // jupiter
    var comp4 = AdobeAn.getComposition('41345EC838562E4499D52D822F835ECC');
    // callisto
    var comp5 = AdobeAn.getComposition('1502B00D1E71F64390F1196A3331296B');

    // moon
    var lib = comp.getLibrary();
    // mars
    var lib2 = comp2.getLibrary();
    // neptune
    var lib3 = comp3.getLibrary();
    // jupiter
    var lib4 = comp4.getLibrary();
    // callisto
    var lib5 = comp5.getLibrary();

    //moon
    var loader = new createjs.LoadQueue(false);
    // mars
    var loader2 = new createjs.LoadQueue(false);
    // neptune
    var loader3 = new createjs.LoadQueue(false);
    // jupiter
    var loader4 = new createjs.LoadQueue(false);
    // callisto
    var loader5 = new createjs.LoadQueue(false);

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // moon
        loader.addEventListener("fileload", function (evt) { handleMoonFileLoad(evt, comp) });
        loader.addEventListener("complete", function (evt) { handleMoonComplete(evt, comp) });
        // mars
        loader2.addEventListener("fileload", function (evt) { handleMarsFileLoad(evt, comp2) });
        loader2.addEventListener("complete", function (evt) { handleMarsComplete(evt, comp2) });
        // neptune
        loader3.addEventListener("fileload", function (evt) { handleNeptuneFileLoad(evt, comp3) });
        loader3.addEventListener("complete", function (evt) { handleNeptuneComplete(evt, comp3) });
        // jupiter
        loader4.addEventListener("fileload", function (evt) { handleJupiterFileLoad(evt, comp4) });
        loader4.addEventListener("complete", function (evt) { handleJupiterComplete(evt, comp4) });
        // callisto
        loader5.addEventListener("fileload", function (evt) { handleCallistoFileLoad(evt, comp5) });
        loader5.addEventListener("complete", function (evt) { handleCallistoComplete(evt, comp5) });
    } else {
        // neptune
        loader3.addEventListener("fileload", function (evt) { handleNeptuneFileLoad(evt, comp3) });
        loader3.addEventListener("complete", function (evt) { handleNeptuneComplete(evt, comp3) });
    }

    // moon
    var lib = comp.getLibrary();
    // mars
    var lib2 = comp2.getLibrary();
    // neptune
    var lib3 = comp3.getLibrary();
    // jupiter
    var lib4 = comp4.getLibrary();
    // callisto
    var lib5 = comp5.getLibrary();

    // moon
    loader.loadManifest(lib.properties.manifest);
    // mars
    loader2.loadManifest(lib2.properties.manifest);
    // neptune
    loader3.loadManifest(lib3.properties.manifest);
    // jupiter
    loader4.loadManifest(lib4.properties.manifest);
    // callisto
    loader5.loadManifest(lib5.properties.manifest);

}

// ! MOON
function handleMoonFileLoad(evt, comp) {
    var images = comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleMoonComplete(evt, comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp.getLibrary();
    var ss = comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames });
    }

    exportRoot = new lib.savedAnMoon_HTML5Canvas();
    stage = new lib.Stage(canvas);
    //Registers the "tick" event listener.
    fnStartAnimation = function () {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false, 'both', false, 1, [canvas, anim_container, dom_overlay_container]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}
// ! MARS
function handleMarsFileLoad(evt, comp2) {
    var images = comp2.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleMarsComplete(evt, comp2) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp2.getLibrary();
    var ss = comp2.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    exportRoot = new lib.savedAnMars_HTML5Canvas();
    stage = new lib.Stage(canvas2);
    //Registers the "tick" event listener.
    fnStartAnimation = function () {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false, 'both', false, 1, [canvas2, anim_container, dom_overlay_container]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}
// ! NEPTUNE
function handleNeptuneFileLoad(evt, comp3) {
    var images = comp3.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function handleNeptuneComplete(evt, comp3) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp3.getLibrary();
    var ss = comp3.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    exportRoot = new lib.savedAnNeptune_HTML5Canvas();
    stage = new lib.Stage(canvas3);
    //Registers the "tick" event listener.
    fnStartAnimation = function () {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false, 'both', false, 1, [canvas3, anim_container, dom_overlay_container]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}

// ! JUPITER

function handleJupiterFileLoad(evt, comp4) {
    var images = comp4.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function handleJupiterComplete(evt, comp4) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp4.getLibrary();
    var ss = comp4.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    exportRoot = new lib.savedAnJupiter_HTML5Canvas();
    stage = new lib.Stage(canvas4);
    //Registers the "tick" event listener.
    fnStartAnimation = function () {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false, 'both', false, 1, [canvas4, anim_container, dom_overlay_container]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}

// ! CALLISTO

function handleCallistoFileLoad(evt, comp5) {
    var images = comp5.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function handleCallistoComplete(evt, comp5) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp5.getLibrary();
    var ss = comp5.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    exportRoot = new lib.savedAnCallisto_HTML5Canvas();
    stage = new lib.Stage(canvas5);
    //Registers the "tick" event listener.
    fnStartAnimation = function () {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false, 'both', false, 1, [canvas5, anim_container, dom_overlay_container]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}