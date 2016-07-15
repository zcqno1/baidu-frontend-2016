/**
 * 任务十八
 */

//队列数组
var queueDataT18 = [];

function delQueueNum(){
	var queueWrap = document.getElementsByClassName("num-queue-t18")[0];
	var queueEle = queueWrap.getElementsByTagName("div");
	var delNumIndex = Array.prototype.indexOf.call(queueEle, this); //getElementsByTagName返回的是类数组，不能直接调用数组的方法，可以使用Function.call()的方法调用

	queueWrap.removeChild(this);
	queueDataT18.splice(delNumIndex, 1);

	//空队列提示
	if(queueDataT18.length == 0) document.getElementsByClassName("queue-empty")[0].style.display = "block";
}


/**
 * 左侧增加数字
 * @return {none} [description]
 */
function leftAddNum() {
	var queueWrap = document.getElementsByClassName("num-queue-t18")[0];
	var addNum = aqiNumberT18();

	if(addNum == undefined) return;

	//清除空队列提示
	queueEmpty("none");

	//增加新的数字
	var addNumDiv = document.createElement("div");
	addNumDiv.innerText = addNum;
	queueDataT18.unshift(addNum);
	queueWrap.insertBefore(addNumDiv, queueWrap.firstChild);
	addNumDiv.addEventListener("click", delQueueNum);
}


/**
 * 右侧增加数字
 * @return {none} [description]
 */
function rightAddNum() {
	var queueWrap = document.getElementsByClassName("num-queue-t18")[0];
	var addNum = aqiNumberT18();

	if(addNum == undefined) return;

	//清除空队列提示
	queueEmpty("none");

	//增加新的数字
	var addNumDiv = document.createElement("div");
	addNumDiv.innerText = addNum;
	queueDataT18.push(addNum);
	queueWrap.appendChild(addNumDiv);
	addNumDiv.addEventListener("click", delQueueNum);
}


/**
 * 左侧删除数字
 * @return {none} [description]
 */
function leftDelNum() {
	//判断当前队列是否为空，阻止操作
	if(queueDataT18.length == 0){
		document.getElementsByClassName("err-warn")[0].innerText = "不可操作，当前队列为空";
		return;
	}

	var queueWrap = document.getElementsByClassName("num-queue-t18")[0];
	var queueEle = queueWrap.getElementsByTagName("div");

	queueWrap.removeChild(queueEle[0]);
	alert(queueDataT18.shift());

	//空队列提示
	queueEmpty();
}


/**
 * 右侧删除数字
 * @return {none} [description]
 */
function rightDelNum() {
	//判断当前队列是否为空，阻止操作
	if(queueDataT18.length == 0){
		document.getElementsByClassName("err-warn")[0].innerText = "不可操作，当前队列为空";
		return;
	}

	var queueWrap = document.getElementsByClassName("num-queue-t18")[0];
	var queueEle = queueWrap.getElementsByTagName("div");

	queueWrap.removeChild(queueEle[queueEle.length-1]);
	alert(queueDataT18.pop());

	//空队列提示
	queueEmpty();
}


/**
 * 获取输入数字
 * @return {[number]} [输入合法则返回该数字]
 */
function aqiNumberT18(){
	var inputBox = document.getElementById("ip-num-t18");
	var inputNum = inputBox.value.trim();
	var inputErr = document.getElementsByClassName("err-warn")[0];

	// 判断输入合法性
	if(inputNum && parseInt(inputNum) == inputNum){
		inputNum = parseInt(inputNum);
		inputErr.innerText = "";
		inputBox.value = "";
		return inputNum;
	}
	else{
		inputErr.innerText = "“要求输入的是数字”";
		inputBox.focus();
	}
}

/**
 * 空队列提示
 * @param  {string} str 清空参数
 * @return {null}     none
 */
function queueEmpty(str){
	var queueWrap = document.getElementsByClassName("num-queue-t18")[0];
	var queue
	if(str == null && queueDataT18.length == 0){
		queueWrap.innerHTML = "<p class='queue-empty'>当前队列为空</p>"
	}
	else if(str == "none"){
		document.getElementsByClassName("queue-empty")[0].style.display = "none";
	}
}


/**
 * 事件初始化
 * @return {[none]} [none]
 */
