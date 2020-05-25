import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify);

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
