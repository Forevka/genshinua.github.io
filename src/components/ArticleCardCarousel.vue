<template>
    <div class="article-card-carousel">
        <div class="meta">
            <div class="photo" :style="{
                'background-image': `url(${hero.url})`,
            }"></div>
            <!--<ul class="details">
                <li class="author"><a href="#">John Doe</a></li>
                <li class="date">Aug. 24, 2015</li>
                <li class="tags">
                    <ul>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Code</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                    </ul>
                </li>
            </ul>-->
        </div>
        <div class="description">
            <h1>{{article.attributes.Title}}</h1>
            
            <h2 v-for="author in article.attributes.authors.data" :key="author.id">
                <i class="fa-solid fa-user-large"></i>
                {{author.attributes.FullName}}
            </h2>
            
            <p class="read-more">
                <a href="#">Read More</a>
            </p>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import Article from '../api/models/article'
import type { PropType } from 'vue'

export default defineComponent({
    props: {
        article: {
            type: Object as PropType<Article>,
            required: true,
        },
    },
    setup(props) {
        const article = ref(props.article)
        const hero =
            article.value.attributes.Hero.data.attributes.formats.large ||
            article.value.attributes.Hero.data.attributes.formats.medium ||
            article.value.attributes.Hero.data.attributes.formats.small ||
            article.value.attributes.Hero.data.attributes.formats.thumbnail

        return {
            article,
            hero,
        }
    },
})
</script>

<style lang="scss" scoped>

$color_white: #fff;
$color_prime: #5ad67d;
$color_grey: #e2e2e2;
$color_grey_dark: #a2a2a2;

.article-card-carousel {
    height: 100%;
    
    width: 100%;
    display: flex;
    flex-direction: column;
    //margin: 1rem auto;
    //box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
    //box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background: $color_white;
    line-height: 1.4;
    font-family: sans-serif;
    overflow: hidden;
    z-index: 0;
    a {
        color: inherit;
        &:hover {
            color: $color_prime;
        }
    }
    &:hover {
        .photo {
            // transform: scale(1.3) rotate(3deg);
        }
    }
    .meta {
        position: relative;
        z-index: 0;
        height: 200px;
    }
    .photo {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-size: cover;
        background-position: center;
        transition: transform 0.2s;
    }
    .details,
    .details ul {
        margin: auto;
        padding: 0;
        list-style: none;
    }

    .details {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -100%;
        margin: auto;
        transition: left 0.2s;
        background: rgba(#000, 0.6);
        color: $color_white;
        padding: 10px;
        width: 100%;
        font-size: 0.9rem;
        a {
            text-decoration: dotted underline;
        }
        ul li {
            display: inline-block;
        }
        .author:before {
            font-family: FontAwesome;
            margin-right: 10px;
            content: '\f007';
        }

        .date:before {
            font-family: FontAwesome;
            margin-right: 10px;
            content: '\f133';
        }

        .tags {
            ul:before {
                font-family: FontAwesome;
                content: '\f02b';
                margin-right: 10px;
            }
            li {
                margin-right: 2px;
                &:first-child {
                    margin-left: -4px;
                }
            }
        }
    }
    .description {
        padding: 1rem;
        background: $color_white;
        position: relative;
        z-index: 1;
        h1,
        h2 {
            font-family: Poppins, sans-serif;
        }
        h1 {
            line-height: 1;
            margin: 0;
            font-size: 1.7rem;
        }
        h2 {
            font-size: 1rem;
            font-weight: 300;
            //text-transform: uppercase;
            color: $color_grey_dark;
            margin-top: 5px;
        }
        .read-more {
            text-align: right;
            a {
                color: $color_prime;
                display: inline-block;
                position: relative;
                &:after {
                    content: '\f061';
                    font-family: FontAwesome;
                    margin-left: -10px;
                    opacity: 0;
                    vertical-align: middle;
                    transition: margin 0.3s, opacity 0.3s;
                }

                &:hover:after {
                    margin-left: 5px;
                    opacity: 1;
                }
            }
        }
    }
    p {
        position: relative;
        margin: 1rem 0 0;
        &:first-of-type {
            margin-top: 1.25rem;
            &:before {
                content: '';
                position: absolute;
                height: 5px;
                background: $color_prime;
                width: 35px;
                top: -0.75rem;
                border-radius: 3px;
            }
        }
    }
    &:hover {
        .details {
            left: 0%;
        }
    }

    @media (min-width: 640px) {
        flex-direction: column;
        //max-width: 700px;
        .meta {
            flex-basis: 80%;
            height: auto;
        }
        .description {
            flex-basis: 20%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &:before {
                transform: skewX(-3deg);
                content: '';
                background: #fff;
                width: 30px;
                position: absolute;
                left: -10px;
                top: 0;
                bottom: 0;
                z-index: -1;
            }
        }
        &.alt {
            flex-direction: row-reverse;
            .description {
                &:before {
                    left: inherit;
                    right: -10px;
                    transform: skew(3deg);
                }
            }
            .details {
                padding-left: 25px;
            }
        }
    }
}
</style>