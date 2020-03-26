import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const BASE_URL = "https://ditavrbova-cz.herokuapp.com/api";

export default new Vuex.Store({
    state: {
        title: null,
        categories: [],
        productsLoading: true,
        reachedEnd: false,
        menuLoading: true,
        loadedProductPages: {},
        loadingUrl: "/products", // Default url, no sorting
        showingFilter: false,
        page: 1,
    },
    getters: {
        products: state  => {
            return Array.prototype.concat(...Object.values(state.loadedProductPages));
        }
    },
    mutations: {
        showProducts(state, products) {
            Vue.set(state.loadedProductPages, state.page, products);
            state.productsLoading = false;
        },
        showMenu(state, categories) {
            state.menuLoading = false;
            state.categories = categories;
        },
        nextPage(state) {
            state.productsLoading = true;
            state.page++;
        },
        reachedEnd(state) {
            state.reachedEnd = true;
        },
        reset(state) {
            state.page = 1;
            state.loadedProductPages = {};
            state.productsLoading = true;
        },
        resetFilters(state) {
            state.loadingUrl = "/products";
            state.showingFilter = false;
        }
    },
    actions: {
        loadMenu: (context) => {
            fetch(BASE_URL + "/categories")
                .then(response => response.json())
                .then(response => context.commit('showMenu', response));
        },
        loadProducts: (context) => {
            // If page is already loaded
            if (typeof context.state.loadedProductPages[context.state.page] !== 'undefined' || context.state.page < 1)
                return;

            fetch(BASE_URL + context.state.loadingUrl + "/" + context.state.page)
                .then(response => response.json())
                .then(response => context.commit('showProducts', response))
                .catch(() => context.commit('reachedEnd'));
        },
        loadCategory: (context, category) => {
            if (context.state.loadingUrl !== "/category/" + category) {
                context.commit('reset');
                context.state.loadingUrl = "/category/" + category;
                context.state.showingFilter = true;
            }

            context.dispatch("loadProducts");
        },
        resetFilters: (context) => {
            context.commit('reset');
            context.commit('resetFilters');
            context.dispatch("loadProducts");
        },
        nextPage: (context) => {
            context.commit('nextPage');
            context.dispatch('loadProducts');
        }
    },
    modules: {}
})
