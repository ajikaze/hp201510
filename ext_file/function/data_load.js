$(document).ready(function(){
	$.getJSON("ext_file/data/info_data.js", function(data){
		var outPut = $("#output");
		var myContents = "";
		for(var i in data){
			if(i % 5 == 0){
				myContents += "<div id='page-" + (i / 5 + 1) + "' class='selection'>";
			}
			myContents += "<div class='small_block clearfix'><h3 class='sub_title'>[ "
								+ data[i].title + "　_"
								+ data[i].date + " ]</h3><div><a href='"
								+ data[i].photo + "' data-lightbox='image-" + i + "' title='"
								+ data[i].title + "'><img src='"
								+ data[i].photo + "' class='photo' "
								+ data[i].photo_size + " /></a><p class='photo_exp'>"
								+ data[i].text + "</p></div></div>";
			if(i % 5 == 4 || i == data.length - 1){
				myContents += "</div>";
			}
								
		}
		outPut.html(myContents);
	});
});
