/**
 * Falling-snow particle system using 2D canvas and Unicode snowflake glyphs.
 * Throttled to ~24 FPS and reduced particle count for better performance.
 */

const GLYPHS = ["❄", "❅", "❆"];
/** Target FPS to reduce CPU/GPU load (snow still looks smooth). */
const TARGET_INTERVAL_MS = 1000 / 24;

interface Snowflake {
    x: number;
    y: number;
    char: string;
    size: number;
    speed: number;
    alpha: number;
    wobblePhase: number;
    wobbleAmp: number;
    rotation: number;
    rotSpeed: number;
}

export type OnFlakeLand = (x: number) => void;

export class SnowRenderer {
    #canvas: HTMLCanvasElement | null = null;
    #ctx: CanvasRenderingContext2D | null = null;
    #animId: number | null = null;
    #particles: Snowflake[] = [];
    #t0 = 0;
    #lastDrawTime = 0;
    #onFlakeLand: OnFlakeLand | null = null;

    #fallbackEl: HTMLDivElement | null = null;
    #fallbackStyle: HTMLStyleElement | null = null;

    readonly COUNT = 75;

    start(onFlakeLand?: OnFlakeLand, container?: HTMLElement) {
        this.#onFlakeLand = onFlakeLand ?? null;
        const parent = container ?? document.body;
        this.#canvas = document.createElement("canvas");
        this.#canvas.id = "umb-christmas-snow-canvas";
        Object.assign(this.#canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: "1",
        });
        parent.appendChild(this.#canvas);

        this.#ctx = this.#canvas.getContext("2d", { willReadFrequently: false });
        if (!this.#ctx) {
            this.#canvas.remove();
            this.#canvas = null;
            this.#cssFallback();
            return;
        }

        this.#resize();
        this.#initParticles();
        window.addEventListener("resize", this.#onResize);
        this.#t0 = performance.now();
        this.#loop();
    }

    stop() {
        if (this.#animId !== null) cancelAnimationFrame(this.#animId);
        window.removeEventListener("resize", this.#onResize);
        this.#canvas?.remove();
        this.#canvas = null;
        this.#ctx = null;
        this.#onFlakeLand = null;
        this.#fallbackEl?.remove();
        this.#fallbackEl = null;
        this.#fallbackStyle?.remove();
        this.#fallbackStyle = null;
    }

    #initParticles() {
        const w = innerWidth, h = innerHeight;
        this.#particles = Array.from({ length: this.COUNT }, () =>
            this.#spawn(w, h, true),
        );
    }

    #spawn(w: number, h: number, randomY = false): Snowflake {
        const size = 6 + Math.random() * 8;
        return {
            x: Math.random() * w,
            y: randomY ? Math.random() * h : -(10 + Math.random() * 40),
            char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            size,
            speed: 0.3 + Math.random() * 1.2,
            alpha: 0.3 + Math.random() * 0.7,
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleAmp: 20 + Math.random() * 40,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
        };
    }

    #onResize = () => this.#resize();

    #resize() {
        if (!this.#canvas || !this.#ctx) return;
        const dpr = devicePixelRatio || 1;
        const w = innerWidth, h = innerHeight;
        this.#canvas.width = w * dpr;
        this.#canvas.height = h * dpr;
        this.#canvas.style.width = w + "px";
        this.#canvas.style.height = h + "px";
        this.#ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    #loop = (now?: number) => {
        this.#animId = requestAnimationFrame((now) => this.#loop(now));
        const t = now ?? performance.now();
        if (t - this.#lastDrawTime < TARGET_INTERVAL_MS) return;
        this.#lastDrawTime = t;
        this.#update();
        this.#draw();
    };

    #update() {
        const w = innerWidth, h = innerHeight;
        const t = (performance.now() - this.#t0) / 1000;
        for (const p of this.#particles) {
            p.y += p.speed;
            p.x += Math.sin(t * 0.5 + p.wobblePhase) * p.wobbleAmp * 0.01;
            p.rotation += p.rotSpeed;

            if (p.y > h + 30) {
                this.#onFlakeLand?.(p.x);
                p.y = -(10 + Math.random() * 40);
                p.x = Math.random() * w;
            }
            if (p.x < -30) p.x = w + 30;
            if (p.x > w + 30) p.x = -30;
        }
    }

    #draw() {
        const ctx = this.#ctx;
        if (!ctx) return;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (const p of this.#particles) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = p.alpha;
            ctx.font = `${p.size}px sans-serif`;
            ctx.fillStyle = "#ffffff";
            ctx.fillText(p.char, 0, 0);
            ctx.restore();
        }
    }

    #cssFallback() {
        this.#fallbackStyle = document.createElement("style");
        this.#fallbackStyle.textContent = `
      @keyframes umb-snow{0%{transform:translateY(-20px) rotate(0deg);opacity:1}50%{transform:translateY(50vh) translateX(30px) rotate(180deg)}100%{transform:translateY(100vh) translateX(-20px) rotate(360deg);opacity:.3}}
      .umb-css-snow{position:fixed;top:-20px;pointer-events:none;z-index:99999;color:white;animation:umb-snow linear infinite;text-shadow:0 0 4px rgba(255,255,255,.6)}`;
        document.head.appendChild(this.#fallbackStyle);

        this.#fallbackEl = document.createElement("div");
        Object.assign(this.#fallbackEl.style, {
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "99999",
            overflow: "hidden",
        });
        document.body.appendChild(this.#fallbackEl);

        for (let i = 0; i < 60; i++) {
            const f = document.createElement("span");
            f.className = "umb-css-snow";
            f.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            const sz = 8 + Math.random() * 8;
            const dur = 6 + Math.random() * 12;
            f.style.cssText = `left:${Math.random() * 100}%;font-size:${sz}px;opacity:${0.3 + Math.random() * 0.7};animation-duration:${dur}s;animation-delay:-${Math.random() * dur}s`;
            this.#fallbackEl.appendChild(f);
        }
    }
}
