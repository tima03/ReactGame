import Bullet from './Bullet';

export default class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = 2;
        this.direction = 1;
        this.bounceCooldown = 500;
        this.canBounce = true;
        this.lastShotTime = 0;
        this.shotCooldown = 1000; // Пауза между выстрелами
        this.bulletColor = "black"; // Цвет пуль
    }

    update(mousePosition, canvasHeight) {
        this.updatePosition(canvasHeight);
        this.handleCollisionWithMouse(mousePosition);
    }

    updatePosition(canvasHeight) {
        let newY = this.y + this.speed * this.direction;

        if (newY - this.radius < 0 || newY + this.radius > canvasHeight) {
            this.direction *= -1;
            newY = this.y + this.speed * this.direction;
        }

        this.y = newY;
    }

    handleCollisionWithMouse(mouse) {
        if (!this.canBounce || !mouse) return;

        const distance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        if (distance < this.radius) {
            this.direction *= -1;
            this.canBounce = false;
            setTimeout(() => {
                this.canBounce = true;
            }, this.bounceCooldown);
        }
    }

    canShoot() {
        const now = Date.now();
        if (now - this.lastShotTime > this.shotCooldown) {
            this.lastShotTime = now;
            return true;
        }
        return false;
    }

    createBullet() {
        return new Bullet(this.x, this.y, 5, 5, this.x < 200 ? 1 : -1, this.bulletColor);
    }

    updateSettings(settings) {
        this.speed = settings.speed || this.speed;
        this.shotCooldown = settings.shotCooldown || this.shotCooldown;
        this.bulletColor = settings.bulletColor || this.bulletColor;
    }

    isClicked(x, y) {
        const distance = Math.hypot(x - this.x, y - this.y);
        return distance < this.radius;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    hit() {
        // Логика попадания
        console.log(`${this.color} player was hit!`);
    }
}
