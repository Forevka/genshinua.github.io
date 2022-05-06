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
        <div class="mx-6 my-4">
            <Breadcrumb :navigation="navigation"></Breadcrumb>
        </div>
        <div v-if="firstLoadingInProgress" class="articles-list">
            <div v-for="item in 9" :key="item" class="article">
                <ArticleCardSkeleton/>
            </div>
        </div>
        <div v-else class="articles-list">
            <div v-for="item in data" :key="item.id" class="article">
                <ArticleCard :article="item"/>
            </div>
        </div>
        <div v-if="firstLoadingInProgress == false">
            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <button v-if="!isFetching && hasNews" :disabled="isFetching" @click="fetchNews" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg v-if="isFetching" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    {{ isFetching ? 'Завантажується' : 'Ще новин!'  }}
                </button>
                <!--<a class="text-indigo-500"></a>-->
                <p v-if="!hasNews && !isFetching" class="leading-normal">
                    Поки що це все
                </p>
                <!--<span class="inline-flex">
                    <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                    </a>
                    <a class="ml-4 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                    </a>
                    <a class="ml-4 text-gray-500">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                    </a>
                    <a class="ml-4 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                    </a>
                </span>-->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Article from '../api/models/article';
import { defineComponent, ref } from 'vue'
import api from '../api/client';
import ArticleCard from '../components/ArticleCard.vue';
import ArticleCardSkeleton from '../components/ArticleCardSkeleton.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

export default defineComponent({
    components: {
        ArticleCard,
        ArticleCardSkeleton,
        Breadcrumb,
    },
    setup() {
        const firstLoadingInProgress = ref(true);
        const isFetching = ref(true);
        const data = ref([] as Article[]);
        const navigation = ref([
            {name: 'Головна', url: '/'}, 
            {name: 'Новини', url: '/news'},
        ])
        const perPage = 6;
        const page = 1;
        const hasNews = ref(false);

        return {
            isFetching,
            data,
            navigation,
            perPage,
            page,
            hasNews,
            firstLoadingInProgress,
        }
    },
    async created() {
        this.page = this.$route.query.page || 1

        await this.fetchNews()
            .then(() => {
                this.firstLoadingInProgress = false;
            })
    },
    methods: {
        async fetchNews() {
            this.isFetching = true;

            await api.get(`/posts?populate=Hero&populate=authors&populate=tags&pagination[page]=${this.page}&pagination[pageSize]=${this.perPage}&sort=publishedAt:desc`).then((data) => {
                console.log(data.data.data)
                let newPosts = data.data.data as Article[];
                let oldPosts = this.data.map((xx: Article) => xx.id);
                this.data.push(...newPosts.filter(x => !oldPosts.includes(x.id)));
                console.log(this.data)
                this.isFetching = false;
                this.hasNews = data.data.meta.pagination.pageCount > data.data.meta.pagination.page;
                this.page += 1;
            });
        }
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
