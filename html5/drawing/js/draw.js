//canvas
var canvas = document.getElementById("canvas");
var cxt = canvas.getContext("2d");
var flag = 0;
//图像
var clearimg = document.getElementById("clearimg");
//线宽 
var lineW1 = document.getElementById("lineW1");
var lineW2 = document.getElementById("lineW2");
var lineW3 = document.getElementById("lineW3");
var lineW4 = document.getElementById("lineW4");
var lineWidth = [lineW1, lineW2, lineW3, lineW4];
//获取颜色按钮
var ColorRed = document.getElementById("red");
var ColorGreen = document.getElementById("green");
var ColorBlue = document.getElementById("blue");
var ColorYellow = document.getElementById("yellow");
var ColorWhite = document.getElementById("white");
var ColorBlack = document.getElementById("black");
var ColorPink = document.getElementById("pink");
var ColorPurple = document.getElementById("purple");
var ColorCyan = document.getElementById("cyan");
var ColorOrange = document.getElementById("orange");
//把颜色对象放到一个数组中
var colors = [ColorRed, ColorGreen, ColorBlue, ColorYellow, ColorWhite, ColorBlack, ColorPink, ColorPurple, ColorCyan, ColorOrange];
//清空画板
clearimg.onclick = function() {
		cxt.clearRect(0, 0, 900, 400);
	}
	//设置线宽
function setLineWidth(num) {
	switch (num) {
		case 0:
			cxt.lineWidth = 1;
			break;
		case 1:
			cxt.lineWidth = 3;
			break;
		case 2:
			cxt.lineWidth = 5;
			break;
		case 3:
			cxt.lineWidth = 7;
			break;
		default:
			cxt.lineWidth = 1;
	}
}
canvas.onmousedown = function(evt) { //设置开始点
	evt = window.event || evt; //标准化事件对象（W3C DOM 和IE DOM ）
	var startX = evt.pageX - this.offsetLeft;
	var startY = evt.pageY - this.offsetTop;
	cxt.beginPath();
	cxt.moveTo(startX, startY);
	flag = 1;
}
canvas.onmousemove = function(evt) { //绘图
	evt = window.event || evt;
	var endX = evt.pageX - this.offsetLeft;
	var endY = evt.pageY - this.offsetTop;
	if (flag) { ///判断一下鼠标是否按下
		cxt.lineTo(endX, endY);
		cxt.stroke();
	}
}
canvas.onmouseup = function(evt) {
	flag = 0;
}
canvas.onmouseout = function() {
	flag = 0;
};
//画圆
var arcX;
var arcY;

function drawArc(num) {
	// 获取圆心的位置
	canvas.onmousedown = function(evt) {
			evt = window.event || evt;
			arcX = evt.pageX - this.offsetLeft;
			arcY = evt.pageY - this.offsetTop;
		}
		// 半径
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		// 计算半径
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a * a + b * b);
		cxt.beginPath();
		cxt.arc(arcX, arcY, c, 0, 360, false);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
};
//画正方形
var rectX;
var rectY;

function drawRect() {
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		// 计算矩形的宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		cxt.beginPath();
		cxt.strokeRect(rectX, rectY, rectW, rectH);
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
};
//画三角形
var polyX = 0;
var polyY = 0;

function drawPoly() {
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		polyX = evt.pageX - this.offsetLeft;
		POLyY = evt.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		//将画笔移动到右下角的顶点
		cxt.moveTo(endX, endY);
		//计算左下角的顶点坐标
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		cxt.lineTo(lbX, lbY);
		//设置第三个顶点的坐标
		var tmpC = 2 * (endX - polyX);
		var tmpA = endX - polyX;
		var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
		//计算最上面顶点坐标
		//endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
		//画到顶点
		cxt.lineTo(polyX, endY - tmpB);
		//封闭路径->画出来
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
//画实心圆
function drawArcfill() {
	// 获取圆心的位置
	canvas.onmousedown = function(evt) {
			evt = window.event || evt;
			arcX = evt.pageX - this.offsetLeft;
			arcY = evt.pageY - this.offsetTop;
		}
		// 半径
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		// 计算半径
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a * a + b * b);
		cxt.beginPath();
		cxt.arc(arcX, arcY, c, 0, 360, false);
		cxt.closePath();
		cxt.fill();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
};
//实心正方形
function drawRectfill() {
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		// 计算矩形的宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		cxt.beginPath();
		cxt.fillRect(rectX, rectY, rectW, rectH);
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
};
//笔刷
function drawBrush() {
	var flag = 0;
	// 鼠标按下的时候,设置开始点
	canvas.onmousedown = function(evt) {
			// 获取鼠标相对于canvas起始点00的坐标
			evt = window.event || evt;
			var startX = evt.pageX - this.offsetLeft;
			var startY = evt.pageY - this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(startX, startY);
			flag = 1;
		}
		// 鼠标移动的时候，一直在绘图
	canvas.onmousemove = function(evt) {
			evt = window.event || evt;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop;
			// 判断鼠标是否down
			if (flag) {
				cxt.lineTo(endX, endY);
				cxt.stroke();
			}
		}
		//鼠标抬起的时候，停止绘图
	canvas.onmouseup = function() {
			flag = 0;
		}
		// 鼠标移除canvas时取消画图操作
	canvas.onmouseout = function() {
		flag = 0;
	}
};

//填充画布背景色
function drawPaint() {
	canvas.onmousedown = function() {
		// 画一个填充颜色的矩形
		cxt.fillRect(0, 0, 900, 400);
		cxt.fill();
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
};
//橡皮擦
var eraserFlag = 0;

function drawEraser() {
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		var eraserX = evt.pageX - this.offsetLeft;
		var eraserY = evt.pageY - this.offsetTop;
		// canvas擦除方法用clearrect方法
		cxt.clearRect(eraserX - cxt.lineWidth, eraserY - cxt.lineWidth, cxt.lineWidth * 2, cxt.lineWidth * 2);
		eraserFlag = 1;
	}
	canvas.onmousemove = function(evt) {
		evt = window.event || evt;
		var eraserX = evt.pageX - this.offsetLeft;
		var eraserY = evt.pageY - this.offsetTop;
		if (eraserFlag == 1) {
			cxt.clearRect(eraserX - cxt.lineWidth, eraserY - cxt.lineWidth, cxt.lineWidth * 2, cxt.lineWidth * 2);
		}
	}
	canvas.onmouseup = function() {
		eraserFlag = 0;
	}
	canvas.onmouseout = function() {
		eraserFlag = 0;
	}
};
//文字工具
function drawText() {
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		// 获取鼠标点击位置
		var textX = evt.pageX - this.offsetLeft;
		var textY = evt.pageY - this.offsetTop;
		// 获取用户输入的信息
		// 对象框提示，默认值
		var userVal = window.prompt('请在这里输入文字', ''); //获得输入的值
		if (userVal != null) {
			cxt.fillText(userVal, textX, textY);
		}
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
};

//颜色设置函数
function setColor(obj, num) {
	cxt.strokeStyle = obj.id;
	cxt.fillStyle = obj.id;
}

//function sel(parent, child) {
//	for (var i = 0; i < child.length; i++) {
//		child[i].style.color = "#333";
//		child[i].onclick = function() {
//			for (var j = 0; j < child.length; j++) {
//				child[j].style.color = "#333";
//			}
//			this.style.color = "red";
//		}
//	}
//}
//var shape = document.getElementById("shape");
//var shapeLink = shape.getElementsByTagName("a");
//var sha = new sel(shape, shapeLink);