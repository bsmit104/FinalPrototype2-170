class Gameplay extends Phaser.Scene {
    constructor() {
        super('gameplay');
    }

    preload() {
        this.load.path = "./assets/";
    }

    create() {

    }
}

class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload() {
        this.load.path = "./assets/";
    }
    create() {

    }
    update() {

    }
}

class Gameover extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    create() {
    }
}

var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    zoom: 1,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1100,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: false
        }
    },
    input: {
        activePointers: 5
    },
    scene: [Title, Gameplay, Gameover]
};

var game = new Phaser.Game(config);