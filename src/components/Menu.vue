<template>
    <v-navigation-drawer permanent dark clipped app>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Dita Vrbová
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>
                    Výběr kategorie a typu
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <div v-if="loading" class="text-center mt-5">
            <v-progress-circular size="40" indeterminate color="primary"></v-progress-circular>
            <div class="mt-4">
                <b>Načítání kategorií</b>
            </div>
        </div>
        <v-list nav v-else>
            <v-list-group prepend-icon="unfold_more" v-for="category of categories" :key="category.slug">
                <template v-slot:activator>
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
                </template>
                <v-list>
                    <v-list-item @click="$store.dispatch('loadCategory', category)">
                        <v-list-item-icon>
                            <v-icon>arrow_forward</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Všechny typy</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-for="type of category.types"
                                 :key="type.slug"
                                 @click="$store.dispatch('loadType', {
                                     slug: type.slug,
                                     name: type.name,
                                     category: category.name
                                 })">
                        <v-list-item-icon>
                            <v-icon>subdirectory_arrow_right</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ type.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        computed: mapState({
            categories: state => state.categories,
            loading: state => state.loading.menu,
        }),
        methods: mapActions(["loadMenu"]),
        created() {
            this.$store.dispatch('loadMenu')
        }
    }
</script>