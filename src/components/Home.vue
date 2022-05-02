<template>
    <div v-if="isFetching" class="articles-list">
        <div v-for="item in 9" :key="item" class="article">
            <ArticleCardSkeleton/>
        </div>
    </div>
    <div v-else class="articles-list">
        <div v-for="item in data" :key="item.id" class="article">
            <ArticleCard :article="item"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import api from '../api/client';
import ArticleCard from './ArticleCard.vue';
import ArticleCardSkeleton from './ArticleCardSkeleton.vue';

export default defineComponent({
    components: {
        ArticleCard,
        ArticleCardSkeleton,
    },
    setup() {
        const isFetching = ref(true);
        const data = ref([]);

        return {
            isFetching,
            data,
        }
    },
    async created() {
        this.isFetching = true;
        await api.get("/posts?populate=Hero").then((data) => {
            console.log(data.data.data)
            this.data.push(...data.data.data);
            console.log(this.data)
            this.isFetching = false;
        });
    },
    methods: {
        unescapeHtml(unsafe) {
            return unsafe
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#039;/g, "'");
        },
    }
})
</script>

<style lang="scss" scoped>
.articles-list {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
  
  display: grid;
  
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  
  @media (min-width: 30em) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 60em) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
