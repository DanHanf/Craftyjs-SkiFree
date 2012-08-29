window.onload = function () {
    //start crafty
    Crafty.init(800, 700);
	
	//uncomment to use canvas element
    //Crafty.canvas.init();
	
	//preload the needed assets
	Crafty.load(["images/sprite.png", ""], function() {
		//splice the spritemap
		Crafty.sprite(38 , "images/sprite.png", {
			skiLeft: [6.55, 10.8, .59, .75],
			skiLeftDown: [6, 10.8, .55, .75],
			skiDownLeft: [5.4, 10.7, .53, .86],
			skiDown: [1.75, 0, .4, .85],
			skiDownRight: [1.31, 0, .4, .85],
			skiRightDown: [.65, 0, .6, .85],
			skiRight: [0, 0, .6, .85],
			skiCrash: [6.54, 11.8, .59, .75],
			skiOuch: [0, 10.7, .8, .8],
			skiJump: [2.2, 5.8, .9, .86],
			treeSprite: [.1, 12.6, .9, 1.6],
			rockSprite: [1.31, 13.4, 2, .7],
			jumpSprite: [3.5, 13.2, 2, .5]
		});
		//start the main scene when loaded
		Crafty.scene("main");
	});
	
	//this array is used to iterate through the player sprites when 
	//the player hits the left or right arrow
	var playerSprites = ["skiLeft",
			"skiLeftDown",
			"skiDownLeft",
			"skiDown",
			"skiDownRight",
			"skiRightDown",
			"skiRight"];
	
	var currentSprite = 3;
	var lastSprite = 3;
	var isCrashed = false;
	var isRecovering = false;
	var isJumping = false;
	
	Crafty.scene("main", function() {
		//load the background
	//	Crafty.background("url('images/bg.png')");
		
		
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
				if(isCrashed){
					this.yspeed = 0;
					this.xspeed = 0;
				}
				else {
					if (currentSprite != lastSprite && !isJumping){
						this.removeComponent(playerSprites[lastSprite]).addComponent(playerSprites[currentSprite]);
						lastSprite = currentSprite;
					}
					
					if (currentSprite == 0) {
						this.yspeed = 0;
						this.xspeed = 0;
					} 
					else if (currentSprite == 1) {
						this.xspeed = -4;
						this.yspeed = 4;
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
						this.xspeed = 4;
					}
					else if (currentSprite == 6) {
						this.yspeed = 0;
						this.xspeed = 0;
					}
					
					if (isRecovering) {
						this.yspeed = 1;
						this.xspeed = 0;
					}
					
					if (isJumping) {
						this.yspeed = 9;
						this.xspeed = 0;
					}
					
					this.x += this.xspeed;
					this.y += this.yspeed;
				}
			})
			.collision()
			.onHit("tree", function(e) {
				if(!isRecovering && !isJumping){
				this.removeComponent(playerSprites[lastSprite]).addComponent("skiOuch");
				isCrashed = true;
				that = this;
				setTimeout(function() {
						isCrashed = false;
						isRecovering = true;
						that.removeComponent("skiOuch").addComponent("skiCrash");
						setTimeout(function() {
							isCrashed = false;
							isRecovering = false;
							currentSprite = 3;
							that.removeComponent("skiCrash").addComponent("skiDown");	
						},1000);
					},500);
				}
			})
			.collision()
			.onHit("rock", function(e) {
				if(!isRecovering && !isJumping){
				this.removeComponent(playerSprites[lastSprite]).addComponent("skiOuch");
				isCrashed = true;
				that = this;
				setTimeout(function() {
						isCrashed = false;
						isRecovering = true;
						that.removeComponent("skiOuch").addComponent("skiCrash");
						setTimeout(function() {
							isCrashed = false;
							isRecovering = false;
							currentSprite = 3;
							that.removeComponent("skiCrash").addComponent("skiDown");	
						},1000);
					},500);
				}
			})
			.collision()
			.onHit("jump", function(e) {
				if(!isRecovering && !isJumping){
					isJumping = true;
	
					this.removeComponent(playerSprites[lastSprite]).addComponent("skiJump");
					
					var that = this;	
				//	that.tween({y: that.y-250}, 2000);
					
					setTimeout(function() {
						isJumping = false;
						that.removeComponent("skiJump").addComponent("skiDown");
						currentSprite = 3;
					}, 1200);
				}
			}); 

		//Tree component
		Crafty.c("tree", {   
			init: function() {
				this.origin("center");
				this.attr({
					x: Crafty.math.randomInt(0, Crafty.viewport.width * 2), //give it random positions
					y: Crafty.math.randomInt(0, 20000),
					xspeed: 0, 
					yspeed: 0,
				});
			}});

		//creates a random number of trees (within a range) and places them in random positions	
		function initTrees(lower, upper) {
			var trees = Crafty.math.randomInt(lower, upper);
			treeCount = trees;
			lastCount = trees;

			for(var i = 0; i < trees; i++) {
				Crafty.e("2D, DOM, treeSprite, Collision, tree").collision([20,60], [25,60], [30,60]);
			}
		}

		//Rock component
		Crafty.c("rock", {   
			init: function() {
				this.origin("center");
				this.attr({
					x: Crafty.math.randomInt(0, Crafty.viewport.width * 2), //give it random positions
					y: Crafty.math.randomInt(0, 20000),
					xspeed: 0, 
					yspeed: 0,
				});
			}});

			
		function initRocks(lower, upper) {
			var rocks = Crafty.math.randomInt(lower, upper);
			rockCount = rocks;
			lastCount = rocks;

			for(var i = 0; i < rocks; i++) {
				Crafty.e("2D, DOM, rockSprite, Collision, rock").collision([0,20], [10,30], [20,40], [30,50], [40,40], [50,30], [60,20] );
			}
		}
		
		//Jump component
		Crafty.c("jump", {   
			init: function() {
				this.origin("center");
				this.attr({
					x: Crafty.math.randomInt(0, Crafty.viewport.width * 2), //give it random positions
					y: Crafty.math.randomInt(0, 20000),
					xspeed: 0, 
					yspeed: 0,
				});
			}});

			
		function initJumps(lower, upper) {
			var jumps = Crafty.math.randomInt(lower, upper);
			jumpCount = jumps;

			for(var i = 0; i < jumps; i++) {
				Crafty.e("2D, DOM, jumpSprite, Collision, jump");
			}
		}
		
		//load up obstacles
		initTrees(50, 400);
		initRocks(50, 400);
		
		//load up jumps
		initJumps(50, 150);		
				
		//makes the viewport lock onto the player sprite for scrolling
		Crafty.viewport.follow(player, 0, 0);
	});

};

