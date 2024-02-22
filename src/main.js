import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.css'
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

createApp(App)
.use(router)
.use(Vue3Toastify)
.mount('#app')
