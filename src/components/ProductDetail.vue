<template>
    <v-container>
        <div v-if="loading">
            <v-col sm="12" class="text-center">
                <v-progress-circular size="60" indeterminate color="primary"></v-progress-circular>
                <div class="mt-4">
                    <b>Načítání produktu</b>
                </div>
            </v-col>
        </div>
        <div v-else>
            <v-row class="flex-sm-column-reverse flex-md-row">
                <v-col sm="12" md="6">
                    <v-row class="align-center">
                        <v-btn icon @click="$store.commit('hideProductDetails')" color="primary" width="50"
                               height="50"
                               class="mr-2">
                            <v-icon size="30">arrow_back</v-icon>
                        </v-btn>
                        <h1 class="grow display-1 text--primary">{{ name }}</h1>
                    </v-row>
                    <v-card dark class="mt-4">
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <h2 class="title text--primary">
                                        <v-icon>shopping_cart</v-icon>
                                        Dostupnost
                                    </h2>
                                    <div class="ma-2">
                                        <v-chip color="primary" text-color="black" class="mr-2" v-if="in_stock">
                                            <v-icon class="mr-2">check_circle</v-icon>
                                            Skladem
                                        </v-chip>
                                        <v-chip color="dark" v-else>
                                            Na objednání
                                        </v-chip>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <h2 class="title text--primary">
                                        <v-icon>subject</v-icon>
                                        Popis
                                    </h2>
                                    <div class="subtitle pa-2">
                                        {{ description }}
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <h2 class="title text--primary">
                                        <v-icon>fullscreen</v-icon>
                                        Specifikace
                                    </h2>
                                    <div class="subtitle pa-2">
                                        {{ specifications }}
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col sm="12" md="6">
                    <v-carousel
                            height="auto"
                            hide-delimiter-background
                            show-arrows-on-hover
                            prev-icon="chevron_left"
                            next-icon="chevron_right"
                            delimiter-icon="lens">
                        <v-carousel-item :src="image"/>
                        <v-carousel-item v-for="(_image, i) in images" :key="i" :src="_image" eager="true">
                            <v-responsive aspect-ratio="1:1"/>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
    import {mapState} from "vuex";

    export default {
        props: [
            'name',
            'description',
            'specifications',
            'image',
            'images', // Additional images
            'in_stock'
        ],
        computed: mapState({loading: state => state.loading.detail,}),
    }
</script>