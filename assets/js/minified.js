function renderHeaderText(){document.getElementById("headerTextRender").innerHTML='<div id="headerTextWrap">\n    <div class="headerTextDash"></div>\n    <p id="headerText">full-stack developer</p>\n    <div class="headerTextDash"></div>\n    </div>'}function resizeNavHandler(){let e=document.getElementById("desktopNav"),t=document.getElementById("mobileNav");window.innerWidth>=1025?(e.style.display="flex",t.style.display="none"):window.innerWidth<=1024&&(e.style.display="none",t.style.display="flex")}document.onreadystatechange=function(){const e=document.querySelector("body"),t=document.querySelector("nav"),n=document.getElementById("sideNav"),i=document.getElementById("aboutSection"),o=document.getElementById("specialtiesSection"),a=document.getElementById("projectSection"),s=document.getElementById("contactSection"),r=document.getElementById("portfolioLoader"),l=document.querySelector(".planetBg");/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||(document.getElementById("mobileCanvas").style.display="none"),"complete"!==document.readyState?(e.style.visibility="hidden",t.style.display="none",n.style.visibility="hidden",i.style.visibility="hidden",o.style.visibility="hidden",a.style.visibility="hidden",s.style.visibility="hidden",r.style.visibility="visible",l.style.display="none"):setTimeout(()=>{e.style.visibility="visible",t.style.display="flex",n.style.visibility="visible",i.style.visibility="visible",o.style.visibility="visible",a.style.visibility="visible",s.style.visibility="visible",r.style.visibility="hidden",l.style.display="block";"jeffrey vanhorn".split("").map(function(e,t){e.indexOf(" ")>=0?$("#headerName").append(`<span class="whiteSpace">${e}</span>`):$("#headerName").append(`<span class="nameChar" style="animation-delay: ${.5+t/6}s;">${e}</span>`)}),setTimeout(()=>{renderHeaderText()},3e3)},2e3)},$(window).on("load",function(){resizeNavHandler(),window.onscroll=(()=>{let e=$(this).scrollTop()+$(this).innerHeight();$(".fade").each(function(){$(this).offset().top+$(this).outerHeight()<e+100?0==$(this).css("opacity")&&$(this).fadeTo(500,1):1==$(this).css("opacity")&&$(this).fadeTo(500,0)});const t=document.getElementById("nav"),n=document.getElementById("scrollTopIcon");this.scrollY<=100?(t.style.height="4rem",t.style.backgroundColor="#000000b0",n.style.display="none"):(t.style.height="3rem",t.style.backgroundColor="black",n.style.display="block"),scrollProgressBar()}),document.getElementById("footerDate").innerHTML=`${(new Date).getFullYear()}`}),window.onresize=function(){resizeNavHandler()},$(".js-link").click(function(e){e.preventDefault();let t=$($(this).attr("href"));if(t.length){let e=t.offset().top-30;$("body, html").animate({scrollTop:e+"px"},1500)}}),$("#mobileNavBtn").click(function(){$(this).toggleClass("open")}),$("#mobileNavBtn").click(function(){$("#sideNav").toggleClass("activeNav")}),$(".mobileLink").click(function(){$("#mobileNavBtn").toggleClass("open"),$("#sideNav").toggleClass("activeNav")});const scrollProgressBar=()=>{let e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;document.getElementById("progressBar").style.width=e+"%"};$(window).on("load",function(){let e=!1;$(window).on("scroll",function(){let t=$(this).scrollTop()+$(this).innerHeight();$("#personalImg").each(function(){if($(this).offset().top+$(this).outerHeight()<t+100&&!e){let t=document.getElementById("aboutTxt");t.innerHTML="";let n=0,i="I'm a recent graduate from the University of Texas' coding boot camp. Since graduation I've been a freelance developer working with my own clients and with other small companies on a variety of projects. Additionally, I've been continuing my education through online platforms and extended learning courses. Outside of work, my free time is spent powerlifting, disc golfing, and expanding my knowledge in graphic design.",o=setInterval(function(){n+=1,t.innerHTML=i.slice(0,n)+' <span style="color: #c75000; font-size: 1.2rem;">|</span>',n===i.length&&(clearInterval(o),t.innerHTML=i,n=0,setInterval(function(){0===n?(t.innerHTML=i+' <span style="color: #c75000; font-size: 1.2rem;">|</span>',n=1):(t.innerHTML=i+'<span style="color: transparent; font-size: 1.2rem;">|</span>',n=0)},500))},40);e=!0,document.getElementById("personalImg").style.opacity=1}})})}),function(e,t){var n,i={},o={},a={};i.ssMetadata=[],(i.AnMovieClip=function(){this.actionFrames=[],this.ignorePause=!1,this.gotoAndPlay=function(t){e.MovieClip.prototype.gotoAndPlay.call(this,t)},this.play=function(){e.MovieClip.prototype.play.call(this)},this.gotoAndStop=function(t){e.MovieClip.prototype.gotoAndStop.call(this,t)},this.stop=function(){e.MovieClip.prototype.stop.call(this)}}).prototype=n=new e.MovieClip,(i.croppedCallisto=function(){this.initialize(a.croppedCallisto)}).prototype=n=new e.Bitmap,n.nominalBounds=new e.Rectangle(0,0,2400,720),(i.savedAnCallisto_HTML5Canvas=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.shape=new e.Shape,this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(0,0,0,0.827)"],[0,1],-32,-18,0,-32,-18,520.4).s().p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAABUAhWgABAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),this.shape.setTransform(540.15,541.15),this.timeline.addTween(e.Tween.get(this.shape).wait(500));var r=new e.Shape;r._off=!0,r.graphics.p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAABUAhWgABAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),r.setTransform(540.15,541.15),this.instance=new i.croppedCallisto,this.instance.setTransform(35.55,-266.25,1.5032,1.5032,23.0047);for(var l=[this.instance],d=0;d<l.length;d++)l[d].mask=r;this.timeline.addTween(e.Tween.get(this.instance).to({rotation:23.0049,x:-1957.85,y:-1110.65},499).wait(1)),this._renderFirstFrame()}).prototype=n=new i.AnMovieClip,n.nominalBounds=new e.Rectangle(565,566,490.29999999999995,490.29999999999995),i.properties={id:"1502B00D1E71F64390F1196A3331296B",width:1080,height:1080,fps:10,color:"#000000",opacity:0,manifest:[{src:"/assets/images/planets/croppedCallisto.jpg",id:"croppedCallisto"}],preloads:[]},(i.Stage=function(e){createjs.Stage.call(this,e)}).prototype=n=new createjs.Stage,n.setAutoPlay=function(e){this.tickEnabled=e},n.play=function(){this.tickEnabled=!0,this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())},n.stop=function(e){e&&this.seek(e),this.tickEnabled=!1},n.seek=function(e){this.tickEnabled=!0,this.getChildAt(0).gotoAndStop(i.properties.fps*e/1e3)},n.getDuration=function(){return this.getChildAt(0).totalFrames/i.properties.fps*1e3},n.getTimelinePosition=function(){return this.getChildAt(0).currentFrame/i.properties.fps*1e3},t.bootcompsLoaded=t.bootcompsLoaded||[],t.bootstrapListeners||(t.bootstrapListeners=[]),t.bootstrapCallback=function(e){if(t.bootstrapListeners.push(e),t.bootcompsLoaded.length>0)for(var n=0;n<t.bootcompsLoaded.length;++n)e(t.bootcompsLoaded[n])},t.compositions=t.compositions||{},t.compositions["1502B00D1E71F64390F1196A3331296B"]={getStage:function(){return exportRoot.stage},getLibrary:function(){return i},getSpriteSheet:function(){return o},getImages:function(){return a}},t.compositionLoaded=function(e){t.bootcompsLoaded.push(e);for(var n=0;n<t.bootstrapListeners.length;n++)t.bootstrapListeners[n](e)},t.getComposition=function(e){return t.compositions[e]},t.makeResponsive=function(e,t,n,o,a){var s,r,l=1;function d(){var d=i.properties.width,p=i.properties.height,c=window.innerWidth,g=window.innerHeight,h=window.devicePixelRatio||1,m=c/d,A=g/p,u=1;e&&("width"==t&&s==c||"height"==t&&r==g?u=l:n?1==o?u=Math.min(m,A):2==o&&(u=Math.max(m,A)):(c<d||g<p)&&(u=Math.min(m,A))),a[0].width=d*h*u,a[0].height=p*h*u,a.forEach(function(e){}),stage.scaleX=h*u,stage.scaleY=h*u,s=c,r=g,l=u,stage.tickOnUpdate=!1,stage.update(),stage.tickOnUpdate=!0}window.addEventListener("resize",d),d()},t.handleSoundStreamOnTick=function(e){if(!e.paused){var t=stage.getChildAt(0);t.paused&&!t.ignorePause||t.syncStreamSounds()}}}(createjs=createjs||{},AdobeAn=AdobeAn||{}),$(window).on("load",function(){let e=!1;$(window).on("scroll",function(){let t=$(this).scrollTop()+$(this).innerHeight();$("#formTitle").each(function(){if($(this).offset().top+$(this).outerHeight()<t-100&&!e){let t=document.getElementById("formTitle");t.innerHTML="";let n=0,i="Send A Message",o=setInterval(function(){n+=1,t.innerHTML=i.slice(0,n)+' <span style="color: #c75000; font-size: 2.2rem;">|</span>',n===i.length&&(clearInterval(o),t.innerHTML=i,n=0,setInterval(function(){0===n?(t.innerHTML=i+'<span style="color: #c75000; font-size: 2.2rem;">|</span>',n=1):(t.innerHTML=i+'<span style="color: transparent; font-size: 2.2rem;">|</span>',n=0)},500))},40);e=!0}})});$(".locationEmail").attr("href","mailto:jeffrey.vanhorn@yahoo.com"),document.getElementById("mapImg").style.display="block",document.getElementById("map").style.display="none",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(document.getElementById("mapImg").style.display="block",document.getElementById("map").style.display="none")}),document.getElementById("submitFormBtn").onclick=(e=>{let t=$("#nameInput").val(),n=$("#emailInput").val().trim().toLowerCase(),i=$("#messageInput").val();if(!t&&!n&&!i)return void openErrModal("Please fill out each input");if(!t)return void openErrModal("Please add a name");n&&/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n)?i?openRobotModal():openErrModal("Please enter a message"):openErrModal("Please enter a valid email")});const openRobotModal=()=>{document.getElementById("robotModalOverlay").classList.add("is-robot-modal-visible"),document.getElementById("robotModal").classList.add("is-robot-modal-visible")};document.getElementById("robotModalCloseBtn").addEventListener("click",function(){document.getElementById("robotModalOverlay").classList.remove("is-robot-modal-visible"),document.getElementById("robotModal").classList.remove("is-robot-modal-visible")}),document.getElementById("robotModalOverlay").addEventListener("click",function(){document.getElementById("robotModalOverlay").classList.remove("is-robot-modal-visible"),document.getElementById("robotModal").classList.remove("is-robot-modal-visible")});const openErrModal=e=>{document.getElementById("errOverlay").classList.add("is-visible"),document.getElementById("errModal").classList.add("is-visible"),document.getElementById("modalMessage").innerHTML=e};var createjs,AdobeAn,canvas,canvas2,canvas3,canvas4,canvas5,canvas6,stage,exportRoot,anim_container,dom_overlay_container,fnStartAnimation;function initPlanets(){canvas=document.getElementById("moonCanvas"),canvas2=document.getElementById("marsCanvas"),canvas3=document.getElementById("neptuneCanvas"),canvas4=document.getElementById("jupiterCanvas"),canvas5=document.getElementById("callistoCanvas");var e=AdobeAn.getComposition("A3AB6E8092563F44A2D2FE775D5778E1"),t=AdobeAn.getComposition("D7E3423B551E00458CD72DB4C211F4E1"),n=AdobeAn.getComposition("D3ABBD737DF5094980460F0B3F29EB51"),i=AdobeAn.getComposition("41345EC838562E4499D52D822F835ECC"),o=AdobeAn.getComposition("1502B00D1E71F64390F1196A3331296B"),a=e.getLibrary(),s=t.getLibrary(),r=n.getLibrary(),l=i.getLibrary(),d=o.getLibrary(),p=new createjs.LoadQueue(!1),c=new createjs.LoadQueue(!1),g=new createjs.LoadQueue(!1),h=new createjs.LoadQueue(!1),m=new createjs.LoadQueue(!1);if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){canvas6=document.getElementById("mobileCanvas");let e=AdobeAn.getComposition("D7E3423B551E00458CD72DB4C211F4E1");var A=e.getLibrary();let n=new createjs.LoadQueue(!1);n.addEventListener("fileload",function(e){handleMobileFileLoad(e,t)}),n.addEventListener("complete",function(e){handleMobileCanvasComplete(e,t)});A=e.getLibrary();n.loadManifest(A.properties.manifest)}else p.addEventListener("fileload",function(t){handleMoonFileLoad(t,e)}),p.addEventListener("complete",function(t){handleMoonComplete(t,e)}),c.addEventListener("fileload",function(e){handleMarsFileLoad(e,t)}),c.addEventListener("complete",function(e){handleMarsComplete(e,t)}),g.addEventListener("fileload",function(e){handleNeptuneFileLoad(e,n)}),g.addEventListener("complete",function(e){handleNeptuneComplete(e,n)}),h.addEventListener("fileload",function(e){handleJupiterFileLoad(e,i)}),h.addEventListener("complete",function(e){handleJupiterComplete(e,i)}),m.addEventListener("fileload",function(e){handleCallistoFileLoad(e,o)}),m.addEventListener("complete",function(e){handleCallistoComplete(e,o)});a=e.getLibrary(),s=t.getLibrary(),r=n.getLibrary(),l=i.getLibrary(),d=o.getLibrary();p.loadManifest(a.properties.manifest),c.loadManifest(s.properties.manifest),g.loadManifest(r.properties.manifest),h.loadManifest(l.properties.manifest),m.loadManifest(d.properties.manifest)}function handleMoonFileLoad(e,t){var n=t.getImages();e&&"image"==e.item.type&&(n[e.item.id]=e.result)}function handleMoonComplete(e,t){var n=t.getLibrary(),o=t.getSpriteSheet(),a=e.target,s=n.ssMetadata;for(i=0;i<s.length;i++)o[s[i].name]=new createjs.SpriteSheet({images:[a.getResult(s[i].name)],frames:s[i].frames});exportRoot=new n.savedAnMoon_HTML5Canvas,stage=new n.Stage(canvas),fnStartAnimation=function(){stage.addChild(exportRoot),createjs.Ticker.framerate=n.properties.fps,createjs.Ticker.addEventListener("tick",stage)},AdobeAn.makeResponsive(!1,"both",!1,1,[canvas,anim_container,dom_overlay_container]),AdobeAn.compositionLoaded(n.properties.id),fnStartAnimation()}function handleMarsFileLoad(e,t){var n=t.getImages();e&&"image"==e.item.type&&(n[e.item.id]=e.result)}function handleMarsComplete(e,t){var n=t.getLibrary(),o=t.getSpriteSheet(),a=e.target,s=n.ssMetadata;for(i=0;i<s.length;i++)o[s[i].name]=new createjs.SpriteSheet({images:[a.getResult(s[i].name)],frames:s[i].frames});exportRoot=new n.savedAnMars_HTML5Canvas,stage=new n.Stage(canvas2),fnStartAnimation=function(){stage.addChild(exportRoot),createjs.Ticker.framerate=n.properties.fps,createjs.Ticker.addEventListener("tick",stage)},AdobeAn.makeResponsive(!1,"both",!1,1,[canvas2,anim_container,dom_overlay_container]),AdobeAn.compositionLoaded(n.properties.id),fnStartAnimation()}function handleNeptuneFileLoad(e,t){var n=t.getImages();e&&"image"==e.item.type&&(n[e.item.id]=e.result)}function handleNeptuneComplete(e,t){var n=t.getLibrary(),o=t.getSpriteSheet(),a=e.target,s=n.ssMetadata;for(i=0;i<s.length;i++)o[s[i].name]=new createjs.SpriteSheet({images:[a.getResult(s[i].name)],frames:s[i].frames});exportRoot=new n.savedAnNeptune_HTML5Canvas,stage=new n.Stage(canvas3),fnStartAnimation=function(){stage.addChild(exportRoot),createjs.Ticker.framerate=n.properties.fps,createjs.Ticker.addEventListener("tick",stage)},AdobeAn.makeResponsive(!1,"both",!1,1,[canvas3,anim_container,dom_overlay_container]),AdobeAn.compositionLoaded(n.properties.id),fnStartAnimation()}function handleJupiterFileLoad(e,t){var n=t.getImages();e&&"image"==e.item.type&&(n[e.item.id]=e.result)}function handleJupiterComplete(e,t){var n=t.getLibrary(),o=t.getSpriteSheet(),a=e.target,s=n.ssMetadata;for(i=0;i<s.length;i++)o[s[i].name]=new createjs.SpriteSheet({images:[a.getResult(s[i].name)],frames:s[i].frames});exportRoot=new n.savedAnJupiter_HTML5Canvas,stage=new n.Stage(canvas4),fnStartAnimation=function(){stage.addChild(exportRoot),createjs.Ticker.framerate=n.properties.fps,createjs.Ticker.addEventListener("tick",stage)},AdobeAn.makeResponsive(!1,"both",!1,1,[canvas4,anim_container,dom_overlay_container]),AdobeAn.compositionLoaded(n.properties.id),fnStartAnimation()}function handleCallistoFileLoad(e,t){var n=t.getImages();e&&"image"==e.item.type&&(n[e.item.id]=e.result)}function handleCallistoComplete(e,t){var n=t.getLibrary(),o=t.getSpriteSheet(),a=e.target,s=n.ssMetadata;for(i=0;i<s.length;i++)o[s[i].name]=new createjs.SpriteSheet({images:[a.getResult(s[i].name)],frames:s[i].frames});exportRoot=new n.savedAnCallisto_HTML5Canvas,stage=new n.Stage(canvas5),fnStartAnimation=function(){stage.addChild(exportRoot),createjs.Ticker.framerate=n.properties.fps,createjs.Ticker.addEventListener("tick",stage)},AdobeAn.makeResponsive(!1,"both",!1,1,[canvas5,anim_container,dom_overlay_container]),AdobeAn.compositionLoaded(n.properties.id),fnStartAnimation()}function handleMobileFileLoad(e,t){var n=t.getImages();e&&"image"==e.item.type&&(n[e.item.id]=e.result)}function handleMobileCanvasComplete(e,t){var n=t.getLibrary(),o=t.getSpriteSheet(),a=e.target,s=n.ssMetadata;for(i=0;i<s.length;i++)o[s[i].name]=new createjs.SpriteSheet({images:[a.getResult(s[i].name)],frames:s[i].frames});exportRoot=new n.savedAnMars_HTML5Canvas,stage=new n.Stage(canvas6),fnStartAnimation=function(){stage.addChild(exportRoot),createjs.Ticker.framerate=n.properties.fps,createjs.Ticker.addEventListener("tick",stage)},AdobeAn.makeResponsive(!1,"both",!1,1,[canvas6,anim_container,dom_overlay_container]),AdobeAn.compositionLoaded(n.properties.id),fnStartAnimation()}document.getElementById("close-btn").addEventListener("click",function(){document.getElementById("errOverlay").classList.remove("is-visible"),document.getElementById("errModal").classList.remove("is-visible")}),document.getElementById("errOverlay").addEventListener("click",function(){document.getElementById("errOverlay").classList.remove("is-visible"),document.getElementById("errModal").classList.remove("is-visible")}),function(e,t){var n,i={},o={},a={};i.ssMetadata=[],(i.AnMovieClip=function(){this.actionFrames=[],this.ignorePause=!1,this.gotoAndPlay=function(t){e.MovieClip.prototype.gotoAndPlay.call(this,t)},this.play=function(){e.MovieClip.prototype.play.call(this)},this.gotoAndStop=function(t){e.MovieClip.prototype.gotoAndStop.call(this,t)},this.stop=function(){e.MovieClip.prototype.stop.call(this)}}).prototype=n=new e.MovieClip,(i.jupiter1=function(){this.initialize(a.jupiter1)}).prototype=n=new e.Bitmap,n.nominalBounds=new e.Rectangle(0,0,2310,1024),(i.fullMap=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.instance=new i.jupiter1,this.instance.setTransform(2388.5,0,1.0346,1.0346),this.instance_1=new i.jupiter1,this.instance_1.setTransform(0,.15,1.0346,1.0346),this.timeline.addTween(e.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1)),this._renderFirstFrame()}).prototype=n=new e.MovieClip,n.nominalBounds=new e.Rectangle(0,0,4778.5,1059.6),(i.savedAnJupiter_HTML5Canvas=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.shape=new e.Shape,this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(0,0,0,0.827)"],[0,1],-40,-22.9,0,-40,-22.9,520.4).s().p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAABUAhWgABAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),this.shape.setTransform(540.15,541.15),this.timeline.addTween(e.Tween.get(this.shape).wait(500));var r=new e.Shape;r._off=!0,r.graphics.p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAABUAhWgABAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),r.setTransform(540.15,541.15),this.instance=new i.fullMap("synched",0),this.instance.setTransform(2337.75,821.25,1,1,8.9504,0,0,2389.2,529.8);for(var l=[this.instance],d=0;d<l.length;d++)l[d].mask=r;this.timeline.addTween(e.Tween.get(this.instance).to({x:-22.8,y:451.15},499).wait(1)),this._renderFirstFrame()}).prototype=n=new i.AnMovieClip,n.nominalBounds=new e.Rectangle(565,566,490.29999999999995,490.29999999999995),i.properties={id:"41345EC838562E4499D52D822F835ECC",width:1080,height:1080,fps:10,color:"#000000",opacity:0,manifest:[{src:"/assets/images/planets/jupiter1.jpg",id:"jupiter1"}],preloads:[]},(i.Stage=function(e){createjs.Stage.call(this,e)}).prototype=n=new createjs.Stage,n.setAutoPlay=function(e){this.tickEnabled=e},n.play=function(){this.tickEnabled=!0,this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())},n.stop=function(e){e&&this.seek(e),this.tickEnabled=!1},n.seek=function(e){this.tickEnabled=!0,this.getChildAt(0).gotoAndStop(i.properties.fps*e/1e3)},n.getDuration=function(){return this.getChildAt(0).totalFrames/i.properties.fps*1e3},n.getTimelinePosition=function(){return this.getChildAt(0).currentFrame/i.properties.fps*1e3},t.bootcompsLoaded=t.bootcompsLoaded||[],t.bootstrapListeners||(t.bootstrapListeners=[]),t.bootstrapCallback=function(e){if(t.bootstrapListeners.push(e),t.bootcompsLoaded.length>0)for(var n=0;n<t.bootcompsLoaded.length;++n)e(t.bootcompsLoaded[n])},t.compositions=t.compositions||{},t.compositions["41345EC838562E4499D52D822F835ECC"]={getStage:function(){return exportRoot.stage},getLibrary:function(){return i},getSpriteSheet:function(){return o},getImages:function(){return a}},t.compositionLoaded=function(e){t.bootcompsLoaded.push(e);for(var n=0;n<t.bootstrapListeners.length;n++)t.bootstrapListeners[n](e)},t.getComposition=function(e){return t.compositions[e]},t.makeResponsive=function(e,t,n,o,a){var s,r,l=1;function d(){var d=i.properties.width,p=i.properties.height,c=window.innerWidth,g=window.innerHeight,h=window.devicePixelRatio||1,m=c/d,A=g/p,u=1;e&&("width"==t&&s==c||"height"==t&&r==g?u=l:n?1==o?u=Math.min(m,A):2==o&&(u=Math.max(m,A)):(c<d||g<p)&&(u=Math.min(m,A))),a[0].width=d*h*u,a[0].height=p*h*u,a.forEach(function(e){}),stage.scaleX=h*u,stage.scaleY=h*u,s=c,r=g,l=u,stage.tickOnUpdate=!1,stage.update(),stage.tickOnUpdate=!0}window.addEventListener("resize",d),d()},t.handleSoundStreamOnTick=function(e){if(!e.paused){var t=stage.getChildAt(0);t.paused&&!t.ignorePause||t.syncStreamSounds()}}}(createjs=createjs||{},AdobeAn=AdobeAn||{}),function(e,t){var n,i={},o={},a={};i.ssMetadata=[],(i.AnMovieClip=function(){this.actionFrames=[],this.ignorePause=!1,this.gotoAndPlay=function(t){e.MovieClip.prototype.gotoAndPlay.call(this,t)},this.play=function(){e.MovieClip.prototype.play.call(this)},this.gotoAndStop=function(t){e.MovieClip.prototype.gotoAndStop.call(this,t)},this.stop=function(){e.MovieClip.prototype.stop.call(this)}}).prototype=n=new e.MovieClip,(i.croppedMars=function(){this.initialize(a.croppedMars)}).prototype=n=new e.Bitmap,n.nominalBounds=new e.Rectangle(0,0,2400,720),(i.savedAnMars_HTML5Canvas=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.shape=new e.Shape,this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(0,0,0,0.827)"],[0,1],-32,-24,0,-32,-24,520.4).s().p("Eg46A46UgXlgXkAAAghWUAAAghVAXlgXlUAXlgXlAhVAAAUAhWAAAAXkAXlUAXmAXlAAAAhVUAAAAhWgXmAXkUgXkAXmghWAAAUghVAAAgXlgXmg"),this.shape.setTransform(540,540),this.timeline.addTween(e.Tween.get(this.shape).wait(500));var r=new e.Shape;r._off=!0,r.graphics.p("Eg46A46UgXlgXkAAAghWUAAAghVAXlgXlUAXlgXlAhVAAAUAhWAAAAXkAXlUAXmAXlAAAAhVUAAAAhWgXmAXkUgXkAXmghWAAAUghVAAAgXlgXmg"),r.setTransform(540,540),this.instance=new i.croppedMars,this.instance.setTransform(127.25,-110.6,1.4914,1.4914,13.6969);for(var l=[this.instance],d=0;d<l.length;d++)l[d].mask=r;this.timeline.addTween(e.Tween.get(this.instance).to({x:-1956.5,y:-617.65},499).wait(1)),this._renderFirstFrame()}).prototype=n=new i.AnMovieClip,n.nominalBounds=new e.Rectangle(564.9,564.9,490.30000000000007,490.30000000000007),i.properties={id:"D7E3423B551E00458CD72DB4C211F4E1",width:1080,height:1080,fps:10,color:"#000000",opacity:0,manifest:[{src:"/assets/images/planets/croppedMars.jpg",id:"croppedMars"}],preloads:[]},(i.Stage=function(e){createjs.Stage.call(this,e)}).prototype=n=new createjs.Stage,n.setAutoPlay=function(e){this.tickEnabled=e},n.play=function(){this.tickEnabled=!0,this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())},n.stop=function(e){e&&this.seek(e),this.tickEnabled=!1},n.seek=function(e){this.tickEnabled=!0,this.getChildAt(0).gotoAndStop(i.properties.fps*e/1e3)},n.getDuration=function(){return this.getChildAt(0).totalFrames/i.properties.fps*1e3},n.getTimelinePosition=function(){return this.getChildAt(0).currentFrame/i.properties.fps*1e3},t.bootcompsLoaded=t.bootcompsLoaded||[],t.bootstrapListeners||(t.bootstrapListeners=[]),t.bootstrapCallback=function(e){if(t.bootstrapListeners.push(e),t.bootcompsLoaded.length>0)for(var n=0;n<t.bootcompsLoaded.length;++n)e(t.bootcompsLoaded[n])},t.compositions=t.compositions||{},t.compositions.D7E3423B551E00458CD72DB4C211F4E1={getStage:function(){return exportRoot.stage},getLibrary:function(){return i},getSpriteSheet:function(){return o},getImages:function(){return a}},t.compositionLoaded=function(e){t.bootcompsLoaded.push(e);for(var n=0;n<t.bootstrapListeners.length;n++)t.bootstrapListeners[n](e)},t.getComposition=function(e){return t.compositions[e]},t.makeResponsive=function(e,t,n,o,a){var s,r,l=1;function d(){var d=i.properties.width,p=i.properties.height,c=window.innerWidth,g=window.innerHeight,h=window.devicePixelRatio||1,m=c/d,A=g/p,u=1;e&&("width"==t&&s==c||"height"==t&&r==g?u=l:n?1==o?u=Math.min(m,A):2==o&&(u=Math.max(m,A)):(c<d||g<p)&&(u=Math.min(m,A))),a[0].width=d*h*u,a[0].height=p*h*u,a.forEach(function(e){}),stage.scaleX=h*u,stage.scaleY=h*u,s=c,r=g,l=u,stage.tickOnUpdate=!1,stage.update(),stage.tickOnUpdate=!0}window.addEventListener("resize",d),d()},t.handleSoundStreamOnTick=function(e){if(!e.paused){var t=stage.getChildAt(0);t.paused&&!t.ignorePause||t.syncStreamSounds()}}}(createjs=createjs||{},AdobeAn=AdobeAn||{}),function(e,t){var n,i={},o={},a={};i.ssMetadata=[],(i.AnMovieClip=function(){this.actionFrames=[],this.ignorePause=!1,this.gotoAndPlay=function(t){e.MovieClip.prototype.gotoAndPlay.call(this,t)},this.play=function(){e.MovieClip.prototype.play.call(this)},this.gotoAndStop=function(t){e.MovieClip.prototype.gotoAndStop.call(this,t)},this.stop=function(){e.MovieClip.prototype.stop.call(this)}}).prototype=n=new e.MovieClip,(i.croppedMoon=function(){this.initialize(a.croppedMoon)}).prototype=n=new e.Bitmap,n.nominalBounds=new e.Rectangle(0,0,2400,720),(i.savedAnMoon_HTML5Canvas=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.shape=new e.Shape,this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(0,0,0,0.827)"],[0,1],-40,-32,0,-40,-32,520.4).s().p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAAAUAhWAAAAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),this.shape.setTransform(540.15,542.15),this.timeline.addTween(e.Tween.get(this.shape).wait(500));var r=new e.Shape;r._off=!0,r.graphics.p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAAAUAhWAAAAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),r.setTransform(540.15,542.15),this.instance=new i.croppedMoon,this.instance.setTransform(104.2,-137.1,1.4958,1.4958,15.9624);for(var l=[this.instance],d=0;d<l.length;d++)l[d].mask=r;this.timeline.addTween(e.Tween.get(this.instance).to({x:-1963.6,y:-730.35},499).wait(1)),this._renderFirstFrame()}).prototype=n=new i.AnMovieClip,n.nominalBounds=new e.Rectangle(565,567,490.29999999999995,490.29999999999995),i.properties={id:"A3AB6E8092563F44A2D2FE775D5778E1",width:1080,height:1080,fps:10,color:"#000000",opacity:0,manifest:[{src:"/assets/images/planets/croppedMoon.jpg",id:"croppedMoon"}],preloads:[]},(i.Stage=function(e){createjs.Stage.call(this,e)}).prototype=n=new createjs.Stage,n.setAutoPlay=function(e){this.tickEnabled=e},n.play=function(){this.tickEnabled=!0,this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())},n.stop=function(e){e&&this.seek(e),this.tickEnabled=!1},n.seek=function(e){this.tickEnabled=!0,this.getChildAt(0).gotoAndStop(i.properties.fps*e/1e3)},n.getDuration=function(){return this.getChildAt(0).totalFrames/i.properties.fps*1e3},n.getTimelinePosition=function(){return this.getChildAt(0).currentFrame/i.properties.fps*1e3},t.bootcompsLoaded=t.bootcompsLoaded||[],t.bootstrapListeners||(t.bootstrapListeners=[]),t.bootstrapCallback=function(e){if(t.bootstrapListeners.push(e),t.bootcompsLoaded.length>0)for(var n=0;n<t.bootcompsLoaded.length;++n)e(t.bootcompsLoaded[n])},t.compositions=t.compositions||{},t.compositions.A3AB6E8092563F44A2D2FE775D5778E1={getStage:function(){return exportRoot.stage},getLibrary:function(){return i},getSpriteSheet:function(){return o},getImages:function(){return a}},t.compositionLoaded=function(e){t.bootcompsLoaded.push(e);for(var n=0;n<t.bootstrapListeners.length;n++)t.bootstrapListeners[n](e)},t.getComposition=function(e){return t.compositions[e]},t.makeResponsive=function(e,t,n,o,a){var s,r,l=1;function d(){var d=i.properties.width,p=i.properties.height,c=window.innerWidth,g=window.innerHeight,h=window.devicePixelRatio||1,m=c/d,A=g/p,u=1;e&&("width"==t&&s==c||"height"==t&&r==g?u=l:n?1==o?u=Math.min(m,A):2==o&&(u=Math.max(m,A)):(c<d||g<p)&&(u=Math.min(m,A))),a[0].width=d*h*u,a[0].height=p*h*u,a.forEach(function(e){}),stage.scaleX=h*u,stage.scaleY=h*u,s=c,r=g,l=u,stage.tickOnUpdate=!1,stage.update(),stage.tickOnUpdate=!0}window.addEventListener("resize",d),d()},t.handleSoundStreamOnTick=function(e){if(!e.paused){var t=stage.getChildAt(0);t.paused&&!t.ignorePause||t.syncStreamSounds()}}}(createjs=createjs||{},AdobeAn=AdobeAn||{}),function(e,t){var n,i={},o={},a={};i.ssMetadata=[{name:"neptune_atlas_1",frames:[[0,0,1440,720]]}],(i.AnMovieClip=function(){this.actionFrames=[],this.ignorePause=!1,this.gotoAndPlay=function(t){e.MovieClip.prototype.gotoAndPlay.call(this,t)},this.play=function(){e.MovieClip.prototype.play.call(this)},this.gotoAndStop=function(t){e.MovieClip.prototype.gotoAndStop.call(this,t)},this.stop=function(){e.MovieClip.prototype.stop.call(this)}}).prototype=n=new e.MovieClip,(i.neptune=function(){this.initialize(o.neptune_atlas_1),this.gotoAndStop(0)}).prototype=n=new e.Sprite,(i.fullMap=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.instance=new i.neptune,this.instance.setTransform(2127.5,0,1.4778,1.4778),this.instance_1=new i.neptune,this.instance_1.setTransform(0,0,1.4778,1.4778),this.timeline.addTween(e.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1)),this._renderFirstFrame()}).prototype=n=new e.MovieClip,n.nominalBounds=new e.Rectangle(0,0,4255.6,1064.1),(i.savedAnNeptune_HTML5Canvas=function(t,n,o,a){null==o&&(o=!0),null==a&&(a=!1);var s=new Object;s.mode=t,s.startPosition=n,s.labels={},s.loop=o,s.reversed=a,e.MovieClip.apply(this,[s]),this.shape=new e.Shape,this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(0,0,0,0.827)"],[0,1],-46,-34,0,-46,-34,520.4).s().p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAAAUAhWAAAAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),this.shape.setTransform(540.15,542.15),this.timeline.addTween(e.Tween.get(this.shape).wait(500));var r=new e.Shape;r._off=!0,r.graphics.p("Eg46A46UgXlgXkAABghWUgABghVAXlgXlUAXlgXlAhVAAAUAhWAAAAXlAXlUAXlAXlAAAAhVUAAAAhWgXlAXkUgXlAXmghWAAAUghVAAAgXlgXmg"),r.setTransform(540.15,542.15),this.instance=new i.fullMap("synched",0),this.instance.setTransform(1901.85,756.2,1,1,8.9779,0,0,2127.8,532);for(var l=[this.instance],d=0;d<l.length;d++)l[d].mask=r;this.timeline.addTween(e.Tween.get(this.instance).to({x:-198.75,y:421.2},499).wait(1)),this._renderFirstFrame()}).prototype=n=new i.AnMovieClip,n.nominalBounds=new e.Rectangle(565,567,490.29999999999995,490.29999999999995),i.properties={id:"D3ABBD737DF5094980460F0B3F29EB51",width:1080,height:1080,fps:15,color:"#000000",opacity:0,manifest:[{src:"/assets/images/planets/neptune_atlas_1.png",id:"neptune_atlas_1"}],preloads:[]},(i.Stage=function(e){createjs.Stage.call(this,e)}).prototype=n=new createjs.Stage,n.setAutoPlay=function(e){this.tickEnabled=e},n.play=function(){this.tickEnabled=!0,this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())},n.stop=function(e){e&&this.seek(e),this.tickEnabled=!1},n.seek=function(e){this.tickEnabled=!0,this.getChildAt(0).gotoAndStop(i.properties.fps*e/1e3)},n.getDuration=function(){return this.getChildAt(0).totalFrames/i.properties.fps*1e3},n.getTimelinePosition=function(){return this.getChildAt(0).currentFrame/i.properties.fps*1e3},t.bootcompsLoaded=t.bootcompsLoaded||[],t.bootstrapListeners||(t.bootstrapListeners=[]),t.bootstrapCallback=function(e){if(t.bootstrapListeners.push(e),t.bootcompsLoaded.length>0)for(var n=0;n<t.bootcompsLoaded.length;++n)e(t.bootcompsLoaded[n])},t.compositions=t.compositions||{},t.compositions.D3ABBD737DF5094980460F0B3F29EB51={getStage:function(){return exportRoot.stage},getLibrary:function(){return i},getSpriteSheet:function(){return o},getImages:function(){return a}},t.compositionLoaded=function(e){t.bootcompsLoaded.push(e);for(var n=0;n<t.bootstrapListeners.length;n++)t.bootstrapListeners[n](e)},t.getComposition=function(e){return t.compositions[e]},t.makeResponsive=function(e,t,n,o,a){var s,r,l=1;function d(){var d=i.properties.width,p=i.properties.height,c=window.innerWidth,g=window.innerHeight,h=window.devicePixelRatio||1,m=c/d,A=g/p,u=1;e&&("width"==t&&s==c||"height"==t&&r==g?u=l:n?1==o?u=Math.min(m,A):2==o&&(u=Math.max(m,A)):(c<d||g<p)&&(u=Math.min(m,A))),a[0].width=d*h*u,a[0].height=p*h*u,a.forEach(function(e){}),stage.scaleX=h*u,stage.scaleY=h*u,s=c,r=g,l=u,stage.tickOnUpdate=!1,stage.update(),stage.tickOnUpdate=!0}window.addEventListener("resize",d),d()},t.handleSoundStreamOnTick=function(e){if(!e.paused){var t=stage.getChildAt(0);t.paused&&!t.ignorePause||t.syncStreamSounds()}}}(createjs=createjs||{},AdobeAn=AdobeAn||{}),$(window).on("load",function(){let e=!1;$(window).on("scroll",function(){let t=$(this).scrollTop()+$(this).innerHeight();$("#specialtiesTitle").each(function(){if($(this).offset().top+$(this).outerHeight()<t-100&&!e){let t=document.getElementById("specialtiesTitle");t.innerHTML="";let n=0,i="Specialties & Experience",o=setInterval(function(){n+=1,t.innerHTML=i.slice(0,n)+' <span style="color: #c75000; font-size: 2.2rem;">|</span>',n===i.length&&(clearInterval(o),t.innerHTML=i,n=0,setInterval(function(){0===n?(t.innerHTML=i+' <span style="color: #c75000; font-size: 2.2rem;">|</span>',n=1):(t.innerHTML=i+'<span style="color: transparent; font-size: 2.2rem;">|</span>',n=0)},500))},40);e=!0}})}),TagCanvas.Start("myCanvas","tags",{textColour:"white",outlineColour:"transparent",bgOutlineThickness:0,reverse:!0,depth:.05,decel:.98,maxSpeed:.04,initial:[.1,-.1],pinchZoom:!0,zoomMax:1,shuffleTags:!0,zoom:.85})});