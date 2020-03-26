import Vue from 'vue'
import VuetifyBase from 'vuetify'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VuetifyBase);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.teal.accent3
            }
        }
    }
})