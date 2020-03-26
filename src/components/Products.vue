<template>
    <div>
        <h1>PRODUCTS</h1>
        <div v-if="showingFilters">
            <button @click="resetFilters">RESET</button>
        </div>
        <div>
            <ul id="products">
                <li v-for="product in this.$store.getters.products" :key="product.slug" class="product">
                    <h1>{{ product.name }}</h1>
                    <img :src="product.images[0]" :alt="product.name">
                </li>
            </ul>
            <div v-if="loading && !reachedEnd">Loading...</div>
            <div id="scroll-monitor"></div>
        </div>
    </div>
</template>
<style>
    #products {
        display: flex;
        flex-flow: row wrap;
    }

    #products .product img {
        width: 300px;
        height: 300px;
    }
</style>
<script>
    import {mapState, mapActions} from 'vuex'
    import scrollMonitor from 'scrollmonitor';

    export default {
        computed: mapState({
            loading: state => state.productsLoading,
            reachedEnd: state => state.reachedEnd,
            showingFilters: state => state.showingFilter
        }),
        methods: {
            ...mapActions(["loadProducts", "nextPage", "resetFilters"]),
            loadNextPage() {
                if (!this.loading && !this.reachedEnd) {
                    this.$store.dispatch('nextPage');
                }
            }
        },
        created() {
            this.$store.dispatch('loadProducts')
        },
        mounted() {
            // Create watchdog to automatically load next pages
            const instance = this;
            const monitor = document.getElementById('scroll-monitor');
            const watcher = scrollMonitor.create(monitor);
            watcher.enterViewport(function () {
                instance.loadNextPage()
            });
        }
    }
</script>