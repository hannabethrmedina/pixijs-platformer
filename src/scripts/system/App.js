import * as PIXI from "pixi.js";
import { Sprite, Application } from 'pixi.js';
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
import { EventEmitter } from "events";
import * as Matter from "matter-js";

class GameApplication extends EventEmitter {
    async run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.app = new Application();
        await this.app.init({ width: 960, height: 540});
        document.body.appendChild(this.app.canvas);

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        this.loader = new Loader();
        this.assets = await this.loader.preload();

        this.createPhysics();
        this.start();
    }

    sprite(key) {
        return new Sprite(this.assets[key]);
    }

    res(key) {
        return this.assets[key];
    }

    start(assets) {
        this.scenes.start("Game");
    }

    createPhysics() {
        this.physics = Matter.Engine.create();
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.physics);
    }

    
}

export const App = new GameApplication();
