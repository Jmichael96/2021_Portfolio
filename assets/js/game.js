(function () {
    'use strict';

    // general variables
    let canvas,
        screen,
        gameSize,
        game;
    // assets for the game
    let invaderCanvas,
        // assigns how many invaders are grouped together
        invaderMultiplier,
        // size of enemies
        invaderSize = 20,
        playerCanvas,
        // player image size
        playerSize,
        // how often the invaders attack
        invaderAttackRate,
        // how large the invaders jump per pixel
        invaderSpeed
    // delay when a level is finished and how long it takes for enemies to come back
    invaderSpawnDelay;
    // counters throughout the whole app
    let i = 0,
        gameLevel = 0,
        kills = 0,
        spawnDelayCounter = invaderSpawnDelay;

    // used for the interval in which dictates the invader speed
    let invaderDownTimer;

    // blocks for each invader layout
    let blocks = [];
    window.addEventListener('load', () => {
        // assign the canvas and screen variables
        canvas = document.getElementById('space-invaders');
        screen = canvas.getContext('2d');
        // mobile buttons
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            leftBtn.style.display = 'block';
            rightBtn.style.display = 'block';
        } else {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
        }
        // configure the size
        configSize();
    });

    // when window size is changed, change the size of the canvas
    window.addEventListener('resize', () => {
        configSize();
    });

    // configure the size of the canvas
    const configSize = () => {
        // the outer div surrounding the canvas
        const wrapper = document.getElementById('gameWrap');
        // create the canvas size
        if (window.innerWidth > 1200) {
            screen.canvas.width = 1200;
            screen.canvas.height = 700;
            wrapper.style.width = '1200px';
            wrapper.style.height = '700px';
            // setting the game screen size
            gameSize = {
                width: 1200,
                height: 700
            };
            // how many invaders group together
            invaderMultiplier = 2;
            // initialOffsetInvader = 1600;
        } else if (window.innerWidth > 920) {
            screen.canvas.width = 900;
            screen.canvas.height = 600;
            wrapper.style.width = '900px';
            wrapper.style.height = '600px';
            gameSize = {
                width: 900,
                height: 600
            };
            invaderMultiplier = 2;
            // initialOffsetInvader = 280;
        } else if (window.innerWidth > 736) {
            screen.canvas.width = 700;
            screen.canvas.height = 500;
            wrapper.style.width = '700px';
            wrapper.style.height = '500px';

            gameSize = {
                width: 700,
                height: 500
            };
            invaderMultiplier = 1;
        } else if (window.innerWidth > 518) {
            screen.canvas.width = 500;
            screen.canvas.height = 500;
            wrapper.style.width = '500px';
            wrapper.style.height = '500px';

            gameSize = {
                width: 500,
                height: 500
            };
            invaderMultiplier = 1;
        } else if (window.innerWidth > 430) {
            screen.canvas.width = 400;
            screen.canvas.height = 500;
            wrapper.style.width = '400px';
            wrapper.style.height = '500px';

            gameSize = {
                width: 400,
                height: 400
            };
            invaderMultiplier = 1;
        } else {
            screen.canvas.width = 300;
            screen.canvas.height = 500;
            wrapper.style.width = '300px';
            wrapper.style.height = '500px';

            gameSize = {
                width: 300,
                height: 500
            };
            invaderMultiplier = 1;
        }
    };

    const initGameData = () => {
        configSize();
        // starting kills back to 0
        kills = 0;
        // how often invaders shoot. (.1 being the most) - (.99999 being the least)
        invaderAttackRate = .9998;
        invaderSpeed = 1;
        // how long till the invaders spawn
        spawnDelayCounter = invaderSpawnDelay;
        // start the new game
        startGame();
    };

    // start a new game
    const startGame = () => {
        // set display to none to remove the restart button from screen
        document.getElementById('restartBtn').style.display = 'none';
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('highScoreMessage').style.display = 'none';
        blocks = [
            [0, 7, 14],
        ];
        game = new Game();
    };

    // start looping through all the data and functions and initiate the animations
    const loop = () => {
        game.update();
        game.draw();
        requestAnimationFrame(loop);
    };

    // Start game
    document.getElementById('startBtn').onclick = () => {
        let invaderAsset = new Image;
        let playerAsset = new Image;

        invaderAsset.onload = function () {
            // draw the invaders
            invaderCanvas = document.createElement('canvas');
            invaderCanvas.width = invaderSize;
            invaderCanvas.height = invaderSize;
            invaderCanvas.getContext("2d").drawImage(invaderAsset, 0, 0);
        };
        // on player load, draw player & initiate the game
        playerAsset.onload = () => {
            // draw the player
            playerCanvas = document.createElement('canvas');
            playerCanvas.width = playerSize;
            playerCanvas.height = playerSize;
            playerCanvas.getContext('2d').drawImage(playerAsset, 0, 0);

            initGameData();
            loop();
        };
        // image assets for player and invaders
        invaderAsset.src = "./assets/images/invaderShip.png";
        playerAsset.src = './assets/images/invaderSm.png';
    };

    // restart game
    document.getElementById('restartBtn').onclick = () => {
        // reset game level to 1
        gameLevel = 0;

        let invaderAsset = new Image;
        let playerAsset = new Image;

        invaderAsset.onload = function () {
            // draw the invaders
            invaderCanvas = document.createElement('canvas');
            invaderCanvas.width = invaderSize;
            invaderCanvas.height = invaderSize;
            invaderCanvas.getContext("2d").drawImage(invaderAsset, 0, 0);
        };
        // on player load, draw player & initiate the game
        playerAsset.onload = () => {
            // draw the player
            playerCanvas = document.createElement('canvas');
            playerCanvas.width = playerSize;
            playerCanvas.height = playerSize;
            playerCanvas.getContext('2d').drawImage(playerAsset, 0, 0);
            // Game Creation
            canvas = document.getElementById("space-invaders");
            screen = canvas.getContext('2d');

            initGameData();
        };
        // image assets for player and invaders
        invaderAsset.src = "./assets/images/invaderShip.png";
        playerAsset.src = './assets/images/invaderSm.png';
    };

    // ! GAME CONTROLLER
    let Game = function () {
        this.lost = false;
        this.player = new Player();
        this.invaders = [];
        this.invaderShots = [];

        // initiate the invaders to move and change the amount of time per invaderSpeed is initiated
        if (invaderDownTimer === undefined) {
            invaderDownTimer = setInterval(() => {
                for (i = 0; i < game.invaders.length; i++) {
                    game.invaders[i].move();
                }
            });
        }
    };

    Game.prototype = {
        update: function () {
            // next level for when the invaders are all gone
            if (game.invaders.length === 0) {
                // add to the spawn delay counter
                spawnDelayCounter += 1;

                // if the spawn delay counter is less than the invader spawn... return and don't continue
                if (spawnDelayCounter < invaderSpawnDelay) return;

                // change the game level
                gameLevel += 1;

                // for each level change the difficulty 
                if (gameLevel === 1) {
                    invaderAttackRate -= 0.001;
                } else if (gameLevel === 2) {
                    invaderAttackRate -= 0.008;
                    // add a new row of invaders
                    blocks.unshift([3.5, 10.5]);
                    invaderSpeed += .5;
                } else if (gameLevel === 3) {
                    // add new row of invaders
                    blocks.unshift([0, 7, 14]);
                } else if (gameLevel === 4) {
                    blocks.unshift([3.5, 10.5]);
                } else if (gameLevel === 5) {
                    blocks.unshift([0, 7, 14]);
                    blocks.unshift([0, 7, 14]);
                    blocks.unshift([3.5, 10.5]);
                } else {
                    // add new section of invaders
                    blocks.unshift([3.5, 10.5]);
                    // add new section of invaders
                    blocks.unshift([0, 7, 14]);
                }

                // recreate the invaders
                game.invaders = createInvaders();
                spawnDelayCounter = 0;
            }

            if (!this.lost) {
                // Collision for when the projectile hits an invader
                game.player.projectile.forEach(function (projectile) {
                    game.invaders.forEach(function (invader) {
                        if (collides(projectile, invader)) {
                            invader.destroy();
                            projectile.active = false;
                        }
                    });
                });
                // for if a projectile hits the user player
                this.invaderShots.forEach(function (invaderShots) {
                    if (collides(invaderShots, game.player)) {
                        game.player.destroy();
                    }
                });
                // update each invader
                for (i = 0; i < game.invaders.length; i++) game.invaders[i].update();
            }
            // Don't stop player & projectiles.
            game.player.update();
            for (i = 0; i < game.invaderShots.length; i++) game.invaderShots[i].update();

            this.invaders = game.invaders.filter((invader) => {
                return invader.active;
            });
        },
        // draw everything on the canvas
        draw: function () {
            if (this.lost) {
                // assigning total points in to a variable
                let totalPoints = kills * 6;
                // getting items from the local storage
                let prevPoints = localStorage.getItem('points');
                let prevLevel = localStorage.getItem('level');
                let prevKills = localStorage.getItem('kills');
                // location of where the high score will be rendered to
                const highScoreRender = document.getElementById('highScoreMessage');
                // if a user has a high score. change this so the correct message can be displayed
                let hasHighScore = false;
                // changes layer filter of canvas when game is over
                screen.fillStyle = 'rgba(0,0,0,.01)';
                screen.fillRect(0, 0, gameSize.width, gameSize.height);

                if (totalPoints > prevPoints) {
                    localStorage.setItem('points', totalPoints);
                    hasHighScore = true;
                }
                if (gameLevel > prevLevel) {
                    localStorage.setItem('level', gameLevel);
                    hasHighScore = true;
                }
                if (kills > prevKills) {
                    localStorage.setItem('kills', kills);
                    hasHighScore = true;
                }

                screen.textAlign = 'center';
                // changes color of text and projectiles
                screen.fillStyle = '#c75000';
                // if there is a high score render it
                if (hasHighScore) {
                    highScoreRender.style.display = 'block';
                    highScoreRender.innerHTML = 'YOU GOT A HIGH SCORE';
                }
                screen.font = '2rem';
                screen.fillText('YOU DIED', gameSize.width / 2, gameSize.height / 2 - 20);
                screen.font = '1.2rem';
                screen.fillText('TOTAL KILLS: ' + kills, gameSize.width / 2, gameSize.height / 2 + 20);
                screen.font = '1.2rem';
                screen.fillText('POINTS: ' + totalPoints, gameSize.width / 2, gameSize.height / 2 + 50);
                screen.font = '1rem';
                screen.fillText('LEVEL: ' + gameLevel, gameSize.width / 2, gameSize.height / 2 + 80);
                // render the restart button
                document.getElementById('restartBtn').style.display = 'block';
            } else {
                // text elements
                const killEl = document.getElementById('kills');
                const levelEl = document.getElementById('level');
                const pointEl = document.getElementById('points');
                // clear rect or game breaks
                screen.clearRect(0, 0, gameSize.width, gameSize.height);

                // bottom right of canvas showing kills level and points
                killEl.innerHTML = `KILLS: ${kills}`;
                levelEl.innerHTML = `KILLS: ${gameLevel}`;
                pointEl.innerHTML = `KILLS: ${kills * 6}`;
            }

            // initiate path of drawing canvas
            screen.beginPath();
            this.player.draw();
            let i;
            if (!this.lost) {
                // draw all the invaders
                for (i = 0; i < this.invaders.length; i++) this.invaders[i].draw();
                // draw each invader shot
                for (i = 0; i < this.invaderShots.length; i++) this.invaderShots[i].draw();
            }
            screen.fill();
        },
        invadersBelow: function () {
            // check if invaders have reached end of canvas
            return this.invaders.filter(function (b) {
                return Math.abs(invader.coordinates.x - b.coordinates.x) === 0 && b.coordinates.y > invader.coordinates.y;
            }).length > 0;
        }
    };

    // ! INVADER CONTROLLER
    let Invader = function (coordinates) {
        this.active = true;
        this.coordinates = coordinates;
        this.size = {
            width: invaderSize,
            height: invaderSize
        };
        this.patrolX = 0;
        this.speedX = invaderSpeed;
    };

    Invader.prototype = {
        update: function () {
            // invader projectiles
            if (Math.random() > invaderAttackRate && !game.invadersBelow(this)) {
                // speed and coordinates of projectile
                let enemyProjectile = new Projectile({
                    x: this.coordinates.x + this.size.width / 2,
                    y: this.coordinates.y + this.size.height / 2
                }, {
                    x: 0,
                    y: 1
                });
                game.invaderShots.push(enemyProjectile);
            }
        },
        draw: function () {
            // dictates how far invaders travel on the x-axis
            if (this.patrolX < 0 || this.patrolX > gameSize.width / 2) {
                this.speedX = -this.speedX;
                this.patrolX += this.speedX;
                // how far invaders move forward
                this.coordinates.y += 10;

                // if invaders reach end of canvas end game
                if (this.coordinates.y + this.size.height * 2 > gameSize.height) game.lost = true;
            } else {
                // for how long till invaders move forward
                this.coordinates.x += this.speedX;
                this.patrolX += this.speedX;
            }
        },
        destroy: function () {
            this.active = false;
            // add kills
            kills += 1;
        }
    };
});