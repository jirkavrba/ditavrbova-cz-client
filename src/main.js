import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import keepScroll from 'vue-keep-scroll';

Vue.config.productionTip = false;

Vue.use(keepScroll);

import vuetify from "./plugins/vuetify";

new Vue({
    vuetify,
    store,
    render: wrapper => wrapper(App),
})
    .$mount('#app');
