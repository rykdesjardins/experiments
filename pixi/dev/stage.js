class Stage {
    constructor(app) {
        this.scenes = {};
        this.app = app;
    }

    addScene(name, scene) {
        this.scene[name] = scene;
    }
}

export default Stage;
