import { createApp } from 'vue';
import { createPinia } from 'pinia';
import YmapPlugin from 'vue-yandex-maps';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import router from '@/app/router/router';
import '@/app/index.scss';
import App from '@/app/index.vue';

const settings = {
    apiKey: '',
    lang: 'ru_RU',
    coordorder: 'latlong',
    debug: false,
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