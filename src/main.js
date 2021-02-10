import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyAJnsWfN6TM5UiGe1OFySUrrcg5W63qQlI",
        libraries: "places" // necessary for places input
    }
});

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')