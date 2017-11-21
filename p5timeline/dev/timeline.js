import p5js from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import config from './config';

import ImageStore from './imagestore';
import Cloud from './things/cloud';
import Star from './things/star';

class Timeline {
    constructor() {
        global.addEventListener('resize', this.handleResize.bind(this));
        this.ready = false;
        this.secondframe = 0;
    }

    handleResize() {
        const ratio = config.canvas.width / config.canvas.height;

        this.canvasElement.style.position = "relative";
        this.canvasElement.style.display = "block";

        if (window.innerWidth >= config.canvas.width) {
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

    static generateSketch(timeline) {
        return function( sketch ) {
            sketch.setup = timeline.setup.bind(timeline);
            sketch.draw = timeline.draw.bind(timeline);
        };
    }

    setup() {
        log('Timeline', 'P5 setup called back');
        this.canvas = this.p5.createCanvas(config.canvas.width, config.canvas.height);
        this.canvasElement = this.canvas.canvas;
        this.handleResize();
        this.clouds = [];
        this.stars = [];

        ImageStore.registerImage('assets/cloud.png', 'fluffycloud');
        
        ImageStore.loadImages(this.p5, this.postsetup.bind(this));
    }

    assessFPS() {
        document.title = "FPS - " + this.secondframe;
        this.secondframe = 0;
    }

    countFPS() {
        this.fpsinterval = setInterval(this.assessFPS.bind(this), 1000);
    }

    postsetup() {
        log('Timeline', 'Setup complete. Running post setup');
        for (let i = 0; i < config.total.clouds; i++) {
            this.clouds.push(new Cloud(this.p5));
        }

        for (let i = 0; i < config.total.stars; i++) {
            this.stars.push(new Star(this.p5));
        }

        log('Timeline', 'Ready to rock!');
        this.ready = true; 
        this.countFPS();
    }

    draw() {
        if (!this.ready) { return; }

        this.p5.blendMode(this.p5.BLEND);
        this.p5.background(0, 20, 40);

        this.stars.forEach(x => x.draw());

        this.p5.blendMode(this.p5.OVERLAY);
        this.clouds.forEach(x => {
            x.update(); 
            x.draw();
        });

        this.secondframe++;
    }

    start() {
        this.p5 = new p5js(Timeline.generateSketch(this));
    }
}

export default Timeline;
