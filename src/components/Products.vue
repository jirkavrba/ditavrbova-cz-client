<template>
    <v-content>
        <v-container fluid>
            <v-overlay
                    :absolute="false"
                    :value="detail.active"
                    opacity="0.98"
            >
                <ProductDetail v-if="detail.active" v-bind="detail.product"/>
            </v-overlay>
            <v-row v-keep-scroll-position>
                <v-col>
                    <v-container>
                        <Filters/>
                        <v-row>
                            <ProductPreview
                                    v-for="product in products"
                                    :key="product.slug"
                                    :slug="product.slug"
                                    :name="product.name"
                                    :image="product.images[0]"
                            />
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row v-if="loading.products">
                <v-col sm="12" class="text-center">
                    <v-progress-circular size="60" indeterminate color="primary"></v-progress-circular>
                    <div class="mt-4">
                        <b>Načítání produktů</b>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>
<style>
    .v-overlay__content {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
</style>
<script>
    import {mapState, mapActions} from 'vuex'
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
            products: state => state.products,
        }),
        methods: mapActions(["loadProducts"]),
        created() {
            this.$store.dispatch('loadProducts')
        }
    }
</script>