import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import KeepScrollPosition from 'vue-keep-scroll-position';

Vue.config.productionTip = false;

Vue.use(KeepScrollPosition);

import vuetify from "./plugins/vuetify";

new Vue({
    vuetify,
    store,
    render: wrapper => wrapper(App),
})
    .$mount('#app');
