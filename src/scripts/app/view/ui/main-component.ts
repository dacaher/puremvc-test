import {RotatingSprite} from "app/rotating-sprite";
import {TweenLite} from "gsap";
import {PixiAppWrapper as Wrapper} from "pixi-app-wrapper";
import {
    AsciiFilter,
    CRTFilter,
    GlowFilter,
    OldFilmFilter,
    OutlineFilter,
    ShockwaveFilter,
} from "pixi-filters";
import "pixi-layers";
import "pixi-particles";
import "pixi-spine";
import {BaseComponent} from "./base-component";

export class MainComponent extends BaseComponent {
    private spineBoy: PIXI.spine.Spine;
    private particlesEmitter: PIXI.particles.Emitter;

    private textStyle = new PIXI.TextStyle({
        fontFamily: "Verdana",
        fontSize: 18,
        fill: "#FFFFFF",
        wordWrap: true,
        wordWrapWidth: 440,
    });

    private appWidth: number;
    private appHeight: number;
    private ticker: PIXI.ticker.Ticker;

    constructor(ticker: PIXI.ticker.Ticker) {
        super();

        this.ticker = ticker;
    }

    public init(appWidth: number, appHeight: number) {
        this.appWidth = appWidth;
        this.appHeight = appHeight;

        this.drawScreenBorder();
        this.drawSquare(appWidth / 2 - 25, appHeight / 2 - 25);
        this.addFullscreenText(this.appWidth / 2, this.appHeight / 2 - 50);
        this.drawRotatingExplorer();
        this.drawBunnies();
        this.drawLayeredBunnies();
        this.drawParticles();
        this.drawSpineBoyAnim(appWidth * 0.5, appHeight);
    }

    public stopEmittingParticles(): void {
        if (this.particlesEmitter) {
            this.particlesEmitter.emit = false;
            this.particlesEmitter.cleanup();
        }
    }

    public startEmittingParticles(): void {
        if (this.particlesEmitter) {
            this.particlesEmitter.emit = true;
        }
    }

    private drawSquare(x = 0, y = 0, s = 50, r = 10): void {
        this.drawRoundedRectangle(x, y, s, s, r);
    }

    private drawRoundedRectangle(x = 0, y = 0, w = 50, h = 50, r = 10): void {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0xFF00BB, 0.25);
        graphics.drawRoundedRect(x, y, w, h, r);
        graphics.endFill();

        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics.on("pointerup", () => {
            // pointerdown does not trigger a user event in chrome-android
            Wrapper.toggleFulscreen(document.getElementById("app-root"));
        });

