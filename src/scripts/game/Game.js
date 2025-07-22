import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import * as PIXI from "pixi.js";

export class Game extends Scene {
    create() {
        this.createHero();
        this.createBackground();
        this.createPlatforms();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPlatforms() {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);

        window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowUp") {
                this.hero.startJump();
            }
        });
    }

    update(dt) {
        this.bg.update(dt);
        this.platforms.update(dt);
    }
}
