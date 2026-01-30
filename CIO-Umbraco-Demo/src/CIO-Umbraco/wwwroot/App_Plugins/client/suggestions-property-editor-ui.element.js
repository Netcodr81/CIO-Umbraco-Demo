import { t as __decorate } from "./decorate-BnP3GfGh.js";
import { LitElement, css, customElement, html, ifDefined, property, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { UMB_CONFIRM_MODAL, UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
var MySuggestionsPropertyEditorUIElement = class extends UmbElementMixin(LitElement) {
	#e;
	#t;
	constructor() {
		super(), this.value = "", this._suggestions = [
			"You should take a break",
			"I suggest that you visit the Eiffel Tower",
			"How about starting a book club today or this week?",
			"Are you hungry?"
		], this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (e) => {
			this.#e = e;
		}), this.consumeContext(UMB_NOTIFICATION_CONTEXT, (e) => {
			this.#t = e;
		});
	}
	set config(e) {
		this._disabled = e.getValueByAlias("disabled"), this._placeholder = e.getValueByAlias("placeholder"), this._maxChars = e.getValueByAlias("maxChars");
	}
	#n() {
		if (!this._maxChars) return;
		if (!this.value || this.value.length <= this._maxChars) {
			this.#t?.peek("danger", { data: { message: "Nothing to trim!" } });
			return;
		}
		let e = this.value.substring(0, this._maxChars);
		(this.#e?.open(this, UMB_CONFIRM_MODAL, { data: {
			headline: "Trim text",
			content: `Do you want to trim the text to "${e}"?`,
			color: "danger",
			confirmLabel: "Trim"
		} }))?.onSubmit().then(() => {
			this.value = e, this.#a(), this.#t?.peek("positive", { data: {
				headline: "Text trimmed",
				message: "You trimmed the text!"
			} });
		}, null);
	}
	#r(e) {
		this.value = e.target.value, this.#a();
	}
	#i() {
		let e = this._suggestions.length * Math.random() | 0;
		this.value = this._suggestions[e], this.#a();
	}
	#a() {
		this.dispatchEvent(new UmbChangeEvent());
	}
	render() {
		return html`
      <uui-input
        id="suggestion-input"
        class="element"
        label="text input"
        placeholder=${ifDefined(this._placeholder)}
        maxlength=${ifDefined(this._maxChars)}
        .value=${this.value || ""}
        @input=${this.#r}
      >
      </uui-input>
      <div id="wrapper">
        <uui-button
          id="suggestion-button"
          class="element"
          look="primary"
          label="give me suggestions"
          ?disabled=${this._disabled}
          @click=${this.#i}
        >
          Give me suggestions!
        </uui-button>
        <uui-button
          id="suggestion-trimmer"
          class="element"
          look="outline"
          label="Trim text"
          @click=${this.#n}
        ></uui-button>
      </div>
    `;
	}
	static #o = this.styles = [UmbTextStyles, css`
      #wrapper {
        margin-top: 10px;
        display: flex;
        gap: 10px;
      }
      .element {
        width: 100%;
      }
    `];
};
__decorate([property({ type: String })], MySuggestionsPropertyEditorUIElement.prototype, "value", void 0), __decorate([property({ attribute: !1 })], MySuggestionsPropertyEditorUIElement.prototype, "config", null), __decorate([state()], MySuggestionsPropertyEditorUIElement.prototype, "_disabled", void 0), __decorate([state()], MySuggestionsPropertyEditorUIElement.prototype, "_placeholder", void 0), __decorate([state()], MySuggestionsPropertyEditorUIElement.prototype, "_maxChars", void 0), __decorate([state()], MySuggestionsPropertyEditorUIElement.prototype, "_suggestions", void 0), MySuggestionsPropertyEditorUIElement = __decorate([customElement("my-suggestions-property-editor-ui")], MySuggestionsPropertyEditorUIElement);
var suggestions_property_editor_ui_element_default = MySuggestionsPropertyEditorUIElement;
export { suggestions_property_editor_ui_element_default as default };
