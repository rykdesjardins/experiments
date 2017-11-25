import Scene from './scene';
import Config from './config';
import log from './log';
import Static from './static';
import { Vector } from "./physics";

const MAX_CLOUDS = 10;
const MAX_STARS = 20000;

const SCENE_HEIGHT = 2500;
const SCENE_WIDTH = Config.width;

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
        this.background.lineTo(0, SCENE_HEIGHT);
        this.background.lineTo(SCENE_WIDTH, SCENE_HEIGHT);
        this.background.lineTo(SCENE_WIDTH, 0);
        this.background.lineTo(0, 0);
        this.background.endFill();

        this.overlay = new PIXI.Graphics();
        this.overlay.beginFill(0);
        this.overlay.moveTo(0, 0);
        this.overlay.lineTo(0, Config.height);
        this.overlay.lineTo(Config.width, Config.height);
        this.overlay.lineTo(Config.width, 0);
        this.overlay.lineTo(0, 0);
        this.overlay.endFill();
        this.overlay.alpha = 1;

        this.stars = new Array(MAX_STARS);
        for (let i = 0; i < MAX_STARS; i++) {
            this.stars[i] = { x : Math.random() * SCENE_WIDTH, y : Math.random() * SCENE_HEIGHT, size : Math.random() * 2 };

            this.background.beginFill(0xFFFFFF, Math.random());
            this.background.drawRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
        }

        this.container.addChild(this.background);
   
        this.container.filters = [new PIXI.filters.AlphaFilter()];
        this.container.filterArea = new PIXI.Rectangle(0, 0, SCENE_WIDTH, SCENE_HEIGHT);

        this.clouds = new Array(MAX_CLOUDS);
        log('Landing', 'Creating ' + MAX_CLOUDS + ' clouds');
        for (let i = 0; i < MAX_CLOUDS; i++) {
            this.clouds[i] = new PIXI.extras.PictureSprite(Static.getOne("fluffycloud").resource.texture);
            this.clouds[i].pluginName = "picture";

            this.clouds[i].vector = new Vector(
                Math.random() * SCENE_WIDTH - this.clouds[i].width / 2,
                Math.random() * Config.height - this.clouds[i].height / 2,
                Math.random()
            );
            this.clouds[i].vector.setMax(Config.width);
            this.clouds[i].vector.attach(this.clouds[i]);
            this.clouds[i].blendMode = PIXI.BLEND_MODES.OVERLAY;
            this.clouds[i].alpha = Math.random();

            this.container.addChild(this.clouds[i]);
        }

        this.container.addChild(this.overlay);

        this.container.vector.setMinVelocity(0, -15.7);
        this.container.vector.setMaxVelocity(0, 0);
        this.container.vector.setMin(0, -(SCENE_HEIGHT - Config.height));

        this.vars.halfpan = -(SCENE_HEIGHT - Config.height) / 2;
        this.vars.fading = true;
    } 

    update() {
        super.update();

        if (this.vars.fading) {
            this.overlay.alpha -= 0.02;
            if (this.overlay.alpha <= 0) {
                this.overlay.alpha = 0;
                this.vars.fading = false;
                this.container.vector.ay = -.1;
            }
        } 

        if (this.container.vector.y < this.vars.halfpan) {
            this.container.vector.ay = .1;
        }

        this.container.vector.update();

        this.clouds.forEach(cloud => {
            cloud.vector.update();
        });
    }
}

export default Landing;
