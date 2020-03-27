<template>
    <v-alert v-if="filter.active" dense dark>
        <v-row align="center">
            <v-col class="grow">
                <v-chip v-for="item of filter.items" :key="item.label" text-color="primary" class="ma-2"
                        style="background-color: rgba(229, 57, 53, 0.08)">
                    <b class="d-inline-block mr-2">{{ item.label }}</b> {{ item.value.toLowerCase() }}
                </v-chip>
            </v-col>
            <v-col class="shrink">
                <v-btn color="primary" text @click="resetFilters" icon height="50" width="50">
                    <v-icon size="40">close</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-alert>
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
