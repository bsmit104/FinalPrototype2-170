class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
    this.speed = 2; 
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

    // joystick
    let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);
  }

  spawnRockWithinView() {
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
    rock.body.setImmovable(true);

    rock.setVelocity(0, 0);
  }

  resetRock(rock) {
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
          player.y - this.halfScreenHeight,
          player.y - this.halfScreenHeight - 50
        );
    } else if (down) {
        rock.x = Phaser.Math.Between(
            player.x - this.halfScreenWidth,
            player.x + this.halfScreenWidth
        );
        rock.y = Phaser.Math.Between(
            player.y + this.halfScreenHeight + 50,
            player.y + this.halfScreenHeight
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

    player = this.physics.add.sprite(5000, 5000, playerKey).setScale(3).setDepth(2);
    enemyEnoki = this.physics.add.sprite(5500, 5500, 'enoki').setScale(3).setDepth(2);

    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(player);

    rocks = this.physics.add.group();
    this.spawnRockWithinView();

    this.physics.add.collider(rocks, player);
    this.physics.add.collider(rocks, enemyEnoki)

    // joystick
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 200,
      y: 800,
      radius: 100,
      base: this.add.circle(0, 0, 100, 0x888888),
      thumb: this.add.circle(0, 0, 30, 0xcccccc),
    });

    this.joystickCursors = this.joyStick.createCursorKeys();

    //enemyEnoki = this.physics.add.sprite(5500,5500,'enoki').setScale(3).setDepth(2);
    this.time = Date.now();

    this.timerText = this.add.text(20, 20, 'Time: 0', {
      fontSize: '24px',
      fill: '#fff'
    }).setScrollFactor(0); // Make the text stationary when the camera moves

    // ... (existing code)

    this.startTime = this.time.now;


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

      if (this.joystickCursors.left.isDown) {
        player.body.setVelocityX(-250);
        player.body.setVelocityY(0);
        left = true;
        right = false;
        up = false;
        down = false;
      } else if (this.joystickCursors.right.isDown) {
        player.body.setVelocityX(250);
        player.body.setVelocityY(0);
        left = false;
        right = true;
        up = false;
        down = false;
      } else if (this.joystickCursors.up.isDown) {
        player.body.setVelocityY(-250);
        player.body.setVelocityX(0);
        left = false;
        right = false;
        up = true;
        down = false;
      } else if (this.joystickCursors.down.isDown) {
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


      if (this.physics.overlap(player, enemyEnoki)) {
        console.log("Collision detected");
        this.scene.start("gameOver")
        // Handle collision behavior here, like game over or any other actions
        // this.scene.start("gameOver");
      }

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
    // Calculate the angle between the enemy and the player
    const angle = Phaser.Math.Angle.Between(enemyEnoki.x, enemyEnoki.y, player.x, player.y);

    // Set the velocity based on the angle
    enemyEnoki.setVelocityX(Math.cos(angle) * this.speed * 60);
    enemyEnoki.setVelocityY(Math.sin(angle) * this.speed * 60);

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.time; // Use this.time to track elapsed time
    
    console.log(elapsedTime)
    if (elapsedTime >10000) {
      this.speed += .0003; 
      console.log("Speed increased", this.speed);

    }

    const seconds = Math.floor(elapsedTime / 1000);
    this.timerText.setText(`Time: ${seconds}`);

    if (seconds == 50) {
      this.scene.start("title")
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
  create() {
    // Set the background color
    this.cameras.main.setBackgroundColor("#e75480");

    // Display a congratulatory message
    const congratsText = this.add.text(400, 300, 'Congratulations!', { 
      fontSize: '64px', 
      fill: '#fff',
      align: 'center'
    });
    congratsText.setOrigin(0.5);

    // Add a button to start the game
    const startButton = this.add.text(400, 400, 'Start Game', { 
      fontSize: '32px', 
      fill: '#fff',
      align: 'center'
    })
    .setInteractive()
    .on('pointerdown', () => {
      this.scene.start('select'); // Change this to your gameplay scene name
    });
    startButton.setOrigin(0.5);
  }
  update() {}
}

class Gameover extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {
    this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#fff' });

    // Add a button to restart the game
    const playAgainButton = this.add.text(400, 400, 'Play Again', { fontSize: '32px', fill: '#fff' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('select');
      });
    playAgainButton.setOrigin(0.5);
  
  }
}

let playerKey;
let enemyEnoki;
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
  scene: [PlayerSelect, Gameplay, Gameover, Title] //Title, Gameplay, Gameover],
};

class Clock extends Phaser.Scene {

}

var game = new Phaser.Game(config);