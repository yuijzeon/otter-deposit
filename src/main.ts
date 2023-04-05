import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './style.css'
import App from './App.vue'
import { DepositApis } from "./deposit/apis";

const myApp = createApp(App);

myApp.use(createPinia());

myApp.use(Quasar, {
    plugins: {},
});

myApp.provide('depositApis', DepositApis);

myApp.mount('#app');
