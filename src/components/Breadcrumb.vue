<template>
    <ul class="breadcrumb">
        <li class="breadcrumb-item" v-for="item in navigation" :key="item.name">
            <router-link :to="item.url">{{item.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['navigation'],
})
</script>

<style lang="scss" scoped>
</style>