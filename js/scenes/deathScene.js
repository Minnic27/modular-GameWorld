var maxTime, hits;

class deathScene extends Phaser.Scene {
    constructor() {
        super("deathScene");

    }


    preload() {

        this.load.image('BG', 'assets/images/background.png');
        this.load.image('quit', 'assets/images/quit.png');
        this.load.image('retry', 'assets/images/retry.png');
        this.load.audio('deathTheme', [
            'assets/Audio/defeat.ogg'
        ])
    }

    create() {
        this.deathSound = this.sound.add("deathTheme");
        this.deathSound.play();
        this.add.image(370, 300, "BG");

        const retryButton = this.add.image(400, 250, 'retry').setScale(.5);
        retryButton.setInteractive();
        retryButton.on('pointerdown', () => {
            this.deathSound.stop()
            maxTime = 100;
            hits = 5;
            this.scene.start("playGame");
        });


        const quitButton = this.add.image(400, 350, 'quit').setScale(.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            this.deathSound.stop()
            maxTime = 100;
            hits = 5;
            this.scene.start("mainMenu");
        });
    }

    update() {

    }
}