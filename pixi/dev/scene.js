import Static from './static';

class Scene {
    constructor(app, dependencies = []) {
        this.app = app;
        this.dependencies = dependencies;
    }

    load(done) {
        this.dependencies.forEach(dep => {
            Static.add(dep.name, dep.file, dep.type);
        });

        Static.load(done);
    }

}

export default Scene;
