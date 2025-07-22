import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Background {
    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.createSprites();
    }

    // "Loop" it so that when an image falls off view and left it immediately gets moved to the right
    createSprites() {
        this.sprites = []

        for (let i = 0; i < 3; i++) {
            this.createSprite(i)
        }
    }

    createSprite(i) {
        const sprite = App.sprite("bg");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }

    move(sprite, offset) {
        const spriteRightX = sprite.x + sprite.width;
        const screenLeftX = 0;
        
        // Once it is completely out of view, shift it
        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }

        // Move our sprite left
        sprite.x -= offset;
    }

    update(dt) {
        const offset = this.speed * dt;
        this.sprites.forEach(sprite => {
            this.move(sprite, offset);
        });
    }
}