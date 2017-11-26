export class Vector {
    constructor(x = 0, y = 0, vx = 0, vy = 0, ax = 0, ay = 0) {
        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.ax = ax;
        this.ay = ay;

        this.mx = Number.MAX_SAFE_INTEGER;
        this.my = Number.MAX_SAFE_INTEGER;
        this.minx = Number.MIN_SAFE_INTEGER;
        this.miny = Number.MIN_SAFE_INTEGER;
        
        this.mvx = Number.MAX_SAFE_INTEGER;
        this.mvy = Number.MAX_SAFE_INTEGER;
        this.minvx = Number.MIN_SAFE_INTEGER;
        this.minvy = Number.MIN_SAFE_INTEGER;

        this.forces = [];
    }

    setMax(mx = Number.MAX_SAFE_INTEGER, my = Number.MAX_SAFE_INTEGER) {
        this.mx = mx;
        this.my = my;
    }

    setMin(minx = Number.MIN_SAFE_INTEGER, miny = Number.MIN_SAFE_INTEGER) {
        this.minx = minx;
        this.miny = miny;
    }

    setMaxVelocity(mvx = Number.MAX_SAFE_INTEGER, mvy = Number.MAX_SAFE_INTEGER) {
        this.mvx = mvx;
        this.mvy = mvy;
    }

    setMinVelocity(minvx = Number.MIN_SAFE_INTEGER, minvy = Number.MIN_SAFE_INTEGER) {
        this.minvx = minvx;
        this.minvy = minvy;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    update() {
        if (this.frozen) { return; }

        this.vx += this.ax;
        this.vy += this.ay;

        if (this.vx > this.mvx) {
            this.vx = this.mvx
        } else if (this.vx < this.minvx) {
            this.vx = this.minvx;
        }

        if (this.vy > this.mvy) {
            this.vy = this.mvy
        } else if (this.vy < this.minvy) {
            this.vy = this.minvy;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x > this.mx) {
            this.x = this.mx;
        } else if (this.x < this.minx) {
            this.x = this.minx;
        }

        if (this.y > this.my) {
            this.y = this.my;
        } else if (this.y < this.miny) {
            this.y = this.miny;
        }

        this.forces.forEach(x => x.update(this));

        if (this.protoElem) {
            this.protoElem.x = this.x;
            this.protoElem.y = this.y;
        }
    }

    freeze() {
        this.frozen = true;
    }

    addForce(force) {
        this.forces.push(force);
    }

    attach(protoElem) {
        this.protoElem = protoElem;
    }
}

export class Force {
    static fromFunction(up) {
        return { update : up };
    }

    constructor(vx = 0, vy = 0, ax = 0, ay = 0) {
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
    }

    update(vector) {
        this.vx += this.ax;
        this.vy += this.ay;

        vector.x += this.vx;
        vector.y += this.vy;
    }
}

export class Range {
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
}
