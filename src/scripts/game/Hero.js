import * as PIXI from "pixi.js";
import { App } from "../system/App";
import * as Matter from "matter-js";

export class Hero {
    constructor() {
        this.createSprite();

        this.createBody();
        App.app.ticker.add(this.update.bind(this))
        
        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
    }

    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([
            App.res("walk1"),
            App.res("walk2")
        ]);

        // Set original position
        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;

        // Loop and set animation speed
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;

        // Start the animation
        this.sprite.play();
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;
    }

    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }
}