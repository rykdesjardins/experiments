import log from './log';
import Landing from './landing';
import Config from './config';
import Stage from './stage';

global.frames = 0;
class Experiment {
    constructor() {
        global.addEventListener('resize', this.handleResize.bind(this));

        this.app = new PIXI.Application(Config.width, Config.height, Config.appOption)
        this.stage = new Stage(this.app, PIXI);

        this.stage.addScene('landing', new Landing(this.app));
    }

    handleResize() {
        const ratio = Config.width / Config.height;

        this.canvasElement = this.stage.renderer.view;
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

    update() {
        global.frames++;
        this.stage.update();
    }

    draw() {
        this.stage.draw();
    }

    bindFrameRate() {
        log('Experiment', "Bound fps counter");
        setInterval(() => {
            global.fps = global.frames * 2;
            document.title = global.fps + " FPS";
            global.frames = 0;
        }, 500);
    }

    pause() {
        this.app.ticker.stop();
    }

    run() {
        document.body.appendChild(this.stage.renderer.view);

        this.bindFrameRate();
        this.stage.setCurrentScene('landing', false, () => {
            this.handleResize();

            log('Experiment', 'Binding ticker with update function');
            this.app.ticker.add(() => {
                this.update();
                this.draw();            
            });
        });
    }
};

global._experiment = new Experiment();
_experiment.run();

document.addEventListener('keydown', () => { _experiment.pause(); });
