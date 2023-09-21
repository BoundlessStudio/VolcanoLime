import 'md-editor-v3/lib/style.css'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { createAuth0 } from '@auth0/auth0-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from './router'
import App from './App.vue'

library.add(fas, fab)

const app = createApp(App)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
      audience: import.meta.env.VITE_AUTH_AUDIENCE
    }
  })
)
app.use(createPinia())
app.use(createRouter(app))
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
