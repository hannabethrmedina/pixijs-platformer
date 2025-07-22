import { Assets } from 'pixi.js';

export class Loader {
    getAssetsFromFolder() {
        const assets = [];
        const req = require["context"]("./../../sprites", true, /\.(png|jpe?g)$/);

        req.keys().forEach(name => {
            assets.push({
                alias: name.split('/').reverse()[0].replace(".png", ""),
                src: req(name).default
            });
        });

        return assets;
    }

    async preload() {
        const assets = this.getAssetsFromFolder();
        const result = await Assets.load(assets);
        console.log("Loaded asset keys:", Object.keys(result));
        return result;
    }
}
