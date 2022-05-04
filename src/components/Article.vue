<template>
    <div v-if="isFetching" class="container mx-auto loader">
        <Breadcrumb :navigation="navigation"></Breadcrumb>
        <Loader />
    </div>
    <div v-else class="container mx-auto">
        <Breadcrumb :navigation="navigation"></Breadcrumb>
        <div
            ref="hero_image"
            class="hero-nav rounded-lg"
            :style="{
                'background-image': `url(${hero.url})`,
            }"
        >
            <div class="hero-nav__inner common">
                <div class="common">
                    <div class="date">
                        <i class="fa-solid fa-calendar"></i>
                        {{new Date(article.attributes.publishedAt).toLocaleDateString('uk', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"}) }}
                    </div>
                </div>
            </div>
            <div class="hero-nav__inner title">
                <div class="title">
                    {{ article.attributes.Title }}
                </div>
            </div>
        </div>
        <div class="article-lead py-4">
            <div class="h-full bg-gray-100 p-8 rounded">
                <p class="leading-relaxed" v-html="unescapeHtml(article.attributes.LeadText)">
                </p>
            </div>
        </div>
        <div class="article-content" v-html="unescapeHtml(article.attributes.Content)"></div>
    </div>
</template>

<script lang="ts">
import '../css/article.scss'
import { defineComponent, ref } from 'vue'
import api from '../api/client'
import Meta from '../api/models/meta'
import Article from '../api/models/article'
import {Size as ImageAttributes} from '../api/models/image';
import { AxiosResponse } from 'axios'
import Loader from './Loader.vue'
import Breadcrumb from './Breadcrumb.vue'

export default defineComponent({
    components: {
        Loader,
        Breadcrumb,
    },
    setup() {
        const isFetching = ref(true)
        const article = ref({} as Article)
        const hero = ref({} as ImageAttributes)
        const firstRender = ref(true)
        const navigation = ref([
            {name: 'Головна', url: '/'}, 
            {name: 'Новини', url: '/'},
        ])

        return {
            isFetching,
            article,
            firstRender,
            hero,
            navigation,
        }
    },
    async created() {
        this.isFetching = true
        await api.get(`/posts/${this.$route.params.id}?populate=Hero&populate=createdBy`).then((data: AxiosResponse<Meta<Article>, any>) => {
            console.log(data)
            this.article = data.data.data
            this.hero = this.article.attributes.Hero.data.attributes.formats.large || this.article.attributes.Hero.data.attributes.formats.medium
                || this.article.attributes.Hero.data.attributes.formats.small || this.article.attributes.Hero.data.attributes.formats.thumbnail;

            this.navigation.push({name: this.article.attributes.Title, url: `/article/${this.article.id}`},)
            this.isFetching = false
        })
    },
    updated() {
        if (this.firstRender) {
            this.$refs.hero_image.style.height = `${this.hero.height}px`

            this.firstRender = false
        }
    },
    async mounted() {
        let last_known_scroll_position = 0;
        let ticking = false;

        window.addEventListener('scroll', (event) => {
            if (this.isFetching === true) return

            last_known_scroll_position = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.adjustHero(last_known_scroll_position);
                    ticking = false;
                });

                ticking = true;
            }
            
            /*if (scrollOffset > (heroHeight - 215)) {
                hero.classList.add('fixme');
            } else {
                hero.classList.remove('fixme');
            };*/
        })
    },
    methods: {
        unescapeHtml(unsafe) {
            return unsafe
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
        },
        adjustHero(scrollY) {
            let hero = this.$refs.hero_image
            let heroHeight = this.hero.height

            let scrollOffset = scrollY
            //console.log(scrollOffset)
            if (scrollOffset <= heroHeight) {
                //hero.style.height = `${heroHeight - scrollOffset/2}px`
            }
        }
    },
})
</script>