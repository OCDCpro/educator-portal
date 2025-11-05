<template>
    <section>
        <section id="intro-to-slides" class="title-slide slide level2">
            <h1>Overview Slides</h1>
            <p>This is the online view of the slide material we prepared to help you introduce chip design and link this to the open source tools.</p>
            <p>The slides are built written in Markdown and you can reuse them as needed (<a href="https://github.com/hm-aemy/librelane-materials">Learn more</a>).</p>
            <p>This view is built with <a href="https://revealjs.com/">Reveal.js</a>, you navigate the chapters with left-right and inside the chapters with up-down arrow keys.</p>
            <p>Speaker notes are available that provide more details and link to the <a :href="`${page.base || '/'}handbook/`">handbook</a>.</p>
        </section>
    </section>
</template>

<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>