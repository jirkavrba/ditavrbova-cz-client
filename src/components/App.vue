<template>
    <v-app dark>
        <v-navigation-drawer clipped color="grey darken-4" app v-model="menuExpanded">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle>
                        Kontakt
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-avatar size="64">
                    <v-img src="https://socialveo.co/frontend/assets/images/default-user.png"></v-img>
                </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Dita Vrbová</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle>777 931 603</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle>dita.vrbova@volny.cz</v-list-item-subtitle>
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
            <v-list nav v-else expand>
                <v-list v-for="category of categories" :key="category.slug">
                    <v-list-item @click="loadCategory(category)">
                        <v-list-item-icon>
                            <v-icon>arrow_forward</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ category.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-for="type of category.types"
                                 :key="type.slug"
                                 @click="loadType({
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
                    <v-divider/>
                </v-list>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
                flat
        >
            <v-app-bar-nav-icon @click.stop="menuExpanded = !menuExpanded">
                <v-icon>menu</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">Keramika</span>
            </v-toolbar-title>
            <v-spacer/>
        </v-app-bar>

        <Products/>
    </v-app>
</template>
<script>
    import Products from './Products';
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'App',
        methods: mapActions([
            "loadMenu",
            "loadCategory",
            "loadType",
            "resetFilters",
        ]),
        created() {
            this.loadMenu()
        },
        data() {
            return {
                menuExpanded: window.innerWidth >= 600,
            }
        },
        computed: {
            ...mapState(
                {
                    categories: state => state.categories,
                    loading: state => state.loading.menu,
                }
            )
        },
        components: {
            Products,
        }
    }
</script>
