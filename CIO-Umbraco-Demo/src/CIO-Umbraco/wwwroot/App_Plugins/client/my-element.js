import { t as __decorate } from "./decorate-BnP3GfGh.js";
import { LitElement, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
var MyTypeScriptElement = class extends UmbElementMixin(LitElement) {
	#e;
	constructor() {
		super(), this.consumeContext(UMB_NOTIFICATION_CONTEXT, (e) => {
			this.#e = e;
		});
	}
	#t = () => {
		this.#e?.peek("positive", { data: { message: "#h5yr" } });
	};
	render() {
		return html`
      <uui-box headline="Welcome">
        <p>A TypeScript Lit Dashboard</p>
        <uui-button look="primary" label="Click me" @click=${this.#t}></uui-button>
      </uui-box>
    `;
	}
};
MyTypeScriptElement = __decorate([customElement("my-typescript-element")], MyTypeScriptElement);
var my_element_default = MyTypeScriptElement;
export { my_element_default as default };
