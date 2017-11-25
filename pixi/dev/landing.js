import Scene from './scene';
import Config from './config';
import log from './log';
import Static from './static';

const MAX_CLOUDS = 10;
const MAX_STARS = 10000;

class Landing extends Scene {
    constructor(app) {
        super(app, [
            { name : "fluffycloud", file : "assets/cloud.png" }
        ]);
    }  

    setup(stage) {
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x001122);
        this.background.moveTo(0, 0);
        this.background.lineTo(0, Config.height);
        this.background.lineTo(Config.width, Config.height);
        this.background.lineTo(Config.width, 0);
        this.background.lineTo(0, 0);
        this.background.endFill();

        this.stars = new Array(MAX_STARS);
        for (let i = 0; i < MAX_STARS; i++) {
            this.stars[i] = { x : Math.random() * Config.width, y : Math.random() * Config.height, size : Math.random() * 2 };

            this.background.beginFill(0xFFFFFF, Math.random());
            this.background.drawRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
        }

        this.container.addChild(this.background);
   
        this.container.filters = [new PIXI.filters.AlphaFilter()];
        this.container.filterArea = new PIXI.Rectangle(0, 0, Config.width, Config.height);

        this.clouds = new Array(MAX_CLOUDS);
        log('Landing', 'Creating ' + MAX_CLOUDS + ' clouds');
        for (let i = 0; i < MAX_CLOUDS; i++) {
            this.clouds[i] = new PIXI.extras.PictureSprite(Static.getOne("fluffycloud").resource.texture);
            this.clouds[i].pluginName = "picture";

            this.clouds[i].x = Math.random() * Config.width - this.clouds[i].width / 2;
            this.clouds[i].y = Math.random() * Config.height - this.clouds[i].height / 2;
            this.clouds[i].vx = Math.random();
            this.clouds[i].blendMode = PIXI.BLEND_MODES.OVERLAY;
            this.clouds[i].alpha = Math.random();

            this.container.addChild(this.clouds[i]);
        }

        const clouds = this.clouds;
        global.setBlend = (b) => { clouds.forEach(x => { x.blendMode = b }); }
    } 

    update() {
        this.clouds.forEach(cloud => {
            cloud.x += cloud.vx;

            if (cloud.x > Config.width) {
                cloud.x = -cloud.width;
            }
        });
    }
}

export default Landing;
