import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './index.vue';
import router from './providers/router';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import '@/app/index.scss';

import YmapPlugin from 'vue-yandex-maps';

const settings = {
    apiKey: '',
    lang: 'ru_RU',
    coordorder: 'latlong',
    debug: true,
    version: '2.1'
}

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(YmapPlugin, settings);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');