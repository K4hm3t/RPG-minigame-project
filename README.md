The project is a Command Line Interface (CLI) game developed in JavaScript with Node.js as the runtime environment. The game is based on a grid map, and the player's objective is to reach the top right corner of the grid starting from the bottom left corner.

The game implements Object-Oriented Programming (OOP) principles and utilizes classes heavily to simplify state management. The classes and their interactions, fields, and methods have been defined using the Unified Modeling Language (UML) diagramming process.

The first step in developing the game was to draw out the grid and place the player and goal on it. The player can move up, down, left, or right on the grid, and each cell has a small chance of spawning an item or an enemy.

When an item spawns on a cell, the player can pick it up, and its stats are permanently added to the player's stats. If an enemy spawns on a cell, the player must fight it until one of them runs out of health points (HP).

The game provides a CLI interface with controls to move the player in different directions on the grid. The project has been written with JavaScript, allowing for easy integration with web technologies and other systems that support JavaScript.

Overall, the project aims to create an engaging and challenging game experience with a straightforward CLI interface.

To play this game, you need to run the PlayTheGame.js file in a JavaScript runtime environment like Node.js. Here are the steps to follow:

1. Make sure you have Node.js installed on your computer. You can download it from the official website: https://nodejs.org/en/download/.

2. Download all the necessary files for the game.

3. Open a terminal or command prompt and navigate to the folder where you saved the game files.

4. Run the PlayTheGame.js file by typing node playthegame.js in the terminal.

5. Follow the prompts to navigate through the game and make decisions for your character.

Enjoy playing the game!

****Additional****

If the pre-installed files (package.json, node_modules, package-lock.json) don't work, make sure to do the following:

- Install the package.json nad other node modules by running the following command in the terminal: npm init.

- Install the inquirer package by running the following command in the terminal: npm install inquirer.
