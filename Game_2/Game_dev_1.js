(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Game_dev_1_atlas_1", frames: [[0,0,1896,1834]]},
		{name:"Game_dev_1_atlas_2", frames: [[0,0,1567,1567]]},
		{name:"Game_dev_1_atlas_3", frames: [[0,0,1425,1411]]},
		{name:"Game_dev_1_atlas_4", frames: [[0,0,1492,1119]]},
		{name:"Game_dev_1_atlas_5", frames: [[0,0,682,2000],[684,0,671,2000],[1357,0,671,2000]]},
		{name:"Game_dev_1_atlas_6", frames: [[0,0,1165,1122]]},
		{name:"Game_dev_1_atlas_7", frames: [[0,0,1000,1000],[0,1002,1000,1000],[1002,0,1000,1000],[1002,1002,1000,1000]]},
		{name:"Game_dev_1_atlas_8", frames: [[1114,569,500,500],[0,0,1112,834],[0,836,1112,834],[1616,569,360,360],[1616,931,349,371],[1114,0,872,567]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Apfel = function() {
	this.initialize(ss["Game_dev_1_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.bier3 = function() {
	this.initialize(img.bier3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1449,3205);


(lib.bon = function() {
	this.initialize(img.bon);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4268,2859);


(lib.chi5 = function() {
	this.initialize(ss["Game_dev_1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.done = function() {
	this.initialize(ss["Game_dev_1_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Eis3 = function() {
	this.initialize(ss["Game_dev_1_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.fsd = function() {
	this.initialize(img.fsd);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3126,3126);


(lib.gameend = function() {
	this.initialize(ss["Game_dev_1_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.gamestart = function() {
	this.initialize(ss["Game_dev_1_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.honeypng = function() {
	this.initialize(ss["Game_dev_1_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Honig = function() {
	this.initialize(ss["Game_dev_1_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.icons2 = function() {
	this.initialize(ss["Game_dev_1_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Ingwer2 = function() {
	this.initialize(img.Ingwer2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2084,1893);


(lib.mimi2 = function() {
	this.initialize(img.mimi2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4124,2506);


(lib.Nüsse = function() {
	this.initialize(ss["Game_dev_1_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Oma_happy = function() {
	this.initialize(ss["Game_dev_1_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Oma_neutral = function() {
	this.initialize(ss["Game_dev_1_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Oma_sad = function() {
	this.initialize(ss["Game_dev_1_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.sa7 = function() {
	this.initialize(img.sa7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1548,2076);


(lib.saddone2 = function() {
	this.initialize(img.saddone2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,1337);


(lib.Schokolade = function() {
	this.initialize(ss["Game_dev_1_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Suppe = function() {
	this.initialize(ss["Game_dev_1_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Teebeutel2 = function() {
	this.initialize(ss["Game_dev_1_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Unbenannt1 = function() {
	this.initialize(ss["Game_dev_1_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.wall = function() {
	this.initialize(ss["Game_dev_1_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Zwiebel = function() {
	this.initialize(img.Zwiebel);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2085,1893);


(lib.restartButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(128,183,144,0.008)").s().p("EghmAJYIAAyvMBDMAAAIAASvg");
	this.shape.setTransform(215.05,60);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,430.1,120);


(lib.person = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		playSound("button22wav");
		this.stop();
	}
	this.frame_2 = function() {
		playSound("button22wav");
	}
	this.frame_3 = function() {
		playSound("button22wav");
	}
	this.frame_4 = function() {
		playSound("button22wav");
	}
	this.frame_5 = function() {
		playSound("button22wav");
	}
	this.frame_6 = function() {
		playSound("button22wav");
	}
	this.frame_7 = function() {
		playSound("button22wav");
	}
	this.frame_8 = function() {
		playSound("button22wav");
	}
	this.frame_9 = function() {
		playSound("button37a");
	}
	this.frame_10 = function() {
		playSound("button37a");
	}
	this.frame_11 = function() {
		playSound("button37a");
	}
	this.frame_12 = function() {
		playSound("button37a");
	}
	this.frame_13 = function() {
		playSound("button37a");
	}
	this.frame_14 = function() {
		playSound("button37a");
	}
	this.frame_15 = function() {
		playSound("button37a");
	}
	this.frame_16 = function() {
		playSound("button37a");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(1).call(this.frame_10).wait(1).call(this.frame_11).wait(1).call(this.frame_12).wait(1).call(this.frame_13).wait(1).call(this.frame_14).wait(1).call(this.frame_15).wait(1).call(this.frame_16).wait(12));

	// Ebene_1
	this.instance = new lib.Oma_neutral();
	this.instance.setTransform(261,0,0.5548,0.5548);

	this.instance_1 = new lib.icons2();
	this.instance_1.setTransform(-24,715,0.0765,0.0765);

	this.text = new cjs.Text("Oh nein, eine Orange! Zitrusfrüchte sind zwar reich an Vitamin C, aber die Säure kann deinen Hals noch mehr reizen, wenn er schon entzündet ist.", "65px 'Arial'", "#990000");
	this.text.lineHeight = 75;
	this.text.lineWidth = 1000;
	this.text.parent = this;
	this.text.setTransform(-928.05,343.55);

	this.instance_2 = new lib.mimi2();
	this.instance_2.setTransform(-1037,222,0.315,0.315);

	this.instance_3 = new lib.Oma_sad();
	this.instance_3.setTransform(261,0,0.5548,0.5548);

	this.instance_4 = new lib.Oma_happy();
	this.instance_4.setTransform(261,0,0.5548,0.5548);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Oh nein, eine Orange! Zitrusfrüchte sind zwar reich an Vitamin C, aber die Säure kann deinen Hals noch mehr reizen, wenn er schon entzündet ist.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Chips sind keine gute Idee! Sie sind fettig und salzig, was deinen Hals nur noch mehr austrocknen kann und das Schlucken erschwert.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Bonbons enthalten viel Zucker, der das Immunsystem schwächen kann und somit nicht ideal bei einer Erkältung ist.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:262}},{t:this.instance_2},{t:this.text,p:{text:"Chili kann deinen Hals und Magen reizen und dich dehydrieren. Bei einer Erkältung ist das keine gute Wahl.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Alkohol schwächt dein Immunsystem und dehydriert dich. Das ist das Letzte, was du bei einer Erkältung brauchst.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Eis ist zwar kühlend, aber die Kälte kann deinen Hals noch mehr reizen und Schmerzen verursachen...",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Kaffee ist ein Diuretikum und kann deinen Körper dehydrieren, \nwas bei einer Erkältung kontraproduktiv ist.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_3,p:{x:261}},{t:this.instance_2},{t:this.text,p:{text:"Zu viel Salz kann deinen Körper dehydrieren und deinen Hals weiter austrocknen. Keine gute Wahl bei einer Erkältung.",color:"#990000"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Ein heißer Tee ist genau richtig! Er beruhigt deinen Hals und hält dich hydriert. Kräutertees wie Kamille oder Pfefferminz sind besonders wohltuend.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Äpfel sind reich an Vitamin C und Ballaststoffen, die dein Immunsystem unterstützen und deinem Körper helfen, die Erkältung zu bekämpfen.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Honig ist ein wunderbares Heilmittel! Er hat antibakterielle Eigenschaften und kann den Hals beruhigen und Husten lindern.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Dunkle Schokolade enthält Theobromin, das helfen kann, den Husten zu lindern. Aber in Maßen genießen!",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Ingwer hat entzündungshemmende und antioxidative Eigenschaften, die deinem Körper helfen, schneller gesund zu werden.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Eine heiße Brühe ist perfekt! Sie hydratisiert, liefert Nährstoffe und hilft, den Schleim zu lösen und den Hals zu beruhigen.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Nüsse sind reich an Zink und Vitamin E, die dein Immunsystem stärken und deinem Körper helfen, die Erkältung zu bekämpfen.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[{t:this.instance_4},{t:this.instance_2},{t:this.text,p:{text:"Zwiebeln haben antivirale und antibakterielle Eigenschaften. Sie können helfen, die Symptome einer Erkältung zu lindern und die Genesung zu beschleunigen.",color:"#006633"}},{t:this.instance_1}]},1).to({state:[]},1).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1037,0,1676.4,1109.6);


(lib.item16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Zwiebel();
	this.instance.setTransform(21,48,0.1676,0.1676);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,370.3,365.2);


(lib.item15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Nüsse();
	this.instance.setTransform(0,0,0.2966,0.2966);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,296.6,296.6);


(lib.item14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Suppe();
	this.instance.setTransform(31,11,0.3481,0.3309);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,379.2,342);


(lib.item13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Ingwer2();
	this.instance.setTransform(0,0,0.1266,0.1266);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,263.8,239.7);


(lib.item12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Schokolade();
	this.instance.setTransform(-24.65,88.3,0.3266,0.3266,-14.9952);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.6,0,400,403.8);


(lib.item11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Honig();
	this.instance.setTransform(0,0,0.5154,0.5154);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,179.9,191.2);


(lib.item10Kopie = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Apfel();
	this.instance.setTransform(0,0,0.2718,0.2718);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,135.9,135.9);


(lib.item9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Teebeutel2();
	this.instance.setTransform(0,0,0.3097,0.3097);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,309.8,309.8);


(lib.item8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.sa7();
	this.instance.setTransform(75,67,0.1433,0.1243);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,296.8,325.1);


(lib.item7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.fsd();
	this.instance.setTransform(62,46,0.098,0.098);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,368.3,352.3);


(lib.item6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Eis3();
	this.instance.setTransform(0,0,0.1898,0.1898);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,270.5,267.8);


(lib.item5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.bier3();
	this.instance.setTransform(73,56,0.1166,0.0913);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,241.9,348.7);


(lib.item4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.Unbenannt1();
	this.instance.setTransform(0,0,0.3646,0.3646);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,317.9,206.7);


(lib.item3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.bon();
	this.instance.setTransform(0,0,0.0581,0.0581);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,247.8,166);


(lib.item2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.chi5();
	this.instance.setTransform(37,62,0.1358,0.1358);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,294.6,311.1);


(lib.item1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.instance = new lib.done();
	this.instance.setTransform(0,0,0.2538,0.2538);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,295.7,284.8);


(lib.CloseButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00C09F").s().p("ApDJEIAAyHISHAAIAASHg");
	this.shape.setTransform(58,58);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,116,116);


(lib.ByeButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ebene_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(15,1,1).p("AlClHIFAFAIFOFPAgCgHIEyk0AlLFAIFJlH");
	this.shape.setTransform(72.3,72.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgcLTQjPgHilhwQgxgigtgqIgQgQQjUjUgBksQABkqDUjUQA0g1A6gnQCwh4DgAAQDLAACjBhQBNAvBEBEQDVDUAAEqQAAEOitDHQgSAWgWAVIgQAQQjFC6kNAJgAFLFMIlOlPIEykzIkyEzIlAk/IFAE/gAlMFEIFJlHgAgDgDg");
	this.shape_1.setTransform(72.35,72.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,144.7,144.7);


// stage content:
(lib.FINAL_pls = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {startScene:0,gameScene:1,winScreen:2};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,3850];
	this.streamSoundSymbolsList[3850] = [{id:"AcousticShuffle",startFrame:3850,endFrame:3851,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Bei diesem Bild stoppen */
		this.stop();
		console.log("Frame 0 gestoppt");
		
		/* Klicken, um zum Bild zu gehen und zu stoppen */
		this.startButton.addEventListener("click", fl_ClickToGoToAndStopAtFrame_1.bind(this));
		this.startButton.addEventListener("touchstart", fl_ClickToGoToAndStopAtFrame_1.bind(this)); // Touchstart Event hinzufügen
		
		function fl_ClickToGoToAndStopAtFrame_1() {
		    this.gotoAndStop(1);
		}
	}
	this.frame_1 = function() {
		playSound("AcousticShuffle",-1);
		// Bei diesem Bild stoppen
		this.stop();
		console.log("Frame 1 gestoppt");
		this.itemCounter.text = 0;
		
		// Touch-Unterstützung aktivieren
		createjs.Touch.enable(stage);
		
		// Items Drag:
		// Event Listener für Touchaktionen auf jedem Item
		var items = [
		    this.item1, this.item2, this.item3, this.item4, this.item5, this.item6,
		    this.item7, this.item8, this.item9, this.item10, this.item11, this.item12,
		    this.item13, this.item14, this.item15, this.item16
		];
		var originalPositions = {}; // Speichert die ursprünglichen Positionen der Items
		var goodItemsCount = 0; // Zählvariable für entfernte gute Items
		
		items.forEach(function(item, index) {
		    // Vor dem Drag & Drop speichern wir die ursprünglichen Positionen der Items
		    originalPositions[item.name] = { x: item.x, y: item.y };
		
		    // Event Listener für Touchaktionen auf jedem Item
		    item.addEventListener("mousedown", startDrag.bind(this));
		    item.addEventListener("touchstart", startDrag.bind(this));
		
		    // Speichern Sie den Index als Eigenschaft des Items, um später zu wissen, welches Item gezogen wird
		    item.itemIndex = index + 1;
		}, this);
		
		function startDrag(evt) {
		    if (this.person.currentFrame !== 0) return; // Abbruch, wenn die Personenszene nicht 0 ist
		
		    // Speichere die ursprüngliche Position des Mauszeigers oder Touch-Punkts relativ zum Item
		    var pt = this.globalToLocal(evt.stageX || evt.touches[0].stageX, evt.stageY || evt.touches[0].stageY);
		    evt.currentTarget.offset = { x: evt.currentTarget.x - pt.x, y: evt.currentTarget.y - pt.y };
		
		    // Event Listener für das Ziehen des Items
		    evt.currentTarget.addEventListener("pressmove", dragItem.bind(this));
		    evt.currentTarget.addEventListener("touchmove", dragItem.bind(this));
		    evt.currentTarget.addEventListener("pressup", stopDrag.bind(this));
		    evt.currentTarget.addEventListener("touchend", stopDrag.bind(this));
		
		    stage.update();
		}
		
		function dragItem(evt) {
		    // Berechne die neue Position des Items basierend auf der Maus- oder Touch-Position
		    var pt = this.globalToLocal(evt.stageX || evt.touches[0].stageX, evt.stageY || evt.touches[0].stageY);
		    evt.currentTarget.x = pt.x + evt.currentTarget.offset.x;
		    evt.currentTarget.y = pt.y + evt.currentTarget.offset.y;
		
		    stage.update();
		}
		
		function stopDrag(evt) {
		    // Entferne den Event Listener für das Ziehen des Items
		    evt.currentTarget.removeEventListener("pressmove", dragItem.bind(this));
		    evt.currentTarget.removeEventListener("touchmove", dragItem.bind(this));
		    evt.currentTarget.removeEventListener("pressup", stopDrag.bind(this));
		    evt.currentTarget.removeEventListener("touchend", stopDrag.bind(this));
		
		    // Überprüfe die Kollision mit der Person
		    if (checkCollision(evt.currentTarget, this.person)) {
		        // Deaktiviere die Interaktivität aller Items
		        toggleItemsInteractivity(false);
		
		        // Setze den entsprechenden Reaktionsframe für die Person basierend auf dem Itemindex
		        this.person.gotoAndStop(evt.currentTarget.itemIndex); // Gehe zum Frame entsprechend dem Itemindex
		
		        // Überprüfen Sie, ob es sich um ein gutes oder schlechtes Item handelt
		        if (evt.currentTarget.itemIndex <= 8) {
		            // Negatives Item
		            // Setze das Item auf seine ursprüngliche Position zurück
		            evt.currentTarget.x = originalPositions[evt.currentTarget.name].x;
		            evt.currentTarget.y = originalPositions[evt.currentTarget.name].y;
		        } else {
		            // Positives Item
		            // Entferne das Item von der Bühne
		            this.removeChild(evt.currentTarget);
		            goodItemsCount++; // Erhöhe den Counter für gute Items
		
		            // Aktualisiere den Counter im Textfeld
		            this.itemCounter.text = goodItemsCount;
		
		            // Überprüfe, ob alle guten Items entfernt wurden
		            if (goodItemsCount === 8) {
		                // Zeige den Gewinnerscreen
		                this.gotoAndStop("winScreen");
		            }
		        }
		
		        // Warte auf einen Klick auf die Person, um zum normalen Bild zurückzukehren
		        this.person.addEventListener("mousedown", resetPerson.bind(this));
		        this.person.addEventListener("touchend", resetPerson.bind(this));
		    } else {
		        // Setze das Item auf seine ursprüngliche Position zurück, wenn keine Kollision erkannt wird
		        evt.currentTarget.x = originalPositions[evt.currentTarget.name].x;
		        evt.currentTarget.y = originalPositions[evt.currentTarget.name].y;
		    }
		
		    stage.update();
		}
		
		function resetPerson(evt) {
		    // Entferne den Event Listener, um wiederholte Klicks zu verhindern
		    this.person.removeEventListener("mousedown", resetPerson.bind(this));
		    this.person.removeEventListener("touchend", resetPerson.bind(this));
		    this.person.gotoAndStop(0); // Zurück zum normalen Bild
		
		    // Aktiviere die Interaktivität aller Items
		    toggleItemsInteractivity(true);
		
		    stage.update();
		}
		
		function checkCollision(item, person) {
		    // Einfache rechteckige Kollisionserkennung
		    var itemBounds = item.getBounds();
		    var personBounds = person.getBounds();
		
		    itemBounds.x += item.x;
		    itemBounds.y += item.y;
		    personBounds.x += person.x;
		    personBounds.y += person.y;
		
		    return itemBounds.x < personBounds.x + personBounds.width &&
		        itemBounds.x + itemBounds.width > personBounds.x &&
		        itemBounds.y < personBounds.y + personBounds.height &&
		        itemBounds.y + itemBounds.height > personBounds.y;
		}
		
		function toggleItemsInteractivity(isInteractive) {
		    items.forEach(function(item) {
		        if (isInteractive) {
		            item.addEventListener("mousedown", startDrag.bind(this));
		            item.addEventListener("touchstart", startDrag.bind(this));
		        } else {
		            item.removeEventListener("mousedown", startDrag.bind(this));
		            item.removeEventListener("touchstart", startDrag.bind(this));
		        }
		    }, this);
		}
		
		// Start Button
		this.startButton.addEventListener("click", fl_ClickToGoToAndStopAtFrame_1.bind(this));
		this.startButton.addEventListener("touchend", fl_ClickToGoToAndStopAtFrame_1.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_1() {
		    // Setze alle Items auf ihre ursprüngliche Position zurück und mache sie sichtbar
		    items.forEach(function(item) {
		        item.x = originalPositions[item.name].x;
		        item.y = originalPositions[item.name].y;
		        item.visible = true;
		    });
		
		    // Setze den Counter zurück
		    goodItemsCount = 0;
		    this.itemCounter.text = goodItemsCount;
		
		    // Aktiviere die Interaktivität aller Items
		    toggleItemsInteractivity(true);
		
		    // Gehe zum Startframe zurück
		    this.gotoAndStop(0);
		
		    stage.update();
		}
	}
	this.frame_2 = function() {
		playSound("applause8wav");
		/* Bei diesem Bild stoppen */
		this.stop();
		
		/* Restart Button Event Listener */
this.restartButton.addEventListener("click", fl_ClickToGoToErkaltungSpiel.bind(this));
this.restartButton.addEventListener("touchstart", fl_ClickToGoToErkaltungSpiel.bind(this)); // Touchstart Event hinzufügen

function fl_ClickToGoToErkaltungSpiel() {
    window.location.href = "../HTML/lernmodule/erkaltung/erkaltung-spiel.html";
    // Hier kann zusätzlicher Code eingefügt werden, falls erforderlich
    this.gotoAndStop(0);
		}
		
		/* Bye Button Event Listener */
		this.ByeButton.addEventListener("click", fl_ClickToGoToByePage.bind(this));
this.ByeButton.addEventListener("touchstart", fl_ClickToGoToByePage.bind(this)); // Touchstart Event hinzufügen
		
		function fl_ClickToGoToByePage() {
		    window.location.href = "../HTML/lernmodule/erkaltung/erkaltung-quizz.html";
		    console.log("Bye Button clicked");
		}
	}
	this.frame_3850 = function() {
		var soundInstance = playSound("AcousticShuffle",0);
		this.InsertIntoSoundStreamData(soundInstance,3850,3851,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(3848).call(this.frame_3850).wait(1));

	// Actions
	this.ByeButton = new lib.ByeButton();
	this.ByeButton.name = "ByeButton";
	this.ByeButton.setTransform(988.35,138.85,1,1,0,0,0,72.4,72.3);
	new cjs.ButtonHelper(this.ByeButton, 0, 1, 2, false, new lib.ByeButton(), 3);

	this.instance = new lib.Oma_happy();
	this.instance.setTransform(790,391,0.3248,0.3248);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgcAAIA5AAIgdAAIgcAAg");
	this.shape.setTransform(994.2,195.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape},{t:this.instance},{t:this.ByeButton}]},2).to({state:[]},1).wait(3848));

	// home_wall_with_wooden_floor_87498_388_svg
	this.startButton = new lib.restartButton();
	this.startButton.name = "startButton";
	this.startButton.setTransform(549.2,552.15,1,1,0,0,0,215.1,60);
	new cjs.ButtonHelper(this.startButton, 0, 1, 1);

	this.instance_1 = new lib.gamestart();

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00C09F").s().p("EguQAP8IAAyvMBGpAAAIAAJXIjdAAIAAJYgEAgNgB3IAAuEIOEAAIAAOEg");
	this.shape_1.setTransform(630.175,510.125);

	this.person = new lib.person();
	this.person.name = "person";
	this.person.setTransform(933.7,481.4,0.5395,0.5395,0,0,0,447.1,554.9);

	this.item10 = new lib.item10Kopie("synched",0);
	this.item10.name = "item10";
	this.item10.setTransform(410.4,560.05,0.713,0.713,0,0,0,238.8,180);

	this.item16 = new lib.item16("synched",0);
	this.item16.name = "item16";
	this.item16.setTransform(612.85,641.15,0.447,0.447,0,0,0,180.1,180.1);

	this.instance_2 = new lib.CloseButton();
	this.instance_2.setTransform(1434.4,616.2);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.item15 = new lib.item15("synched",0);
	this.item15.name = "item15";
	this.item15.setTransform(287.25,180.75,0.4911,0.4911,0,0,0,180,180);

	this.item14 = new lib.item14("synched",0);
	this.item14.name = "item14";
	this.item14.setTransform(604.55,148.05,0.4667,0.4667,0,0,0,180,180);

	this.item13 = new lib.item13("synched",0);
	this.item13.name = "item13";
	this.item13.setTransform(489.55,362.75,0.5672,0.5672,0,0,0,180.2,180.2);

	this.item12 = new lib.item12("synched",0);
	this.item12.name = "item12";
	this.item12.setTransform(611.35,476.2,0.4589,0.4589,0,0,0,180,180);

	this.item11 = new lib.item11("synched",0);
	this.item11.name = "item11";
	this.item11.setTransform(534.3,560.8,0.6772,0.597,0,0,0,216.2,236.2);

	this.item9 = new lib.item9("synched",0);
	this.item9.name = "item9";
	this.item9.setTransform(301.8,339.85,0.4815,0.4815,14.9981,0,0,180.2,180.1);

	this.item3 = new lib.item3("synched",0);
	this.item3.name = "item3";
	this.item3.setTransform(467.05,220.15,0.5108,0.5108,0,0,0,180,180.1);

	this.item8 = new lib.item8("synched",0);
	this.item8.name = "item8";
	this.item8.setTransform(273.7,647,0.4703,0.4703,0,0,0,180,180);

	this.item7 = new lib.item7("synched",0);
	this.item7.name = "item7";
	this.item7.setTransform(604.3,308,0.4971,0.4971,0,0,0,180.2,180.2);

	this.item6 = new lib.item6("synched",0);
	this.item6.name = "item6";
	this.item6.setTransform(152.9,507.9,0.4888,0.4888,0,0,0,180.1,180.2);

	this.item5 = new lib.item5("synched",0);
	this.item5.name = "item5";
	this.item5.setTransform(122.2,149.9,0.5867,0.6234,0,0,0,164.8,230.5);

	this.item4 = new lib.item4("synched",0);
	this.item4.name = "item4";
	this.item4.setTransform(152.7,699.95,0.3806,0.5058,-14.9983,0,0,180.2,180.2);

	this.item2 = new lib.item2("synched",0);
	this.item2.name = "item2";
	this.item2.setTransform(443.6,647.95,0.5108,0.5108,0,0,0,180,180);

	this.item1 = new lib.item1("synched",0);
	this.item1.name = "item1";
	this.item1.setTransform(137.75,345.25,0.4144,0.4144,0,0,0,180.2,180.2);

	this.itemCounter = new cjs.Text("", "bold 120px 'Arial'", "#59CE73");
	this.itemCounter.name = "itemCounter";
	this.itemCounter.lineHeight = 147;
	this.itemCounter.lineWidth = 181;
	this.itemCounter.parent = this;
	this.itemCounter.setTransform(921.1,33.35,0.5,0.5);

	this.text = new cjs.Text("/8", "bold 120px 'Arial'", "#59CE73");
	this.text.lineHeight = 147;
	this.text.lineWidth = 482;
	this.text.parent = this;
	this.text.setTransform(963.5,33.35,0.5,0.5);

	this.instance_3 = new lib.saddone2();
	this.instance_3.setTransform(-218,640,0.2458,0.2458);

	this.instance_4 = new lib.saddone2();
	this.instance_4.setTransform(-218,466,0.2458,0.2458);

	this.instance_5 = new lib.saddone2();
	this.instance_5.setTransform(-231,315,0.2458,0.2458);

	this.instance_6 = new lib.saddone2();
	this.instance_6.setTransform(-231,147,0.2458,0.2458);

	this.instance_7 = new lib.wall();
	this.instance_7.setTransform(-6,-5,0.7491,0.7632);

	this.restartButton = new lib.restartButton();
	this.restartButton.name = "restartButton";
	this.restartButton.setTransform(549.2,552.15,1,1,0,0,0,215.1,60);
	new cjs.ButtonHelper(this.restartButton, 0, 1, 1);

	this.instance_8 = new lib.gameend();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.instance_1},{t:this.startButton}]}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.text},{t:this.itemCounter},{t:this.item1},{t:this.item2},{t:this.item4},{t:this.item5},{t:this.item6},{t:this.item7},{t:this.item8},{t:this.item3},{t:this.item9},{t:this.item11},{t:this.item12},{t:this.item13},{t:this.item14},{t:this.item15},{t:this.instance_2},{t:this.item16},{t:this.item10},{t:this.person}]},1).to({state:[{t:this.instance_8},{t:this.restartButton}]},1).to({state:[]},1).wait(3848));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1550.4,1040.6);
// library properties:
lib.properties = {
	id: '8A52A2D8D0EF174192869B21D5FA3080',
	width: 1112,
	height: 834,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/bier3.png", id:"bier3"},
		{src:"images/bon.png", id:"bon"},
		{src:"images/fsd.png", id:"fsd"},
		{src:"images/Ingwer2.png", id:"Ingwer2"},
		{src:"images/mimi2.png", id:"mimi2"},
		{src:"images/sa7.png", id:"sa7"},
		{src:"images/saddone2.png", id:"saddone2"},
		{src:"images/Zwiebel.png", id:"Zwiebel"},
		{src:"images/Game_dev_1_atlas_1.png", id:"Game_dev_1_atlas_1"},
		{src:"images/Game_dev_1_atlas_2.png", id:"Game_dev_1_atlas_2"},
		{src:"images/Game_dev_1_atlas_3.png", id:"Game_dev_1_atlas_3"},
		{src:"images/Game_dev_1_atlas_4.png", id:"Game_dev_1_atlas_4"},
		{src:"images/Game_dev_1_atlas_5.png", id:"Game_dev_1_atlas_5"},
		{src:"images/Game_dev_1_atlas_6.png", id:"Game_dev_1_atlas_6"},
		{src:"images/Game_dev_1_atlas_7.png", id:"Game_dev_1_atlas_7"},
		{src:"images/Game_dev_1_atlas_8.png", id:"Game_dev_1_atlas_8"},
		{src:"sounds/AcousticShuffle.mp3", id:"AcousticShuffle"},
		{src:"sounds/applause8wav.mp3", id:"applause8wav"},
		{src:"sounds/button22wav.mp3", id:"button22wav"},
		{src:"sounds/button37a.mp3", id:"button37a"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['8A52A2D8D0EF174192869B21D5FA3080'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;