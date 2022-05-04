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
.breadcrumb {
  --primary-color: hsl(196, 78%, 61%);
  --breadcrumb-divider: "/";
  --breadcrumb-divider-color: var(--secondary-color-darker);
  --breadcrumb-color: black;
  --breadcrumb-active-color: var(--primary-color);
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.breadcrumb-item a {
  position: relative;
  text-decoration: none;
}

.breadcrumb-item a::before {
  position: absolute;
  content: "";
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.0625rem;
  background: currentColor;
  transform: scaleX(0);
  transition: 0.3s;
}

.breadcrumb-item a:hover::before {
  transform: scaleX(1);
}

.breadcrumb-item:not(:first-child) {
  padding-left: 0.5625rem;
}

.breadcrumb-item:not(:first-child)::before {
  content: var(--breadcrumb-divider);
  padding-right: 0.5625rem;
  color: var(--breadcrumb-divider-color);
}

.breadcrumb-item:not(:last-child) a {
  color: var(--breadcrumb-color);
}

.breadcrumb-item:last-child a {
  color: var(--breadcrumb-active-color);
}
</style>