import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
//import { createYmaps } from 'vue-yandex-maps';

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  //.use(createYmaps({ apikey: process.env.VUE_APP_YM_KEY }))
  .mount('#app')
