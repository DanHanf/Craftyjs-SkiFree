window.onload = function () {
    //start crafty
    Crafty.init(800, 672);
    //Crafty.canvas.init();
	
	//preload the needed assets
	Crafty.load(["images/sprite.png", "images/bg.png"], function() {
		//splice the spritemap
		Crafty.sprite(38 , "images/sprite.png", {
			skiLeft: [6.55, 10.8, .59, .75],
			skiLeftDown: [6, 10.8, .55, .75],
			skiDown: [1.75, 0, .4, .85],
			skiRightDown: [1.31, 0, .4, .85],
			skiRight: [0, 0, .6, .85]
		});
		//start the main scene when loaded
		Crafty.scene("main");
	});
	
	var playerSprites = ["skiLeft",
			"skiLeftDown",
			"skiDown",
			"skiRightDown",
			"skiRight"];
	
	var currentSprite = 2;
	var lastSprite = 2;
	
	Crafty.scene("main", function() 
	{
		//load the background
		Crafty.background("url('images/bg.png')");
		
		//player entity
		var player = Crafty.e("2D, Canvas, skiDown, Controls, Collision")
			.attr({move: {left: false, right: false}, xspeed: 0, yspeed: 0, decay: 0.9, 
				x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 10, score: 0})
			.origin("top")
			.bind("KeyDown", function(e) {
				//on keydown, set the move booleans
				if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
					this.move.right = true;
					if (currentSprite < 4) {
						currentSprite++;
					}
				} else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
					this.move.left = true;
					if (currentSprite > 0){
						currentSprite--;
					}
				}
			})
			.bind("KeyUp", function(e) {
				//on key up, set the move booleans to false
				if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
					this.move.right = false;
				} else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
					this.move.left = false;
				}
			})
			.bind("EnterFrame", function() {			
				if (currentSprite != lastSprite){
					this.removeComponent(playerSprites[lastSprite]).addComponent(playerSprites[currentSprite]);
					lastSprite = currentSprite;
				}
			}); 
			
	});
};