function btnInit(){
	// 操作按钮事件绑定
	var btnLadd = document.getElementById("btn-ladd-t18");
	var btnRadd = document.getElementById("btn-radd-t18");
	var btnLdel = document.getElementById("btn-ldel-t18");
	var btnRdel = document.getElementById("btn-rdel-t18");

	btnLadd.addEventListener("click", leftAddNum);
	btnRadd.addEventListener("click", rightAddNum);
	btnLdel.addEventListener("click", leftDelNum);
	btnRdel.addEventListener("click", rightDelNum);

	//队列数字点击删除时间绑定
	var queueNums = document.getElementsByClassName("num-queue-t18")[0].getElementsByTagName("div");

	for(var i = 0; i < queueNums.length; i++){
		queueNums[i].addEventListener("click", delQueueNum);
	}
}

btnInit();
queueEmpty();



/**
 * 任务十九
 */
window.onload = function(){
	var queueWrapT19 = document.getElementsByClassName("num-queue-t19")[0];
	var operatePromptT19 = document.getElementById("task-19").getElementsByClassName("err-warn")[0];
	var isRendering = 0;
	var queueT19 = {

		queueData : [],

		//空队列提示
		isEmpty : function(){
			if(this.queueData.length == 0){
				queueWrapT19.innerHTML = "<p class='queue-empty'>当前队列为空</p>"
				queueWrapT19.style.borderBottom = "0";
			}
			else{
				queueWrapT19.removeChild(queueWrapT19.getElementsByClassName("queue-empty")[0]);
				queueWrapT19.style.borderBottom = "1px solid #aaa";
			}
			return this.queueData.length;
		},

		//输出队列
		render : function(){
			queueWrapT19.innerHTML = "<p class='queue-empty'>当前队列为空</p>";
			for(var i = 0; i < this.queueData.length; i++){
				var newDiv = document.createElement("div");
				newDiv.style.height = this.queueData[i] * 3 + "px";
				newDiv.innerText = newDiv.title = this.queueData[i].toString();
				queueWrapT19.appendChild(newDiv);
			}
			this.isEmpty();
			addDelNumEvent();
		},

		//队列输入合法性
		getInput : function(){
			var inputBox = document.getElementById("ip-num-t19");
			var inputNum = inputBox.value.trim();

			//判断输入合法性
			if(this.queueData.length == 60){
				alert("当前队列已满60，不能再输入");
				return null;
			}

			if((/^\d+$/).test(inputNum)){
				inputNum = parseInt(inputNum);
				if(inputNum >= 10 && inputNum <=100){
					operatePromptT19.innerText = "";
					inputBox.value = "";
					return inputNum;
				}
				else{
					operatePromptT19.innerText = "输入数字要在10到100之间";
					inputBox.value = "";
					inputBox.focus();
					return null;
				}
			}
			else{
				operatePromptT19.innerText = "“要求输入的是数字”";
				inputBox.value = "";
				inputBox.focus();
				return null;
			}
		},

		//左侧入
		leftPush : function(){
			if(this.onSorting()) return false;
			var inputNum = this.getInput();
			if(!inputNum) return;

			this.queueData.unshift(inputNum);
			this.render();
		},

		//右侧入
		rightPush : function(){
			if(this.onSorting()) return false;
			var inputNum = this.getInput();
			if(!inputNum) return;

			this.queueData.push(inputNum);
			this.render();
		},

		//左侧出
		leftPop : function(){
			if(this.onSorting()) return false;
			if(this.queueData.length == 0) return;
			console.log(this.queueData.shift());
			this.render();
		},

		//右侧出
		rightPop : function(){
			if(this.onSorting()) return false;
			if(this.queueData.length == 0) return;
			console.log(this.queueData.pop());
			this.render();
		},

		//随机队列
		random : function(){
			if(this.onSorting()) return;
			this.queueData = [];
			var count = 6 + Math.floor(Math.random() * 10);
			for(var i = 0; i < count; i++){
				this.queueData[i] = 10 + Math.floor(Math.random() * 90);
			}
			this.render();
		},

		//队列可视化排序
		sort : function(){
			if(this.onSorting()) return false;
			if(this.queueData.length == 0) return false;
			var sortItems = queueWrapT19.getElementsByTagName("div");
			var timeSpeed = parseInt(document.getElementById("ip-speed-t19").value.trim()) || 50;
			var othis = this;
			isRendering = 1;

			if(sortItems.length == 1){
				sortItems[0].style.backgroundColor = "#efa754";
				operatePromptT19.innerText = "排序完成！";
			}

			//冒泡排序
			for(var i = 0; i < othis.queueData.length - 1; i++){

			//闭包处理：setTimeout()均包含在一个立即执行的匿名函数里，保证在执行setTimeout()时参数为for循环时对应的参数值。下同。setTimeout()的函数不会立即开始计时，而是会进入一个队列等待
			//固定外循环的参考颜色
				(function(i){
					setTimeout(function(){
						sortItems[i].style.backgroundColor = "red";
						isRendering = 1;
					}, timeSpeed * (othis.queueData.length * 2 - i -1) * i / 2);//此处的时间为前面扫描时间累加，下同
				})(i);

				for(var j = i + 1; j < othis.queueData.length; j++){

					//内循环扫描颜色
					(function(i, j){
						setTimeout(function(){sortItems[j].style.backgroundColor = "#efa754";}, timeSpeed * ((othis.queueData.length * 2 - i -1) * i / 2 + (j - i)));
					})(i, j);

					(function(i, j){

						setTimeout(function(){
							//比较交换
							if(othis.queueData[i] >= othis.queueData[j]){
								var temp = othis.queueData[i];

								othis.queueData[i] = othis.queueData[j];
								othis.queueData[j] = temp;

								sortItems[i].style.cssText = "height: "  + othis.queueData[i] * 3 + "px;" + "background-color: red;" + "transition: all " + timeSpeed / 300 + "s ease;";
								sortItems[i].innerText = sortItems[i].title = othis.queueData[i].toString();

								sortItems[j].style.cssText = "height: " + othis.queueData[j] * 3 + "px;" + "background-color: #17ab94;" + "transition: all " + timeSpeed / 300 + "s ease;";
								sortItems[j].innerText = sortItems[j].title = othis.queueData[j].toString();
							}
						}, timeSpeed * ((othis.queueData.length * 2 - i -1) * i / 2 + (j - i)));
					})(i, j);

					(function(i, j){
						setTimeout(function(){
							sortItems[j].style.backgroundColor = "#17ab94";
						if(i == othis.queueData.length - 2 && j == othis.queueData.length - 1) sortItems[j].style.backgroundColor = "#efa754";
						}, timeSpeed * ((othis.queueData.length * 2 - i -1) * i / 2 + (j - i) + 0.5));
					})(i, j);
				}

				(function(i){
					setTimeout(function(){
						sortItems[i].style.backgroundColor = "#efa754";
						if(i == othis.queueData.length - 2){isRendering = 0;
							operatePromptT19.innerText = "排序完成！";
						}
					}, timeSpeed * (othis.queueData.length * 2 - 2 - i) * (i + 1) / 2);
				})(i);
			}
		},

		fastSort : function(){
			if(this.onSorting()) return false;
			alert("由于方法不妥当，快排可视化尚未完成……");
			var len = this.queueData.length;
			if(len == 0) return false;

			var sortItems = queueWrapT19.getElementsByTagName("div");
			var timeSpeed = parseInt(document.getElementById("ip-speed-t19").value.trim()) || 50;
			var othis = this;
			var timer = 0;
			isRendering = 1;

			this.queueData = this.queueData.visualQuickSort(sortItems);

		},

		//排序检测
		onSorting : function(){
			if(isRendering == 1){
				operatePromptT19.innerText = "不可操作，正在排序中！";
				return true;
			}
			else{
				operatePromptT19.innerText = "";
				return false;
			}
		},

		//删除队列元素
		delEle : function(id){
			this.queueData.splice(id, 1);
			//queueWrapT19.removeChild(queueWrapT19.childNodes[id]);
			this.render();
		}
	}

	//快速排序算法
	Array.prototype.quickSort = function(){
		var len = this.length;
		if(len <= 1)
			return this.slice(0);
		var left = [], right = [], mid = [this[0]];
		for(var i = 1; i < len; i++){
			if(this[i] < mid[0])
				left.push(this[i]);
			else
				right.push(this[i]);
		}
		return left.quickSort().concat(mid.concat(right.quickSort()));
	}

	var timer = 0;
	Array.prototype.visualQuickSort = function(sortSliceItems){

		var timeSpeed = parseInt(document.getElementById("ip-speed-t19").value.trim()) || 200;
		var len = this.length;
		var left = [], right = [], mid = [this[0]];
		var leftItems = [], rightItems = [], sortItemsArray = [];
		var othis = this;

		if(len == 0) return [];
		if(len == 1){
			sortSliceItems[0].style.backgroundColor = "#efa754";
			return [this[0]];
		}

		//类数组对象转换复制
		for(var i = 0; i < len; i++)
			sortItemsArray.push(sortSliceItems[i]);

		//参考量标记
		// setTimeout(function(){
		// 	sortItemsArray[0].style.backgroundColor = "red";
		// }, timeSpeed * timer);

		(function(timer){
			setTimeout(function(){
				sortItemsArray[0].style.backgroundColor = "red";
			}, timeSpeed * timer);
		})(timer);

		for(var i = 1; i < len; i++){
			timer++;

			//扫描位置标记
			(function(i, timer){
				setTimeout(function(){
					sortItemsArray[i].style.backgroundColor = "#efa754";
				}, timeSpeed * timer);
			})(i, timer);

			(function(i, timer){
				setTimeout(function(){
					if(othis[i] < mid[0]){
						left.push(othis[i]);
						leftItems.push(sortItemsArray[i]);
						queueWrapT19.insertBefore(sortItemsArray[i], sortItemsArray[0]);
					}
					else{
						right.unshift(othis[i]);
						rightItems.unshift(sortItemsArray[i]);
						// queueWrapT19.insertBefore(sortItemsArray[i], sortItemsArray[i + 1]);
					}
				}, timeSpeed * (timer + 0.5));
			})(i, timer);

			(function(i, timer){
				setTimeout(function(){
					sortItemsArray[i].style.backgroundColor = "#17ab94";
				}, timeSpeed * (timer + 0.5));
			})(i, timer);
		}

		(function(timer){
			setTimeout(function(){
				sortItemsArray[0].style.backgroundColor = "#efa754";
			}, timeSpeed * (timer + 1));
		})(timer);

		console.log("x");
		return (function(timer){
			setTimeout(function(){
				 left.visualQuickSort(leftItems).concat(mid.concat(right.visualQuickSort(rightItems)));
			}, timeSpeed * (timer + 0.5));
		})(timer);
	}


	function addDelNumEvent(){
		var numList = queueWrapT19.getElementsByTagName("div");
		for(var i = 0; i < numList.length; i++){
			//若直接返回绑定队列的删除方法，则所有的数字实质绑定了相同的函数，其作用域链一致，最后的id等于循环结束后i的值，即numList.length，故需做闭包处理，外部匿名函数立即执行返回内部定义的实质绑定到数字的函数
			numList[i].addEventListener("click", function(i){
				return function(){return queueT19.delEle(i);};
			}(i));
		}
	}


	/**
	 * 按钮事件绑定
	 * @return {null} none
	 */
	function btnEvent(){
		var btnList = document.getElementById("task-19").getElementsByTagName("input");

		btnList[1].addEventListener("click", function(){queueT19.leftPush();});
		btnList[2].addEventListener("click", function(){queueT19.rightPush();});
		btnList[3].addEventListener("click", function(){queueT19.leftPop();});
		btnList[4].addEventListener("click", function(){queueT19.rightPop();});
		btnList[5].addEventListener("click", function(){queueT19.random();});
		btnList[6].addEventListener("click", function(){queueT19.sort();});
		btnList[7].addEventListener("click", function(){queueT19.fastSort();});
	}

	btnEvent();
	queueT19.isEmpty();
}


