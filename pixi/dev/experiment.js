import Pixi, { Application } from 'pixi.js';
import Landing from './landing';
import Config from './config';
import Stage from './stage';

class Experiment {
    constructor() {
        global.addEventListener('resize', this.handleResize.bind(this));

        this.app = new Application(Config.width, Config.height, Config.appOption)
        this.canvasElement = this.app.view;
        this.stage = new Stage(this.app);
    }

    handleResize() {
        const ratio = Config.width / Config.height;

        this.canvasElement.style.position = "relative";
        this.canvasElement.style.display = "block";

        if (global.innerWidth >= Config.width) {
            this.canvasElement.style.width = (global.innerHeight * ratio) + "px";
            this.canvasElement.style.height = "100%";
            this.canvasElement.style.left = ((global.innerWidth - (global.innerHeight * ratio)) / 2) + "px";
            this.canvasElement.style.top = 0;
        } else {
            this.canvasElement.style.width = "100%"; 
            this.canvasElement.style.height = (global.innerWidth / ratio) + "px";
            this.canvasElement.style.left = 0;
            this.canvasElement.style.top = ((global.innerHeight - (global.innerWidth / ratio)) / 2) + "px";
        }
    }

    run() {
        document.body.appendChild(this.canvasElement);

        this.handleResize();
    }
};

new Experiment().run();
