import Player from "./Player";
import Bullet from "./Bullet";

export default class Game {
  constructor(canvas, width, height, setSelectedPlayer) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.setSelectedPlayer = setSelectedPlayer;
    this.players = [
      new Player(30, height / 2, 20, "red"),
      new Player(width - 30, height / 2, 20, "blue"),
    ];
    this.bullets = [];
    this.mousePosition = { x: null, y: null };
  }

  initialize() {
    this.animate();
  }

  updateCanvasSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;

    this.players[0].y = height / 2;
    this.players[1].x = width - 30;
    this.players[1].y = height / 2;
  }

  setMousePosition(position) {
    this.mousePosition = position;
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.players.forEach((player, index) => {
      if (player.isClicked(x, y)) {
        this.setSelectedPlayer(index);
      }
    });
  }

  updatePlayerSettings(playerIndex, settings) {
    const player = this.players[playerIndex];
    if (player) {
      player.updateSettings(settings);
    }
  }

  animate() {
    this.updateGame();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  updateGame() {
    this.players.forEach((player) => {
      player.update(this.mousePosition, this.height);
      this.shoot(player);
    });
    this.updateBullets();
  }

  shoot(player) {
    if (player.canShoot()) {
      const bullet = player.createBullet();
      this.bullets.push(bullet);
    }
  }

  updateBullets() {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.updatePosition();
      const hitPlayer = this.checkCollisionWithPlayers(bullet);
      return !bullet.isOffScreen(this.width) && !hitPlayer;
    });
  }

  checkCollisionWithPlayers(bullet) {
    for (let player of this.players) {
      if (bullet.collidesWith(player)) {
        player.hit();
        return true;
      }
    }
    return false;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.players.forEach((player) => player.draw(this.ctx));
    this.bullets.forEach((bullet) => bullet.draw(this.ctx));
  }
}
