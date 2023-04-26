class MapObject {
    #landscape = ["🌳", "🌲", "🌴", "🌵", "🌋", "🌾"];

    constructor(terrain, type = "undiscovered") {
        if (!terrain) {
            const randNum = Math.floor(Math.random() * this.#landscape.length);
            this.terrain = this.#landscape[randNum];
        } else {
            this.terrain = terrain;
        }
        this.type = type;
        }

    describe() {
        const random = Math.random()
        if (random < 0.33){
        console.log("Coast is clear!");
        } else if (random < 0.66) {
            console.log("This place looks familiar.");
        } else {console.log("It feels like I've been here.");}
    }
        
    }

export { MapObject };