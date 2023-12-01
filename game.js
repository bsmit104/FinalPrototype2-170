class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
  }

  preload() {
    this.load.path = "./assets/";
    this.load.image("enoki", "enoki.png");
    this.load.image("matsutake", "matsutake.png");
    this.load.image("player2", "player2.png");
    this.load.image("player3", "player3.png");
    this.load.image("player4", "player4.png");
    this.load.image("player5", "player5.png");
    this.load.image("rock", "rock.png");
  }

  spawnRockWithinView() {
    console.log('Camera Bounds:', this.cameras.main.worldView);
    this.halfScreenWidth = this.cameras.main.width / 2;
    this.halfScreenHeight = this.cameras.main.height / 2;

    const spawnX = Phaser.Math.Between(
      this.cameras.main.scrollX - this.halfScreenWidth,
      this.cameras.main.scrollX + this.halfScreenWidth
    );
    const spawnY = Phaser.Math.Between(
      this.cameras.main.scrollY - this.halfScreenHeight,
      this.cameras.main.scrollY + this.halfScreenHeight
    );

    const rock = rocks.create(spawnX, spawnY, "rock");
    rock.setCollideWorldBounds(true);
    rock.setBounce(1);
    rock.setScale(3);

    rock.setVelocity(0, 0);
  }

  resetRock(rock) {
    console.log('Camera Bounds:', this.cameras.main.worldView);
    if (startingGame) {
      rock.x = Phaser.Math.Between(
        player.x - this.halfScreenWidth,
        player.x + this.halfScreenWidth
      );
      rock.y = Phaser.Math.Between(
        player.y - this.halfScreenHeight,
        player.y + this.halfScreenHeight
      );
    } else {
      if (right) {
        rock.x = Phaser.Math.Between(
          player.x + this.halfScreenWidth,
          player.x + this.halfScreenWidth - 50
        );
        rock.y = Phaser.Math.Between(
          player.y - this.halfScreenHeight,
          player.y + this.halfScreenHeight
        );
      } else if (left) {
        rock.x = Phaser.Math.Between(
          player.x - this.halfScreenWidth,
          player.x - this.halfScreenWidth + 50
        );
        rock.y = Phaser.Math.Between(
          player.y - this.halfScreenHeight,
          player.y + this.halfScreenHeight
        );
      } else if (up) {
        rock.x = Phaser.Math.Between(
            player.x - this.halfScreenWidth,
            player.x + this.halfScreenWidth
        );
        rock.y = Phaser.Math.Between(
            this.cameras.main.scrollY,
            player.y + this.halfScreenHeight - 50
        );
    } else if (down) {
        rock.x = Phaser.Math.Between(
            player.x - this.halfScreenWidth,
            player.x + this.halfScreenWidth
        );
        rock.y = Phaser.Math.Between(
            player.y - this.halfScreenHeight + 50,
            player.y - this.halfScreenHeight
        );
    }
    }
  }

  create() {
    this.cameras.main.setBackgroundColor("#e75480");
    cursors = this.input.keyboard.createCursorKeys();

    this.worldWidth = 10000;
    this.worldHeight = 10000;

    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

    player = this.physics.add
      .sprite(5000, 5000, playerKey)
      .setScale(3)
      .setDepth(2);

    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(player);

    rocks = this.physics.add.group();
    this.spawnRockWithinView();
  }

  update() {
    if (cursors.left.isDown) {
      player.body.setVelocityX(-250);
      player.body.setVelocityY(0);
      left = true;
      right = false;
      up = false;
      down = false;
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(250);
      player.body.setVelocityY(0);
      left = false;
      right = true;
      up = false;
      down = false;
    } else if (cursors.up.isDown) {
      player.body.setVelocityY(-250);
      player.body.setVelocityX(0);
      left = false;
      right = false;
      up = true;
      down = false;
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(250);
      player.body.setVelocityX(0);
      left = false;
      right = false;
      up = false;
      down = true;
    } else {
      player.body.setVelocityY(0);
      player.body.setVelocityX(0);
      // left = false;
      // right = false;
      // up = false;
      // down = false;
    }

    rocks.children.iterate(function (rock) {
      const cameraLeftBound = this.cameras.main.scrollX;
      const cameraRightBound = this.cameras.main.scrollX + this.cameras.main.width;
      const cameraTopBound = this.cameras.main.scrollY;
      const cameraBottomBound = this.cameras.main.scrollY + this.cameras.main.height;
  
      if (
          rock.getBounds().right < cameraLeftBound ||
          rock.getBounds().left > cameraRightBound ||
          rock.getBounds().bottom < cameraTopBound ||
          rock.getBounds().top > cameraBottomBound
      ) {
          this.resetRock(rock);
      }
  }, this);

    if (rocks.countActive() < 10) {
      this.spawnRockWithinView();
    }
  }
}

class PlayerSelect extends Phaser.Scene {
  constructor() {
    super("select");
  }
  preload() {
    this.load.path = "./assets/";
    this.load.image("matsutake", "matsutake.png");
    this.load.image("player2", "player2.png");
    this.load.image("player3", "player3.png");
    this.load.image("player4", "player4.png");
    this.load.image("player5", "player5.png");
    this.load.image("title", "colorTitle.png");
  }
  create() {
    this.cameras.main.setBackgroundColor("#e75480");
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

    this.character1.on("pointerdown", function () {
      selectCharacter("matsutake");
    });

    this.character2.on("pointerdown", function () {
      selectCharacter("player2");
    });

    this.character3.on("pointerdown", function () {
      selectCharacter("player3");
    });

    this.character4.on("pointerdown", function () {
      selectCharacter("player4");
    });

    this.character5.on("pointerdown", function () {
      selectCharacter("player5");
    });

    const selectCharacter = (characterKey) => {
      playerKey = characterKey;
      this.scene.start("gameplay");
      console.log("Selected character: " + playerKey);
    };
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

let playerKey;
let cursors;
let player;
let rocks;
let left = false;
let right = false;
let up = false;
let down = false;
let startingGame = false;

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
  scene: [PlayerSelect, Gameplay], //Title, Gameplay, Gameover],
};

var game = new Phaser.Game(config);
