class TodoList extends HTMLElement {
  constructor() {
    super();
    this.items = [];
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
          max-width: 300px;
        }

        .container {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 6px;
          background: #fafafa;
        }

        h3 {
          margin-top: 0;
        }

        .input-group {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        input {
          flex: 1;
          padding: 6px;
          border-radius: 4px;
          border: 1px solid #c6a9a9;
        }

        button {
          background: blue;
          color: white;
          border: none;
          padding: 6px 10px;
          cursor: pointer;
          border-radius: 4px;
        }

        button:hover {
          background: darkblue;
        }

        ul {
          padding-left: 20px;
          margin: 0;
        }

        li {
          margin-bottom: 4px;
        }
      </style>

      <div class="container">
        <h3>Todo List</h3>

        <div class="input-group">
          <input type="text" placeholder="Enter task..." />
          <button>Add</button>
        </div>

        <ul></ul>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  connectedCallback() {
    this.input = this.shadowRoot.querySelector("input");
    this.button = this.shadowRoot.querySelector("button");
    this.list = this.shadowRoot.querySelector("ul");

    this.button.addEventListener("click", () => this.addItem());
  }

  addItem() {
    const value = this.input.value.trim();
    if (!value) return;

    this.items.push(value);
    this.input.value = "";

    this.render();

    
    this.dispatchEvent(
      new CustomEvent("listChanged", {
        detail: { items: this.items },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    this.list.innerHTML = "";

    this.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      this.list.appendChild(li);
    });
  }
}

customElements.define("todo-list", TodoList);