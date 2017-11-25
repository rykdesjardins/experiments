import { Vector } from './physics';

class ParticleTemplate {
    constructor(drawable, settings) {
        this.drawable = drawable;
        this.settings = settings;
    }

    make() {
        return new this.drawable();
    }
}

class ParticleSet {
    constructor(particles, settings) {
        this.particle = particle;
        this.container = new PIXI.particles.ParticleContainer(max, settings || {
            scale: true,
            position: true,
            alpha: true
        });

        this.max = max;
    }
}

export default { ParticleTemplate, ParticleSet };
