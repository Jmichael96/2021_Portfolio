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
});