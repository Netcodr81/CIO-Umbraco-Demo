/**
 * Christmas tree: star + radiating lines with falling particles (CodePen-style).
 * No SVG; DOM + CSS animation.
 */

const TREE_WIDTH = 100;
const TREE_HEIGHT = 140;
const BOTTOM = 16;
const LEFT = 16;
const LINE_COUNT = 64;
const TIME = 8;
const TRAIL_LENGTH = "1rem";

function sin(angleDeg: number): number {
	const a = (angleDeg * Math.PI) / 180;
	return Math.sin(a);
}
function cos(angleDeg: number): number {
	const a = (angleDeg * Math.PI) / 180;
	return Math.cos(a);
}

export class ChristmasTree {
	#container: HTMLDivElement | null = null;
	#style: HTMLStyleElement | null = null;

	start(): void {
		this.#container = document.createElement("div");
		this.#container.id = "umb-christmas-tree";
		Object.assign(this.#container.style, {
			position: "fixed",
			bottom: BOTTOM + "px",
			left: LEFT + "px",
			width: TREE_WIDTH + "px",
			height: TREE_HEIGHT + "px",
			pointerEvents: "none",
			zIndex: "2147483645",
			overflow: "hidden",
		});

		// Star (5 triangles)
		const starUl = document.createElement("ul");
		starUl.className = "umb-christmas-tree-star";
		for (let i = 0; i < 5; i++) {
			const li = document.createElement("li");
			li.style.transform = `rotate(${i * 72}deg)`;
			starUl.appendChild(li);
		}
		this.#container.appendChild(starUl);

		// Radiating lines with falling particles
		const linesUl = document.createElement("ul");
		linesUl.className = "umb-christmas-tree-lines";
		for (let i = 0; i < LINE_COUNT; i++) {
			const li = document.createElement("li");
			const t = (6 * 360 * i) / LINE_COUNT;
			const rot = (sin(t) + cos(t / 3) * 0.1) * 20;
			li.style.transform = `rotate(${rot}deg)`;
			li.style.setProperty("--umb-tree-delay", `${(-i * (0.5 * TIME)) / LINE_COUNT}s`);
			linesUl.appendChild(li);
		}
		this.#container.appendChild(linesUl);

		this.#style = document.createElement("style");
		this.#style.id = "umb-christmas-tree-styles";
		this.#style.textContent = `
			#umb-christmas-tree { box-sizing: border-box; }
			#umb-christmas-tree *, #umb-christmas-tree *::before, #umb-christmas-tree *::after { box-sizing: border-box; }
			#umb-christmas-tree ul, #umb-christmas-tree li { list-style: none; margin: 0; padding: 0; }
			.umb-christmas-tree-star {
				position: absolute;
				top: 12px;
				left: 50%;
				width: 1rem;
				height: 1rem;
				transform: translate(-50%, -50%);
			}
			.umb-christmas-tree-star li {
				position: absolute;
				width: 0;
				height: 0;
				overflow: hidden;
				border-width: 0 0.35rem 0.7rem 0.35rem;
				border-style: solid;
				border-top-color: transparent;
				border-left-color: transparent;
				border-right-color: transparent;
				border-bottom-color: #FFCE54;
				transform-origin: 0.35rem 0.7rem;
			}
			.umb-christmas-tree-lines {
				position: absolute;
				top: 0;
				left: 50%;
				width: 0;
				height: 100%;
				transform: translateX(-50%);
			}
			.umb-christmas-tree-lines li {
				position: absolute;
				top: 28px;
				left: 50%;
				width: 0;
				height: ${TREE_HEIGHT - 28}px;
				background: transparent;
				transform-origin: 50% 0;
			}
			.umb-christmas-tree-lines li::before,
			.umb-christmas-tree-lines li::after {
				content: "";
				position: absolute;
				left: 50%;
				animation: umb-christmas-tree-fall 4s linear infinite;
				animation-delay: var(--umb-tree-delay, 0s);
			}
			.umb-christmas-tree-lines li::before {
				top: 0;
				width: 1px;
				height: ${TRAIL_LENGTH};
				background: linear-gradient(rgba(46,204,113,0), rgba(46,204,113,0.5));
				transform: translateX(-50%);
			}
			.umb-christmas-tree-lines li::after {
				top: ${TRAIL_LENGTH};
				width: 3px;
				height: 3px;
				border-radius: 100%;
				transform: translate(-50%, 0);
			}
			.umb-christmas-tree-lines li:nth-child(4n)::after { background: #D8334A; }
			.umb-christmas-tree-lines li:nth-child(4n+1)::after { background: #FFCE54; }
			.umb-christmas-tree-lines li:nth-child(4n+2)::after { background: #2ECC71; }
			.umb-christmas-tree-lines li:nth-child(4n+3)::after { background: #5D9CEC; }
			@keyframes umb-christmas-tree-fall {
				0% { opacity: 0; top: 0; }
				5% { opacity: 0; }
				15%, 90% { opacity: 1; }
				100% { opacity: 0; top: 100%; }
			}
		`;
		document.head.appendChild(this.#style);
		document.body.appendChild(this.#container);
	}

	stop(): void {
		this.#container?.remove();
		this.#container = null;
		this.#style?.remove();
		this.#style = null;
	}
}
