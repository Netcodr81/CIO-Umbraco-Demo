import { t as __decorate } from "./decorate-BnP3GfGh.js";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
var MyWelcomeDashboardElement = class extends UmbLitElement {
	render() {
		return html`
      <h1>Welcome Dashboard</h1>
      <div>
        <p>This is the Backoffice. From here, you can modify the content, media, and settings of your website.</p>
        <p>© Sample Company 20XX</p>
      </div>
    `;
	}
	static #e = this.styles = [css`
      :host {
        display: block;
        padding: 24px;
      }
    `];
};
MyWelcomeDashboardElement = __decorate([customElement("my-welcome-dashboard")], MyWelcomeDashboardElement);
var welcome_dashboard_element_default = MyWelcomeDashboardElement;
export { MyWelcomeDashboardElement, welcome_dashboard_element_default as default };
