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
            { name : "fog", file : "assets/fog.png" },
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
            fontWeight : 300
        });

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
        const bridgeContainer = new PIXI.Container();
        const bridge = new PIXI.Graphics();
        const pady = 1800;

        // Contour
        bridge.lineStyle(40, 0x181B18, 1);
        bridge.moveTo(-100, 300 + pady);
        bridge.quadraticCurveTo(200, 200 + pady, 300, 100 + pady);
        bridge.quadraticCurveTo(1000, 300 + pady, 1700, 100 + pady);
        bridge.quadraticCurveTo(1800, 200 + pady, 2100, 300 + pady);
        bridge.moveTo(2100, 400 + pady);
        bridge.quadraticCurveTo(1000, 380 + pady, -100, 400 + pady);

        // Mid curve
        bridge.lineStyle(10, 0x181B18, 1);
        bridge.moveTo(-100, 400 + pady);
        bridge.quadraticCurveTo(100, 400 + pady, 300, 250 + pady);
        bridge.quadraticCurveTo(1000, 400 + pady, 1700, 250 + pady);
        bridge.quadraticCurveTo(1900, 400 + pady, 2000, 400 + pady);

        // Beams
        bridge.moveTo(300, 400 + pady);
        for (let i = 300; i <= 900; i+=100) {
            bridge.lineTo(i, 100 + pady + (i - 300) / 10);
            bridge.lineTo(i + 100, 400 + pady);
        }

        bridge.moveTo(1700, 400 + pady);
        for (let i = 1700; i >= 1100; i-=100) {
            bridge.lineTo(i, 100 + pady + (1700 - i) / 10);
            bridge.lineTo(i - 100, 400 + pady);
        }
        bridge.lineTo(1000, 200 + pady);

        bridgeContainer.addChild(bridge);
        this.bridge = bridge;

        // Mask
        const mask = new PIXI.Graphics();
        mask.lineStyle(0);

        mask.beginFill(0xFFFFFF, 0.5);
        mask.moveTo(-100, 300 + pady);
        mask.quadraticCurveTo(200, 200 + pady, 300, 100 + pady);
        mask.quadraticCurveTo(1000, 300 + pady, 1700, 100 + pady);
        mask.quadraticCurveTo(1800, 200 + pady, 2100, 300 + pady);
        mask.lineTo(2100, 400 + pady);
        mask.quadraticCurveTo(1000, 380 + pady, -100, 400 + pady);

        bridge.mask = mask;
        bridgeContainer.addChild(mask);

        return bridgeContainer;
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

                this.rippleSprite = new PIXI.Sprite(Static.getOne("fog").resource.texture);
                this.rippleFilter = new PIXI.filters.DisplacementFilter(this.rippleSprite);

                this.rippleSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                this.rippleSprite.vector = new Vector(0, 0, 1, 1);
                this.rippleSprite.vector.attach(this.rippleSprite);

                this.rippleContainer = new PIXI.Container();
                this.rippleContainer.addChild(this.starsContainer);
                this.rippleContainer.addChild(this.rippleSprite);
                this.rippleContainer.filters = [this.rippleFilter];
                this.rippleContainer.filterArea = new PIXI.Rectangle(0, Config.height - 200, Config.width, 200);

                this.container.vector.setMinVelocity(0, -15.7);
                this.container.vector.setMaxVelocity(0, 0);
                this.container.vector.setMin(0, -(SCENE_HEIGHT - Config.height));

                this.container.filters = [new PIXI.filters.AlphaFilter()];
                this.container.filterArea = new PIXI.Rectangle(0, 0, Config.width, Config.height);
                this.container.addChild(this.background, this.rippleContainer, this.createBridge(), ...this.clouds, this.overlay);

                // End phase
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
        this.rippleSprite && this.rippleSprite.vector.update();
    }
}

export default Landing;
