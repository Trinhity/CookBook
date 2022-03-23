import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
// import store from "./store";
// import axios from "axios";

Vue.config.productionTip = false;

// set auth header
// axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
