import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface DropdownOption {
  label: string;
  value: string;
}

@customElement("dropdown-list-with-label")
export class DropdownListWithLabelElement extends LitElement {
  static styles = css`
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

  /** Value Umbraco binds to */
  @property({ type: Array })
  value: DropdownOption[] = [];

  @state()
  private newLabel = "";

  @state()
  private newValue = "";

  private addOption() {
    if (!this.newLabel || !this.newValue) return;

    this.value = [
      ...this.value,
      { label: this.newLabel, value: this.newValue }
    ];

    this.newLabel = "";
    this.newValue = "";

    this.notifyChange();
  }

  private removeOption(index: number) {
    this.value = this.value.filter((_, i) => i !== index);
    this.notifyChange();
  }

  private notifyChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      ${this.value.map(
        (option, index) => html`
          <div class="option">
            <uui-input readonly value=${option.label}></uui-input>
            <uui-input readonly value=${option.value}></uui-input>
            <uui-button             
              @click=${() => this.removeOption(index)}
            >
              Remove
            </uui-button>
          </div>
        `
      )}

      <div class="option">
        <uui-input
          placeholder="Label"
          .value=${this.newLabel}
          @input=${(e: InputEvent) =>
            (this.newLabel = (e.target as HTMLInputElement).value)}
        ></uui-input>

        <uui-input
          placeholder="Value"
          .value=${this.newValue}
          @input=${(e: InputEvent) =>
            (this.newValue = (e.target as HTMLInputElement).value)}
        ></uui-input>

        <uui-button look="primary" @click=${this.addOption}>
          Add
        </uui-button>
      </div>
    `;
  }
}


export default DropdownListWithLabelElement;

declare global {
	interface HTMLElementTagNameMap {
		'dropdown-with-label': DropdownListWithLabelElement;
	}
}
