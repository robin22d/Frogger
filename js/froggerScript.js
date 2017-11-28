(function(window) {
    "use strict";


    // Game object, which has everLog that the game needs to be played.
    var Game = {
        init: function() {
            // crating new image veriables
            var img = new Image();
            var imgLog = new Image();
            var imgWater = new Image();
            var imgBackground = new Image();
            var imgCar1 = new Image();
            
            //Telling the image veriables where to get the images from
            img.src = 'media/images/character/characterF1.png';
            imgLog.src = 'media/images/log.png';
            imgBackground.src = 'media/images/Background.png';
            imgCar1.src = 'media/images/Car1.png';

            //gets the canvas from the html
            this.canvas = document.getElementById("game");
            this.ctx = this.canvas.getContext("2d");

            // gives the objec veriable names
            this.character = new Character(img);
            this.water = new Water(imgWater);
            this.log0 = new Log(imgLog); 
            this.log1 = new Log1(imgLog);
            this.log2 = new Log2(imgLog);
            this.log3 = new Log3(imgLog);
            this.background = new Background(imgBackground)

            this.playing = false;
            this.winStatus = 'playing';
            this.score = 0;

            var cars;
            //  sets up an array called car
            this.car = [];
            //set up a veriable of how many items are in the array
            this.noCar = 5;
            
            //loops through the array putting images into the array (calls that amount of car needed in the array from the veriable carsNo)
            for (var i = 0; i < this.noCar; i++) {
                cars = new Car(imgCar1);
                this.car.push(cars);
            }
            //cheack cars are going into array in the console
            console.log(this.car[1]);

            this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
            // cheacks every thime a key has been pressed down
            window.addEventListener("keydown", this.buttonDown);
            // cheaks every time a key has been reliesed 
            window.addEventListener("keyup", this.buttonUp);

            this.loop();
            // space to start the game
            this.message("Press SPACE to start", 40, this.canvas.height / 2);
        },

        //function that hold the movement of the frog
        buttonDown: function(e) {

            if (e.keyCode === 65 || e.keyCode === 37) { //cheaks if 'A' or LEFT have been preesed if so more frog
                Game.character.moving = "left";                
            } else if (e.keyCode === 68 || e.keyCode === 39) { //cheaks if 'D' or RIGHT have been preesed if so more frog
                Game.character.moving = "right";
            } else if (e.keyCode === 87 || e.keyCode === 38) { //cheaks if 'W' or UP have been preesed if so more frog
                Game.character.moving = "up";
            } else if (e.keyCode === 83 || e.keyCode === 40) { //cheaks if 'S' or Down have been preesed if so more frog
                Game.character.moving = "down";
            }
        },

        
        buttonUp: function(e) {
            if (e.keyCode === 37 || e.keyCode === 65) { //cheaks if 'A' or LEFT have been reliced if so more frog
                Game.character.moving = false;
            } else if (e.keyCode === 39 || e.keyCode === 68) { //cheaks if 'D' or RIGHT have been reliced if so more frog
                Game.character.moving = false;
            } else if (e.keyCode === 87 || e.keyCode === 38) { //cheaks if 'W' or UP have been reliced if so more frog
                Game.character.moving = false;
            } else if (e.keyCode === 83 || e.keyCode === 40) { //cheaks if 'S' or Down have been reliced if so more frog
                Game.character.moving = false;
            } else if (e.keyCode === 32) { // SPACE to pause
                if (Game.playing === true) {
                    Game.playing = false;
                } else {
                    // cheack id game is being played if so run game
                    Game.playing = true;
                    if (Game.winStatus === 'playing') {
                        Game.loop();
                    } else {
                        Game.init();
                    }
                }
            } else if (e.keyCode === 82) { // 'R' to reset the game
                Game.init();
            }
        },
        // the message that is apperes on the screen 
        message: function(text, x, y) {
            Game.ctx.font = 'Bold 30pt Calibri';
            Game.ctx.fillStyle = '#000';
            Game.ctx.fillText(text, x, y);
        },

        //function that hold loads the game
        loop: function() {

            Game.ctx.fillStyle = "#fff";
            Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);


            Game.background.draw();

            Game.water.draw();
            //load logs onlt screen and run there update function
            Game.log0.draw();
            Game.log0.update();

            Game.log1.draw();
            Game.log1.update();

            Game.log2.draw();
            Game.log2.update();

            Game.log3.draw();
            Game.log3.update();

            //every time the array is called this loop will run and draw and update anouther car
            
            for (var i = 0; i < Game.car.length; i++) {
                Game.car[i].draw();
                Game.car[i].update();
            }
            //draw and update charictor unction
            Game.character.draw();
            Game.character.update();
            //set score on the page
            Game.message("Score: " + Game.score, 0, Game.canvas.height - 20);


            if (Game.playing === true) {
                Game.currentFrame = Game.requestAnimationFrame.call(window, Game.loop);
            }
        }
    };

    // give the character peramiters
    var Character = function(img) {
        this.height = 30;
        this.width = 20;
        this.sprite = img;
        //set to center of screen
        this.x = Game.canvas.width / 2 - this.width / 2;
        this.y = Game.canvas.height - this.height;
        // give speed
        this.speed = 5;
        this.moving = false;
        this.padding = 10;
    };
    // give the log peramiters
    var Log = function(imgLog) {
        // randomise length of log  300 = biggest number is can be 100 = smallest
        var logLength = Math.floor((Math.random() * 300) + 100);
        this.height = 55;
        this.width = logLength;
        this.sprite = imgLog;
        this.x = 0;
        this.y = 85;
        // give log speed
        this.speed = 4;
    };
    //draw log
    Log.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    //update log in new position
    Log.prototype.update = function () {
        this.x -= this.speed;
        //reset log to other side of screen
        if (this.x <= - this.width) {
            this.x =  Game.canvas.width;
        }
    };
    // give the log peramiters
    var Log1 = function(imgLog) {
        // randomise length of log  200 = biggest number is can be 50 = smallest
        var logLength = Math.floor((Math.random() * 200) + 50)
        this.height = 50;
        this.width = logLength;
        this.sprite = imgLog;
        this.x = 0;
        this.y = 135;
        // give log speed
        this.speed = 4;
    };

    Log1.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    //update log in new position
    Log1.prototype.update = function () {
        this.x += this.speed;
        //reset log to other side of screen
        if (this.x >= Game.canvas.width) {
            this.x = 0 - this.width;
            
        }
    };
    // give the log peramiters
    var Log2 = function(imgWater) {
        // randomise length of log  200 = biggest number is can be 50 = smallest
        var logLength = Math.floor((Math.random() * 200) + 50)
        this.height = 50;
        this.width = logLength;
        this.sprite = imgWater;
        this.x = 0;
        this.y = 140;
        //speed of log
        this.speed = 4;
    };
    //draw log
    Log2.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    //update log in new position
    Log2.prototype.update = function () {
        this.x += this.speed;
         //reset log to other side of screen
        if (this.x >= Game.canvas.width) {
            this.x = 0 - this.width;
        }
    };

    var Log3 = function(imgLog) {
        // randomise length of log  300 = biggest number is can be 100 = smallest
        var logLength = Math.floor((Math.random() * 300) + 200);
        this.height = 40;
        this.width = logLength;
        this.sprite = imgLog;
        this.x = 0;
        this.y = 180;
        // speed of log
        this.speed = 4;
    };
    //draw log
    Log3.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    //update log in new position
    Log3.prototype.update = function () {
        this.x -= this.speed;
        //reset log to other side of screen
         if (this.x <= - this.width) {
            this.x =  Game.canvas.width;
            
        }
    };
    // update car
    var Car = function(imgCar1) {
        this.height = 50;
        this.width = 70;
        this.sprite = imgCar1;
        this.x = Math.floor((Math.random() * -300));
        this.y = Math.floor((Math.random() * 140) + 320);
        
        this.speed = Math.floor((Math.random() * 5) + 1);
        //Math.floor((Math.random() * 10) + 1);
    };

    Car.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };

    Car.prototype.update = function () {
        this.x += this.speed;
        
        if (this.x >= Game.canvas.width) {
            this.x = 0 - this.width;
            
        }
    };
    //draw charictor
    Character.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };

    Character.prototype.update = function() {
        //stops frog frog going of screen
        if (this.moving === "left" && this.x > 0) {
            this.x -= this.speed;
        } else if (this.moving === "right" && this.x + this.width < Game.canvas.width) {
            this.x += this.speed;
        } else if (this.moving === "up" && this.y > 0) {
            this.y -= this.speed;
        } else if (this.moving === "down" && this.y + this.width < Game.canvas.width) {
            this.y += this.speed;
        }

        
        //does not work frog dies even when touching log
        // var isDead = function (y) {
        //     if (y > 50 && y < 200) {
        //         console.log('dead');
        //     character.this.y = 500;
        //         character.this.x = 500;

        //     }
        // }

        if (this.x < Game.log0.x + Game.log0.width
            && this.x + this.width > Game.log0.x
            && this.y < Game.log0.y + Game.log0.height
            && this.y + this.height > Game.log0.y){
            
            this.x -= this.speed -1;
            // sets speed the same as logs speed
        // } else {
        //     isDead(this.y);
        }

        if (this.x < Game.log1.x + Game.log1.width
            && this.x + this.width > Game.log1.x
            && this.y < Game.log1.y + Game.log1.height
            && this.y + this.height > Game.log1.y){
            this.x += this.speed -1;
            //sets speed to be the same as log speed
        // } else {
        //     isDead(this.y);
        }

        if (this.x < Game.log2.x + Game.log2.width
            && this.x + this.width > Game.log2.x
            && this.y < Game.log2.y + Game.log2.height
            && this.y + this.height > Game.log2.y){
            //sets speed to be the same as log speed
            this.x += this.speed -1;
        // } else {
        //     isDead(this.y);
        }
        //collition detection for cars
        if (this.x < Game.log3.x + Game.log3.width
            && this.x + this.width > Game.log3.x
            && this.y < Game.log3.y + Game.log3.height
            && this.y + this.height > Game.log3.y) {
            //sets speed to be the same as log speed
            this.x -= this.speed - 1;
        // } else {
        //     isDead(this.y);
        }
       
        //collition detection for cars
        if (this.x < Game.car[0].x + Game.car[0].width
            && this.x + this.width > Game.car[0].x
            && this.y < Game.car[0].y + Game.car[0].height
            && this.y + this.height > Game.car[0].y){
            this.x = 300
            this.y = 550
        }
        //collition detection for cars
        for (var i = 0; i < Game.car.length; i++) {
            if (this.x < Game.car[i].x + Game.car[i].width
            && this.x + this.width > Game.car[i].x
            && this.y < Game.car[i].y + Game.car[i].height
            && this.y + this.height > Game.car[i].y){
            this.x = 300
            this.y = 550
        }
        }
        
    };

    var Water = function(imgWater) {
        this.height = 130;
        this.width = 600;
        this.sprite = imgWater;
        this.x = 0;
        this.y =  85;
        
    };

    Water.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };

   

    var Background = function(imgWater) {
        this.height = 600;
        this.width = 600;
        this.sprite = imgWater;
        this.x = 0;
        this.y =  0;
        
    };

    Background.prototype.draw = function() {
        Game.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };

    Game.init();
}(window));


// http://processingjs.nihongoresources.com/test/PjsGameEngine/docs/tutorial/mario.html



