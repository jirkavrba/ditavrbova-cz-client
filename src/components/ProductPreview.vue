<template>
    <v-col cols="12" sm="6" md="3" lg="2">
        <v-img
                :src="image"
                aspect-ratio="1"
                class="product--preview"
                @click="$store.dispatch('viewProductDetails', slug)"
        >
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
    </v-col>
</template>
<style>
    .product--preview {
        border-radius: 5px;
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