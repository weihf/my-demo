window.onload = init;
var btn = $("btn"),
	tNum = $("tNum"),
	dNum = $("dNum"),
	todoUl = $("todoUl"),
	doneUl = $("doneUl"),
	deleteBtn = $("deleteBtn");
deleteBtn.onclick = function() {
	localStorage.clear();
	init();
}
btn.onclick = function(i) {
	createList();
	saveToArray();
}

function init() {
	var list = localStorage.getItem("listObj");
	if (list != null) {
		var d = JSON.parse(list);
		var todoNum = 0,
			doneNum = 0,
			doneElement = "",
			todoElement = "";
		for (var i = 0; i < d.length; i++) {
			var key = d[i];
			var time = (new Date()).getTime();
			if (key.done) {
				doneElement += '<li><input checked="checked" type="checkbox" onchange="move(' + i + ',\'done\',false)"/>' + '<p>' + key.value + '</p>' + '<a class="del" onclick="delList(' + i + ')"' + '>-</a>' + '</li>';
				doneNum++;
			} else {
				todoElement += '<li><input type="checkbox" onchange="move(' + i + ',\'done\',true)"/>' + '<p>' + key.value + '</p>' + '<a class="del" onclick="delList(' + i + ')"' + '>-</a>' + '</li>';
				todoNum++;
			}
		};
		tNum.innerHTML = todoNum;
		todoUl.innerHTML = todoElement;
		dNum.innerHTML = doneNum;
		doneUl.innerHTML = doneElement;
	} else {
		tNum.innerHTML = 0;
		todoUl.innerHTML = "";
		dNum.innerHTML = 0;
		doneUl.innerHTML = "";
	}
}

function saveToArray(data) {
	var t = $("todoUl"),
		d = $("doneUl"),
		tp = t.getElementsByTagName("p"),
		dp = d.getElementsByTagName("p"),
		data = [];
	for (var i = 0; i < tp.length; i++) {
		var listObj = {
			"value": tp[i].innerHTML,
			"color": color,
			"done": false
		};
		data.push(listObj);
	}
	for (var i = 0; i < dp.length; i++) {
		var listObj = {
			"value": dp[i].innerHTML,
			"color": color,
			"done": true
		};
		data.push(listObj);
	}
	saveData(data);
}

function createList() {
	if ($("txt").value == "") {
		alert("请输入您想做的事！");
	} else {
		var data = getData();
		var value = $("txt").value;
		var listObj = {
			"value": value,
			"done": false
		};
		data.push(listObj);
		saveData(data);
		$("txt").value = "";
		init();
	}
}

function getData() {
	var list = localStorage.getItem("listObj");
	if (list != null) {
		return JSON.parse(list);
	} else return [];
}

function saveData(data) {
	localStorage.setItem("listObj", JSON.stringify(data));
}

function delList(i) {
	var d = getData();
	d.splice(i, 1)[0];
	saveData(d);
	init();
}

function move(i, f, value) {
	var data = getData();
	var list = data.splice(i, 1)[0];
	list[f] = value;
	data.splice(i, 0, list);
	saveData(data);
	init();
}

function $(id) {
	return document.getElementById(id);
}