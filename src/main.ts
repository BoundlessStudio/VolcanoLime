import './assets/main.css'
import 'md-editor-v3/lib/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { createAuth0 } from '@auth0/auth0-vue';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from './router'
import App from './App.vue'

library.add(fas, fab)

const app = createApp(App)
app.use(createPinia())
app.use(createRouter(app))
app.use(
  createAuth0({
    domain: "dev-qupdjha4.us.auth0.com",
    clientId: "HRMJMSRxjgKXHgbqisfA7FHfQpl7DPIF",
    authorizationParams: {
      redirect_uri: "https://volcano-lime.ngrok.app",
      audience: "electric-raspberry.ngrok.app",
    }
  })
);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
