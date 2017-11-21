import Thing from './thing';
import config from '../config';

class Star extends Thing {
    constructor(p5) {
        super(p5, p5.createVector(p5.random(0, config.canvas.width), p5.random(0, config.canvas.height)));
        this.density = this.p5.random(0.5, 2);
    }

    update() { /* Will never update */ }

    draw() {
        this.p5.noStroke();
        this.p5.fill(255, 255, 255, Math.floor(this.p5.random(0, 255))).rect(this.position.x, this.position.y, this.density, this.density);
    }
}

export default Star;
