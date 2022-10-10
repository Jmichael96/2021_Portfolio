(function (cjs, an) {

	var p; // shortcut to reference prototypes
	var lib = {}; var ss = {}; var img = {};
	lib.ssMetadata = [];


	(lib.AnMovieClip = function () {
		this.actionFrames = [];
		this.ignorePause = false;
		this.gotoAndPlay = function (positionOrLabel) {
			cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
		}
		this.play = function () {
			cjs.MovieClip.prototype.play.call(this);
		}
		this.gotoAndStop = function (positionOrLabel) {
			cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel);
		}
		this.stop = function () {
			cjs.MovieClip.prototype.stop.call(this);
		}
	}).prototype = p = new cjs.MovieClip();
	// symbols:



	(lib.croppedCallisto = function () {
		this.initialize(img.croppedCallisto);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0, 0, 2400, 720);


	// stage content:
	(lib.savedAnCallisto_HTML5Canvas = function (mode, startPosition, loop, reversed) {
		if (loop == null) { loop = true; }
		if (reversed == null) { reversed = false; }
		var props = new Object();
		props.mode = mode;
		props.startPosition = startPosition;
		props.labels = {};
		props.loop = loop;
		props.reversed = reversed;
		cjs.MovieClip.apply(this, [props]);

		// shadow
		this.shape = new cjs.Shape();
		this.shape.graphics.rf(["rgba(255,255,255,0)", "rgba(0,0,0,0.827)"], [0, 1], -32, -18, 0, -32, -18, 520.4).s().p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAABUAhWgABAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg");
		this.shape.setTransform(540.15, 541.15);

		this.timeline.addTween(cjs.Tween.get(this.shape).wait(500));

		// mask_idn (mask)
		var mask = new cjs.Shape();
		mask._off = true;
		mask.graphics.p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAABUAhWgABAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg");
		mask.setTransform(540.15, 541.15);

		// Layer_1
		this.instance = new lib.croppedCallisto();
		this.instance.setTransform(35.55, -266.25, 1.5032, 1.5032, 23.0047);

		var maskedShapeInstanceList = [this.instance];

		for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
			maskedShapeInstanceList[shapedInstanceItr].mask = mask;
		}

		this.timeline.addTween(cjs.Tween.get(this.instance).to({ rotation: 23.0049, x: -1957.85, y: -1110.65 }, 499).wait(1));

		this._renderFirstFrame();

	}).prototype = p = new lib.AnMovieClip();
	p.nominalBounds = new cjs.Rectangle(565, 566, 490.29999999999995, 490.29999999999995);
	// library properties:
	lib.properties = {
		id: '1502B00D1E71F64390F1196A3331296B',
		width: 1080,
		height: 1080,
		fps: 10,
		color: "#000000",
		opacity: 0.00,
		manifest: [
			{ src: "/assets/images/planets/croppedCallisto.jpg", id: "croppedCallisto" }
		],
		preloads: []
	};



	// bootstrap callback support:

	(lib.Stage = function (canvas) {
		createjs.Stage.call(this, canvas);
	}).prototype = p = new createjs.Stage();

	p.setAutoPlay = function (autoPlay) {
		this.tickEnabled = autoPlay;
	}
	p.play = function () { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
	p.stop = function (ms) { if (ms) this.seek(ms); this.tickEnabled = false; }
	p.seek = function (ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
	p.getDuration = function () { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

	p.getTimelinePosition = function () { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

	an.bootcompsLoaded = an.bootcompsLoaded || [];
	if (!an.bootstrapListeners) {
		an.bootstrapListeners = [];
	}

	an.bootstrapCallback = function (fnCallback) {
		an.bootstrapListeners.push(fnCallback);
		if (an.bootcompsLoaded.length > 0) {
			for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
				fnCallback(an.bootcompsLoaded[i]);
			}
		}
	};

	an.compositions = an.compositions || {};
	an.compositions['1502B00D1E71F64390F1196A3331296B'] = {
		getStage: function () { return exportRoot.stage; },
		getLibrary: function () { return lib; },
		getSpriteSheet: function () { return ss; },
		getImages: function () { return img; }
	};

	an.compositionLoaded = function (id) {
		an.bootcompsLoaded.push(id);
		for (var j = 0; j < an.bootstrapListeners.length; j++) {
			an.bootstrapListeners[j](id);
		}
	}

	an.getComposition = function (id) {
		return an.compositions[id];
	}


	an.makeResponsive = function (isResp, respDim, isScale, scaleType, domContainers) {
		var lastW, lastH, lastS = 1;
		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();
		function resizeCanvas() {
			var w = lib.properties.width, h = lib.properties.height;
			var iw = window.innerWidth, ih = window.innerHeight;
			var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
			if (isResp) {
				if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
					sRatio = lastS;
				}
				else if (!isScale) {
					if (iw < w || ih < h)
						sRatio = Math.min(xRatio, yRatio);
				}
				else if (scaleType == 1) {
					sRatio = Math.min(xRatio, yRatio);
				}
				else if (scaleType == 2) {
					sRatio = Math.max(xRatio, yRatio);
				}
			}
			domContainers[0].width = w * pRatio * sRatio;
			domContainers[0].height = h * pRatio * sRatio;
			domContainers.forEach(function (container) {
				// container.style.width = w * sRatio + 'px';				
				// container.style.height = h * sRatio + 'px';			
			});
			stage.scaleX = pRatio * sRatio;
			stage.scaleY = pRatio * sRatio;
			lastW = iw; lastH = ih; lastS = sRatio;
			stage.tickOnUpdate = false;
			stage.update();
			stage.tickOnUpdate = true;
		}
	}
	an.handleSoundStreamOnTick = function (event) {
		if (!event.paused) {
			var stageChild = stage.getChildAt(0);
			if (!stageChild.paused || stageChild.ignorePause) {
				stageChild.syncStreamSounds();
			}
		}
	}


})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;