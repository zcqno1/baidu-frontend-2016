/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chartWrap = document.getElementById("aqi-chart-wrap");
  //清空图表
  chartWrap.innerHTML = "";
  //获取图表数据属性
  var currentCity = Object.getOwnPropertyNames(chartData)[pageState.nowSelectCity];
  var currentChart = chartData[currentCity][pageState.nowGraTime];
  var currentChartNames = Object.getOwnPropertyNames(currentChart);
  var newTitle = document.createElement("h1");
  newTitle.innerText = currentCity + "市空气质量按" + (pageState.nowGraTime == "day" ? "日" : pageState.nowGraTime == "week" ? "周" : "月") + "查看";
  chartWrap.appendChild(newTitle);
  for(var i = 0; i < currentChartNames.length; i++){
    var newRect = document.createElement("div");
    newRect.style.height = currentChart[currentChartNames[i]].toString() + "px";
    // newRect.style.backgroundColor = "#" + (666666 + Math.ceil(Math.random() * 333333));
    newRect.style.backgroundColor = "#" + parseInt(Math.random() * 80 + 120).toString(16) + parseInt(Math.random() * 80 + 120).toString(16) + parseInt(Math.random() * 80 + 120).toString(16);
    newRect.title = currentChartNames[i] + ":" + currentChart[currentChartNames[i]]; //设置矩形div的title属性
    newRect.className = pageState.nowGraTime; //给矩形div添加class名
    chartWrap.appendChild(newRect);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var currentTime;
  var aqiGraTime = document.getElementsByName("gra-time");
  for(var i = 0; i < aqiGraTime.length; i++){
    aqiGraTime[i].parentNode.className = "";
    if(aqiGraTime[i].checked){
      currentTime = aqiGraTime[i].value;
      aqiGraTime[i].parentNode.className = "gra-time-active";
    }
  }
  if(pageState.nowGraTime == currentTime) return;
  // 设置对应数据
  pageState.nowGraTime = currentTime;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var currentCityVal = document.getElementById("city-select").value;
  if(pageState.nowSelectCity == currentCityVal) return;
  // 设置对应数据
  pageState.nowSelectCity = currentCityVal;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var timeRadio = document.getElementById("form-gra-time").getElementsByTagName("input");
  for(var i = 0; i < timeRadio.length; i++)
    timeRadio[i].addEventListener("click", graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityNames = Object.getOwnPropertyNames(aqiSourceData);
  var citySelect = document.getElementById("city-select");
  for(var i = 0; i < cityNames.length; i++){
    var cityOption = document.createElement("option");
    cityOption.innerText = cityNames[i];
    cityOption.value = i;
    citySelect.appendChild(cityOption);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener("click", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityNames = Object.getOwnPropertyNames(aqiSourceData);
  var months = [["January", 31], ["February", 29], ["March", 31]];

  for(var i = 0; i < cityNames.length; i++){
    var currentCity = aqiSourceData[cityNames[i]];
    var currentCityDataNames = Object.getOwnPropertyNames(currentCity);
    chartData[cityNames[i]] = {};
    chartData[cityNames[i]]["day"] = {};
    chartData[cityNames[i]]["week"] = {};
    chartData[cityNames[i]]["month"] = {};
    var sumWeek = 0, sumMonth = 0, monthCount = 0;

    for(var j = 0; j < currentCityDataNames.length; j++){
      //累加各天空气质量指数
      sumWeek += currentCity[currentCityDataNames[j]];
      sumMonth += currentCity[currentCityDataNames[j]];

      //设置day数据
      chartData[cityNames[i]]["day"][currentCityDataNames[j]] = currentCity[currentCityDataNames[j]];

      var count = j + 1;
      //设置week数据
      if(count % 7 == 0){
        chartData[cityNames[i]]["week"]["week-" + count / 7 + ",2016"] = parseInt(sumWeek / 7);
        sumWeek = 0;
      }else if(count == currentCityDataNames.length)
        chartData[cityNames[i]]["week"]["week-" + (count / 7 + 1) + ",2016"] = parseInt(sumWeek / (count % 7));

      //设置month数据
      if(count == 31 || count == 60 || count == 91){
        chartData[cityNames[i]]["month"][months[monthCount][0] + ",2016"] = parseInt(sumMonth / months[monthCount][1]);
        monthCount++;
        sumMonth = 0;
      }
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
