<template>
  <div class="article-card">
    <router-link :to="'/article/' + article.id" class="card">
      <div class="thumb" :style="{
        'background-image': `url(${hero.url})`,
      }">
        <div class="common">
          <i v-if="article.attributes.Base" class="fa-solid fa-thumbtack p-2 m-2" style="
            background: rgba(0,0,0,0.2);
            border-radius: 18%;"></i>
        </div>
      </div>
      <article>
        <h1>{{article.attributes.Title}}</h1>
        <span class="date-tag">
          <span>{{new Date(article.attributes.publishedAt).toLocaleDateString('uk', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"}) }}</span>
          <div>
            <Badge v-for="tag in article.attributes.tags.data" :key="tag.id" :tag="tag.attributes">
            </Badge>
          </div>
        </span>
      </article>
    </router-link>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import Article from '../api/models/article';
import type { PropType } from 'vue'
import Badge from './Badge.vue';

export default defineComponent({
  components: {
    Badge,
  },
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(props) {
      const article = ref(props.article);
      const hero = article.value.attributes.Hero.data.attributes.formats.large || article.value.attributes.Hero.data.attributes.formats.medium
                || article.value.attributes.Hero.data.attributes.formats.small || article.value.attributes.Hero.data.attributes.formats.thumbnail;

      return {
        article,
        hero,
      }
  },
})
</script>

<style lang="scss" scoped>
.date-tag {
  display: inline-flex;
  flex-flow: row;
  align-content: space-between;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
}
.article-card {
  width: 100%;
  height: 100%;
}
.card {
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  // sets up hover state
  position: relative;
  top: 0;
  transition: all .1s ease-in;
    
  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }
  
  article {
    padding: 20px;
    flex: 1;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  h1 {
    font-size: 20px;
    margin: 0;
    color: #333;
  }
  
  p {
    flex: 1;
    line-height: 1.4;
  }
  
  span {
    font-size: 12px;
    font-weight: bold;
    color: #999;
    text-transform: uppercase;
    letter-spacing: .05em;
    margin: 2em 0 0 0;
  }
  
  .thumb {
    min-height: 30vh;
    background-size: cover;
    background-position: center center;
    
    .common {
      display: inline-flex;
      flex-flow: row;
      align-content: space-between;
      align-items: baseline;
      justify-content: space-between;
      width: 100%;

      span {
        padding: 4px;
      }
    }
  }
}

</style>