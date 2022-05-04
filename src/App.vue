<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import GithubSVG from './assets/github.svg'
import Menu from './components/Menu/Menu.vue'
import Footer from './components/Footer.vue'

const store = useStore()
const user = ''
const stack = computed(() => {
    return store.state.stack
})
</script>

<template>
    <Menu></Menu>
    <!--<nav class="relative flex items-center justify-center capitalize text-lg pt-24">
        <router-link class="inline pr-5" to="/" active-class="active">Home</router-link>
        <router-link class="inline" to="/about" active-class="active">About</router-link>
    </nav>-->
    <router-view class="p-24"></router-view>
    <Footer></Footer>
</template>

<style lang="scss">
/*#app {
    @apply h-screen bg-gray-50;
}
#app {
  background-image: url(https://source.unsplash.com/Q7PclNhVRI0);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
}*/

nav {
    a.active {
        &::after {
            @apply block w-full bg-green-500;
            content: '';
            height: 1.5px;
        }
    }
}

main.paimon-menu {
    z-index: 1;
}
</style>
