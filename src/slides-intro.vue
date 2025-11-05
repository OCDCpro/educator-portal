<template>
    <section>
        <section id="intro-to-slides" class="title-slide slide level2">
            <h1>Overview Slides</h1>
            <p>This is the online view of the slide material we prepared to help you introduce chip design and link this to the open source tools.</p>
            <p>This view is built with <a href="https://revealjs.com/">Reveal.js</a>, you navigate the chapters with left-right and inside the chapters with up-down arrow keys.</p>
            <p>Press down to learn more about this slide deck.</p>
        </section>
        <section id="intro-to-slides" class="title-slide slide level2">
            <p>The slides are built written in Markdown and you can reuse them as needed (<a href="https://github.com/hm-aemy/librelane-materials">Learn more</a>).</p>
            <p>This gives you the freedom to generate fancy javascript-based presentations, LateX beamer slides or any other output format you need.</p>
            <p>You can also just take parts of it, recombine and adapt to your own needs.</p>
        </section>
        <section id="intro-to-slides" class="title-slide slide level2">
            <p>Speaker notes are available that provide more details and link to the <a :href="`${page.base || '/'}handbook/`">handbook</a>.</p>
            <p>Those are references here to link to the handbook, which provides more details on each topic.</p>
            <p>Press right arrow to start the presentation from the beginning.</p>
            <aside class="notes">
            <p>This is where you can find more details and links.</p>
            </aside>
        </section>
    </section>
</template>

<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>