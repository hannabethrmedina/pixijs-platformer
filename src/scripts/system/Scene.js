import * as PIXI from "pixi.js";
import { App } from "./App";

export class Scene {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.create();
        App.app.ticker.add(this.update, this);
        console.log("New Scene instantiated:", this.constructor.name);
    }

    create() {}
    update() {}
    destroy() {}

    remove() {
        App.app.ticker.remove(this.update, this);
        this.destroy();
    }
}