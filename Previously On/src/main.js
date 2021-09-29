import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import './assets/tailwind.css';
import router from './router';
import axios from 'axios';

const app = createApp(App).use(router);

axios.defaults.headers = {
	'X-BetaSeries-Key': '3ab6d2ff3a47',
};

app.config.globalProperties.axios = axios;

app.mount('#app');
