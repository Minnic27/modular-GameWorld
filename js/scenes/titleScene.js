class titleScene extends Phaser.Scene {
    constructor() {
        super("mainMenu");

    }

    preload() {

        this.load.image('play', 'assets/images/play.png');
        this.load.image('BG', 'assets/images/background.jpg');
        this.load.audio('menuTheme', [
            'assets/Audio/title.ogg'
        ])

    }

    create() {
        this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.beamSound = this.sound.add("menuTheme");
        this.add.image(370, 300, "BG");


        this.titleText = this.add.text(200, 100, 'MODUS GAME', { font: "60px Arial", fill: '#FFD700' });
        const helloButton = this.add.image(400, 350, 'play').setScale(.4);
        helloButton.setInteractive();
        helloButton.on('pointerdown', () => {
            this.beamSound.stop();
            this.scene.start("playGame");
        });
        this.beamSound.play();
        this.beamSound.loop = true;

    }
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.Em)) {
            this.beamSound.stop();
            this.beamSound.play();
            this.beamSound.loop = true;

        }
    }

}