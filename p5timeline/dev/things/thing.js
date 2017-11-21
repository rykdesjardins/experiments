import config from '../config';

class Thing {
    constructor(p5, position) {
        this.p5 = p5;
        this.size = p5.createVector(0, 0);
        this.position = position || p5.createVector(0, 0);
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 0);
        this.force = false;
        this.wrap = false;
    }

    update() {
        if (this.force) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }

        if (this.wrap && this.size.x != 0 && this.size.y != 0) { 
            if (this.position.x > config.canvas.width) {
                this.position.x = -this.size.x;
            } else if (this.position.y > config.canvas.height) {
                this.position.y = -this.size.y;
            }
        }
    }

    draw() {
        throw new Error("The draw() method must be overriden by the child class.");
    }
}

export default Thing;
