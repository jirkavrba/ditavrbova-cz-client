<template>
    <div>
        <h1>MENU</h1>
        <div v-if="loading">
            loading...
        </div>
        <div v-else>
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <h2>{{ category.name }}</h2>
                    <code>{{ category.slug }}</code>
                    <a @click="$store.dispatch('loadCategory', category.slug)" href="#">Zobrazit</a>
                    <ul>
                        <li v-for="type in category.types" :key="type.id">
                            <h3>{{ type.name }}</h3>
                            <code>{{ type.slug }}</code>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        computed: mapState({
            categories: state => state.categories,
            loading: state => state.menuLoading,
        }),
        methods: mapActions(["loadMenu"]),
        created () {
            this.$store.dispatch('loadMenu')
        }
    }
</script>