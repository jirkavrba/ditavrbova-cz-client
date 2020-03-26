import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const BASE_URL = "https://ditavrbova-cz.herokuapp.com/api";

export default new Vuex.Store({
    state: {
        // Menu
        categories: [],
        // Loading state of components
        loading: {
            menu: true,
            products: true,
            detail: true,
        },

        // Parameters for loading and caching next page
        nextPageUrl: "/products", // Default url, no sorting
        cachedPages: {},

        // Detail of the product
        detail: {
            product: null,
            visible: false,
        },

        // Filtering by category or type
        filter: {
            items: null,
            active: false,
        },

        // Current page
        page: 1,

        // Has the listing reached the end
        reachedEnd: false,
    },
    getters: {
        products: state => {
            return Array.prototype.concat(...Object.values(state.cachedPages));
        }
    },
    mutations: {
        showProducts(state, products) {
            Vue.set(state.cachedPages, state.page, products);
            Vue.set(state.loading, 'products', false);
        },
        showMenu(state, categories) {
            Vue.set(state.loading, 'menu', false);
            state.categories = categories;
        },
        nextPage(state) {
            Vue.set(state.loading, 'products', true);
            state.page++;
        },
        reachedEnd(state) {
            state.reachedEnd = true;
        },
        reset(state) {
            state.page = 1;
            Vue.set(state.detail, 'active', false);
            Vue.set(state, 'cachedPages', {});
            Vue.set(state.loading, 'products', true);
        },
        resetFilters(state) {
            state.nextPageUrl = "/products";
            Vue.set(state.filter, 'active', false);
        },
        loadCategory(state, payload) {
            state.nextPageUrl = "/category/" + payload.slug;
            Vue.set(state.filter, 'active', true);
            Vue.set(state.filter, 'items', [{label: 'Kategorie', value: payload.name}]);
        },
        loadType(state, payload) {
            state.nextPageUrl = "/type/" + payload.slug;
            Vue.set(state.filter, 'active', true);
            Vue.set(state.filter, 'items', [
                {label: 'Kategorie', value: payload.category},
                {label: 'Typ', value: payload.name}
            ]);
        },
        loadProductDetails(state) {
            Vue.set(state.detail, 'active', true);
            Vue.set(state.loading, 'detail', true);
        },
        showProductDetails(state, product) {
            Vue.set(state.detail, 'product', product);
            Vue.set(state.detail, 'active', true);
            Vue.set(state.loading, 'detail', false);
        },
        hideProductDetails(state) {
            Vue.set(state.detail, 'product', null);
            Vue.set(state.detail, 'active', false);
            Vue.set(state.loading, 'detail', true);
        },
    },
    actions: {
        loadMenu: (context) => {
            fetch(BASE_URL + "/categories")
                .then(response => response.json())
                .then(response => context.commit('showMenu', response));
        },
        loadProducts: (context) => {
            // If page is already loaded
            if (typeof context.state.cachedPages[context.state.page] !== 'undefined' || context.state.page < 1)
                return;

            fetch(BASE_URL + context.state.nextPageUrl + "/" + context.state.page)
                .then(response => response.json())
                .then(response => context.commit('showProducts', response))
                .catch(() => context.commit('reachedEnd'));
        },
        loadCategory: (context, payload) => {
            if (context.state.nextPageUrl !== "/category/" + payload.slug) {
                context.commit('reset');
                context.commit('loadCategory', payload);
            }

            context.commit('hideProductDetails');
            context.dispatch("loadProducts");
        },
        loadType: (context, payload) => {
            if (context.state.loadingUrl !== "/type/" + payload.slug) {
                context.commit('reset');
                context.commit('loadType', payload);
            }

            context.commit('hideProductDetails');
            context.dispatch("loadProducts");
        },
        resetFilters: (context) => {
            context.commit('hideProductDetails');
            context.commit('resetFilters');
            context.commit('reset');
            context.dispatch("loadProducts");
        },
        nextPage: (context) => {
            context.commit('nextPage');
            context.dispatch('loadProducts');
        },
        viewProductDetails: (context, product) => {
            context.commit('loadProductDetails');

            fetch(BASE_URL + '/product/' + product)
                .then(response => response.json())
                .then(response => context.commit('showProductDetails', response));
        }
    },
    modules: {}
})