/**
 * 任务二十
 */
var taskT20 = document.getElementById("task-20");
var operatePromptT20 = taskT20.getElementsByClassName("err-warn")[0];
var queueWrapT20 = taskT20.getElementsByClassName("num-queue")[0];

var queueT20 = {
	queueData : [],

	//输入增加的内容
	addInput : function(){
		var inputBox = document.getElementById("ip-area-t20");
		var inputString = inputBox.value.trim();
		if(!inputString) return false;
		inputBox.value = "";
		inputBox.focus();
		//判断分割位置并将分割后的内容以数组返回
		return inputString.replace(/(\s|\t|\n|\r|,|\.|，|、)+/g, " ").split(" ");
	},

	//队列输出
	render : function(){
		queueWrapT20.innerHTML = "";
		for(var i = 0; i < this.queueData.length; i++){
			var newTag = document.createElement("div");
			newTag.innerText = this.queueData[i].toString();
			queueWrapT20.appendChild(newTag);
		}
		this.isEmpty();
		bindDelTagEvent();
	},

	//队列是否为空
	isEmpty : function(){
		if(this.queueData.length == 0){
			var queueState = document.createElement("p");
			queueState.className = "queue-empty";
			queueState.innerText = "当前没有标签";
			queueWrapT20.appendChild(queueState);
			return true;
		}
		else{
			var queueState = queueWrapT20.getElementsByClassName("queue-empty")[0];
			if(queueState) queueWrapT20.removeChild(queueState);
			return false;
		}
	},

	//删除标签
	delTag : function(id){
		console.log(this.queueData[id]);
		this.queueData.splice(id, 1);
		//queueWrapT20.removeChild(queueWrapT20.getElementsByTagName("div")[id]);
		this.render();
	},

	//左侧入
	leftPush : function(){
		var pushData = this.addInput();
		if(!pushData){
			operatePromptT20.innerText = "没有输入";
			return false;
		}
		operatePromptT20.innerText = "";
		for(var i = pushData.length - 1; i >= 0 ; i--){
			this.queueData.unshift(pushData[i]);
		}
		this.render();
	},

	//右侧入
	rightPush : function(){
		var pushData = this.addInput();
		if(!pushData){
			operatePromptT20.innerText = "没有输入";
			return false;
		}
		operatePromptT20.innerText = "";
		for(var i = pushData.length - 1; i >= 0; i--){
			this.queueData.push(pushData[i]);
		}
		this.render();
	},

	//左侧出
	leftPop : function(){
		if(this.queueData.length == 0){
			operatePromptT20.innerText = "没有标签";
			return false;
		}
		this.queueData.shift();
		queueWrapT20.removeChild(queueWrapT20.getElementsByTagName("div")[0]);
		this.isEmpty();
	},

	//右侧出
	rightPop : function(){
		if(this.queueData.length == 0){
			operatePromptT20.innerText = "没有标签";
			return false;
		}
		this.queueData.pop();
		queueWrapT20.removeChild(queueWrapT20.getElementsByTagName("div")[this.queueData.length]);
		this.render();
	},

	//查询
	search : function(){
		var searchBox = document.getElementById("ip-search-t20");
		var searchString = searchBox.value.toString().trim();

		//判断是否有输入
		if(searchString == ""){
			operatePromptT20.innerText = "查询内容为空";
			return false;
		}

		var tags = queueWrapT20.getElementsByTagName("div");
		var found = 0;//是否找到匹配内容标记
		for(var i = 0; i < this.queueData.length; i++){
			tags[i].style.backgroundColor = "#98b6be";
			if(this.queueData[i].match(searchString)){
				tags[i].style.backgroundColor = "#efa754";
				found = 1;
			}
		}
		if(found)
			operatePromptT20.innerText = "查询" + "“" + searchString + "”";
		else
			operatePromptT20.innerText = "没找到与“" + searchString + "”匹配的内容";
		searchBox.value = "";
	}
}

