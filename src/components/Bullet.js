export default class Bullet {
    constructor(x, y, width, height, direction, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 5;
        this.direction = direction;
        this.color = color;
    }

    updatePosition() {
        this.x += this.speed * this.direction;
    }

    isOffScreen(canvasWidth) {
        return this.x < 0 || this.x > canvasWidth;
    }

    collidesWith(player) {
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        const distance = Math.hypot(dx, dy);

        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
