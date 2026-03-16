/**
 * Christmas ornament balls in umb-workspace-editor #header (like a mini lights string).
 * Only shown in "drawable" workspaces (modal, block edit, nested views), not on top-level
 * document tabs (e.g. .../tab/footer). URL is checked to exclude top-level and allow nested.
 */

const ORNAMENT_R = 6;
const SPACING = 28;
const SAG = 6;
const WIRE_Y = 10;
const COLORS = ["#c41e3a", "#ffd700", "#228b22", "#1e90ff", "#c41e3a", "#ffd700"];

/** True when the current route is a nested/drawable workspace (modal, block edit, view), not the top-level document tab. */
function isDrawableWorkspaceUrl(): boolean {
	const path = window.location.pathname;
	// Show balls only when path indicates nested workspace: modal, block edit, or view (e.g. view/content)
	return path.includes("/modal/") || path.includes("/block/edit/") || path.includes("/view/");
}

export class WorkspaceHeaderBalls {
	#observer: MutationObserver | null = null;
	#historyUnsubscribe: (() => void) | null = null;
	#deferScanId: ReturnType<typeof setTimeout> | null = null;
	#decorated = new WeakSet<ShadowRoot>();
	#lastPath = "";

	#removeAllBalls(): void {
		const walk = (node: Node): void => {
			if (node instanceof Element && node.shadowRoot) {
				const root = node.shadowRoot;
				root.getElementById("umb-christmas-workspace-balls")?.remove();
				root.querySelectorAll("umb-body-layout").forEach((el) => {
					el.shadowRoot?.getElementById("umb-christmas-workspace-balls")?.remove();
				});
				walk(root);
			}
			for (const child of node.childNodes) walk(child);
		};
		walk(document.documentElement);
		this.#decorated = new WeakSet();
	}

	#scan(fromDeferred = false): void {
		const path = window.location.pathname;
		if (!isDrawableWorkspaceUrl()) {
			this.#cancelDefer();
			this.#removeAllBalls();
			this.#lastPath = path;
			return;
		}
		this.#lastPath = path;
		// Remove from any previously decorated workspaces so we only show on the active (innermost) one
		this.#removeAllBalls();

		// Collect all body-layout roots that belong to a workspace editor (document order)
		const candidates: ShadowRoot[] = [];
		const walk = (node: Node): void => {
			if (node instanceof Element && node.shadowRoot) {
				if (node.tagName === "UMB-WORKSPACE-EDITOR") {
					const bodyLayout = node.shadowRoot.querySelector("umb-body-layout");
					if (bodyLayout?.shadowRoot && bodyLayout.shadowRoot.getElementById("header")) {
						candidates.push(bodyLayout.shadowRoot);
					}
				}
				walk(node.shadowRoot);
			}
			for (const child of node.childNodes) walk(child);
		};
		walk(document.documentElement);

		// With only one candidate the drawer may not be mounted yet — never inject immediately; defer so we don't flash on the background workspace.
		if (candidates.length === 1) {
			if (!fromDeferred) {
				if (this.#deferScanId === null) {
					this.#deferScanId = setTimeout(() => {
						this.#deferScanId = null;
						this.#scan(true);
					}, 220);
				}
				return;
			}
			// From deferred scan and still 1 candidate: single-workspace drawable view, inject
		}
		// Inject into the last (innermost) workspace
		if (candidates.length > 0) {
			this.#injectIntoHeader(candidates[candidates.length - 1]);
		}
	}

	#cancelDefer(): void {
		if (this.#deferScanId !== null) {
			clearTimeout(this.#deferScanId);
			this.#deferScanId = null;
		}
	}

	#injectIntoHeader(bodyLayoutRoot: ShadowRoot): void {
		if (this.#decorated.has(bodyLayoutRoot)) return;
		const header = bodyLayoutRoot.getElementById("header");
		if (!header || header.querySelector("#umb-christmas-workspace-balls")) return;

		const wrap = document.createElement("div");
		wrap.id = "umb-christmas-workspace-balls";
		Object.assign(wrap.style, {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			height: WIRE_Y + SAG + ORNAMENT_R * 2 + 4 + "px",
			pointerEvents: "none",
			overflow: "hidden",
		});

		const canvas = document.createElement("canvas");
		wrap.appendChild(canvas);

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			wrap.remove();
			return;
		}

		header.style.position = "relative";
		header.appendChild(wrap);

		const resize = () => {
			const w = header.offsetWidth;
			const h = WIRE_Y + SAG + ORNAMENT_R * 2 + 4;
			const dpr = devicePixelRatio || 1;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = w + "px";
			canvas.style.height = h + "px";
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			draw(ctx, w, h);
		};

		const draw = (c: CanvasRenderingContext2D, w: number, h: number) => {
			c.clearRect(0, 0, w, h);
			const bulbs: { x: number; y: number; color: string }[] = [];
			let ci = 0;
			const segW = 200;
			for (let x = SPACING / 2; x < w; x += SPACING) {
				const seg = ((x % segW) / segW) * Math.PI;
				bulbs.push({
					x,
					y: WIRE_Y + Math.sin(seg) * SAG,
					color: COLORS[ci++ % COLORS.length],
				});
			}
			if (bulbs.length === 0) return;

			c.strokeStyle = "#3d4a36";
			c.lineWidth = 1.2;
			c.beginPath();
			c.moveTo(0, WIRE_Y);
			for (let i = 0; i < bulbs.length; i++) {
				const b = bulbs[i];
				if (i === 0) c.lineTo(b.x, b.y);
				else {
					const p = bulbs[i - 1];
					c.quadraticCurveTo((p.x + b.x) / 2, Math.max(p.y, b.y) + 2, b.x, b.y);
				}
			}
			c.lineTo(w, WIRE_Y);
			c.stroke();

			for (const b of bulbs) {
				const cx = b.x;
				const cy = b.y + ORNAMENT_R * 0.4;
				// Shiny ball: radial gradient with highlight
				const g = c.createRadialGradient(
					cx - 2,
					cy - 2,
					0,
					cx,
					cy,
					ORNAMENT_R,
				);
				g.addColorStop(0, "rgba(255,255,255,0.7)");
				g.addColorStop(0.25, b.color);
				g.addColorStop(1, shade(b.color, 0.5));
				c.beginPath();
				c.fillStyle = g;
				c.arc(cx, cy, ORNAMENT_R, 0, Math.PI * 2);
				c.fill();
				c.strokeStyle = "rgba(0,0,0,0.15)";
				c.lineWidth = 0.8;
				c.stroke();
			}
		};

		const ro = new ResizeObserver(() => resize());
		ro.observe(header);
		resize();
		this.#decorated.add(bodyLayoutRoot);
	}

	#onUrlChange = (): void => {
		if (window.location.pathname === this.#lastPath) return;
		this.#scan();
	};

	start(): void {
		this.#scan();
		this.#observer = new MutationObserver(() => this.#scan());
		this.#observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
		[200, 600, 1500, 3000, 5000].forEach((ms) => setTimeout(() => this.#scan(), ms));

		// Re-scan when URL changes (SPA navigation: modal open/close, tab switch, back/forward)
		window.addEventListener("popstate", this.#onUrlChange);
		const origPush = history.pushState;
		const origReplace = history.replaceState;
		history.pushState = (...args: Parameters<typeof origPush>) => {
			origPush.apply(history, args);
			this.#onUrlChange();
		};
		history.replaceState = (...args: Parameters<typeof origReplace>) => {
			origReplace.apply(history, args);
			this.#onUrlChange();
		};
		this.#historyUnsubscribe = () => {
			window.removeEventListener("popstate", this.#onUrlChange);
			history.pushState = origPush;
			history.replaceState = origReplace;
		};
	}

	stop(): void {
		this.#cancelDefer();
		this.#observer?.disconnect();
		this.#observer = null;
		this.#historyUnsubscribe?.();
		this.#historyUnsubscribe = null;
		this.#removeAllBalls();
	}
}

function shade(hex: string, factor: number): string {
	const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
	const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
	const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
	return `rgb(${r},${g},${b})`;
}
