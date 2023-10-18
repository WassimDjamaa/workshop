import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';
import Authorization from './components/login/Authorization.vue'

const app = createApp(App)

app.use(router)

app.use(VueCookies);

app.component('authorization', Authorization)

app.mount('#app')
