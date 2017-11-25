import Scene from './scene';
import Config from './config';
import log from './log';
import Static from './static';
import { Vector } from "./physics";

const MAX_CLOUDS = 5;
const MAX_STARS = 20000;

const SCENE_HEIGHT = 2500;
const SCENE_WIDTH = Config.width;

class Landing extends Scene {
    constructor(app) {
        super(app, [
            { name : "fluffycloud", file : "assets/cloud.png" },
            { name : "pixel", file : "assets/pixel.png" }
        ]);
    }  

    setup() {
        this.clouds = new Array(MAX_CLOUDS);
        this.stars = new Array(MAX_STARS);

        // Text
        this.welcome = new PIXI.Text("WebGL experiment with Pixi, determination and a lot of caffeine.", {
            fontFamily : "Source Sans Pro",
            fill : 0xFFFFFF,
            fontSize : "28px",
            fontWeight : 300,
            align : "cemter"
        });

        this.createBridge();

        this.welcome.vector = new Vector(Config.width / 2 - this.welcome.width / 2, Config.height / 2 - 28);
        this.welcome.alpha = 0;
        this.welcome.vector.attach(this.welcome);
        this.welcome.vector.update();

        this.container.addChild(this.welcome);

        this.vars.halfpan = -(SCENE_HEIGHT - Config.height) / 2;
        this.vars.panning = false;
        this.vars.fading = false;
        this.vars.presenting = true;

        this.vars.texttimer = performance.now() + 5000;
    }

    createBridge() {
        const bridge = new PIXI.Graphics();
        const pady = 400;

        bridge.lineStyle(20, 0x79c4a1, 1);
        bridge.moveTo(-100, 300 + pady);
        bridge.quadraticCurveTo(200, 200 + pady, 300, 100 + pady);
        bridge.quadraticCurveTo(1000, 300 + pady, 1700, 100 + pady);
        bridge.quadraticCurveTo(1800, 200 + pady, 2100, 300 + pady);
        bridge.moveTo(2100, 400 + pady);
        bridge.quadraticCurveTo(1000, 380 + pady, -100, 400 + pady);

        const peeksAt = [300, 1700];

        this.container.addChild(bridge);
        this.bridge = bridge;
    }

    updateText() {
        if (this.vars.texttimer > performance.now()) {
            this.welcome.alpha += 0.02;
            if (this.welcome.alpha >= 1) {
                this.welcome.alpha = 1;
            }
        } else {
            this.welcome.alpha -= 0.05;
            if (this.welcome.alpha <= 0) {
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

                const mask = new PIXI.Graphics();
                mask.beginFill(0);
                mask.moveTo(0, 0);
                mask.lineTo(0, Config.height);
                mask.lineTo(Config.width, Config.height);
                mask.lineTo(Config.width, 0);
                mask.lineTo(0, 0);
                mask.endFill();
                this.container.addChild(mask);

                const startexture = Static.getOne("pixel").resource.texture;
                this.starsContainer = new PIXI.particles.ParticleContainer(MAX_STARS, { alpha : true });
                this.starsContainer.width = SCENE_WIDTH;
                this.starsContainer.height = SCENE_HEIGHT;
                for (let i = 0; i < MAX_STARS; i++) {
                    this.stars[i] = new PIXI.Sprite(startexture);
                    this.stars[i].x = Math.random() * SCENE_WIDTH;
                    this.stars[i].y = Math.random() * SCENE_HEIGHT;
                    this.stars[i].width = Math.random() * 2;
                    this.stars[i].height = this.stars[i].width;

                    this.starsContainer.addChild(this.stars[i]);
                }
           
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
                }

                this.container.vector.setMinVelocity(0, -15.7);
                this.container.vector.setMaxVelocity(0, 0);
                this.container.vector.setMin(0, -(SCENE_HEIGHT - Config.height));

                this.container.removeChild(this.welcome);

                this.container.filters = [new PIXI.filters.AlphaFilter()];
                this.container.filterArea = new PIXI.Rectangle(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
                this.container.addChild(this.background);
                this.container.addChild(this.starsContainer);
                this.clouds.forEach(x => this.container.addChild(x));
                this.container.addChild(this.overlay);

                // End phase
                this.container.removeChild(mask);
                this.vars.presenting = false;
                this.vars.fading = true;
            }
        }
    }

    updateFade() {
        this.overlay.alpha -= 0.02;
        if (this.overlay.alpha <= 0) {
            this.overlay.alpha = 0;
            this.container.vector.ay = -.1;
            
            // End phase
            this.vars.panning = true;
            this.vars.fading = false;
        }
    }

    updatePan() {
        if (this.container.vector.y < this.vars.halfpan) {
            this.container.vector.ay = .1;
        }

        this.container.vector.update();
    }

    update() {
        this.vars.presenting && this.updateText();
        this.vars.fading && this.updateFade();
        this.vars.panning && this.updatePan();

        this.clouds.forEach(cloud => {
            cloud.vector.update();
        });

        this.stars.forEach(x => { x.alpha = Math.random(); });
    }
}

export default Landing;
