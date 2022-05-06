<template>
    <span :class="getTagClass">
        {{ tag.Name }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TagsAttributes } from '../api/models/article'
import type { PropType } from 'vue'

export default defineComponent({
    props: {
        tag: {
            type: Object as PropType<TagsAttributes>,
            required: true,
        },
    },
    computed: {
        getTagClass() {
            let color = this.tag.Color

            /*let bg = `bg-${color}-100`
            let text = `text-${color}-800`
            let dBg = `dark:bg-${color}-200`
            let dText = `dark:text-${color}-800`

            result[bg] = true
            result[text] = true
            result[dBg] = true
            result[dText] = true*/
            let result = {}
            result['tag'] = true;
            result[color] = true;

            //result['text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'] = true

            return result
        },
    },
})
</script>

<style lang="scss" scoped>
.tag {
    margin: 2px !important;
    padding: 4px 10px;
    color: #fff !important;
    
    border-radius: 6px;
    background: #999;
    font-size: 80%;
    font-family: sans-serif;
    text-decoration: none;
    text-transform: uppercase;
}

a:hover {
  text-decoration: underline;
}

.yellow {
    background-color: goldenrod;
}

.blue {
    background-color: royalblue;
}

.green {
    background-color: seagreen;
}

.red {
    background-color: #df2d4f;
}
</style>