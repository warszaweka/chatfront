import Vue from "vue";
import Vuex from "vuex";
import App from "./components/App.vue";
import state from "./store/index";
import style from "./style.css";

Vue.use(Vuex);
const store = new Vuex.Store(state);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
