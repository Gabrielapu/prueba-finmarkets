
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';
UIkit.use(Icons);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
