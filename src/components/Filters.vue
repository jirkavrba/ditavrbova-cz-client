<template>
    <v-row v-if="filter.active">
        <v-col sm="12">
            <v-alert dense dark>
                <v-row align="center">
                    <v-col class="grow">
                        <v-chip v-for="item of filter.items" :key="item.label" color="primary" text-color="black" class="ma-2">
                            <b>{{ item.label }}:</b> {{ item.value}}
                        </v-chip>
                    </v-col>
                    <v-col class="shrink">
                        <v-btn color="primary" text @click="resetFilters">Reset</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>
</template>
<style>
    #filter-container {
        margin-bottom: 30px;
    }
</style>
<script>
    import {mapActions, mapState} from "vuex";
    // import {FilterIcon} from 'vue-feather-icons';

    export default {
        components: {
            // FilterIcon
        },
        computed: mapState({
            filter: state => state.filter,
        }),
        methods: {
            ...mapActions(["resetFilters"]),
        }
    }
</script>
