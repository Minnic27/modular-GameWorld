var config = {
    type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [titleScene, Level1, deathScene, victoryScene],
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 0},
              debug: false
          }
      },
     
  };
  

  let game = new Phaser.Game(config);

function victory() {
    this.themeMusic.stop();
    this.scene.start("winScene");
};

function hitting(player, enemy) {
    this.Hit.play();
    map.removeTileAt(enemy.x, enemy.y, enemyLayer);
    hits -= 1;
    console.log("Lives: " + hits);
};