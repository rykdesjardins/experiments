const images = {};

class ImageStore {
    static registerImage(filename, id) {
        if (images[id]) {
            throw new Error("Image with id " + id + " already registered");
        }

        images[id] = { filename };
    }

    static loadSingle(p5, id, done) {
        log('ImageStore', 'Loading image ' + images[id].filename + " with id " + id);
        images[id].img = p5.loadImage(images[id].filename, (img) => {
            images[id].size = p5.createVector(img.width, img.height);
            done();
        });
    }

    static loadImages(p5, done) {
        const keys = Object.keys(images);

        let i = -1;
        const nextImage = () => {
            if (++i == keys.length) {
                log('ImageStore', 'Initialized ' + i + " images");
                return done && done();
            }

            ImageStore.loadSingle(p5, keys[i], nextImage);
        };

        log('ImageStore', 'Initializing image store');
        nextImage();
    }

    static getImage(id) {
        return images[id];
    }
}

module.exports = ImageStore;
