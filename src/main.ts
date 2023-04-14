import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './style.css'
import App from './App.vue'
import './utils/extensions'

const myApp = createApp(App);

myApp.use(createPinia());
myApp.use(Quasar, {});

myApp.mount('#app');
