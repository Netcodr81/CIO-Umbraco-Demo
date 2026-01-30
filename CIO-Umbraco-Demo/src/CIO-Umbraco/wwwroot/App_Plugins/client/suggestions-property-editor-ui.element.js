import { t as __decorate } from "./decorate-BnP3GfGh.js";
import { LitElement, css, customElement, html, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
var MySuggestionsPropertyEditorUIElement = class extends LitElement {
	constructor(...e) {
		super(...e), this.value = "";
	}
	render() {
		return html`
      <uui-input id="suggestion-input" class="element" label="text input" .value=${this.value || ""}> </uui-input>
      <div id="wrapper">
        <uui-button id="suggestion-button" class="element" look="primary" label="give me suggestions"> Give me suggestions! </uui-button>
        <uui-button id="suggestion-trimmer" class="element" look="outline" label="Trim text"> Trim text </uui-button>
      </div>
    `;
	}
	static #e = this.styles = [UmbTextStyles, css`
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
__decorate([property({ type: String })], MySuggestionsPropertyEditorUIElement.prototype, "value", void 0), MySuggestionsPropertyEditorUIElement = __decorate([customElement("my-suggestions-property-editor-ui")], MySuggestionsPropertyEditorUIElement);
var suggestions_property_editor_ui_element_default = MySuggestionsPropertyEditorUIElement;
export { suggestions_property_editor_ui_element_default as default };
