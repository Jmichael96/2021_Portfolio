(function () {
    'use strict';

    // General
    let canvas,
        screen,
        gameSize,
        game;

    // Assets
    let invaderCanvas,
        invaderMultiplier,
        //   size of enemies 
        invaderSize = 20,
        playerCanvas,
        // player image size
        playerSize = 20,
        // initialOffsetInvader,
        invaderAttackRate,
        // how large of a jump in pixels per invader movement
        invaderSpeed,
        // how fast the time interval takes for each movement
        // invaderRefreshRate = 10,
        //   the delay for when you finish a level. how long it comes back with new enemies 
        invaderSpawnDelay = 1;

    // Counter
    let i = 0,
        gameLevel = 0,
        kills = 0,
        spawnDelayCounter = invaderSpawnDelay;

    let invaderDownTimer;

    // blocks for random layout
    let blocks = [];

    // Game Controller
    let Game = function () {
        this.lost = false;
        this.player = new Player();
        this.invaders = [];
        this.invaderShots = [];

        // initiate the invaders to move and changes the amount of time per step moved
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (invaderDownTimer === undefined) {
                invaderDownTimer = setInterval(function () {
                    for (i = 0; i < game.invaders.length; i++) game.invaders[i].move();
                }, 0);
            }
        } else {
            if (invaderDownTimer === undefined) {
                invaderDownTimer = setInterval(function () {
                    for (i = 0; i < game.invaders.length; i++) game.invaders[i].move();
                }, 10);
            }
        }
    }

    Game.prototype = {
        // for when the user completes a level
        update: function () {

            // Next level when all invaders die
            if (game.invaders.length === 0) {

                spawnDelayCounter += 1;
                if (spawnDelayCounter < invaderSpawnDelay) return;

                // for when all invaders die. change the level amount
                gameLevel += 1;
                // for desktop users
                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    if (gameLevel === 1) {
                        // how often the invaders shoot
                        invaderAttackRate -= 0.001;
                    } else if (gameLevel === 2) {
                        // how often the invaders shoot
                        invaderAttackRate -= 0.008;
                        // add new section of invaders
                        blocks.unshift([3.5, 10.5]);
                        // up the speed of the invaders
                        invaderSpeed += .5;
                    } else if (gameLevel === 3) {
                        // add new section of invaders
                        blocks.unshift([0, 7, 14]);
                    } else if (gameLevel === 4) {
                        // add new section of invaders
                        blocks.unshift([3.5, 10.5]);
                    } else if (gameLevel === 5) {
                        // add new section of invaders
                        blocks.unshift([0, 7, 14]);
                        // add new section of invaders
                        blocks.unshift([0, 7, 14]);
                        // add new section of invaders
                        blocks.unshift([3.5, 10.5]);
                    } else if (gameLevel === 6) {
                        // up the speed of the invaders
                        invaderSpeed += .5;
                        // how often the invaders shoot
                        invaderAttackRate -= 0.01;
                    } else {
                        // add new section of invaders
                        blocks.unshift([3.5, 10.5]);
                        // add new section of invaders
                        blocks.unshift([0, 7, 14]);
                    }
                }   // for mobile users 
                else {
                    if (gameLevel === 1) {
                        // how often the invaders shoot
                        invaderAttackRate -= 0.001;
                    } else if (gameLevel === 2) {
                        // how often the invaders shoot
                        // invaderAttackRate -= 0.008;
                        // add new section of invaders
                        blocks.unshift([2, 4]);
                        // up the speed of the invaders
                        // invaderSpeed += .5;
                    } else if (gameLevel === 3) {
                        // add new section of invaders
                        blocks.unshift([0, 3, 6]);
                    } else if (gameLevel === 4) {
                        // add new section of invaders
                        blocks.unshift([2, 4]);
                    } else if (gameLevel === 5) {
                        // add new section of invaders
                        blocks.unshift([0, 3, 6]);
                        // add new section of invaders
                        blocks.unshift([2, 4]);
                    } else if (gameLevel === 6) {
                        // up the speed of the invaders
                        // invaderSpeed += .5;
                        // how often the invaders shoot
                        invaderAttackRate -= 0.01;
                    } else {
                        // add new section of invaders
                        blocks.unshift([2, 4]);
                        blocks.unshift([0, 3, 6]);
                    }
                }

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
                for (i = 0; i < game.invaders.length; i++) game.invaders[i].update();
            }

            // Don't stop player & projectiles.
            game.player.update();
            for (i = 0; i < game.invaderShots.length; i++) game.invaderShots[i].update();

            this.invaders = game.invaders.filter(function (invader) {
                return invader.active;
            });

        },

        // draw on the canvas
        draw: function () {
            if (this.lost) {
                // assigning total points into a variable
                const totalPoints = kills * 6;
                const prevPoints = localStorage.getItem('points');
                const prevLevel = localStorage.getItem('level');
                const prevKills = localStorage.getItem('kills');
                const highScoreRender = document.getElementById('highScoreMessage');
                // for if a user gets a high score change this so a message can be displayed on the canvas
                let hasHighScore = false;
                // changes layer filter of canvas
                screen.fillStyle = 'rgba(0, 0, 0, 0.01)';
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
                // changes the color of the text and projectiles
                screen.fillStyle = '#c75000';
                // if there is a high score render the text
                if (hasHighScore) {
                    let isBlinking = true;
                    highScoreRender.style.display = 'block';
                    highScoreRender.innerHTML = 'YOU GOT A HIGH SCORE!';
                    setInterval(() => {
                        if (isBlinking) {
                            highScoreRender.style.opacity = 0;
                            isBlinking = false;
                        } else {
                            highScoreRender.style.opacity = 1;
                            isBlinking = true;
                        }
                    }, 900);
                }
                screen.font = '2rem Mandatory Plaything';
                screen.fillText('YOU DIED', gameSize.width / 2, gameSize.height / 2 - 20);
                screen.font = '1.2rem Mandatory Plaything';
                screen.fillText('TOTAL KILLS: ' + kills, gameSize.width / 2, gameSize.height / 2 + 20);
                screen.font = '1.2rem Mandatory Plaything';
                screen.fillText('POINTS: ' + totalPoints, gameSize.width / 2, gameSize.height / 2 + 50);
                screen.font = '1rem Mandatory Plaything';
                screen.fillText('LEVEL: ' + gameLevel, gameSize.width / 2, gameSize.height / 2 + 80);
                // rendering the restart button
                document.getElementById('restartBtn').style.display = 'block';

            } else {
                // text elements
                const killEl = document.getElementById('kills');
                const levelEl = document.getElementById('level');
                const pointEl = document.getElementById('points');
                // need to clearRect or game breaks 
                screen.clearRect(0, 0, gameSize.width, gameSize.height);

                // bottom right of canvas showing kills,level,points
                killEl.innerHTML = `KILLS: ${kills}`;
                levelEl.innerHTML = `LEVEL: ${gameLevel}`;
                pointEl.innerHTML = `POINTS: ${kills * 6}`;
            }

            screen.beginPath();

            let i;
            this.player.draw();
            if (!this.lost) {
                for (i = 0; i < this.invaders.length; i++) this.invaders[i].draw();
                for (i = 0; i < this.invaderShots.length; i++) this.invaderShots[i].draw();
            }
            screen.fill();
        },

        // checks if the invaders are below the canvas size. if so they wont shoot
        invadersBelow: function (invader) {
            return this.invaders.filter(function (b) {
                return Math.abs(invader.coordinates.x - b.coordinates.x) === 0 &&
                    b.coordinates.y > invader.coordinates.y;
            }).length > 0;
        }
    };

    // ! INVADERS
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
                // speed and coordinates of enemy projectiles
                let projectile = new Projectile({
                    x: this.coordinates.x + this.size.width / 2,
                    y: this.coordinates.y + this.size.height - 5
                }, {
                    x: 0,
                    y: 1
                });
                game.invaderShots.push(projectile);
            }

        },
        draw: function () {
            if (this.active) screen.drawImage(invaderCanvas, this.coordinates.x, this.coordinates.y);
        },
        move: function () {
            // if statement dictates how far the invaders will travel from left to right
            if (this.patrolX < 0 || this.patrolX > gameSize.width / 2) {
                this.speedX = -this.speedX;
                // ? once invaders reach the right side they go strait down 
                this.patrolX += this.speedX;
                // how far invaders move forward
                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    this.coordinates.y += 10;
                } else {
                    this.coordinates.y += 1;
                }
                // if the invaders reach the end of the canvas. end game
                if (this.coordinates.y + this.size.height * 2 > gameSize.height) game.lost = true;
            } else {
                // for how long till the invaders move forward
                this.coordinates.x += this.speedX;
                this.patrolX += this.speedX;
            }
        },
        destroy: function () {
            this.active = false;
            // add to kills if an invader dies
            kills += 1;
        }
    };

    // Player
    let Player = function () {
        this.active = true;
        this.size = {
            width: playerSize,
            height: playerSize
        };
        // how many bullets burst out at ones when game starts
        this.shooterHeat = -3;

        // where the player starts on start game
        this.coordinates = {
            x: gameSize.width / 2 - (this.size.width / 2) | 0,
            y: gameSize.height - this.size.height * 2
        };

        this.projectile = [];
        this.keyboarder = new KeyController();
    };

    Player.prototype = {
        update: function () {
            for (let i = 0; i < this.projectile.length; i++) {
                this.projectile[i].update();
            }

            this.projectile = this.projectile.filter(function (projectile) {
                return projectile.active;
            });

            if (!this.active) return;

            // buttons for mobile 
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                const leftBtn = document.getElementById('leftBtn');
                const rightBtn = document.getElementById('rightBtn');
                let thing = this;
                let gameData = gameSize;
                // $('#leftBtn').on('touchstart touchmove mousedown', function (e) {
                //     e.preventDefault()
                //     if (thing.coordinates.x > 0) {
                //         thing.coordinates.x -= .01;
                //     }
                // });

                // $('#rightBtn').on('touchstart touchmove mousedown', function (e) {
                //     e.preventDefault()
                //     if (thing.coordinates.x < gameData.width - thing.size.width) {
                //         thing.coordinates.x += .01;
                //     }
                // });
                leftBtn.onmousedown = () => {
                    if (this.coordinates.x > 0) {
                        this.coordinates.x -= 6;
                    }
                }
                rightBtn.onmousedown = () => {
                    if (this.coordinates.x < gameSize.width - this.size.width) {
                        this.coordinates.x += 6;
                    }
                }
            }
            // controls the left and right speed of player
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.coordinates.x > 0) {
                this.coordinates.x -= 3;
            }
            else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && this.coordinates.x < gameSize.width - this.size.width) {
                this.coordinates.x += 3;
            }
            // ! AUTO SHOOT IS TURNED ON
            // check if on mobile or not. if so turn on full auto!
            // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // how fast the player can shoot
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.shooterHeat += 1.5;
            } else {
                this.shooterHeat += .5;
            }
            if (this.shooterHeat < 0) {
                // creating a new projectile and adjusting the coordinates/speed
                let projectile = new Projectile({
                    x: this.coordinates.x + this.size.width / 2 - 1,
                    y: this.coordinates.y - 1
                }, {
                    x: 0,
                    y: -7
                });
                this.projectile.push(projectile);
            } else if (this.shooterHeat > 12) {
                // how many shoot out after each shot
                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    this.shooterHeat = -2;
                } else {
                    this.shooterHeat = -1;
                }
            }
            // return;
            // }

            // ! FOR SPACE BAR SHOOT
            // for if the player is shooting
            // if (this.keyboarder.isDown(this.keyboarder.KEYS.Space)) {
            //     // how fast the player can shoot
            //     this.shooterHeat += 1;
            //     if (this.shooterHeat < 0) {
            //         // creating a new projectile and adjusting the coordinates/speed
            //         let projectile = new Projectile({
            //             x: this.coordinates.x + this.size.width / 2 - 1,
            //             y: this.coordinates.y - 1
            //         }, {
            //             x: 0,
            //             y: -7
            //         });
            //         this.projectile.push(projectile);
            //     } else if (this.shooterHeat > 12) {
            //         this.shooterHeat = -3;
            //     }
            // } else {
            //     this.shooterHeat = -3;
            // }
        },
        // draw the ship
        draw: function () {
            if (this.active) {
                screen.drawImage(playerCanvas, this.coordinates.x, this.coordinates.y);
            }

            for (let i = 0; i < this.projectile.length; i++) {
                this.projectile[i].draw();
            }

        },
        // destroy and lose the game
        destroy: function () {
            this.active = false;
            game.lost = true;
        }
    };

    // Projectile
    let Projectile = function (coordinates, velocity) {
        this.active = true;
        this.coordinates = coordinates;
        // size of each projectile
        this.size = {
            width: 2,
            height: 6
        };
        // speed of projectiles
        this.velocity = velocity;
    };

    Projectile.prototype = {
        update: function () {
            this.coordinates.x += this.velocity.x;
            this.coordinates.y += this.velocity.y;

            if (this.coordinates.y > gameSize.height || this.coordinates.y < 0) {
                this.active = false;
            }

        },
        draw: function () {
            if (this.active) {
                screen.rect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
                // color of the projectiles
                screen.fillStyle = '#48ff00';
            }
        }
    };
    // Keyboard input tracking
    let KeyController = function () {
        this.KEYS = {
            LEFT: 37,
            RIGHT: 39,
            Space: 32
        };
        let keyCode = [37, 39, 32];
        let keyState = {};

        let counter;
        window.addEventListener('keydown', function (e) {
            for (counter = 0; counter < keyCode.length; counter++)
                if (keyCode[counter] == e.keyCode) {
                    keyState[e.keyCode] = true;
                    e.preventDefault();
                }

        });

        window.addEventListener('keyup', function (e) {
            for (counter = 0; counter < keyCode.length; counter++)
                if (keyCode[counter] == e.keyCode) {
                    keyState[e.keyCode] = false;
                    e.preventDefault();
                }
        });

        this.isDown = function (keyCode) {
            return keyState[keyCode] === true;
        };

    };

    // checking if the arguments a & b collide
    function collides(a, b) {
        return a.coordinates.x < b.coordinates.x + b.size.width &&
            a.coordinates.x + a.size.width > b.coordinates.x &&
            a.coordinates.y < b.coordinates.y + b.size.height &&
            a.coordinates.y + a.size.height > b.coordinates.y;
    };

    // get location of pixels where invaders are starting up at
    function getPixelRow(rowRaw) {
        let textRow = [],
            placer = 0,
            row = Math.floor(rowRaw / invaderMultiplier);
        if (row >= blocks.length) return [];
        for (let i = 0; i < blocks[row].length; i++) {
            let tmpContent = blocks[row][i] * invaderMultiplier;
            for (let j = 0; j < invaderMultiplier; j++) textRow[placer + j] = tmpContent + j;
            placer += invaderMultiplier;
        }
        return textRow;
    }

    // create the invaders and locations
    function createInvaders() {
        let invaders = [];
        let i = blocks.length * invaderMultiplier;
        while (i--) {
            let j = getPixelRow(i);
            for (let k = 0; k < j.length; k++) {
                // renders how far spread the invaders are together
                invaders.push(new Invader({
                    x: j[k] * invaderSize,
                    y: i * invaderSize
                }));
            }
        }
        return invaders;
    }

    // Start game
    document.getElementById('startBtn').onclick = () => {
        initGameData();
        loop();
    };

    // on load event
    window.addEventListener('load', () => {
        // create the canvas
        canvas = document.getElementById('space-invaders');
        screen = canvas.getContext('2d');
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
        let invaderAsset = new Image();
        let playerAsset = new Image();

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
        };
        // image assets for player and invaders
        invaderAsset.src = './assets/images/game/invaderShip.png';
        playerAsset.src = './assets/images/game/invaderSm.png';
    });

    window.addEventListener('resize', () => {
        // when window size is changed, change the size of the canvas
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

    // initiate beginning game data
    function initGameData() {
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
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            blocks = [
                [0, 7, 14],
            ];
        } else {
            blocks = [
                [0, 3, 6]
            ];
        }
        game = new Game();
    };

    // restart game
    document.getElementById('restartBtn').onclick = () => {
        // reset game level to 1
        gameLevel = 0;

        initGameData();
    };

    // start looping through all the data and functions and initiate the animations
    function loop() {
        game.update();
        game.draw();
        requestAnimationFrame(loop);
    };
})();