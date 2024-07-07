import { ref } from 'vue';

class Messages {
  static #onlyInstance = null;
  constructor() {
    if (Messages.#onlyInstance) return Messages.#onlyInstance;
    Messages.#onlyInstance = this;
    this.messages = ref([]);
  }

  init() {
    this.messages.value = [];
  }

  add(text, color = 'green', icon = 'dollar', time = 1000) {
    this.messages.value.push(new MessagesBuilder(text, color, icon, time));
  }

  tick(dt) {
    this.messages.value.forEach((message) => (message.time -= dt));
    this.messages.value = this.messages.value.filter((message) => message.time > 0);
  }
}

export default new Messages();

class MessagesBuilder {
  constructor(text, color, icon, time) {
    this.text = text;
    this.color = color;
    this.icon = icon;
    this.time = time;
  }
}
