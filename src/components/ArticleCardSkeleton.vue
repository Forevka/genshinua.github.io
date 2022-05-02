<template>
  <div class="card">
    <div class="card__image">
      <Skeletor height="200" />
    </div>

    <div class="card__slim">
      

      <div class="card__meta">
        <h2>
          <Skeletor width="50%" />
        </h2>

        <p>
          <Skeletor width="75%" />
        </p>
      </div>
    </div>

    <div class="card__text">
      <Skeletor v-for="i in 2" :key="i" />
    </div>
  </div>
</template>


<script lang="ts">
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

import { defineComponent } from 'vue'


export default defineComponent({
  components: {
    Skeletor,
  },
})
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  // sets up hover state
  position: relative;
  top: 0;
  transition: all .1s ease-in;
}

.card__image {
  margin-bottom: 12px;
}

.card__slim {
  display: flex;
  margin-bottom: 12px;
}

.card__avatar {
  margin-right: 12px;
}

.card__meta {
  flex-grow: 1;
}

.card__meta p,
.card__meta h2 {
  margin: 0;
}

.card__text {
  margin-bottom: 12px;
}

.card__actions {
  display: flex;
  justify-content: flex-end;
}
</style>
