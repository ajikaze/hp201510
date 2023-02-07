var ScrollPoint = {
	getGoal : function(id_name){
		var goal = Get.getElementPosition(id_name);
		var max_scroll = Get.getMaxScroll();
		
/*		goal.x = goal.x > max_scroll.x ? max_scroll.x : goal.x;*/
		goal.y = goal.y > max_scroll.y ? max_scroll.y : goal.y;
		
		return goal;
	},
	
	getDirection : function(start, goal){
		var direction = new Object();
		var move_x = goal.x - start.x;
		var move_y = goal.y - start.y;
		
		direction.x = move_x > 0 ? "plus" : "minus";
		direction.y = move_y > 0 ? "plus" : "minus";
		
		return direction;
	},
	
	getNext: function(goal, direction){
		var current = Get.getScrollPosition();
		var next = new Object();
		
		next.x = direction.x == 'plus'
					? Math.floor(current.x + ((goal.x - current.x) / 5)) + 1
					: next.x = Math.max(Math.floor(current.x - (current.x / 6)), goal.x);
		next.y = direction.y == 'plus'
					? Math.floor(current.y + ((goal.y - current.y) / 5)) + 1
					: next.y = Math.max(Math.floor(current.y - (current.y / 6)), goal.y);
		
 		return next;
	}
}

var Scroll = {
	leap : function(id_name){
		var start = Get.getScrollPosition();
		var goal = ScrollPoint.getGoal(id_name);
		var direction = ScrollPoint.getDirection(start, goal);
		
		this.land(goal, direction);
	},
	
	land : function(goal, direction){
		var next = ScrollPoint.getNext(goal, direction);
		
		scrollTo(next.x, next.y);
		
		if(this.running(next, goal, direction)){
			this.timerId = setTimeout(function(){Scroll.land(goal, direction)}, 10);
		}else{
			clearTimeout(Scroll.timerId);
		}
	},
	
	running : function(next, goal, direction){
		var running = false;
		
		if(direction.y == "plus" && next.y < goal.y){
			running = true;
		}else if(direction.y == "minus" && next.y != goal.y){
			running = true;
		}else if(direction.y == "plus" && next.y < goal.y){
			running = true;
		}else if(direction.y == "minus" && next.y != goal.y){
			running = true;
		}
		
		return running;
	},
	
	cancel : function(){
		Dom.addListener(document, "mousedown",      function(){clearTimeout(Scroll.timerId), false});
		Dom.addListener(document, "keydown",        function(){clearTimeout(Scroll.timerId), false});
		Dom.addListener(document, "mousewheel",     function(){clearTimeout(Scroll.timerId), false});
		Dom.addListener(document, "DOMMouseScroll", function(){clearTimeout(Scroll.timerId), false});
	}
}