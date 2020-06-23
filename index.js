$(function () {
  //侧边栏数据
  var data = [{ 'name': '账户ID格式化工具' },
  { 'name': '合并同账户下的关键词' },
  { 'name': '计算sku分库（4*32）账号ID' },
  { 'name': '计算xuri分库（32*32）账号ID' },
  { 'name': '字符串去重' }
  ]
  var html = '<ul>'
  data.forEach(function (item, index) {
    html += '<li data-value=' + (index + 1) + '><span>' + item.name + '</span></li>'
  })
  html += '</ul>'
  $('.title').html(html);
  $(".title li:first").addClass('active')
  $('.title li').on('click', function () {
    var id = $(this).data("value");
    $('.title li').removeClass('active');
    $('.title li').removeClass('activeStyle');
    if (id == 1) {
      $(this).removeClass('activeStyle3')
    } else {
      $('.title li:nth-child(1)').addClass('activeStyle3');
      $('.title li').removeClass('active');
    }
    $(this).addClass('active')
    $(this).prev().addClass('activeStyle')
    $('.content .model').hide();
    $('.model' + id).show();
    $('.content input').val('');
    $('.content textarea').val('');
    $('.content .answer').text('');
  })
  //模块一
  $('.model1 button').on('click', function () {
    console.log(88888);
    
    var inputString = $('.model1 .inputString').val();
    var splitStr = $('.model1 input').val();
    if (!inputString || inputString.trim().length < 0) {
      alert('请输入内容');
      return false;
    }
    //默认分割符为英文逗号
    if (splitStr == '' || splitStr == null) {
      splitStr = ",";
    }
    var inputArr = inputString.split('\n');
    var returnStr = inputArr[0].replace(/^\s+|\s+$/g, "");
    for (var i = 1; i < inputArr.length; i++) {
      var str = inputArr[i].replace(/^\s+|\s+$/g, "");
      if (str == '')
        continue;
      returnStr += splitStr + str;
    }
    $('.model1 .exportString').val(returnStr)
  })
  //模块二
  $('.model2 button').on('click', function () {
    var inputString = $('.model2 .inputString').val();
    var splitStr = $('.model2 input').val();
    if (!inputString || inputString.trim().length < 0) {
      alert('请输入内容');
      return false;
    }
    //默认分割符为英文逗号
    if (splitStr == '' || splitStr == null) {
      splitStr = ",";
    }
    var rows = inputString.split('\n');
		if (rows.length <= 0)
			return;
		var map = new Map();
		for (var i = 0; i < rows.length; i++) {
			if(rows[i] == '' || rows[i] == null){
				continue;
			}
      var	cols = rows[i].split("\t");
			var aid = cols[0];
			var keyWord = cols[1];
			
			if (map.has(aid)){
				var tWord = map.get(aid) + keyWord + splitStr;
				map.delete(aid);
				map.set(aid, tWord);				
			}else{
				keyWord += splitStr;
				map.set(aid, keyWord);
			}
			
		}
	  var returnStr = "";
		map.forEach(function(value, key, map){
			returnStr += key + "\t" + value.substring(0, value.length -1) + "\n";
		})
		$('.model2 .exportString').val(returnStr)
  })
  //模块三
  $('.model3 button').on('click', function () {
    var inputString = $('.model3 input').val();
		if (checkNum(inputString)) {
		var dbn = (inputString % 4) + 1;
		var tbn = ((Math.floor(inputString / 2)) % 32) + 1;
    $('.model3 .answer').text("0" + dbn + "_" + "0" + tbn)
		}
  })
    //模块四
    $('.model4 button').on('click', function () {
      var inputString = $('.model4 input').val();
      if (checkNum(inputString)) {
      var dbn = (inputString % 4) + 1;
      var tbn = ((Math.floor(inputString / 2)) % 32) + 1;
      $('.model4 .answer').text("0" + dbn + "_" + "0" + tbn)
      }
    })
  //模块五
  $('.model5 button').on('click', function () {
    console.log(666);
    //默认分割符为英文逗号
    var splitStr = ",";
    if (!inputString || inputString.trim().length < 0) {
      alert('请输入内容');
      return false;
    }

    var inputArr = inputString.split('\n');
    var set = new Set();
    for (var i = 0; i < inputArr.length; i++) {
      var str = inputArr[i].replace(/^\s+|\s+$/g, "");
      if (str == '')
        continue;
      set.add(str);
    }
    var returnStr = set.get(0);
    for (var i = 1; i < set.length; i++) {
      var str = set.get(i);
      returnStr +=  str + splitStr;
    }
    $('.model1 .exportString').val(returnStr.substring(0, returnStr.length - 1))
  })
  

  function checkNum(str) {
		if (str == "") {
			alert("别猴急，请输入一个数字");
			return false;
		}
		var str = str.trim();
		for (var i = 0; i < str.length; i++) {
			var ch = str.substring(i, i + 1);
			if (ch < "0" || ch > "9") {
				alert("浪费时间，请输入数字而不是其他字符");
				return false;
			}
		}
		return true;
	}
})