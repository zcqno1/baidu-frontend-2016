// task-13
(function() {
  /*
  在注释下方写下代码
  给按钮button绑定一个点击事件
  在事件处理函数中
  获取aqi-input输入的值，并显示在aqi-display中
  */
  document.getElementById("button").addEventListener("click",function(){
  		var ipValue = document.getElementById("aqi-input").value;
      document.getElementById("aqi-display").innerText = ipValue == "" ? "尚无录入" : ipValue;
    }
  )
  // 第二种方法
  // document.getElementById("button").onclick=function(){
  //   document.getElementById("aqi-display").innerHTML=document.getElementById("aqi-input").value;
  // }
})();



// task-14
var aqiDataT14 = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

// 空气质量排序
function dataSort(data) {
	var tempData;
	for (var i = 0; i <= data.length-2; i++) {
		for (var j = i+1; j <= data.length-1; j++) {
			if(data[i][1] < data[j][1]){
				tempData = data[i];
				data[i] = data[j];
				data[j] = tempData;
			}
		}
		//console.log(data[i]);
}
}

(function() {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */
  aqiListT14 = document.getElementById("aqi-list");
  dataSort(aqiDataT14);
  for(var i = 0; i <= aqiDataT14.length-1; i++) {
  	if(aqiDataT14[i][1]>60){
  		var newLi = document.createElement("li");
  		newLi.innerText = "#"+(i+1)+"："+aqiDataT14[i][0]+"，"+aqiDataT14[i][1];
  		aqiListT14.appendChild(newLi);
  	}
  }
})();



// task-15
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
	var data = new Array();
	var sourceLi = document.getElementById("source").getElementsByTagName("li");
	var sourceData = document.getElementById("source").getElementsByTagName("b");

	for (var i = 0; i <= sourceLi.length-1; i++) {
		var dataTemp = new Array();
		dataTemp[0] = sourceLi[i].innerHTML.substring(0,2);
		dataTemp[1] = Number(sourceData[i].innerHTML);
		data[i] = dataTemp;
	}
  return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id为resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
	var resortList = document.getElementById("resort");
	resortList.innerHTML = "";

	for (var i = 0; i < data.length; i++) {
		var newLi = document.createElement("li");
		var newB = document.createElement("b");
		newLi.innerText = (i+1)+"："+data[i][0]+"空气质量：";
		newB.innerText = data[i][1];
		newLi.appendChild(newB);
		resortList.appendChild(newLi);
	}
}

function btnHandle() {
  var aqiDataT15 = getData();
  dataSort(aqiDataT15);
  render(aqiDataT15);
}


function initT15() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数

  document.getElementById("sort-btn").addEventListener("click",function(){
  	btnHandle();
  });
}

initT15();



// task-16

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiDataT16 = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiDataT16() {
	var inputDiv = document.getElementById("add-btn").parentNode;
	//清除上一次错误输入的提示
	var errTips = document.getElementsByClassName("err-tips");
	if(errTips.length > 0){
		for(var i = 0; i < errTips.length; i++){
			inputDiv.removeChild(errTips[i]);
		}
	}

	//输入匹配正则表达式
	var regCity = /^[A-z\u4e00-\u9eff]+$/;
	var regAir = /^[0-9]+$/;

	//获取输入
	var inputCity = document.getElementById("aqi-city-input").value;
	var inputAir = document.getElementById("aqi-value-input").value;
	var city = inputCity.toString().trim();
	var air = inputAir.toString().trim();

	//输入验证
	var newP = document.createElement("p");
	if(!regCity.test(city)){
		newP.innerText = "城市名称只能是中英文字符";
		newP.className = "err-tips";
		inputDiv.appendChild(newP);
		document.getElementById("aqi-city-input").focus();
		return;
	}
	if(!regAir.test(air)){
		newP.innerText = "空气质量指数只能为整数";
		inputDiv.appendChild(newP);
		newP.className = "err-tips";
		document.getElementById("aqi-value-input").focus();
		return;
	}

	//输入正确后添加到数据对象
	air = parseInt(air);
	aqiDataT16[city] = air;

	//清空输入框
	document.getElementById("aqi-city-input").value = "";
	document.getElementById("aqi-value-input").value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTableT16 = document.getElementById("aqi-table");
	var aqiDataEleT16 = Object.getOwnPropertyNames(aqiDataT16);
	aqiTableT16.innerHTML = ""; //清空表格

	//如果数据对象为空，直接返回
	if(aqiDataEleT16.length == 0)	return;

	//输出表头
	var newTr = document.createElement("tr");
	newTr.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
	aqiTableT16.appendChild(newTr);

	//输出数据
	for(var i = 0; i < aqiDataEleT16.length; i++){
		var newTr = document.createElement("tr");
		newTr.innerHTML = "<td>" + aqiDataEleT16[i] + "</td>" + "<td>" + aqiDataT16[aqiDataEleT16[i]] + "</td>" + "<td><button>删除</button></td>";
		aqiTableT16.appendChild(newTr);
	}

	//给删除按钮绑定事件
	var delBtn = document.getElementById("aqi-table").getElementsByTagName("button");
  for(i = 0; i < delBtn.length; i++){
  	delBtn[i].addEventListener("click", delBtnHandle);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiDataT16();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // 获取要删除的行及数据
  var delTr = this.parentNode.parentNode;
  var delCity = delTr.getElementsByTagName("td")[0].innerText;

  //从数据对象删除
  delete aqiDataT16[delCity];

	//如果数据对象为空，清除表格
	if(Object.getOwnPropertyNames(aqiDataT16).length == 0)
		delTr.parentNode.innerHTML = "";
	else  //否则删除改行
		delTr.parentNode.removeChild(delTr);

  //renderAqiList();
}

function initT16() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener("click", addBtnHandle);
}

initT16();
