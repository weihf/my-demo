var get = { //获取元素
	byId: function(id) {
		return document.getElementById(id);
	},
	byClassName: function(aClass, parent) {
		if (document.getElementsByClassName(aClass)) {
			return document.getElementsByClassName(aClass);
		}
		var aParent = parent ? get.byId(parent) : document,
			allClass = [],
			eles = aParent.getElementsByTagName("*");
		for (var i = 0; i < eles.length; i++) {
			if (eles[i].className == aClass) {
				allClass.push(eles[i]);
			}
		}
		return allClass;

	},
	byTagName: function(tag, parent) {
		return (parent || document).getElementsByTagName(tag);
	}

};
var main = get.byId("main");
var loadStart = get.byId("loadStart");
var startBtn = get.byId("startBtn");
var maskBg = get.byId("maskBg");
var scene = get.byId("scene");
var progress = get.byId("progress");
var progressBar = get.byId("progressBar");
var topImg = get.byClassName("topImg")[0];
var bottomImg = get.byClassName("bottomImg")[0];
var pointNum = get.byId("pointNum");
var music = get.byId("music");
var audioMusic = get.byId("audioMusic");
var isPlayAgain = false;
var isFirstPlay = true;
var txtTipArr = ["开始游戏", "暂停游戏", "时间到，游戏结束", "恭喜，全部通过"];
var randomNum;
var imgFindNum = 0;
var findPoint = 0;
var imgNumArr = [];
var sceneSwitchTimer = null;
var loading = get.byId("loading");
var mask = {
	show: function(txtTip) {
		maskBg.className = "showMask";
		maskBg.innerHTML = "<b class='showMask'>" + txtTip + "</b>";
	},
	hide: function() {
		maskBg.className = "hideMask";
	}
};

function showMusic() {
	music.onOff = false;
	music.onclick = function() {
		if (this.onOff) {
			this.style.background = "url(img/musicon.gif)";
			audioMusic.play();
		} else {
			this.style.background = "url(img/musicoff.gif)";
			audioMusic.pause();
		}
		music.onOff = !music.onOff;
	}
}
var findingGame = {
	init: function() {
		for (var n = 0; n < imgData.count; n++) {
			imgNumArr.push(n); //imgNumArr=[0,1,2,3,4,5,6,7,8,9]
		}
		imgFindNum = 0;
		isPlayAgain = false;
		findingGame.imgRender();
		mask.show(txtTipArr[0]);
		showMusic();
		startBtn.innerHTML = txtTipArr[0];
	},
	imgRender: function() {
		randomNum = 0;
		findPoint = 0;
		var imgNowNum = 0;
		pointNum.innerHTML = 0;
		randomNum = Math.floor(Math.random() * imgData.count); //取得一个0~10之间的随机数
		imgNowNum = imgNumArr[randomNum];
		imgNumArr.splice(randomNum, 1);
		topImg.innerHTML = "<img src=img/" + imgData.imgInfo[imgNowNum].src + "_a.jpg" + "><b id='topLayout'></b>";
		bottomImg.innerHTML = "<img src=img/" + imgData.imgInfo[imgNowNum].src + "_b.jpg" + "><b id='bottomLayout'></b>";
		var topLayout = get.byId("topLayout");
		var bottomLayout = get.byId("bottomLayout");
		topLayout.onclick = bottomLayout.onclick = function() {
			timeCounter.timelong -= 10;
		}
		for (var k = 0; k < 4; k++) { //插入四个不同点的标签
			var point = document.createElement("div");
			point.className = "point";
			point.setAttribute("index", k);
			point.style.left = imgData.imgInfo[imgNowNum].pos[k].x + "px";
			point.style.top = imgData.imgInfo[imgNowNum].pos[k].y + "px";
			point.style.width = imgData.imgInfo[imgNowNum].pos[k].w + "px";
			point.style.height = imgData.imgInfo[imgNowNum].pos[k].h + "px";
			topImg.appendChild(point);
			var pointClone = point.cloneNode();
			bottomImg.appendChild(pointClone);
			point.onclick = pointClone.onclick = function(e) {
				var pointDivs = scene.getElementsByTagName("div");
				var thisIndex = this.getAttribute("index");
				var e = e || event;
				for (var m = 0; m < pointDivs.length; m++) {
					pointDivs[m].index = m;
					if (pointDivs[m].getAttribute("index") === thisIndex) {
						if (pointDivs[m].className !== "point selected") {
							findPoint++;
							pointNum.innerHTML = findPoint / 2;
							pointDivs[m].className += " selected";
						}
					}
				}
				if (findPoint == 8) {
					if (imgNumArr.length === 0) {
						setTimeout(function() {
							self.over(imgFindNum);
						}, 800);
					} else {
						sceneSwitchTimer = setTimeout(function() {
							findingGame.imgRender();
							timeCounter.start(progressBar, true, self.over);
						}, 1000);
						imgFindNum++;
					}

				}
				e.cancelBubble = true;
			}
		}
	},
	over: function(imgCount) {
		if (imgCount === imgData.count - 1) {
			mask.show(txtTipArr[3]);
		} else {
			mask.show(txtTipArr[2]);
		}
		timeCounter.stop();
		isPlayAgain = true;
		startBtn.innerHTML = txtTipArr[0];
	}
};
var timeCounter = {
	timelong: 60,
	totalWidth: progressBox.offsetWidth,
	start: function(obj, isPlayAgain, callback) {
		var self = this;
		if (isPlayAgain) {
			self.timelong = 60;
			obj.style.width = self.totalWidth + "px";
		}
		clearInterval(self.timer);
		self.timer = setInterval(function() {
			self.timelong--;
			if (self.timelong <= -1) {
				self.timelong = 0;
				clearInterval(self.timer);
				callback && callback();
			}
			obj.style.width = self.totalWidth * (self.timelong / 60) + "px";
		}, 1000);
	},
	stop: function() {
		clearInterval(this.timer);
	}
};
startBtn.onclick = function() {
	if (isPlayAgain) {
		findingGame.init();
		timeCounter.start(progressBar, true, findingGame.over);
		mask.hide();
	}
	if (startBtn.innerHTML == txtTipArr[0]) {
		startBtn.innerHTML = txtTipArr[1];
		if (isPlayAgain) {
			timeCounter.start(progressBar, true, findingGame.over);
		} else {
			timeCounter.start(progressBar, false, findingGame.over);
		}
		mask.hide();
	} else {
		timeCounter.stop();
		startBtn.innerHTML = txtTipArr[0];
		mask.show(txtTipArr[1]);
	}
	isFirstPlay = false;
};

function loadFn() {
	if (main) {
		main.style.display = "none";
		loadStart.onclick = function() {
			loading.style.display = "none";
			main.style.display = "block";
			findingGame.init();
		}
	}
}
loadFn();
