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
            <v-list-item class="d-flex align-center justify-center">
                <v-list-item-avatar size="128" style="margin: 0;">
                    <v-img src="/avatar.jpg"></v-img>
                </v-list-item-avatar>
            </v-list-item>
            <v-list-item dense>
                <v-list-item-content class="text-center">
                    <v-list-item-title style="font-size: 20px;">Dita Vrbová</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item dense>
                <v-list-item-icon>
                    <v-icon>phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle>777 931 603</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
                <v-list-item-icon>
                    <v-icon>email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle>
                        <a href="mailto:dita.vrbova@volny.cz">
                            dita.vrbova@volny.cz
                        </a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
                <v-list-item-icon>
                    <v-icon>sms</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-subtitle>
                        <a href="https://www.messenger.com/t/dita.vrbova1" target="_blank">
                            Messenger
                        </a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="resetFilters()" dense>
                <v-list-item-icon>
                    <v-icon color="primary">home</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Hlavní stránka</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <div v-if="loading" class="text-center mt-5">
                <v-progress-circular size="40" indeterminate color="primary"></v-progress-circular>
                <div class="mt-4">
                    <b>Načítání kategorií</b>
                </div>
            </div>
            <v-list nav v-else expand dense>
                <v-list v-for="category of categories" :key="category.slug">
                    <v-list-item @click="loadCategory(category)">
                        <v-list-item-icon>
                            <v-icon color="primary">arrow_forward</v-icon>
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
                            <v-icon color="primary">subdirectory_arrow_right</v-icon>
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
                color="red darken-4"
                prominent
                dense
        >
            <v-app-bar-nav-icon @click.stop="menuExpanded = !menuExpanded">
                <v-icon>menu</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-items class="d-flex justify-center align-center">
                <img src="/logo.svg" alt="" class="ma-2">
                <v-toolbar-title style="align-self: center !important; padding-bottom: 0 !important;">Keramika</v-toolbar-title>
            </v-toolbar-items>
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
            "reset",
        ]),
        created() {
            this.loadMenu()
        },
        data() {
            return {
                menuExpanded: window.innerWidth >= 1265,
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
