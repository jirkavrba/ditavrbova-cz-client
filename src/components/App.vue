<template>
    <div id="app">
        <Menu/>
        <Products/>
    </div>
</template>
<style>
    #app {
        display: flex;
        flex-flow: row nowrap;
    }
</style>

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
