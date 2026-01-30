import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
function __decorate(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
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

//# sourceMappingURL=client.js.map