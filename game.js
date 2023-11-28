class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
  }

  preload() {
    this.load.path = "./assets/";
    this.load.image("enoki", "enoki.png");
    this.load.image("matsutake", "matsutake.png");
  }

  create() {
    player = this.physics.add
      .sprite(200 * 3, 200 * 3, "matsutake")
      .setScale(3)
      .setDepth(2);
  }
}

class PlayerSelect extends Phaser.Scene {
  constructor() {
    super("select");
  }
  preload() {
    this.load.path = "./assets/";
    this.load.image("enoki", "enoki.png");
    this.load.image("matsutake", "matsutake.png");
    this.load.image("player2", "player2.png");
    this.load.image("player3", "player3.png");
    this.load.image("player4", "player4.png");
    this.load.image("player5", "player5.png");
    this.load.image("title", "colorTitle.png");
  }
  create() {

    this.cameras.main.setBackgroundColor('#e75480'); 
    this.title = this.add.image(560, 300, "title").setInteractive();
    this.title.setScale(2);

    this.character1 = this.add.image(300, 800, "matsutake").setInteractive();
    this.character2 = this.add.image(500, 800, "player2").setInteractive();
    this.character3 = this.add.image(700, 800, "player3").setInteractive();
    this.character4 = this.add.image(700, 600, "player4").setInteractive();
    this.character5 = this.add.image(500, 600, "player5").setInteractive();
    
    this.character1.setScale(4);
    this.character2.setScale(4); 
    this.character3.setScale(4); 
    this.character4.setScale(4); 
    this.character5.setScale(4); 

    // Set up character selection event listeners
    this.character1.on("pointerdown", function () {
      selectCharacter("enoki");
    });

    this.character2.on("pointerdown", function () {
      selectCharacter("matsutake");
    });

    function selectCharacter(characterKey) {
      // Set the selected character key
      playerKey = characterKey;
      console.log("Selected character: " + playerKey);

      // Call a function to create the player using the selected character key
      //createPlayer(selectedCharacterKey);
    }

    // function createPlayer(characterKey) {
    //   // Create the player sprite using the selected character key
    //   var player = game.add.sprite(100, 100, characterKey);

    //   // Add additional player setup logic as needed
    // }
  }
  update() {}
}

class Title extends Phaser.Scene {
  constructor() {
    super("title");
  }
  preload() {
    this.load.path = "./assets/";
  }
  create() {}
  update() {}
}

class Gameover extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {}
}

var playerKey;

var config = {
  type: Phaser.AUTO,
  pixelArt: true,
  zoom: 1,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1100,
    height: 1080,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      debug: false,
    },
  },
  input: {
    activePointers: 5,
  },
  scene: [PlayerSelect], //Title, Gameplay, Gameover],
};

var game = new Phaser.Game(config);