        this.addChild(graphics);
    }

    private drawScreenBorder(lineWidth: number = 4): void {
        const halfLineWidth = lineWidth / 2;

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(lineWidth, 0xFF00FF, 1);
        graphics.drawRect(halfLineWidth, halfLineWidth, this.appWidth - lineWidth, this.appHeight - lineWidth);

        this.addChild(graphics);
    }

    private addFullscreenText(x: number, y: number): void {
        const richText = new PIXI.Text("Click on the square to toggle fullscreen!", this.textStyle);
        richText.anchor.set(0.5, 0.5);
        richText.x = x;
        richText.y = y;

        this.addChild(richText);
    }

    private drawRotatingExplorer(): void {
        // This creates a texture from a "explorer.png" image
        const explorer: RotatingSprite = new RotatingSprite(PIXI.loader.resources.explorer.texture);

        // Setup the position of the explorer
        const maxEdge = Math.max(explorer.width, explorer.height);
        explorer.position.set(Math.ceil(maxEdge / 2) + 10, Math.ceil(maxEdge / 2) + 10);

        // Rotate around the center
        explorer.anchor.set(0.5, 0.5);

        explorer.interactive = true;
        explorer.buttonMode = true;
        explorer.rotationVelocity = 0.02;

        explorer.on("pointerdown", () => {
            explorer.rotationVelocity *= -1;
        });

        // Add the explorer to the scene we are building
        this.addChild(explorer);

        // Listen for frame updates
        // TODO review ticker ref access from all views?
        this.ticker.add(() => {
            // each frame we spin the explorer around a bit
            explorer.rotation += explorer.rotationVelocity;
        });

        TweenLite.to(explorer, 2, {y: this.appHeight / 2});
    }

    private drawBunnies(): void {
        const container = new PIXI.Container();
        this.addChild(container);

        const text = new PIXI.Text("Click us!", this.textStyle);
        text.anchor.set(0.5, 0.5);
        container.addChild(text);

        const bunniesContainer = new PIXI.Container();
        bunniesContainer.position.set(0, text.height + 5);
        bunniesContainer.interactive = true;
        bunniesContainer.buttonMode = true;
        bunniesContainer.on("pointerdown", () => {
            const index = Math.round(Math.random() * (filters.length - 1));
            const randomFilter = filters[index];
            bunniesContainer.filters = [randomFilter];
        });
        container.addChild(bunniesContainer);

        // Create a 5x5 grid of bunnies
        for (let i = 0; i < 25; i++) {
            const bunny = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            bunny.x = (i % 5) * 40;
            bunny.y = Math.floor(i / 5) * 40;
            bunniesContainer.addChild(bunny);
        }

        text.position.set(bunniesContainer.width / 2, 0);

        container.x = this.appWidth - container.width - 10;
        container.y = this.appHeight - container.height;

        // Filters
        const filters = [
            new AsciiFilter(),
            new CRTFilter(),
            new GlowFilter(),
            new OldFilmFilter(),
            new ShockwaveFilter(new PIXI.Point(bunniesContainer.width / 2, bunniesContainer.height / 2)),
            new OutlineFilter(1, 0xFF0000),
        ];
    }

    private drawLayeredBunnies(): void {
        const layer = new PIXI.display.Layer();
        layer.group.enableSort = true;
        this.addChild(layer);

        const container = new PIXI.Container();
        this.addChild(container);
        container.parentLayer = layer;

        // Create a 5x5 grid of bunnies
        for (let i = 0; i < 25; i++) {
            const bunny = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            bunny.x = (i % 5) * 20;
            bunny.y = Math.floor(i / 5) * 20;
            container.addChild(bunny);

            bunny.parentLayer = layer;

            if (i % 2 === 0) {
                bunny.tint = 0x999999;
                bunny.zIndex = 0;
                // bunny.zOrder = 1;
            } else {
                bunny.zIndex = 1;
                // bunny.zOrder = 0;
            }
        }

        container.x = (this.appWidth - container.width) - 10;
        container.y = 10;
    }

    private drawParticles(): void {
        const particlesContainer = new PIXI.particles.ParticleContainer();
        particlesContainer.position.set(this.appWidth * 0.75, this.appHeight * 0.5);
        this.addChild(particlesContainer);

        this.particlesEmitter = new PIXI.particles.Emitter(particlesContainer, PIXI.loader.resources.bubble.texture, {
            alpha: {
                start: 0.8,
                end: 0.1,
            },
            scale: {
                start: 1,
                end: 0.3,
            },
            color: {
                start: "ffffff",
                end: "0000ff",
            },
            speed: {
                start: 200,
                end: 100,
            },
            startRotation: {
                min: 0,
                max: 360,
            },
            rotationSpeed: {
                min: 0,
                max: 0,
            },
            lifetime: {
                min: 0.5,
                max: 2,
            },
            frequency: 0.1,
            emitterLifetime: -1,
            maxParticles: 1000,
            pos: {
                x: 0,
                y: 0,
            },
            addAtBack: false,
            spawnType: "circle",
            spawnCircle: {
                x: 0,
                y: 0,
                r: 10,
            },
            emit: false,
            autoUpdate: true,
        });

        // Calculate the current time
        let elapsed = Date.now();

        // Update function every frame
        const update = () => {

            // Update the next frame
            // requestAnimationFrame(update); // TODO Not required if added to app.ticker...

            const now = Date.now();

            // The emitter requires the elapsed
            // number of seconds since the last update
            this.particlesEmitter.update((now - elapsed) * 0.001);
            elapsed = now;
        };

        // Start emitting
        this.startEmittingParticles();

        // Start the update
        // update();
        this.ticker.add(update);
    }

    private drawSpineBoyAnim(x: number, y: number) {
        // create a spine boy
        this.spineBoy = new PIXI.spine.Spine(PIXI.loader.resources.spineboy.spineData);

        this.spineBoy.scale.set(0.5);

        // set the position
        this.spineBoy.x = x;
        this.spineBoy.y = y;

        // set up the mixes!
        this.spineBoy.stateData.setMix("walk", "jump", 0.2);
        this.spineBoy.stateData.setMix("jump", "walk", 0.4);

        // play animation
        this.spineBoy.state.setAnimation(0, "walk", true);

        this.spineBoy.interactive = true;
        this.spineBoy.buttonMode = true;

        this.spineBoy.on("pointerdown", () => {
            this.spineBoy.state.setAnimation(0, "jump", false);
            this.spineBoy.state.addAnimation(0, "walk", true, 0);
        });

        this.addChild(this.spineBoy);
    }

}
