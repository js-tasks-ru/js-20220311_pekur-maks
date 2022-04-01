export default class NotificationMessage {
  static activeNotification;

  constructor(message = "", { duration = 2000, type = "succes" } = {}) {
    this.message = message;
    this.durationSecond = (duration / 1000) + 's';
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
        <div class="notification ${this.type}" style="--value:${this.durationSecond}">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">${this.message}</div>
            </div>
        </div>
    `;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
  }

  show(parent = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }

    parent.append(this.element);
    setTimeout(() => this.remove(), this.duration);

    NotificationMessage.activeNotification = this;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }
}
