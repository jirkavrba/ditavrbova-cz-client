<template>
    <v-col cols="12" sm="6" md="3" lg="2">
        <v-hover
                v-slot:default="{ hover }"
        >
            <v-img
                    :elevation="hover ? 12 : 2"
                    :src="image"
                    aspect-ratio="1"
                    class="product--preview"
                    @click="$store.dispatch('viewProductDetails', slug)"
            >
                <v-fade-transition>
                    <div v-if="hover"
                            class="d-flex transition-fast-in-fast-out white v-card--reveal display-3 white--text"
                            style="height: 100%; opacity: 0.25"
                    >
                    </div>
                </v-fade-transition>
                <template v-slot:placeholder>
                    <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                    >
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-hover>
    </v-col>
</template>
<style>
    .product--preview {
        border-radius: 5px;
        cursor: pointer;
    }
</style>
<script>
    export default {
        props: [
            'name',
            'slug',
            'image'
        ]
    }
</script>