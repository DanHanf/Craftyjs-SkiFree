window.onload = function () {
    //start crafty
    Crafty.init(800, 672);
    //Crafty.canvas.init();
	
	//preload the needed assets
	Crafty.load(["images/sprite.png", "images/bg.png"], function() {
		//splice the spritemap
		Crafty.sprite(38 , "images/sprite.png", {
			skiDown: [1.75, 0, .4, 1],
			skiRight: [0, 0, .6, 1],
			skiRightDown: [1,0]
		});
		//start the main scene when loaded
		Crafty.scene("main");
	});
	
	Crafty.scene("main", function() 
	{
		//load the background
		Crafty.background("url('images/bg.png')");
		
		//player entity
		var player = Crafty.e("2D, Canvas, skiDown, Controls, Collision")
			.attr({move: {left: false, right: false, up: false, down: false}, xspeed: 0, yspeed: 0, decay: 0.98, 
				x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 2, score: 0})
			.origin("center")
			.bind("KeyDown", function(e) {
				//on keydown, set the move booleans
				if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
					this.move.right = true;
				} else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
					this.move.left = true;
				}
			})
			.bind("EnterFrame", function() {
				if(this.move.right) this.rotation += 5;
				if(this.move.left) this.rotation -= 5;
			}); 
			
	});
};

