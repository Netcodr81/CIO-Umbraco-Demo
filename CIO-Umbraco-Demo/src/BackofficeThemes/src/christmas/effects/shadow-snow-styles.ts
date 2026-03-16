/**
 * Injects Christmas snow pile styles into every shadow root. Uses <link rel="stylesheet"
 * with a data URI so the CSS is not in the shadow root's textContent – the backoffice
 * workspace headline is built from shadow content and would show our CSS as the title
 * if we used a <style> element.
 */

const STYLE_ID = "umb-christmas-shadow-snow";
const DOC_STYLE_ID = "umb-christmas-shadow-snow-doc";

const SNOW_PILE = `
	content: '';
	position: absolute;
	width: 36px;
	height: 12px;
	background: linear-gradient(180deg,
		rgba(255,255,255,0.98) 0%,
		rgba(255,255,255,0.9) 25%,
		rgba(248,252,255,0.85) 50%,
		rgba(235,245,255,0.7) 100%);
	border-radius: 50% 50% 30% 30% / 85% 85% 0 0;
	box-shadow: 0 1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6);
	mix-blend-mode: lighten;
	pointer-events: none;
	z-index: 1;
`;

const SNOW_STYLES = `
:host(uui-tab-group),
uui-tab-group {
	position: relative !important;
	overflow: visible !important;
}
:host(uui-tab-group)::after,
uui-tab-group::after {
	${SNOW_PILE}
	bottom: 0;
	right: 4px;
}

:host(umb-body-layout),
umb-body-layout {
	position: relative !important;
	overflow: visible !important;
}
:host(umb-body-layout)::after,
umb-body-layout::after {
	${SNOW_PILE}
	bottom: 0;
	left: 8px;
}

:host(umb-workspace-footer),
umb-workspace-footer {
	position: relative !important;
	overflow: visible !important;
}
:host(umb-workspace-footer)::after,
umb-workspace-footer::after {
	${SNOW_PILE}
	bottom: 0;
	right: 8px;
	width: 32px;
	height: 10px;
}

:host(umb-footer-layout),
umb-footer-layout {
	position: relative !important;
	overflow: visible !important;
}
:host(umb-footer-layout)::before,
umb-footer-layout::before {
	${SNOW_PILE}
	bottom: 0;
	left: 8px;
	width: 28px;
	height: 10px;
}
`;

const SNOW_CSS_DATA_URI =
	"data:text/css;charset=utf-8," + encodeURIComponent(SNOW_STYLES);

function walkShadowRoots(callback: (root: ShadowRoot) => void): void {
	const walk = (node: Node): void => {
		if (node instanceof Element && node.shadowRoot) {
			callback(node.shadowRoot);
			walk(node.shadowRoot);
		}
		for (const child of node.childNodes) walk(child);
	};
	walk(document.documentElement);
}

function injectIntoShadowRoot(root: ShadowRoot): void {
	if (root.getElementById(STYLE_ID)) return;
	const link = document.createElement("link");
	link.id = STYLE_ID;
	link.setAttribute("data-umb-christmas-snow", "true");
	link.rel = "stylesheet";
	link.href = SNOW_CSS_DATA_URI;
	root.appendChild(link);
}

function removeFromShadowRoot(root: ShadowRoot): void {
	root.getElementById(STYLE_ID)?.remove();
}

export class ShadowSnowStyles {
	#mutationObserver: MutationObserver | null = null;
	#delayedScanTimers: ReturnType<typeof setTimeout>[] = [];

	#scan(): void {
		walkShadowRoots(injectIntoShadowRoot);
	}

	start(): void {
		document.documentElement.setAttribute("data-umb-christmas-snow", "true");
		this.#injectDocumentFallback();
		this.#scan();
		[100, 400, 1000, 2500].forEach((ms) => {
			this.#delayedScanTimers.push(setTimeout(() => this.#scan(), ms));
		});
		this.#mutationObserver = new MutationObserver(() => this.#scan());
		this.#mutationObserver.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	stop(): void {
		this.#delayedScanTimers.forEach((t) => clearTimeout(t));
		this.#delayedScanTimers = [];
		this.#mutationObserver?.disconnect();
		this.#mutationObserver = null;
		walkShadowRoots(removeFromShadowRoot);
		document.getElementById(DOC_STYLE_ID)?.remove();
		document.documentElement.removeAttribute("data-umb-christmas-snow");
	}

	#injectDocumentFallback(): void {
		if (document.getElementById(DOC_STYLE_ID)) return;
		const pile = `content:"";position:absolute;background:linear-gradient(180deg,rgba(255,255,255,.98) 0%,rgba(255,255,255,.9) 25%,rgba(248,252,255,.85) 50%,rgba(235,245,255,.7) 100%);border-radius:50% 50% 30% 30%/85% 85% 0 0;box-shadow:0 1px 2px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.6);mix-blend-mode:lighten;pointer-events:none;z-index:1;`;
		const style = document.createElement("style");
		style.id = DOC_STYLE_ID;
		style.textContent = `
			[data-umb-christmas-snow] uui-tab-group { position: relative !important; overflow: visible !important; }
			[data-umb-christmas-snow] uui-tab-group::after { ${pile} bottom: 0; right: 4px; width: 36px; height: 12px; }
			[data-umb-christmas-snow] umb-body-layout { position: relative !important; overflow: visible !important; }
			[data-umb-christmas-snow] umb-body-layout::after { ${pile} bottom: 0; left: 8px; width: 36px; height: 12px; }
			[data-umb-christmas-snow] umb-workspace-footer { position: relative !important; overflow: visible !important; }
			[data-umb-christmas-snow] umb-workspace-footer::after { ${pile} bottom: 0; right: 8px; width: 32px; height: 10px; }
			[data-umb-christmas-snow] umb-footer-layout { position: relative !important; overflow: visible !important; }
			[data-umb-christmas-snow] umb-footer-layout::before { ${pile} bottom: 0; left: 8px; width: 28px; height: 10px; }
		`;
		document.head.appendChild(style);
	}
}
