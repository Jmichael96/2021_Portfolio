var canvas, canvas2, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function initPlanets() {
    canvas = document.getElementById("moonCanvas");
    canvas2 = document.getElementById('marsCanvas');
    // moon
    var comp = AdobeAn.getComposition("A3AB6E8092563F44A2D2FE775D5778E1");
    // mars
    var comp2 = AdobeAn.getComposition("D7E3423B551E00458CD72DB4C211F4E1");
    // moon
    var lib = comp.getLibrary();
    // mars
    var lib2 = comp2.getLibrary();
    //moon
    var loader = new createjs.LoadQueue(false);
    // mars
    var loader2 = new createjs.LoadQueue(false);
    // moon
    loader.addEventListener("fileload", function (evt) { handleMoonFileLoad(evt, comp) });
    loader.addEventListener("complete", function (evt) { handleMoonComplete(evt, comp) });
    // mars
    loader2.addEventListener("fileload", function (evt) { handleMarsFileLoad(evt, comp2) });
    loader2.addEventListener("complete", function (evt) { handleMarsComplete(evt, comp2) });
    // moon
    var lib = comp.getLibrary();
    // mars
    var lib2 = comp2.getLibrary();
    // moon
    loader.loadManifest(lib.properties.manifest);
    // mars
    loader2.loadManifest(lib2.properties.manifest);
}
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