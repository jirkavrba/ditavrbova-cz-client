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

        // Path used to load current resource
        path: "/products", // Default url, no sorting

        // All products
        products: [],

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
    },
    mutations: {
        showProducts(state, products) {
            Vue.set(state, 'products', products);
            Vue.set(state.loading, 'products', false);
        },
        showMenu(state, categories) {
            Vue.set(state, 'categories', categories);
            Vue.set(state.loading, 'menu', false);
        },
        reset(state) {
            Vue.set(state, 'path', "/products");
            Vue.set(state.filter, 'active', false);
            Vue.set(state.detail, 'active', false);
            Vue.set(state.loading, 'products', true);
        },
        resetFilters(state) {
            Vue.set(state, 'path', "/products");
            Vue.set(state.filter, 'active', false);
        },
        loadCategory(state, payload) {
            Vue.set(state, 'path', "/category/" + payload.slug);
            Vue.set(state.filter, 'active', true);
            Vue.set(state.filter, 'items', [{label: 'Kategorie', value: payload.name}]);
        },
        loadType(state, payload) {
            Vue.set(state, 'path', "/type/" + payload.slug);
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
            fetch(BASE_URL + context.state.path)
                .then(response => response.json())
                .then(response => context.commit('showProducts', response));
        },
        loadCategory: (context, payload) => {
            if (context.state.path !== "/category/" + payload.slug) {
                context.commit('reset');
                context.commit('loadCategory', payload);
            }

            context.dispatch("loadProducts");
        },
        loadType: (context, payload) => {
            if (context.state.path !== "/type/" + payload.slug) {
                context.commit('reset');
                context.commit('loadType', payload);
            }

            context.dispatch("loadProducts");
        },
        resetFilters: (context) => {
            context.commit('reset');
            context.dispatch("loadProducts");
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
