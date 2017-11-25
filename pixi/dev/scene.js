import Static from './static';
import log from './log';

class Scene {
    constructor(app, dependencies = []) {
        this.app = app;
        this.container = new PIXI.Container();
        this.dependencies = dependencies;
    }

    addDependency(name, file, type = "image") {
        this.dependencies.push({ name, file, type })
    }

    setup() {

    }

    update() {

    }

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