/**
 * 标签点击删除事件绑定
 * @return {null} [description]
 */
function bindDelTagEvent(){
	var tags = queueWrapT20.getElementsByTagName("div");
	for(var i = 0; i < tags.length; i++){
		tags[i].addEventListener("click", (function(i){
			return function(){
				return queueT20.delTag(i);
			};
		})(i));
	}
}

/**
 * 按钮事件绑定
 * @return {null} [description]
 */
function bindBtnEvent(){
	var btnList = taskT20.getElementsByTagName("input");
	btnList[0].addEventListener("click", function(){return queueT20.leftPush();});
	btnList[1].addEventListener("click", function(){return queueT20.rightPush();});
	btnList[2].addEventListener("click", function(){return queueT20.leftPop();});
	btnList[3].addEventListener("click", function(){return queueT20.rightPop();});
	btnList[5].addEventListener("click", function(){return queueT20.search();});
};

bindBtnEvent();
queueT20.isEmpty();


/**
 * 任务二十一
 */
var queueT21 = {
	data : [],

	//队列生成，wrap是父元素
	render : function(wrap){
		wrap.innerHTML = "";
		for(var i = 0; i < this.data.length; i++){
			var newTag = document.createElement("div");
			newTag.innerText = this.data[i];
			wrap.appendChild(newTag);
		}
		addDelTagEvent();
	},

	//去重，newInput是新输入(Array)
	isDuplicate : function(newInput){
		if(newInput == [] || newInput === false) return false;
		for(var i = 0; i < newInput.length; i++){
			if(this.data.indexOf(newInput[i]) >= 0) continue;
			this.data.push(newInput[i]);
		}
	},

	//判断是否超出个数范围
	isFull : function(){
		while(this.data.length > 10){
			this.data.shift();
		}
	}
};

