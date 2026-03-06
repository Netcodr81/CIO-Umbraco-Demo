import { LitElement, html, css } from "lit";

export class CustomFormsDashboard extends LitElement {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
    }
  `;

  forms = [];
  loading = true;
  error = "";

  //   async connectedCallback() {
  //     super.connectedCallback();
  //     try {
  //       const response = await fetch("/api/forms/submitted"); // Adjust endpoint as needed
  //       if (!response.ok) throw new Error("Failed to fetch forms");
  //       this.forms = await response.json();
  //       this.loading = false;
  //     } catch (e) {
  //       this.error = e.message;
  //       this.loading = false;
  //     }
  //   }

  render() {
    // if (this.loading) {
    //   return html`<p>Loading...</p>`;
    // }
    // if (this.error) {
    //   return html`<p>Error: ${this.error}</p>`;
    // }
    return html`
      <h2>Submitted Forms</h2>
      <table>
        <thead>
          <tr>
            <th>Form Id</th>
            <th>Form Data</th>
            <th>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contact Form</td>
            <td>Name: John Doe, Email: john.doe@example.com</td>
            <td>2024-06-01 10:30:00</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define("custom-forms-dashboard", CustomFormsDashboard);
