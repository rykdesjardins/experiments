import p5js from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

class Timeline {
    constructor() {
        
    }

    static generateSketch(timeline) {
        return function( sketch ) {
            sketch.setup = timeline.setup.bind(timeline);
            sketch.draw = timeline.draw.bind(timeline);
        };
    }

    setup() {
        log('Timeline', 'P5 setup called back');
        log('Timeline', 'Setup complete');
    }

    draw() {

    }

    start() {
        this.p5 = new p5js(Timeline.generateSketch(this));
    }
}

export default Timeline;
