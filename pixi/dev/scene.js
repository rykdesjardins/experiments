import Static from './static';
import { Vector } from './physics';
import log from './log';

class Scene {
    constructor(app, dependencies = []) {
        this.app = app;

        this.container = new PIXI.Container();
        this.camera = new PIXI.Container();

        this.container.vector = new Vector();
        this.camera.vector = new Vector();

        this.container.vector.attach(this.container);
        this.camera.vector.attach(this.camera);

        this.dependencies = dependencies;

        this.camera.addChild(this.container);
        this.vars = {};
    }

    addDependency(name, file, type = "image") {
        this.dependencies.push({ name, file, type })
    }

    setup()  { throw new Error("setup() method not implemented")  }
    update() { throw new Error("update() method not implemented") }

    // Can be overridden using super.load(() => { stuff; done(); })
    // Might be useful for async setup
    load(done) {
        log('Scene', 'Dependencies are being converted to static assets');
        this.dependencies.forEach(dep => {
            Static.add(dep.name, dep.file, dep.type);
        });

        log('Scene', 'Loading static assets');
        Static.load(done);
    }
}

export default Scene;