/**
 * 创建继承对象
 * @param  {Object} obj 原型对象
 * @return {Object}     返回继承对象
 */
function inherit(obj){
	if(obj == null) throw TypeError();
	if(Object.create)
		return Object.create(obj);
	if(typeof obj !== "Object" || typeof obj !== "Function") throw TypeError();
	function f(){};
	f.prototype = obj;
	return new f();
}

//tag输入框
var tag = inherit(queueT21);
var tagBox = document.getElementById("ip-tag");
var tagQueue = document.getElementsByClassName("tag-queue")[0];

tag.data = [];//若创建自有data，会修改原型的data

tag.getInput = function(){
	var str = tagBox.value.toString()
	var lastLetter = str[str.length - 1];//提取最后一个符号用于判断是否属于分割符号
	switch(str[str.length - 1]){
		case " " :
		case "," :
		case "，" :
		case "\n" :
		case "\r" :
			tagBox.value = "";
			str = str.substring(0, str.length - 1).trim();;
			if(str == "") return false;
			return str.split();
			break;
		default : return false;
	}
};

tag.del = function(id){
	console.log(this.data[id]);
	this.data.splice(id, 1);
	// tagQueue.removeChild(tagQueue.getElementsByTagName("div")[id]);//若直接del了div，闭包会保持id不变，但实际的队列变了，导致出错
	this.render(tagQueue);
};

