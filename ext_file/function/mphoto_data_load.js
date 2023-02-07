$(document).ready(function(){
	$.getJSON("ext_file/data/menu_data.js", function(data){
		var outPut = $("#output");
		var myContents = "";
		var myTitle = "";
		for(var i in data){
			if(data[i].photo != ""){
				if(myTitle != data[i].category){
					if(i != 0){
						myContents += "<h5 class='to_top'>このページトップへ</h5><h5 class='to_mokuji'>目次を表示</h5></div>";
					}
					myContents += "<div class='block'><h2 class='section_name'>■■■" + data[i].category + "</h2>";
					myTitle = data[i].category;
					
				}
				myContents += "<div class='small_block clearfix'><h3 class='sub_title'>[ "
							+ data[i].name +　"　"
							+ data[i].price + "円]</h3><div><a href='"
							+ data[i].photo + "' data-lightbox='image-" + i + "' title='"
							+ data[i].name + "'><img src='" 
							+ data[i].photo + "' class='photo' "
							+ data[i].photo_size + " /></a><p class='photo_exp'>" 
							+ data[i].exp + "</p></div></div>";
			}
		}
		outPut.html(myContents);
	});
});