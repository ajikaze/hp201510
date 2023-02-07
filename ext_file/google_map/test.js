var button = null;

ButtonState.prototype = {
	initialize : function(operate_id){
		this.id = operate_id;
		this.initializeState();
	}
	
	initializeState: function(){
		var myId = document.getElementById(this.id);
		var myTd = myId.getElementsByTagName("TD");
		
		
function ButtonState(operate_id){
	this.initialize(operate_id);
}

function setButtonColor(operate_id){
	button = new ButtonState(operate_id);
}