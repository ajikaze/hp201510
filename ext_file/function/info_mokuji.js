Contents.prototype = {
	initialize :function(){
		this.contents = Get.getElement("contents");
		
		this.setUp();
	},
	
	setUp : function(){
		this.getBlocks();
		this.getSubTitles();
		this.getCells();
		
		this.setTargetId();
		this.setStates();
	},
	
	getBlocks: function(){
		var divs = this.contents.getElementsByTagName("DIV");
		
		this.blocks = new Array();
		this.small_blocks = new Array();
		var idx1 = 0, idx2 = 0;
		
		for(var i = 0; i < divs.length; i++){
			if(divs.item(i).className == "block"){
				this.blocks[idx1] = divs.item(i);
				idx1++;
			}
		}
		for(var i = 0; i < divs.length; i++){
			if(divs.item(i).className == "small_block"){
				this.small_blocks[idx2] = divs.item(i);
				idx2++;
			}
		}
	},
		
	getSubTitles : function(){
		var headings = this.contents.getElementsByTagName("H2");
		this.sub_titles = new Array();
		
		for(var i = 0; i < headings.length; i++){
			if(headings.item(i).className == "section_name"){
				this.sub_titles[i] = headings.item(i).innerHTML;
			}
		}
	},
	
	getCells : function(){
		this.cells = new Array();
		this.cells_length = 0;
		var idx = 0;
		
		for(var i = 0; i < this.blocks.length; i++){
			var headings = this.blocks[i].getElementsByTagName("H3");
			this.cells[i] = new Array(headings.length);
			
			for(var j = 0; j < headings.length; j++){
				if(headings.item(j).className == "sub_title"){
					this.cells[i][j] = headings.item(j).innerHTML;
				}
			}
			this.cells_length += this.cells[i].length;
		}	
	},
	
	setTargetId : function(){
		for(var i = 0; i < this.small_blocks.length; i++){
			this.small_blocks[i].id = "target" + i;
		}
	},
	
	setStates : function(){
		this.states = new Array();
		
		for(var i = 0; i < this.blocks.length; i++){
			this.states[i] = 0;
		}
	},
	
	changeStates : function(block_no){
		if(this.states[block_no]){
			this.states[block_no] = 0;
		}else{
			this.states[block_no] = 1;
		}
	}
}

MenuStyleMokuji.prototype = {
	initialize: function(contents){
		this.mokuji = Get.getElement("tbl_mokuji");
		this.contents = contents;
		
		this.print();
	},
	
	print : function(){
		this.createHTML();
		this.printMokuji();
	},
	
	createHTML: function(){
		this.InnerHtml = "<table>";
		this.createContents();
		this.InnerHtml += "</table>";
	},
	
	printMokuji: function(){
		this.mokuji.innerHTML = this.InnerHtml;
	},
	
	createHeadLine: function(block_no){
		this.titles = this.contents.sub_titles;
		
		this.InnerHtml += "<tr><th class='mokuji_head' id='head" + block_no + "'>";
		if(this.states[block_no] == 0){
			this.InnerHtml += "<span class='btn'>[ + ]</span>";
		}else{
			this.InnerHtml += "<span class='btn'>[ - ]</span>";
		}
		this.InnerHtml += "．．．．．．";
		this.InnerHtml += this.titles[block_no];
		this.InnerHtml += "</th></tr>";
	},
	
	createBlock: function(block_no){
		this.cells = this.contents.cells;
		var idx = 0;
		
		for(var i = 0; i < block_no; i++){
			idx += this.cells[i].length;
		}
		
		for(var i = 0; i < this.cells[block_no].length; i++){
			this.InnerHtml += "<tr>";
			this.InnerHtml += "<td class='link' id='menu" + (idx + i) + "'>";
			this.InnerHtml += this.cells[block_no][i];
			this.InnerHtml += "</td>";
			this.InnerHTML += "</tr>";
		}
	},

	createContents: function(){
		this.states = this.contents.states;
		
		for(var i = 0; i < this.states.length; i++){
			this.createHeadLine(i);
			if(this.states[i] == 1){
				this.createBlock(i);
			}
		}
	}
}
function Contents(){
	this.initialize();
}

function MenuStyleMokuji(contents){
	this.initialize(contents);
}