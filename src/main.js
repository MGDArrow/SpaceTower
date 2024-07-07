import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles.scss';

import { router } from './router/router';

import VIcon from '@/components/VIcon.vue';
import VPopup from '@/components/VPopup.vue';
import VButton from '@/components/VButton.vue';

createApp(App)
  .component('VIcon', VIcon)
  .component('VPopup', VPopup)
  .component('VButton', VButton)
  .use(router)
  .mount('#app');
