import * as PIXI from 'pixi.js'
import Config from './config';

class Stage {
    constructor(app) {
        this.scenes = {};
        this.renderer = PIXI.autoDetectRenderer(Config.width, Config.height, { antialias : false });
        this.app = app;
        this.currentScene;
    }

    setCurrentScene(name, transition, done) {
        // TODO: Add second background scene to transition between old and new
        this.currentScene = this.scenes[name];
        this.currentScene.load(() => {
            this.currentScene.setup();
            done();
        });
    }

    update() {
        this.currentScene.update();
    }

    draw() {
        this.renderer.render(this.currentScene.container);
    }

    addScene(name, scene, current) {
        this.scenes[name] = scene;
        current && this.setCurrentScene(name);
    }
}

export default Stage;
