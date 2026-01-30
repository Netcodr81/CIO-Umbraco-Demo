import { t as __decorate } from "./decorate-BnP3GfGh.js";
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var t$2 = globalThis, e$1 = t$2.ShadowRoot && (t$2.ShadyCSS === void 0 || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap(), n$2 = class {
	constructor(x, j, F) {
		if (this._$cssResult$ = !0, F !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = x, this.t = j;
	}
	get styleSheet() {
		let x = this.o, j = this.t;
		if (e$1 && x === void 0) {
			let F = j !== void 0 && j.length === 1;
			F && (x = o$4.get(j)), x === void 0 && ((this.o = x = new CSSStyleSheet()).replaceSync(this.cssText), F && o$4.set(j, x));
		}
		return x;
	}
	toString() {
		return this.cssText;
	}
}, r$3 = (x) => new n$2(typeof x == "string" ? x : x + "", void 0, s$2), i$1 = (x, ...j) => new n$2(x.length === 1 ? x[0] : j.reduce((j, F, U) => j + ((x) => {
	if (!0 === x._$cssResult$) return x.cssText;
	if (typeof x == "number") return x;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + x + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(F) + x[U + 1], x[0]), x, s$2), S$1 = (x, U) => {
	if (e$1) x.adoptedStyleSheets = U.map((x) => x instanceof CSSStyleSheet ? x : x.styleSheet);
	else for (let F of U) {
		let U = document.createElement("style"), W = t$2.litNonce;
		W !== void 0 && U.setAttribute("nonce", W), U.textContent = F.cssText, x.appendChild(U);
	}
}, c$1 = e$1 ? (x) => x : (x) => x instanceof CSSStyleSheet ? ((x) => {
	let j = "";
	for (let F of x.cssRules) j += F.cssText;
	return r$3(j);
})(x) : x, { is: i$3, defineProperty: e$2, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$3, getPrototypeOf: n$3 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (x, j) => x, u = {
	toAttribute(x, j) {
		switch (j) {
			case Boolean:
				x = x ? l$1 : null;
				break;
			case Object:
			case Array: x = x == null ? x : JSON.stringify(x);
		}
		return x;
	},
	fromAttribute(x, j) {
		let F = x;
		switch (j) {
			case Boolean:
				F = x !== null;
				break;
			case Number:
				F = x === null ? null : Number(x);
				break;
			case Object:
			case Array: try {
				F = JSON.parse(x);
			} catch {
				F = null;
			}
		}
		return F;
	}
}, f = (x, j) => !i$3(x, j), b$1 = {
	attribute: !0,
	type: String,
	converter: u,
	reflect: !1,
	useDefault: !1,
	hasChanged: f
};
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
	static addInitializer(x) {
		this._$Ei(), (this.l ??= []).push(x);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(x, j = b$1) {
		if (j.state && (j.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(x) && ((j = Object.create(j)).wrapped = !0), this.elementProperties.set(x, j), !j.noAccessor) {
			let F = Symbol(), U = this.getPropertyDescriptor(x, F, j);
			U !== void 0 && e$2(this.prototype, x, U);
		}
	}
	static getPropertyDescriptor(x, j, F) {
		let { get: U, set: W } = h$1(this.prototype, x) ?? {
			get() {
				return this[j];
			},
			set(x) {
				this[j] = x;
			}
		};
		return {
			get: U,
			set(j) {
				let G = U?.call(this);
				W?.call(this, j), this.requestUpdate(x, G, F);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(x) {
		return this.elementProperties.get(x) ?? b$1;
	}
	static _$Ei() {
		if (this.hasOwnProperty(d$1("elementProperties"))) return;
		let x = n$3(this);
		x.finalize(), x.l !== void 0 && (this.l = [...x.l]), this.elementProperties = new Map(x.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(d$1("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
			let x = this.properties, j = [...r$4(x), ...o$3(x)];
			for (let F of j) this.createProperty(F, x[F]);
		}
		let x = this[Symbol.metadata];
		if (x !== null) {
			let j = litPropertyMetadata.get(x);
			if (j !== void 0) for (let [x, F] of j) this.elementProperties.set(x, F);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [x, j] of this.elementProperties) {
			let F = this._$Eu(x, j);
			F !== void 0 && this._$Eh.set(F, x);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(x) {
		let j = [];
		if (Array.isArray(x)) {
			let F = new Set(x.flat(Infinity).reverse());
			for (let x of F) j.unshift(c$1(x));
		} else x !== void 0 && j.push(c$1(x));
		return j;
	}
	static _$Eu(x, j) {
		let F = j.attribute;
		return !1 === F ? void 0 : typeof F == "string" ? F : typeof x == "string" ? x.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((x) => this.enableUpdating = x), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((x) => x(this));
	}
	addController(x) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(x), this.renderRoot !== void 0 && this.isConnected && x.hostConnected?.();
	}
	removeController(x) {
		this._$EO?.delete(x);
	}
	_$E_() {
		let x = /* @__PURE__ */ new Map(), j = this.constructor.elementProperties;
		for (let F of j.keys()) this.hasOwnProperty(F) && (x.set(F, this[F]), delete this[F]);
		x.size > 0 && (this._$Ep = x);
	}
	createRenderRoot() {
		let x = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return S$1(x, this.constructor.elementStyles), x;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((x) => x.hostConnected?.());
	}
	enableUpdating(x) {}
	disconnectedCallback() {
		this._$EO?.forEach((x) => x.hostDisconnected?.());
	}
	attributeChangedCallback(x, j, F) {
		this._$AK(x, F);
	}
	_$ET(x, j) {
		let F = this.constructor.elementProperties.get(x), U = this.constructor._$Eu(x, F);
		if (U !== void 0 && !0 === F.reflect) {
			let W = (F.converter?.toAttribute === void 0 ? u : F.converter).toAttribute(j, F.type);
			this._$Em = x, W == null ? this.removeAttribute(U) : this.setAttribute(U, W), this._$Em = null;
		}
	}
	_$AK(x, j) {
		let F = this.constructor, U = F._$Eh.get(x);
		if (U !== void 0 && this._$Em !== U) {
			let x = F.getPropertyOptions(U), W = typeof x.converter == "function" ? { fromAttribute: x.converter } : x.converter?.fromAttribute === void 0 ? u : x.converter;
			this._$Em = U;
			let G = W.fromAttribute(j, x.type);
			this[U] = G ?? this._$Ej?.get(U) ?? G, this._$Em = null;
		}
	}
	requestUpdate(x, j, F, U = !1, W) {
		if (x !== void 0) {
			let G = this.constructor;
			if (!1 === U && (W = this[x]), F ??= G.getPropertyOptions(x), !((F.hasChanged ?? f)(W, j) || F.useDefault && F.reflect && W === this._$Ej?.get(x) && !this.hasAttribute(G._$Eu(x, F)))) return;
			this.C(x, j, F);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(x, j, { useDefault: F, reflect: U, wrapped: W }, G) {
		F && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(x) && (this._$Ej.set(x, G ?? j ?? this[x]), !0 !== W || G !== void 0) || (this._$AL.has(x) || (this.hasUpdated || F || (j = void 0), this._$AL.set(x, j)), !0 === U && this._$Em !== x && (this._$Eq ??= /* @__PURE__ */ new Set()).add(x));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (x) {
			Promise.reject(x);
		}
		let x = this.scheduleUpdate();
		return x != null && await x, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [x, j] of this._$Ep) this[x] = j;
				this._$Ep = void 0;
			}
			let x = this.constructor.elementProperties;
			if (x.size > 0) for (let [j, F] of x) {
				let { wrapped: x } = F, U = this[j];
				!0 !== x || this._$AL.has(j) || U === void 0 || this.C(j, void 0, F, U);
			}
		}
		let x = !1, j = this._$AL;
		try {
			x = this.shouldUpdate(j), x ? (this.willUpdate(j), this._$EO?.forEach((x) => x.hostUpdate?.()), this.update(j)) : this._$EM();
		} catch (j) {
			throw x = !1, this._$EM(), j;
		}
		x && this._$AE(j);
	}
	willUpdate(x) {}
	_$AE(x) {
		this._$EO?.forEach((x) => x.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(x)), this.updated(x);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(x) {
		return !0;
	}
	update(x) {
		this._$Eq &&= this._$Eq.forEach((x) => this._$ET(x, this[x])), this._$EM();
	}
	updated(x) {}
	firstUpdated(x) {}
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: y }), (a$1.reactiveElementVersions ??= []).push("2.1.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var t$1 = globalThis, i$2 = (x) => x, s$1 = t$1.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (x) => x }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (x) => x === null || typeof x != "object" && typeof x != "function", u$1 = Array.isArray, d = (x) => u$1(x) || typeof x?.[Symbol.iterator] == "function", f$1 = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f$1}(?:([^\\s"'>=/]+)(${f$1}*=${f$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y$1 = /^(?:script|style|textarea|title)$/i, b = ((x) => (j, ...F) => ({
	_$litType$: x,
	strings: j,
	values: F
}))(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(x, j) {
	if (!u$1(x) || !x.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return e === void 0 ? j : e.createHTML(j);
}
var N = (x, j) => {
	let F = x.length - 1, U = [], W, G = j === 2 ? "<svg>" : j === 3 ? "<math>" : "", K = v;
	for (let j = 0; j < F; j++) {
		let F = x[j], q, J, Y = -1, X = 0;
		for (; X < F.length && (K.lastIndex = X, J = K.exec(F), J !== null);) X = K.lastIndex, K === v ? J[1] === "!--" ? K = _ : J[1] === void 0 ? J[2] === void 0 ? J[3] !== void 0 && (K = p) : (y$1.test(J[2]) && (W = RegExp("</" + J[2], "g")), K = p) : K = m : K === p ? J[0] === ">" ? (K = W ?? v, Y = -1) : J[1] === void 0 ? Y = -2 : (Y = K.lastIndex - J[2].length, q = J[1], K = J[3] === void 0 ? p : J[3] === "\"" ? $ : g) : K === $ || K === g ? K = p : K === _ || K === m ? K = v : (K = p, W = void 0);
		let Q = K === p && x[j + 1].startsWith("/>") ? " " : "";
		G += K === v ? F + r$2 : Y >= 0 ? (U.push(q), F.slice(0, Y) + h + F.slice(Y) + o$2 + Q) : F + o$2 + (Y === -2 ? j : Q);
	}
	return [V(x, G + (x[F] || "<?>") + (j === 2 ? "</svg>" : j === 3 ? "</math>" : "")), U];
}, S = class x {
	constructor({ strings: j, _$litType$: F }, U) {
		let W;
		this.parts = [];
		let G = 0, K = 0, q = j.length - 1, J = this.parts, [Y, X] = N(j, F);
		if (this.el = x.createElement(Y, U), P.currentNode = this.el.content, F === 2 || F === 3) {
			let x = this.el.content.firstChild;
			x.replaceWith(...x.childNodes);
		}
		for (; (W = P.nextNode()) !== null && J.length < q;) {
			if (W.nodeType === 1) {
				if (W.hasAttributes()) for (let x of W.getAttributeNames()) if (x.endsWith(h)) {
					let j = X[K++], F = W.getAttribute(x).split(o$2), U = /([.?@])?(.*)/.exec(j);
					J.push({
						type: 1,
						index: G,
						name: U[2],
						strings: F,
						ctor: U[1] === "." ? I : U[1] === "?" ? L : U[1] === "@" ? z : H
					}), W.removeAttribute(x);
				} else x.startsWith(o$2) && (J.push({
					type: 6,
					index: G
				}), W.removeAttribute(x));
				if (y$1.test(W.tagName)) {
					let x = W.textContent.split(o$2), j = x.length - 1;
					if (j > 0) {
						W.textContent = s$1 ? s$1.emptyScript : "";
						for (let F = 0; F < j; F++) W.append(x[F], c()), P.nextNode(), J.push({
							type: 2,
							index: ++G
						});
						W.append(x[j], c());
					}
				}
			} else if (W.nodeType === 8) if (W.data === n$1) J.push({
				type: 2,
				index: G
			});
			else {
				let x = -1;
				for (; (x = W.data.indexOf(o$2, x + 1)) !== -1;) J.push({
					type: 7,
					index: G
				}), x += o$2.length - 1;
			}
			G++;
		}
	}
	static createElement(x, j) {
		let F = l.createElement("template");
		return F.innerHTML = x, F;
	}
};
function M(x, j, F = x, U) {
	if (j === E) return j;
	let W = U === void 0 ? F._$Cl : F._$Co?.[U], G = a(j) ? void 0 : j._$litDirective$;
	return W?.constructor !== G && (W?._$AO?.(!1), G === void 0 ? W = void 0 : (W = new G(x), W._$AT(x, F, U)), U === void 0 ? F._$Cl = W : (F._$Co ??= [])[U] = W), W !== void 0 && (j = M(x, W._$AS(x, j.values), W, U)), j;
}
var R = class {
	constructor(x, j) {
		this._$AV = [], this._$AN = void 0, this._$AD = x, this._$AM = j;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(x) {
		let { el: { content: j }, parts: F } = this._$AD, U = (x?.creationScope ?? l).importNode(j, !0);
		P.currentNode = U;
		let W = P.nextNode(), G = 0, K = 0, q = F[0];
		for (; q !== void 0;) {
			if (G === q.index) {
				let j;
				q.type === 2 ? j = new k(W, W.nextSibling, this, x) : q.type === 1 ? j = new q.ctor(W, q.name, q.strings, this, x) : q.type === 6 && (j = new Z(W, this, x)), this._$AV.push(j), q = F[++K];
			}
			G !== q?.index && (W = P.nextNode(), G++);
		}
		return P.currentNode = l, U;
	}
	p(x) {
		let j = 0;
		for (let F of this._$AV) F !== void 0 && (F.strings === void 0 ? F._$AI(x[j]) : (F._$AI(x, F, j), j += F.strings.length - 2)), j++;
	}
}, k = class x {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(x, j, F, U) {
		this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = x, this._$AB = j, this._$AM = F, this.options = U, this._$Cv = U?.isConnected ?? !0;
	}
	get parentNode() {
		let x = this._$AA.parentNode, j = this._$AM;
		return j !== void 0 && x?.nodeType === 11 && (x = j.parentNode), x;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(x, j = this) {
		x = M(this, x, j), a(x) ? x === A || x == null || x === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : x !== this._$AH && x !== E && this._(x) : x._$litType$ === void 0 ? x.nodeType === void 0 ? d(x) ? this.k(x) : this._(x) : this.T(x) : this.$(x);
	}
	O(x) {
		return this._$AA.parentNode.insertBefore(x, this._$AB);
	}
	T(x) {
		this._$AH !== x && (this._$AR(), this._$AH = this.O(x));
	}
	_(x) {
		this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = x : this.T(l.createTextNode(x)), this._$AH = x;
	}
	$(x) {
		let { values: j, _$litType$: F } = x, U = typeof F == "number" ? this._$AC(x) : (F.el === void 0 && (F.el = S.createElement(V(F.h, F.h[0]), this.options)), F);
		if (this._$AH?._$AD === U) this._$AH.p(j);
		else {
			let x = new R(U, this), F = x.u(this.options);
			x.p(j), this.T(F), this._$AH = x;
		}
	}
	_$AC(x) {
		let j = C.get(x.strings);
		return j === void 0 && C.set(x.strings, j = new S(x)), j;
	}
	k(j) {
		u$1(this._$AH) || (this._$AH = [], this._$AR());
		let F = this._$AH, U, W = 0;
		for (let G of j) W === F.length ? F.push(U = new x(this.O(c()), this.O(c()), this, this.options)) : U = F[W], U._$AI(G), W++;
		W < F.length && (this._$AR(U && U._$AB.nextSibling, W), F.length = W);
	}
	_$AR(x = this._$AA.nextSibling, j) {
		for (this._$AP?.(!1, !0, j); x !== this._$AB;) {
			let j = i$2(x).nextSibling;
			i$2(x).remove(), x = j;
		}
	}
	setConnected(x) {
		this._$AM === void 0 && (this._$Cv = x, this._$AP?.(x));
	}
}, H = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(x, j, F, U, W) {
		this.type = 1, this._$AH = A, this._$AN = void 0, this.element = x, this.name = j, this._$AM = U, this.options = W, F.length > 2 || F[0] !== "" || F[1] !== "" ? (this._$AH = Array(F.length - 1).fill(/* @__PURE__ */ new String()), this.strings = F) : this._$AH = A;
	}
	_$AI(x, j = this, F, U) {
		let W = this.strings, G = !1;
		if (W === void 0) x = M(this, x, j, 0), G = !a(x) || x !== this._$AH && x !== E, G && (this._$AH = x);
		else {
			let U = x, K, q;
			for (x = W[0], K = 0; K < W.length - 1; K++) q = M(this, U[F + K], j, K), q === E && (q = this._$AH[K]), G ||= !a(q) || q !== this._$AH[K], q === A ? x = A : x !== A && (x += (q ?? "") + W[K + 1]), this._$AH[K] = q;
		}
		G && !U && this.j(x);
	}
	j(x) {
		x === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, x ?? "");
	}
}, I = class extends H {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(x) {
		this.element[this.name] = x === A ? void 0 : x;
	}
}, L = class extends H {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(x) {
		this.element.toggleAttribute(this.name, !!x && x !== A);
	}
}, z = class extends H {
	constructor(x, j, F, U, W) {
		super(x, j, F, U, W), this.type = 5;
	}
	_$AI(x, j = this) {
		if ((x = M(this, x, j, 0) ?? A) === E) return;
		let F = this._$AH, U = x === A && F !== A || x.capture !== F.capture || x.once !== F.once || x.passive !== F.passive, W = x !== A && (F === A || U);
		U && this.element.removeEventListener(this.name, this, F), W && this.element.addEventListener(this.name, this, x), this._$AH = x;
	}
	handleEvent(x) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, x) : this._$AH.handleEvent(x);
	}
}, Z = class {
	constructor(x, j, F) {
		this.element = x, this.type = 6, this._$AN = void 0, this._$AM = j, this.options = F;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(x) {
		M(this, x);
	}
}, B = t$1.litHtmlPolyfillSupport;
B?.(S, k), (t$1.litHtmlVersions ??= []).push("3.3.2");
var D = (x, j, F) => {
	let U = F?.renderBefore ?? j, W = U._$litPart$;
	if (W === void 0) {
		let x = F?.renderBefore ?? null;
		U._$litPart$ = W = new k(j.insertBefore(c(), x), x, void 0, F ?? {});
	}
	return W._$AI(x), W;
}, s = globalThis, i = class extends y {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let x = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= x.firstChild, x;
	}
	update(x) {
		let j = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(x), this._$Do = D(j, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return E;
	}
};
i._$litElement$ = !0, i.finalized = !0, s.litElementHydrateSupport?.({ LitElement: i });
var o$1 = s.litElementPolyfillSupport;
o$1?.({ LitElement: i }), (s.litElementVersions ??= []).push("4.2.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var t = (x) => (j, F) => {
	F === void 0 ? customElements.define(x, j) : F.addInitializer(() => {
		customElements.define(x, j);
	});
}, o = {
	attribute: !0,
	type: String,
	converter: u,
	reflect: !1,
	hasChanged: f
}, r$1 = (x = o, j, F) => {
	let { kind: U, metadata: W } = F, G = globalThis.litPropertyMetadata.get(W);
	if (G === void 0 && globalThis.litPropertyMetadata.set(W, G = /* @__PURE__ */ new Map()), U === "setter" && ((x = Object.create(x)).wrapped = !0), G.set(F.name, x), U === "accessor") {
		let { name: U } = F;
		return {
			set(F) {
				let W = j.get.call(this);
				j.set.call(this, F), this.requestUpdate(U, W, x, !0, F);
			},
			init(j) {
				return j !== void 0 && this.C(U, void 0, x, j), j;
			}
		};
	}
	if (U === "setter") {
		let { name: U } = F;
		return function(F) {
			let W = this[U];
			j.call(this, F), this.requestUpdate(U, W, x, !0, F);
		};
	}
	throw Error("Unsupported decorator location: " + U);
};
function n(x) {
	return (j, F) => typeof F == "object" ? r$1(x, j, F) : ((x, j, F) => {
		let U = j.hasOwnProperty(F);
		return j.constructor.createProperty(F, x), U ? Object.getOwnPropertyDescriptor(j, F) : void 0;
	})(x, j, F);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/ function r(x) {
	return n({
		...x,
		state: !0,
		attribute: !1
	});
}
var DropdownListWithLabelElement = class extends i {
	constructor(...x) {
		super(...x), this.value = [], this.newLabel = "", this.newValue = "";
	}
	static #e = this.styles = i$1`
    .option {
      display: flex;
      gap: 8px;
      margin-bottom: 6px;
    }

    uui-input {
      flex: 1;
    }

    uui-button {
      align-self: flex-end;
    }
  `;
	addOption() {
		!this.newLabel || !this.newValue || (this.value = [...this.value, {
			label: this.newLabel,
			value: this.newValue
		}], this.newLabel = "", this.newValue = "", this.notifyChange());
	}
	removeOption(x) {
		this.value = this.value.filter((j, F) => F !== x), this.notifyChange();
	}
	notifyChange() {
		this.dispatchEvent(new CustomEvent("change", {
			detail: this.value,
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return b`
      ${this.value.map((x, j) => b`
          <div class="option">
            <uui-input readonly value=${x.label}></uui-input>
            <uui-input readonly value=${x.value}></uui-input>
            <uui-button             
              @click=${() => this.removeOption(j)}
            >
              Remove
            </uui-button>
          </div>
        `)}

      <div class="option">
        <uui-input
          placeholder="Label"
          .value=${this.newLabel}
          @input=${(x) => this.newLabel = x.target.value}
        ></uui-input>

        <uui-input
          placeholder="Value"
          .value=${this.newValue}
          @input=${(x) => this.newValue = x.target.value}
        ></uui-input>

        <uui-button look="primary" @click=${this.addOption}>
          Add
        </uui-button>
      </div>
    `;
	}
};
__decorate([n({ type: Array })], DropdownListWithLabelElement.prototype, "value", void 0), __decorate([r()], DropdownListWithLabelElement.prototype, "newLabel", void 0), __decorate([r()], DropdownListWithLabelElement.prototype, "newValue", void 0), DropdownListWithLabelElement = __decorate([t("dropdown-list-with-label")], DropdownListWithLabelElement);
var dropdown_list_with_label_default = DropdownListWithLabelElement;
export { DropdownListWithLabelElement, dropdown_list_with_label_default as default };
