import Scene from './scene';
import Config from './config';
import log from './log';
import Static from './static';
import { Vector, Force, Range } from "./physics";

const MAX_CLOUDS = 5;
const MAX_STARS = 20000;

const SCENE_HEIGHT = 2500;
const SCENE_WIDTH = Config.width;

class Landing extends Scene {
    constructor(app) {
        super(app, [
            { name : "fluffycloud", file : "assets/cloud.png" },
            { name : "fog", file : "assets/fog.png" },
            { name : "blueglow", file : "assets/blueglow.png" },
            { name : "glow", file : "assets/glow.png" },
            { name : "pixel", file : "assets/pixel.png" }
        ]);
    }  

    setup() {
        this.clouds = new Array(MAX_CLOUDS);
        this.stars = new Array(MAX_STARS);
        this.fwparticles = [];

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
        const mask = new PIXI.Graphics();
        const pady = 1800;

        [bridge, mask].forEach(bridge => {
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
                bridge.lineTo(i, 100 + pady + (i - 300) / 10 + Math.sqrt(i) + 12);
                bridge.lineTo(i + 100, 385 + pady);
            }

            bridge.moveTo(1700, 400 + pady);
            for (let i = 1700; i >= 1100; i-=100) {
                bridge.lineTo(i, 100 + pady + (1650 - i) / 10 + Math.sqrt(i) + 12);
                bridge.lineTo(i - 100, 385 + pady);
            }
            bridge.lineTo(1000, 200 + pady);
        });

        bridgeContainer.addChild(bridge);
        this.bridge = bridge;

        bridge.mask = mask;
        bridgeContainer.addChild(mask);

        let glow = new PIXI.extras.PictureSprite(Static.getOne("glow").resource.texture);
        glow.blendMode = PIXI.BLEND_MODES.OVERLAY;
        glow.x = Config.width / 2;
        glow.y = SCENE_HEIGHT;
        glow.anchor.x = .5;
        glow.anchor.y = .5;
        glow.scale.x = 8;
        glow.scale.y = 4;
        bridgeContainer.addChild(glow);

        const bridgelights = [];
        for (let i = 300; i > 1700; i += 100) {
            let light = new PIXI.extras.PictureSprite(Static.getOne('glow').resource.texture);
            bridgelights.push(light);
            light.anchor.x = .5;
            light.anchor.y = .5;

            light.x = i;
            light.y = pady + 350;
            light.scale.x = .3;
            light.scale.y = .3;
            light.blendMode = PIXI.BLEND_MODES.OVERLAY;
            bridgeContainer.addChild(light);
        }

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

                this.container.vector.setMinVelocity(0, -15.7);
                this.container.vector.setMaxVelocity(0, 0);
                this.container.vector.setMin(0, -(SCENE_HEIGHT - Config.height));

                this.container.filters = [new PIXI.filters.AlphaFilter()];
                this.container.filterArea = new PIXI.Rectangle(0, 0, Config.width, Config.height);
                this.container.addChild(this.background, this.starsContainer, this.createBridge(), ...this.clouds, this.overlay);

                // End phase
                this.vars.presenting = false;
                this.vars.fading = true;
            }
        }
    }

    launchFirework(PX = 500, PY = 500, CTN = 1000, velmod = 35, pcolor = 0xdb9a4a) {
        const FIREWORK_COUNT = CTN;
        this.firework = new PIXI.particles.ParticleContainer(FIREWORK_COUNT, { position : true, scale : true });
        this.firework.width = SCENE_WIDTH;
        this.firework.height = SCENE_HEIGHT;

        const color = pcolor;
        const texture = Static.getOne('pixel').resource.texture;
        for (let i = 0; i < FIREWORK_COUNT; i++) {
            const p = new PIXI.Sprite(texture);
            p.x = PX;
            p.y = PY;
            p.width = Math.random() * 6;
            p.height = p.width;
            p.tint = color;

            let angle = Math.random() * Math.PI * 2;
            let velocity = Math.cos(Math.random() * Math.PI / 2) * velmod;

            p.vector = new Vector(PX, PY, Math.cos(angle) * velocity, Math.sin(angle) * velocity);
            p.vector.attach(p);
            p.vector.addForce(Force.fromFunction(vector => {
                vector.y += .1;
                vector.vx *= .95;
                vector.vy *= .95;
                vector.protoElem.scale.x *= .99;
                vector.protoElem.scale.y *= .99;
            }));

            this.fwparticles.push(p);
            this.firework.addChild(p);
        }

        this.container.addChildAt(this.firework, 2);
    }

    fireworksCheck() {
        if (!this.vars.fw1 && this.container.vector.y < this.vars.halfpan) {
            this.vars.fw1 = true;
            this.launchFirework(450, 1000, 1000);
        } else if (!this.vars.fw2 && this.container.vector.y < this.vars.halfpan - 200) {
            this.vars.fw2 = true;
            this.launchFirework(1450, 1300, 1000, 25, 0xc854f9);
        } else if (!this.vars.fw3 && this.container.vector.y < this.vars.halfpan - 500) {
            this.vars.fw3 = true;
            this.launchFirework(1000, 1500, 1000, 42, 0x59f96f);
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

        this.fireworksCheck();
        this.stars.forEach(x => { x.alpha = Math.random(); });
        this.rippleSprite && this.rippleSprite.vector.update();
        this.fwparticles.forEach(x => x.vector.update());
    }
}

export default Landing;
