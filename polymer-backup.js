import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `polymer-backup`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolymerBackup extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <template is="dom-if" if="{{debug}}">
        <small>{{filename}}</small></br>
        <small>{{data}}</small></br>
        <small>{{suffix}}</small></br>
        <small>{{error}}</small></br>
      </template>
    `;
  }
  static get properties() {
    return {
      filename: {
        type: String,
        observer: '_start',
      },
      data: {
        type: String,
      },
      suffix: {
        type: String,
      },
      debug: {
        type: Boolean,
        valiue: false,
      },
      error: {
        type: String,
        notify: true,
        reflectToAttribute: true,
      },
    };
  }
  _start(){
    if(this.filename && this.data && this.suffix){
      this._backup(this.filename, this.data, this.suffix)
    }
  }

  _backup(name, data, suffix) {
    const filename = `${name}_${+new Date()}.${suffix}`;
    const popup = window.document.createElement('a');
    popup.target = '_blank';
    popup.href = window.URL.createObjectURL(new Blob([data], {type: 'text/csv'}));
    popup.download = filename;
    document.body.appendChild(popup);
    popup.click();
    document.body.removeChild(popup);
}

} window.customElements.define('polymer-backup', PolymerBackup);
