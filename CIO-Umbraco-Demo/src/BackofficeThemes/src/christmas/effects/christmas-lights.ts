/**
 * Christmas Lights Renderer.
 * Throttled and fewer bulbs for better performance.
 */

const HDR_H = 60;
const SAG = 12;
const BULB_R = 4;
const SPACING = 50;
const LIGHTS_INTERVAL_MS = 1000 / 24;
const COLORS = ["#ff3333", "#33cc55", "#ffcc00", "#3388ff", "#ff66cc", "#ffffff"];

interface Bulb {
    x: number;
    y: number;
    color: string;
    phase: number;
    speed: number;
}

export class ChristmasLightsRenderer {
    #canvas: HTMLCanvasElement | null = null;
    #ctx: CanvasRenderingContext2D | null = null;
    #animId: number | null = null;
    #bulbs: Bulb[] = [];
    #t0 = 0;
    #lastDrawTime = 0;

    start() {
        const h = HDR_H + SAG + BULB_R * 2 + 8;
        this.#canvas = document.createElement("canvas");
        this.#canvas.id = "umb-christmas-lights";
        Object.assign(this.#canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: h + "px",
            pointerEvents: "none",
            zIndex: "99998",
        });
        document.body.appendChild(this.#canvas);
        this.#ctx = this.#canvas.getContext("2d", { willReadFrequently: false });
        if (!this.#ctx) {
            this.#canvas.remove();
            return;
        }
        this.#resize();
        this.#initBulbs();
        window.addEventListener("resize", this.#onResize);
        this.#t0 = performance.now();
        this.#loop();
    }

    stop() {
        if (this.#animId) cancelAnimationFrame(this.#animId);
        window.removeEventListener("resize", this.#onResize);
        this.#canvas?.remove();
        this.#canvas = null;
        this.#ctx = null;
        this.#bulbs = [];
    }

    #onResize = () => {
        this.#resize();
        this.#initBulbs();
    };

    #resize() {
        if (!this.#canvas || !this.#ctx) return;
        const dpr = devicePixelRatio || 1;
        const w = innerWidth;
        const h = HDR_H + SAG + BULB_R * 2 + 8;
        this.#canvas.width = w * dpr;
        this.#canvas.height = h * dpr;
        this.#canvas.style.width = w + "px";
        this.#canvas.style.height = h + "px";
        this.#ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    #initBulbs() {
        this.#bulbs = [];
        let ci = 0;
        const segW = 300;
        for (let x = SPACING / 2; x < innerWidth; x += SPACING) {
            const seg = ((x % segW) / segW) * Math.PI;
            this.#bulbs.push({
                x,
                y: HDR_H + Math.sin(seg) * SAG,
                color: COLORS[ci++ % COLORS.length],
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 1.5,
            });
        }
    }

    #loop = (now?: number) => {
        this.#animId = requestAnimationFrame((t) => this.#loop(t));
        const t = now ?? performance.now();
        if (t - this.#lastDrawTime < LIGHTS_INTERVAL_MS) return;
        this.#lastDrawTime = t;
        this.#draw();
    };

    #draw() {
        const ctx = this.#ctx;
        if (!ctx) return;
        const w = innerWidth;
        const h = HDR_H + SAG + BULB_R * 2 + 8;
        const t = (performance.now() - this.#t0) / 1000;
        ctx.clearRect(0, 0, w, h);
        if (!this.#bulbs.length) return;

        ctx.beginPath();
        ctx.strokeStyle = "#2a3a20";
        ctx.lineWidth = 1.5;
        ctx.moveTo(0, HDR_H);
        for (let i = 0; i < this.#bulbs.length; i++) {
            const b = this.#bulbs[i];
            if (i === 0) {
                ctx.lineTo(b.x, b.y);
            } else {
                const p = this.#bulbs[i - 1];
                ctx.quadraticCurveTo((p.x + b.x) / 2, Math.max(p.y, b.y) + 2, b.x, b.y);
            }
        }
        ctx.lineTo(w, HDR_H);
        ctx.stroke();

        for (const b of this.#bulbs) {
            // Blinking logic: use a sharper step function instead of a smooth sine wave
            const sin = Math.sin(t * b.speed * 2 + b.phase);
            const intensity = sin > 0.2 ? 1 : (sin > -0.2 ? (sin + 0.2) / 0.4 : 0.1);

            ctx.fillStyle = "#333";
            ctx.fillRect(b.x - 1.5, b.y - 2, 3, 4);
            const g = ctx.createRadialGradient(b.x, b.y + 3, 0, b.x, b.y + 3, BULB_R * 3);
            g.addColorStop(0, this.#rgba(b.color, 0.3 * intensity));
            g.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.fillStyle = g;
            ctx.arc(b.x, b.y + 3, BULB_R * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = this.#rgba(b.color, 0.6 + 0.4 * intensity);
            ctx.ellipse(b.x, b.y + 3 + BULB_R * 0.3, BULB_R * 0.8, BULB_R, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${0.3 * intensity})`;
            ctx.arc(b.x - 1, b.y + 2, BULB_R * 0.35, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    #rgba(hex: string, a: number) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${a})`;
    }
}
