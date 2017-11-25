import log from './log';

const assets = {};
let mustload = false;

class Asset {
    constructor(file, type) {
        this.file = file;
        this.type = type;
        this.loaded = false;
    }

    setResource(res) {
        this.resource = res;
        this.loaded = true;
    }
}

class Static {
    static add(name, file, type = "image") {
        if (!assets[name]) { 
            log('Static', 'Added static resource ' + file + ' with name ' + name);
            assets[name] = new Asset(file, type);
            PIXI.loader.add(name, file);
            mustload = true;
        }
    }

    static getOne(name) {
        return assets[name];
    }

    static free(name) {
        assets[name] && assets[name].loaded && assets[name].resource.texture.destroy();
        delete assets[name];
    }
    
    static load(done) {
        if (!mustload) {
            log('Static', 'Nothing to load, calling back');
            return done();
        }

        log('Static', 'Calling loader load method');
        PIXI.loader.load((loader, res) => {
            Object.keys(res).forEach(name => {
                assets[name].setResource(res[name]);
            });

            mustload = false;

            log('Static', 'Done loading static assets, calling back');
            done();
        });
    }
}

export default Static;
