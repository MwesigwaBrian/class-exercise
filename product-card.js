class ProductCard extends HTMLElement {

  static get observedAttributes() {
    return ["name", "price"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("product-card-template");

    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();

    const button = this.shadowRoot.querySelector("button");

    button.addEventListener("click", () => {

      const purchaseEvent = new CustomEvent("purchase", {
        detail: {
          name: this.getAttribute("name"),
          price: this.getAttribute("price")
        },
        bubbles: true,
        composed: true
      });

      this.dispatchEvent(purchaseEvent);

      // Display purchase output
      const output = document.getElementById("output");
      if (output) {
        output.textContent =
          `Purchased: ${this.getAttribute("name")} - $${this.getAttribute("price")}`;
      }

    });
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const name = this.getAttribute("name") || "";
    const price = this.getAttribute("price") || "";

    this.shadowRoot.querySelector(".name").textContent = name;
    this.shadowRoot.querySelector(".price").textContent = "$" + price;
  }
}

customElements.define("product-card", ProductCard);