tag.detect = function(){
	var newInput = this.getInput();
	if(newInput == [] || newInput === false) return false;
	this.isDuplicate(newInput);
	this.isFull();
	this.render(tagQueue);
};

//兴趣爱好标签
var hobby = inherit(queueT21);
var hobbyBox = document.getElementById("hobby");
var hobbyQueue = document.getElementsByClassName("tag-queue")[1];

hobby.data = [];//若创建自有data，会修改原型的data

hobby.getInput = function(){
	var str = hobbyBox.value.toString().trim();
	if(str == "") return false;
	hobbyBox.value = "";
	return str.replace(/(\s|\t|\r|,|\.|，|、|。)+/g, " ").split(" ");
};

hobby.detect = function(){
	var newInput = this.getInput();
	this.isDuplicate(newInput);
	this.isFull();
	this.render(hobbyQueue);
};

/**
 * 标签点击删除事件绑定
 */
function addDelTagEvent(){
	var tags = tagQueue.getElementsByTagName("div");
	for(var i = 0; i < tags.length; i++){
		tags[i].addEventListener("click", (function(i){
			return function(){
				return tag.del(i);
			};
		})(i));
	}
}

/**
 * 事件绑定
 */
function addEvent(){
	//input事件监测输入内容是否改变
	tagBox.addEventListener("input", function(){
		return tag.detect();
	});
	//键入回车监测
	tagBox.addEventListener("keypress", function(event){
		return (function(event){
			var key = event.keyCode || event.which || window.event.keyCode; //第二个是针对firefox的判断，第三个是针对ie的判断
			if(key == 13){
				tagBox.value += " ";
				return tag.detect();
			}
		})(event);
	});
	document.getElementById("btn-submit").addEventListener("click", function(){
		return hobby.detect();
	});
}

addEvent();