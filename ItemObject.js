import {MapObject} from './MapObjects.js';

class ItemObject extends MapObject {
    #stats = {
        name : null,
        attack : 0,
        defense : 0,
        hp : 0,
    }
    constructor (terrain, stats) {
        super (terrain);
        this.type = "item";
        this.#stats = stats;
    }

    getName() {
        return this.#stats.name;
    }

    getStats() {
        return {
            attack : this.#stats.attack,
            defense : this.#stats.defense,
            hp : this.#stats.hp,
        }
    }

    describe() {
        const stats = this.#stats;
        console.log(`${this.terrain} You have found a ${stats.name}`);
        console.log(`${stats.name}'s Stats: HP: ${stats.hp} ATK: ${stats.attack} DEF: ${stats.defense}`);
    }
}

export {ItemObject};