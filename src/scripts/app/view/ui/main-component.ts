import {RotatingSprite} from "app/rotating-sprite";
import {TweenLite} from "gsap";
import {PixiAppWrapper as Wrapper} from "pixi-app-wrapper";
import {AsciiFilter, CRTFilter, GlowFilter, OldFilmFilter, OutlineFilter, ShockwaveFilter} from "pixi-filters";
import "pixi-layers";
import "pixi-particles";
import "pixi-spine";
import {BaseComponent} from "./base-component";

export class MainComponent extends BaseComponent {
    private screenBorder: PIXI.Graphics;
    private fullScreenButton: PIXI.Container;
    private fullScreenText: PIXI.Text;
    private explorer: RotatingSprite;
    private filteredBunnies: PIXI.Container;
    private layeredBunnies: PIXI.Container;
    private particlesContainer: PIXI.particles.ParticleContainer;
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

    constructor(ticker: PIXI.ticker.Ticker) {
        super(ticker);
    }

    public init(appWidth: number, appHeight: number) {
        this.appWidth = appWidth;
        this.appHeight = appHeight;

        this.createViews();
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

    public drawSquare(x = 0, y = 0, s = 50, r = 10): void {
        this.drawRoundedRectangle(x, y, s, s, r);
    }

    public drawRoundedRectangle(x = 0, y = 0, w = 50, h = 50, r = 10): void {
        this.fullScreenButton = new PIXI.Container();

        const button = new PIXI.Graphics();
        button.lineStyle(2, 0xFF00FF, 1);
        button.beginFill(0xFF00BB, 0.25);
        button.drawRoundedRect(0, 0, w, h, r);
        button.endFill();

        button.interactive = true;
        button.buttonMode = true;
        button.on("pointerup", () => {
            // pointerdown does not trigger a user event in chrome-android
            Wrapper.toggleFulscreen(document.getElementById("app-root"));
        });

        this.fullScreenButton.addChild(button);
        this.fullScreenButton.position.set(x, y);

        this.addChild(this.fullScreenButton);
    }

    public relocate(): void {
        /*
        this.screenBorder.width = this.appWidth - 2;
        this.screenBorder.height = this.appHeight - 2;
        window.console.log(this.screenBorder.width, this.screenBorder.height);
        */
        this.removeChild(this.screenBorder);
        this.drawScreenBorder();

        this.fullScreenButton.position.set(this.appWidth / 2 - this.fullScreenButton.width / 2, this.appHeight / 2 - this.fullScreenButton.height / 2);
        this.fullScreenText.position.set(this.appWidth / 2, this.appHeight / 2 - 50);
        this.filteredBunnies.position.set(this.appWidth - this.filteredBunnies.width - 10, this.appHeight - this.filteredBunnies.height);
        this.layeredBunnies.position.set((this.appWidth - this.layeredBunnies.width) - 10, 10);
        this.particlesContainer.position.set(this.appWidth * 0.75, this.appHeight * 0.5);
        this.spineBoy.position.set(this.appWidth * 0.5, this.appHeight);

        TweenLite.killTweensOf(this.explorer, true);
        const maxEdge = Math.max(this.explorer.width, this.explorer.height);
        this.explorer.position.set(Math.ceil(maxEdge / 2) + 10, Math.ceil(maxEdge / 2) + 10);
        TweenLite.to(this.explorer, 2, {y: this.appHeight / 2});
    }

    /**
     * TODO keep local appWith and appHeight is not a good idea perhaps.
     */
    public swapSize(): void {
        const w = this.appWidth;
        this.appWidth = this.appHeight;
        this.appHeight = w;
    }

    private drawScreenBorder(width = 4): void {
        const halfWidth = width / 2;

        this.screenBorder = new PIXI.Graphics();
        this.screenBorder.lineStyle(width, 0xFF00FF, 1);
        this.screenBorder.drawRect(halfWidth, halfWidth, this.appWidth - width, this.appHeight - width);

        this.addChild(this.screenBorder);

        window.console.log(this.screenBorder.width, this.screenBorder.height);
    }

    private addFullscreenText(x: number, y: number): void {
        this.fullScreenText = new PIXI.Text("Click on the square to toggle fullscreen!", this.textStyle);
        this.fullScreenText.anchor.set(0.5, 0.5);
        this.fullScreenText.x = x;
        this.fullScreenText.y = y;

        this.addChild(this.fullScreenText);
    }

    private createViews(): void {
        this.drawSquare(this.appWidth / 2 - 25, this.appHeight / 2 - 25);
        this.addFullscreenText(this.appWidth / 2, this.appHeight / 2 - 50);
        this.drawScreenBorder();
        this.drawRotatingExplorer();
        this.drawBunnies();
        this.drawLayeredBunnies();
        this.drawParticles();
        this.drawSpineBoyAnim(this.appWidth * 0.5, this.appHeight);
    }

    private removeViews(): void {
        this.removeChildren();
    }

    private drawRotatingExplorer(): void {
        // This creates a texture from a "explorer.png" image
        this.explorer = new RotatingSprite(PIXI.loader.resources.explorer.texture);

        // Setup the position of the explorer
        const maxEdge = Math.max(this.explorer.width, this.explorer.height);
        this.explorer.position.set(Math.ceil(maxEdge / 2) + 10, Math.ceil(maxEdge / 2) + 10);

        // Rotate around the center
        this.explorer.anchor.set(0.5, 0.5);

        this.explorer.interactive = true;
        this.explorer.buttonMode = true;
        this.explorer.rotationVelocity = 0.02;

        this.explorer.on("pointerdown", () => {
            this.explorer.rotationVelocity *= -1;
        });

        // Add the explorer to the scene we are building
        this.addChild(this.explorer);

        // Listen for frame updates
        this.ticker.add(() => {
            // each frame we spin the explorer around a bit
            this.explorer.rotation += this.explorer.rotationVelocity;
        });

        TweenLite.to(this.explorer, 2, {y: this.appHeight / 2});
    }

    private drawBunnies(): void {
        this.filteredBunnies = new PIXI.Container();
        this.addChild(this.filteredBunnies);

        const text = new PIXI.Text("Click us!", this.textStyle);
        text.anchor.set(0.5, 0.5);
        this.filteredBunnies.addChild(text);

        const bunniesContainer = new PIXI.Container();
        bunniesContainer.position.set(0, text.height + 5);
        bunniesContainer.interactive = true;
        bunniesContainer.buttonMode = true;
        bunniesContainer.on("pointerdown", () => {
            const index = Math.round(Math.random() * (filters.length - 1));
            const randomFilter = filters[index];
            bunniesContainer.filters = [randomFilter];
        });
        this.filteredBunnies.addChild(bunniesContainer);

        // Create a 5x5 grid of bunnies
        for (let i = 0; i < 25; i++) {
            const bunny = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            bunny.x = (i % 5) * 40;
            bunny.y = Math.floor(i / 5) * 40;
            bunniesContainer.addChild(bunny);
        }

        text.position.set(bunniesContainer.width / 2, 0);

        this.filteredBunnies.x = this.appWidth - this.filteredBunnies.width - 10;
        this.filteredBunnies.y = this.appHeight - this.filteredBunnies.height;

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

        this.layeredBunnies = new PIXI.Container();
        this.addChild(this.layeredBunnies);
        this.layeredBunnies.parentLayer = layer;

        // Create a 5x5 grid of bunnies
        for (let i = 0; i < 25; i++) {
            const bunny = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            bunny.x = (i % 5) * 20;
            bunny.y = Math.floor(i / 5) * 20;
            this.layeredBunnies.addChild(bunny);

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

        this.layeredBunnies.x = (this.appWidth - this.layeredBunnies.width) - 10;
        this.layeredBunnies.y = 10;
    }

    private drawParticles(): void {
        this.particlesContainer = new PIXI.particles.ParticleContainer();
        this.particlesContainer.position.set(this.appWidth * 0.75, this.appHeight * 0.5);
        this.addChild(this.particlesContainer);

        this.particlesEmitter = new PIXI.particles.Emitter(this.particlesContainer, PIXI.loader.resources.bubble.texture, {
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
            // requestAnimationFrame(update);

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
