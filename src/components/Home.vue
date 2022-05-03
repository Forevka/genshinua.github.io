<template>
    <!--<div class="hero-wrapper">
        <div class="heroes">
            <div class="hero-center1">
            </div>
            <div class="hero-center2">
            </div>
        </div>
        <div class="text-lines">
            <div class="line-1">Genshin UA</div>
            <div class="line-2">Genshin UA</div>
            <div class="line-3">Genshin UA</div>
        </div>
    </div>-->
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
.hero-wrapper {
	background:#222;
	display:flex;
	flex-flow:column wrap;
	align-items:center;
	justify-content:flex-start;
}

.hero-center1 {
	width:750px;
	margin-top:25px;
	height:750px;
	overflow:hidden;
	display:flex;
	align-items:flex-start;
	justify-content:center;
	
	background:url(https://i.ibb.co/SJ7VfBz/Character-Albedo-Portrait.webp);
	background-size:cover;
	position:relative;
	z-index:0;
}

.hero-center2 {
	width:750px;
	margin-top:25px;
	height:750px;
	overflow:hidden;
	display:flex;
	align-items:flex-start;
	justify-content:center;
	
	background:url(https://i.ibb.co/zrzGfNM/Character-Bennett-Portrait.webp);
	background-size:cover;
	position:relative;
	z-index:0;
}


.text-lines {
	position:absolute;
	top:450px;
	font:900 100px/80px montserrat;
	text-transform:uppercase;
	color:transparent;
	-webkit-text-stroke:1px #eee;
	
}

.text-lines .line-2 {
	color:#eee;
	-webkit-text-stroke:0px #eee;
}
</style>

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
