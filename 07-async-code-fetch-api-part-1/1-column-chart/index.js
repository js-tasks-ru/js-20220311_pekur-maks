import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart {

  chartHeight = 50;

  constructor({
    label = "",
    link = "",
    range = {
      from: new Date(),
      to: new Date()
    },
    url = "",
  } = {}) {
    this.label = label;
    this.link = link;
    this.range = range;
    this.url = new URL(url, BACKEND_URL);
  
    this.render();
    this.update(this.range.from, this.range.to);
  }

  render() {

    const bodyData = this.data != undefined ? this.getBody() : '';

    if (this.element === undefined) {
      const element = document.createElement("div");

      element.innerHTML = `
          <div class="column-chart column-chart_loading" style="--chart-height:">
            <div class="column-chart__title">
              Total ${this.label}
              ${this.getLink()}
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">100</div>
              <div data-element="body" class="column-chart__chart">${bodyData}</div>
            </div>
          </div>
        `;

      this.element = element.firstElementChild;
      return;
    } 
    this.element.querySelector('[data-element="body"]').innerHTML = bodyData;
  }

  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : "";
  }

  async getData(from, to) {
    this.url.searchParams.set("from", from.toISOString());
    this.url.searchParams.set("to", to.toISOString());
    
    return await fetchJson(this.url);
  }

  getBody() {
    const maxValue = Math.max(...this.data);
    const heightIndex = this.chartHeight / maxValue;

    return this.data.map((item) => {
      const percent = ((item / maxValue) * 100).toFixed(0);

      return `<div style="--value: ${Math.floor(item * heightIndex)}" data-tooltip="${percent}%"></div>`;
    })
      .join("");
  }

  initEventListeners() {
    
  }

  async update(from, to) {
    this.element.classList.add('column-chart_loading');
    const data = await this.getData(from, to); 

    if (data && Object.values(data).length) {
      this.element.classList.remove("column-chart_loading");
    }
    
    this.data = Object.entries(data).map(([key, value]) => value);

    this.render();
    
    return this.data;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    
  }

  
}
