import Thing from './thing';
import config from '../config';
import ImageStore from '../imagestore';

class Cloud extends Thing {
    constructor(p5) {
        super(p5, p5.createVector(p5.random(-1200, config.canvas.width), p5.random(-1200, config.canvas.height)));
        this.image = ImageStore.getImage('fluffycloud');
        this.size = this.image.size;

        this.force = true;
        this.wrap = true;
        this.velocity = this.p5.createVector(p5.random(0.1, 1)); 
    }

    draw() {
        this.p5.image(this.image.img, this.position.x, this.position.y);
    }
}

export default Cloud;
