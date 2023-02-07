$(document).ready(function(){
	$.getJSON("ext_file/data/menu_category.js", function(data){
		var outPut = $("#output");
		var myContents = "";
		for(var i in data){
			if(i != 0){
				myContents += "<h5 class='to_top'>このページトップへ</h5><h5 class='to_mokuji'>目次を表示</h5>";
			}
			myContents += "<div id='category" + data[i].category_id + "' class='block'>"
			+"<h2 class='section_name'>■■■"
			+ data[i].category_name + "■■■</h2></div>";
		}
		outPut.html(myContents);
	});
	$.getJSON("ext_file/data/menu_kind.js", function(data){
		for(var i in data){
			$("#category" + data[i].category_id).append("<div class='small_block'>"
			+ "<h3 class='sub_title'>[ "
			+ data[i].kind_name + " ]</h3>"
			+ "<table id='kind" + data[i].kind_id + "'><tr><th class='item_name'>品名</th><th>説明</th><th class='price'>値段</th></tr></table></div>"
			);
		}
	});
	$.getJSON("ext_file/data/menu_data.js", function(data){
		for(var i in data){
				$("#kind" + data[i].kind_id).append("<tr><td>"
				+ data[i].name + "</td><td>"
				+ data[i].exp + "</td><td>￥"
				+ data[i].price + "</td></tr>");
		}
	});
});