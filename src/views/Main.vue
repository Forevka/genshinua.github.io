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
    <div class="container mx-auto loader">
        <div v-if="isFetching" class="articles-list">
            <div v-for="item in 9" :key="item" class="article">
                <ArticleCardSkeleton/>
            </div>
        </div>
        <div v-else class="articles-list">
            <div class="pinned-article">
                <ArticleCard :article="pinnedPost"/>
            </div>

            <div class="carousel-article">
                <Carousel :items-to-show="1" :autoplay="5000" >
                    <Slide v-for="item in carouselPosts" :key="item.id">
                        <ArticleCard :article="item"/>
                    </Slide>

                    <template #addons>
                        <Navigation />
                        <Pagination />
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Article from '../api/models/article';
import { defineComponent, ref } from 'vue'
import api from '../api/client';
import ArticleCard from '../components/ArticleCard.vue';
// import ArticleCardCarousel from '../components/ArticleCardCarousel.vue';
import ArticleCardSkeleton from '../components/ArticleCardSkeleton.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';


export default defineComponent({
    components: {
        ArticleCard,
        ArticleCardSkeleton,
        Breadcrumb,
        Carousel,
        Slide,
        Navigation,
        Pagination,
        //ArticleCardCarousel,
    },
    setup() {
        const isFetching = ref(true);
        const data = ref([]);
        const carouselPosts = ref([]);
        const pinnedPost = ref({} as Article)
        const navigation = ref([
            {name: 'Головна', url: '/'}, 
            {name: 'Новини', url: '/news'},
        ])

        return {
            isFetching,
            data,
            navigation,
            pinnedPost,
            carouselPosts
        }
    },
    async created() {
        this.isFetching = true;
        
        await api.get(`/posts?populate=Hero&populate=authors&populate=tags&pagination[page]=1&pagination[pageSize]=1&sort=Base:desc`).then((data) => {
            console.log(data.data.data)
            this.pinnedPost = data.data.data[0];
            console.log(this.pinnedPost)
        });

        await api.get("/posts?populate=Hero&populate=authors&populate=tags&pagination[page]=1&pagination[pageSize]=4&sort=InCarousel:desc,publishedAt:desc").then((data) => {
            console.log(data.data.data)
            this.carouselPosts.push(...data.data.data);
            console.log(this.data)
            this.isFetching = false;
        });
    },
    methods: {
        
    }
})
</script>


<style lang="scss" scoped>
@import '../css/carousel.css';

.carousel-article {
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

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
    grid-template-columns: 1fr 2fr; 
    grid-template-rows: 1fr; 
    gap: 0px 1em; 
    grid-template-areas: 
        ". ."; 
    
}
/*.articles-list > * {
  border:2px solid red;
}*/
</style>

<style lang="scss">

.articles-list {
    .carousel-article {
        .card:hover {
            top: 0px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
    }
}
</style>