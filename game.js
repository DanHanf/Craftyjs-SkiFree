window.onload = function () 
{
    //start crafty
    Crafty.init(800, 672);
    //Crafty.canvas.init();
	alert('game started!')
	
	//preload the needed assets
	Crafty.load(["images/sprite.png", "images/bg.png"], function() {
		//splice the spritemap
		Crafty.sprite(16  , "images/sprite.png", {
			skiRight: [0,0],
			skiRightDown: [1,0]
		});
		//start the main scene when loaded
		Crafty.scene("main");
	});
	
	Crafty.scene("main", function() 
	{
		Crafty.background("url('images/bg.png')");
		
		
			
	});
};

