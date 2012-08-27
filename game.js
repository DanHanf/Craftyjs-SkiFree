window.onload = function () {
    //start crafty
    Crafty.init(800, 700);
    //Crafty.canvas.init();
	
	//preload the needed assets
	Crafty.load(["images/sprite.png", "images/bg.png"], function() {
		//splice the spritemap
		Crafty.sprite(38 , "images/sprite.png", {
			skiLeft: [6.55, 10.8, .59, .75],
			skiLeftDown: [6, 10.8, .55, .75],
			skiDownLeft: [5.4, 10.7, .53, .86],
			skiDown: [1.75, 0, .4, .85],
			skiDownRight: [1.31, 0, .4, .85],
			skiRightDown: [.65, 0, .6, .85],
			skiRight: [0, 0, .6, .85],
			treeSprite: [.1, 12.6, .9, 1.6]
		});
		//start the main scene when loaded
		Crafty.scene("main");
	});
	
	var playerSprites = ["skiLeft",
			"skiLeftDown",
			"skiDownLeft",
			"skiDown",
			"skiDownRight",
			"skiRightDown",
			"skiRight"];
	
	var currentSprite = 3;
	var lastSprite = 3;
	
	Crafty.scene("main", function() {
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
					if (currentSprite < 6) {
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
				
				if (currentSprite == 0) {
					this.yspeed = 0;
					this.xspeed = 0;
				} 
				else if (currentSprite == 1) {
					this.yspeed = 4;
					this.xspeed = -3;
				}
				else if (currentSprite == 2) {
					this.yspeed = 5.5;
					this.xspeed = -2;
				}
				else if (currentSprite == 3) {
					this.yspeed = 6;
					this.xspeed = 0;
				}
				else if (currentSprite == 4) {
					this.yspeed = 5.5;
					this.xspeed = 2;
				}
				else if (currentSprite == 5) {
					this.yspeed = 4;
					this.xspeed = 3;
				}
				else if (currentSprite == 6) {
					this.yspeed = 0;
					this.xspeed = 0;
				}
				else{
					this.yspeed = 0;
					this.xspeed = 0;
				}
				
				
				//var oldxspeed = this.xspeed;
				//this.xspeed = -this.yspeed;
				//this.yspeed = oldxspeed;
				this.x += this.xspeed;
				this.y += this.yspeed;
				
			}); 
			
		//Tree component
		Crafty.c("tree", {   
			init: function() {
				this.origin("center");
				this.attr({
					x: Crafty.math.randomInt(0, Crafty.viewport.width), //give it random positions
					y: Crafty.math.randomInt(0, 10000),
					xspeed: 0, 
					yspeed: 0,
				}).bind("EnterFrame", function() {

				});
			}});

			
		function initTrees(lower, upper) {
			var trees = Crafty.math.randomInt(lower, upper);
			asteroidCount = trees;
			lastCount = trees;

			for(var i = 0; i < trees; i++) {
				Crafty.e("2D, DOM, treeSprite, Collision, tree");
			}
		}
		initTrees(3, 500);
		Crafty.viewport.follow(player, 0, 0);
	});
};

