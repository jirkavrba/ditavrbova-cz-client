import Vue from 'vue';
import App from './components/App.vue';
import store from './store';

Vue.config.productionTip = false;

import vuetify from "./plugins/vuetify";

new Vue({
    vuetify,
    store,
    render: wrapper => wrapper(App),
})
    .$mount('#app');
