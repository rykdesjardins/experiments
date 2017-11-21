import p5js from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import config from './config.js';

class Timeline {
    constructor() {
        global.addEventListener('resize', this.handleResize.bind(this));
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

        log('Timeline', 'Setup complete');
    }

    draw() {
        this.p5.ellipse(50, 50, 80, 80);
    }

    start() {
        this.p5 = new p5js(Timeline.generateSketch(this));
    }
}

export default Timeline;
