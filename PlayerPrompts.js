import inquirer from "inquirer";

async function promptPlayerForDirection() {
    const result = await inquirer.prompt ({
        type : "list",
        name : "direction",
        message : "Which direction would you like to travel?",
        choices : ["UP", "DOWN", "LEFT", "RIGHT"],
    });
    return result.direction;
}

export {promptPlayerForDirection};