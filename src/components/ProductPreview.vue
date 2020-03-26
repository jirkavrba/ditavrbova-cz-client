<template>
    <v-col sm="12" md="4" lg="3">
        <v-img
                :src="image"
                aspect-ratio="1"
                class="dark"
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
<script>
    export default {
        props: [
            'name',
            'slug',
            'image'
        ]
    }
</script>