import { MapObject } from './MapObjects.js';
import { ItemObject } from './ItemObject.js';
import { EnemyObject } from './EnemyObject.js';
import { Player } from './Player.js';
import { promptPlayerForDirection } from './PlayerPrompts.js';

class Map {
    #currentObject;

    constructor(width, height, playerStartX = 0, playerStartY = height - 1) {
        this.width = width;
        this.height = height;
        this.playerX = playerStartX;
        this.playerY = playerStartY;
        this.player = new Player ("Prince Knight", { attack : 15, defense : 5, hp : 25});

        //creating a map
        this.map = [];
        for(let row = 0; row < height; row++) {
            let thisRow = [];
            for(let col = 0; col < width; col++) {
                thisRow.push(new MapObject());
            }
            this.map.push(thisRow);
        }
        //player - position
        this.map[height - 1][0] = new MapObject("🤴", "player");
        //goal - position
        this.map[0][width - 1] = new MapObject("👸", "goal");

        this.startGame();
    }

    renderMap() {
        this.player.describe();

        for(let row = 0; row < this.height; row++) {
            for(let col = 0; col < this.width; col++) {
                // printing out one line in the terminal
                process.stdout.write(this.map[row][col].terrain + "\t"); 
            }
            process.stdout.write("\n");
        }
    }

    async startGame() {
        while(this.player.getStats().hp > 0) {
            this.renderMap();
            const response = await promptPlayerForDirection();

            switch (response) {
                case "UP" : {
                    this.movePlayerUp()
                    break;
                }
                case "DOWN" : {
                    this.movePlayerDown()
                    break;
                }
                case "LEFT" : {
                    this.movePlayerLeft()
                    break;
                }
                case "RIGHT" : {
                    this.movePlayerRight()
                    break;
                }
            }
            console.log("---------------------------------------------");
        }
    }

    generateMapObject() {
        const random = Math.random();
        let object;

        if (random < 0.15) {
            object = new ItemObject ("⚔", {
                name : "Sword",
                attack : 3,
                defense : 1,
                hp : 0
            })
        } else if (random < 0.35) {
            object = new EnemyObject ("🐲", {
                name : "Dragon",
                attack : 10,
                defense : 5,
                hp : 15,
            })
        } else {
            object = new MapObject ("👣", "discovered");
        }

        return object;
    }

    executeTurn() {
        if (this.map[this.playerY][this.playerX].type === "goal") {
            console.log(`🎇🎉 Congratulations, you saved the Princess !!! 🎉🎇`);
            process.exit(); // exit node terminal
        }
        if (this.#currentObject.type === "discovered") {
            this.#currentObject.describe();
            return;
        }
        if (this.#currentObject.type === "item") {
            this.#currentObject.describe();
            const itemStats = this.#currentObject.getStats();
            this.player.addToStats(itemStats);
            return;
        }
        //enemy encounter
        this.#currentObject.describe();

        const enemyStats = this.#currentObject.getStats();
        const enemyName = this.#currentObject.getName();
        const playerStats = this.player.getStats();

        if (enemyStats.defense > playerStats.attack) {
            console.log (`GAME OVER - ${enemyName} was too powerful!`);
            process.exit();
        }

        let totalPlayerDamage = 0;
        while (enemyStats.hp > 0) {
            const enemyDamageTurn = playerStats.attack - enemyStats.defense;
            const playerDamageTurn = enemyStats.attack - playerStats.defense;

            if (enemyDamageTurn > 0) {
                enemyStats.hp -= enemyDamageTurn;
            }
            if (playerDamageTurn > 0) {
                playerStats.hp -= playerDamageTurn;
                totalPlayerDamage += playerDamageTurn;
            }
        }

        if (playerStats.hp <= 0) {
            console.log (`GAME OVER - ${enemyName} was too powerful!`);
            process.exit();
        }

        this.player.addToStats({hp: -totalPlayerDamage});
        console.log (`You defeated the ${enemyName}! Your stats are:`);
        this.player.describe();
    }

    movePlayerRight() {
        // limiting player movement of the map
        if (this.playerX === this.width - 1) {
            console.log("Cannot move right");
            return;
        }

        //set the spot as discovered
        this.map[this.playerY][this.playerX] = new MapObject("👣", "discovered");
        //right movement
        this.playerX += 1;

        //check  if the spot is discovered
        if(this.map[this.playerY][this.playerX].type === "discovered") {
            this.map[this.playerY][this.playerX].describe();
            this.map[this.playerY][this.playerX] = new MapObject("🤴");
            return;
        }
        
        //discover new spot
        this.#currentObject = this.generateMapObject();
        this.executeTurn();
        this.map[this.playerY][this.playerX] = new MapObject("🤴");
    }

    movePlayerLeft() {
        // limiting player movement of the map
        if (this.playerX === 0) {
            console.log("Cannot move left");
            return;
        }

        //set the spot as discovered
        this.map[this.playerY][this.playerX] = new MapObject("👣", "discovered");
        //left movement
        this.playerX -= 1;

        //check  if the spot is discovered
        if(this.map[this.playerY][this.playerX].type === "discovered") {
            this.map[this.playerY][this.playerX].describe();
            this.map[this.playerY][this.playerX] = new MapObject("🤴");
            return;
        }
        
        //discover new spot
        this.#currentObject = this.generateMapObject();
        this.executeTurn();
        this.map[this.playerY][this.playerX] = new MapObject("🤴");
    }

    movePlayerUp() {
        // limiting player movement of the map
        if (this.playerY === 0) {
            console.log("Cannot move up");
            return;
        }

        //set the spot as discovered
        this.map[this.playerY][this.playerX] = new MapObject("👣", "discovered");
        //upward movement
        this.playerY -= 1;

        //check  if the spot is discovered
        if(this.map[this.playerY][this.playerX].type === "discovered") {
            this.map[this.playerY][this.playerX].describe();
            this.map[this.playerY][this.playerX] = new MapObject("🤴");
            return;
        }
        
        //discover new spot
        this.#currentObject = this.generateMapObject();
        this.executeTurn();
        this.map[this.playerY][this.playerX] = new MapObject("🤴");
    }

    movePlayerDown() {
        // limiting player movement of the map
        if (this.playerY === this.height - 1) {
            console.log("Cannot move down");
            return;
        }

        //set the spot as discovered
        this.map[this.playerY][this.playerX] = new MapObject("👣", "discovered");
        //downward movement
        this.playerY += 1;

        //check  if the spot is discovered
        if(this.map[this.playerY][this.playerX].type === "discovered") {
            this.map[this.playerY][this.playerX].describe();
            this.map[this.playerY][this.playerX] = new MapObject("🤴");
            return;
        }
        
        //discover new spot
        this.#currentObject = this.generateMapObject();
        this.executeTurn();
        this.map[this.playerY][this.playerX] = new MapObject("🤴");
    }
}

//new Map (5, 5);

export {Map};