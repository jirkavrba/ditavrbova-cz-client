<template>
    <v-app dark>
        <Menu/>
        <Products/>
    </v-app>
</template>
<script>
    import Menu from './Menu';
    import Products from './Products';

    export default {
        name: 'App',
        components: {
            Menu,
            Products,
        }
    }
</script>
