
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  parent: 'phaser-example',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var sprite;
var cursors;
var game = new Phaser.Game(config);

//----------------------------------------
function preload ()
{
  // load your sprite sheet in the preload
  this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
}

//----------------------------------------
function create ()
{
  // then assign the sheet to our sprite in create
  sprite = this.physics.add.sprite(100, 450, 'dude');
  sprite.setBounce(0.2);
  sprite.setCollideWorldBounds(true);

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
}

//----------------------------------------
function update ()
{
  // let the sprite move when we update the screen
  if (cursors.left.isDown)
  {
      sprite.setVelocityX(-160);
      sprite.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      sprite.setVelocityX(160);
      sprite.anims.play('right', true);
  }
  else
  {
      sprite.setVelocityX(0);
      sprite.anims.play('turn');
  }

  if (cursors.up.isDown && (sprite.body.onFloor() || sprite.body.touching.down))
  {
      sprite.setVelocityY(-330);
  }
}
