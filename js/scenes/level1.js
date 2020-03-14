var player;
var cursors;
var belowLayer, worldLayer, aboveLayer, winLayer, enemyLayer;
var hits = 5;
var health, t_health;
var t_timer;
var map;
var tileset, tileset2;
var speed;
var maxTime = 100;
var initialTime;


class Level1 extends Phaser.Scene{
    constructor(){
      super("playGame");
      // this function will be called when the player touches a coin
  
    }


    preload() {
        this.load.spritesheet("tiles", "assets/images/tiles.png", {frameWidth: 50, frameHeight: 50}); // loads images 
        this.load.spritesheet("enemy", "assets/sprites/enemy.png", {frameWidth: 50, frameHeight: 50}); // loads images
        this.load.tilemapTiledJSON("map", "assets/map/map.json"); // loads map
        this.load.atlas("atlas", "assets/sprites/atlas.png", "assets/sprites/player.json");
        this.load.audio('BGM', [
            'assets/audio/bgM.ogg'
        ]);

        this.load.audio('Hit', [
            'assets/audio/hit.ogg'
        ]);
    }

    create() {

        this.Hit = this.sound.add("Hit");
        this.themeMusic = this.sound.add("BGM");
        this.themeMusic.play();
        this.themeMusic.loop = true;

        map = this.make.tilemap({ key: "map" });

        tileset = map.addTilesetImage("tiles", "tiles");
        tileset2 = map.addTilesetImage("enemy", "enemy");

        // layer names
        belowLayer = map.createStaticLayer("below", tileset, 0, 0);
        worldLayer = map.createStaticLayer("world", tileset, 0, 0);
        aboveLayer = map.createStaticLayer("above", tileset, 0, 0);
        winLayer = map.createStaticLayer("win", tileset, 0, 0);
        enemyLayer = map.createDynamicLayer("enemies", tileset2, 0, 0);

        //objects have collision property
        worldLayer.setCollisionByProperty({ collides: true });
        winLayer.setCollisionByProperty({ collides: true });
        enemyLayer.setCollisionByProperty({ collides: true });
       
        this.cameras.main.setBounds(0, 359, map.widthInPixels, map.heightInPixels);

        aboveLayer.setDepth(10);

        //creates player on spawn point
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

        player = this.physics.add
            .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
            .setSize(20, 30)
            .setOffset(6, 37);
        
        this.physics.add.collider(player, worldLayer);


        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-left-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-right-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-front-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-back-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        cursors = this.input.keyboard.createCursorKeys();
        
        initialTime = maxTime;
        t_timer = this.add.text(370, 30, '', {
            font: '40px Arial',
            fill: '#FF8C00'

        });

        t_health = this.add.text(20, 20, 'Health:', {
            font: '40px Arial',
            fill: '#FFFFFF'
        });

        
        health = this.add.text(20, 60, '100%', {
            font: '50px Arial',
            fill: '#FFD700'
        });


        health.setScrollFactor(0);
        t_health.setScrollFactor(0);
        t_timer.setScrollFactor(0);

        this.physics.add.collider(player, winLayer, victory, null, this);
        this.physics.add.collider(player, enemyLayer, hitting, null, this);
        
        
    }

    update() {

        maxTime -= 0.018;
        t_timer.setText(Math.round(maxTime));
    
        speed = 175;

        // Stop any previous movement from the last frame
        player.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            player.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            player.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
            player.anims.play("misa-left-walk", true);
        } else if (cursors.right.isDown) {
            player.anims.play("misa-right-walk", true);
        } else if (cursors.up.isDown) {
            player.anims.play("misa-back-walk", true);
        } else if (cursors.down.isDown) {
            player.anims.play("misa-front-walk", true);
        } else {
            player.anims.stop();
        }

        if ((maxTime <= 0) || (hits == 0)) {
            this.themeMusic.stop();
            this.scene.start("deathScene");
        }

        if (hits == 4) {
            health.setText("80%");
        } else if (hits == 3) {
            health.setText("60%");
        } else if (hits == 2) {
            health.setText("40%");
        } else if (hits == 1) {
            health.setText("20%");
        } else {
            health.setText("100%");
        }
        

    }
}

