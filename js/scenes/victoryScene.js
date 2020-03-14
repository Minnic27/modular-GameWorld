var maxTime, hits;
var text;

class victoryScene extends Phaser.Scene {
    constructor() {
        super("winScene");

    }


    preload() {

        this.load.image('BG', 'assets/images/background.png');
        this.load.image('quit', 'assets/images/quit.png');
        this.load.audio('victoryTheme', [
            'assets/Audio/victory.ogg'
        ])
    }

    create() {
        this.winSound = this.sound.add("victoryTheme");
        this.winSound.play();
        this.add.image(370, 300, "BG");

        text = this.add.text(140, 90, "      CONGRATULATIONS!! \n\nYou have completed the game", {
            font: '40px Arial',
            fill: '#FFD700'

        });


        const quitButton = this.add.image(400, 350, 'quit').setScale(.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            this.winSound.stop()
            maxTime = 100;
            hits = 5;
            this.scene.start("mainMenu");
        });
    }

    update() {

    }
}