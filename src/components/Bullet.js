export default class Bullet {
    constructor(x, y, radius, speed, direction, color = "black") {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
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
        const distance = Math.hypot(player.x - this.x, player.y - this.y);
        return distance < player.radius + this.radius;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
