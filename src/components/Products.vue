<template>
    <v-content>
        <v-container fluid>
            <ProductDetail v-if="detail.active" v-bind="detail.product"/>
            <v-row v-else>
                <v-container>
                    <Filters/>
                    <v-row>
                        <ProductPreview
                                v-for="product in this.$store.getters.products"
                                :key="product.slug"
                                :slug="product.slug"
                                :name="product.name"
                                :image="product.images[0]"
                        />
                    </v-row>
                </v-container>
            </v-row>
            <v-row v-if="loading.products && !reachedEnd">
                <v-col sm="12" class="text-center">
                    <v-progress-circular size="60" indeterminate color="primary"></v-progress-circular>
                    <div class="mt-4">
                        <b>Načítání produktů</b>
                    </div>
                </v-col>
            </v-row>
            <div id="scroll-monitor"/>
        </v-container>
    </v-content>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import scrollMonitor from 'scrollmonitor';
    import ProductPreview from './ProductPreview';
    import ProductDetail from './ProductDetail';
    import Filters from './Filters';

    export default {
        components: {
            ProductPreview,
            ProductDetail,
            Filters
        },
        computed: mapState({
            detail: state => state.detail,
            loading: state => state.loading,
            reachedEnd: state => state.reachedEnd,
        }),
        methods: {
            ...mapActions(["loadProducts", "nextPage"]),
            loadNextPage() {
                if (!this.loading.products && !this.reachedEnd) {
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