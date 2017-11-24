import { loader } from 'pixi.js';

let app;
const assets = {};

class Asset {
    constructor(filename, type) {
        this.filename = filename;
        this.type = type;
        this.loaded = false;
    }

    setResource(res) {
        this.resource = res;
        this.loaded = true;
    }
}

class Static {
    static setApp(papp) {
        app = papp;
    }

    static add(name, file, type = "image") {
        assets[name] = new Asset(file, type);
        loader.add(name, file);
    }

    static free(name) {
        assets[name] && assets[name].loaded && assets[name].resource.texture.destroy();
        delete assets[name];
    }
    
    static load(done) {
        loaded.load((loader, res) => {
            Object.keys(res).forEach(name => {
                assets[name].setResource(res[name]);
            });

            done();
        });
    }
}

export default Static;
