import './index.css';
import { sanitizerConfig } from "../helpers.tsx";

export default class Table {
  constructor({ api, data, block }) {
    this.header = data.header || 'Header';
    this.api = api;
    this.blockAPI = block;
    this.isHeader = data.isHeader || false;
    this.isResult = data.isResult || false;
    this.rows = data.rows || [
      {
        'columns': [
          'Text','Text','Text','Text','Text'
        ]
      },
      {
        'columns': [
          'Text','Text','Text','Text','Text'
        ]
      },
      {
        'columns': [
          'Text','Text','Text','Text','Text'
        ]
      }
    ];
  }

  static get toolbox() {
    return {
      icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="3" y="3" width="20" height="20" rx="2" stroke="black" stroke-width="2"/>
<path d="M3 10H22.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 10L13 22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
      title: "Table",
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('table_layout');

    let header = document.createElement('div');
    header.classList.add('table_header');
    header.innerText = this.header;
    header.contentEditable = "true";
    this.wrapper.appendChild(header);

    let tableSheet = document.createElement('table');
    tableSheet.contentEditable = "false";
    tableSheet.classList.add('table_sheet');
    this.wrapper.appendChild(tableSheet);

    for (let i=0;i<this.rows.length;i++) {
      let row = document.createElement('tr');
      row.contentEditable = "false";
      row.classList.add('table_sheet-row');
      if (this.rows.length - i !== 1 && !this.isHeader) {
        row.classList.add('table_sheet-row-separator');
      }
      if (this.isResult && this.rows.length - i === 1) {
        row.classList.add('table_sheet-row-result');
      }
      if (this.isHeader && i === 0) {
        row.classList.add('table_sheet-row-header');
      }

      tableSheet.appendChild(row);
      let columns = this.rows[i]['columns'];
      for (let y=0;y<columns.length;y++) {
        let column = document.createElement('td');
        column.classList.add('table_sheet-column');
        column.contentEditable = "true";
        column.innerHTML = columns[y];
        row.appendChild(column);
      }
    }

    this.wrapper.addEventListener('paste', (e) => {
      e.stopPropagation();
      e.preventDefault();
      let paste = (e.clipboardData || window.clipboardData).getData("text/html");
      if (paste.length === 0) {
        paste = (e.clipboardData || window.clipboardData).getData("text/plain");
      }
      paste = this.api.sanitizer.clean(paste || '', sanitizerConfig);
      document.execCommand("insertHTML", false, paste.trim());
      this.blockAPI.dispatchChange();
    });

    return this.wrapper;
  }

  renderSettings() {
    return [
      {
        label: 'Add row',
        onActivate: () => {
          let sheet = this.wrapper.querySelector('.table_sheet');
          let columnsCount = sheet.childNodes[0]?.childNodes?.length;

          let row = document.createElement('tr');
          row.contentEditable = "false";
          row.classList.add('table_sheet-row');
          row.classList.add('table_sheet-row-separator');
          sheet.appendChild(row);
          for (let y=0;y<columnsCount;y++) {
            let column = document.createElement('td');
            column.classList.add('table_sheet-column');
            column.contentEditable = "true";
            column.innerHTML = 'Text';
            row.appendChild(column);
          }
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        label: 'Add column',
        onActivate: () => {
          let sheet = this.wrapper.querySelector('.table_sheet');
          let columnsCount = sheet.childNodes[0]?.childNodes?.length;
          let rows = sheet.childNodes;

          for (let i=0;i<rows.length;i++ ) {
            let column = document.createElement('td');
            column.classList.add('table_sheet-column');
            column.contentEditable = "true";
            column.innerHTML = 'Text';
            rows[i].appendChild(column);
          }
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        label: 'Delete row',
        onActivate: () => {
          let sheet = this.wrapper.querySelector('.table_sheet');
          let items = sheet.childNodes;
          sheet.removeChild(items[items.length - 1]);
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        label: 'Delete column',
        onActivate: () => {
          let sheet = this.wrapper.querySelector('.table_sheet');
          let rows = sheet.childNodes;

          for (let i=0;i<rows.length;i++ ) {
            let columns = rows[i].childNodes;
            rows[i].removeChild(columns[columns.length -1 ]);
          }
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        label: 'Make header',
        onActivate: () => {
          let sheet = this.wrapper.querySelector('.table_sheet');
          if (sheet.childNodes[0].classList.contains('table_sheet-row-header')) {
            sheet.childNodes[0].classList.remove('table_sheet-row-header');
          } else {
            sheet.childNodes[0].classList.add('table_sheet-row-header');
          }
          this.isHeader = !this.isHeader;
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        label: 'Make result',
        onActivate: () => {
          let sheet = this.wrapper.querySelector('.table_sheet');
          if (sheet.childNodes[sheet.childNodes.length - 1].classList.contains('table_sheet-row-result')) {
            sheet.childNodes[sheet.childNodes.length - 1].classList.remove('table_sheet-row-result');
          } else {
            sheet.childNodes[sheet.childNodes.length - 1].classList.add('table_sheet-row-result');
          }
          this.isResult = !this.isResult;
        },
        closeOnActivate: true,
        isDisabled: false,
      },
    ];
  }

  async save() {
    try {
      let sheet = this.wrapper.querySelector('.table_sheet');
      let rows = [];
      for (let i=0;i<sheet.childNodes.length;i++) {
        let columnsValues = [];
        let columns = sheet.childNodes[i].childNodes;
        for (let y=0;y<columns.length;y++) {
          columnsValues.push(columns[y].innerHTML);
        }
        rows.push({
          'columns': columnsValues
        });
      }
        return {
          'isHeader' : this.isHeader,
          'isResult' : this.isResult,
          'rows' : rows,
          'header' : this.wrapper.querySelector('.table_header').innerText,
        };
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
    }
  }
}