class Plugin2 extends HTMLElement {

    static name = 'Test Plugin 2';

    static get template() {
        const template = document.createElement('template');
        template.innerHTML = `
        <div>
            <h1>Test Plugin 2</h1>
            <p></p>
            <button>click me</button>
        </div>
    `;
        return template;
    }

    static get observedAttributes() {
        return [
            'message',
            'onbuttonclick'
        ];
    }

    message = '';
    onbuttonclick = () => null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.constructor.template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('p').innerText = this.message;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'message':
                    this.message = newValue;
                    this.shadowRoot.querySelector('p').innerText = this.message;
                    break;
                case 'onbuttonclick':
                    this.onbuttonclick = () => eval(newValue);
                    this.shadowRoot.querySelector('button').onclick = () => this.onbuttonclick();
                    break;
            }
        }
    }

}