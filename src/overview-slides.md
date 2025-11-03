---
title: Overview Slides
aside: true
sidebar: false
layout: home
---

<ClientOnly>
  <!-- Reveal.js core styles -->
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@5/dist/reveal.css" />
  <!-- Choose a theme: black, white, league, beige, sky, night, serif, simple, solarized, blood, moon -->
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@5/dist/theme/solarized.css" id="reveal-theme" />

  <div class="slides-wrapper">
    <div class="reveal">
      <div class="slides">
      </div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted, ref } from 'vue'
// Import the markdown as raw text at build-time
// Adjust the relative path if you move this file
// Use an absolute path so Vite resolves from the project src root reliably
import slidesText from '/overview-pres/slides.html?raw'

const mdSection = ref(null)

onMounted(async () => {
  // Dynamically import Reveal only on client to avoid SSR issues
  const Reveal = (await import('reveal.js')).default
  const RevealNotes = (await import('reveal.js/plugin/notes/notes.esm.js')).default

  // Inject the slides HTML into <div class="slides">
  const slidesEl = document.querySelector('.reveal .slides')
  if (slidesEl) {
    slidesEl.innerHTML = slidesText
  }
    const link = document.getElementById('reveal-theme')
    const setTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      link.href = isDark
        ? 'https://unpkg.com/reveal.js@5/dist/theme/moon.css'
        : 'https://unpkg.com/reveal.js@5/dist/theme/solarized.css'
    }
    setTheme()
    new MutationObserver(setTheme).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

const deck = new Reveal(document.querySelector('.reveal'), {
    plugins: [RevealNotes],
    hash: true,
    showNotes: true, 
  })
  await deck.initialize()
})
</script>

<style>
/* Make the slide area fill most of the viewport */
.slides-wrapper {
  margin: 0;
  padding: 0;
}

/* Try to maximize available height within VitePress content area */
.slides-wrapper .reveal {
  height: 50vh;
}

/* Optional: stretch to full width of content column */
.VPDoc .content-container {
  max-width: 100% !important;
}

/* Hide page title for a cleaner slides view */
.VPDoc h1 { display: none; }

.reveal.show-notes .speaker-notes {
    top: 100%;
    left: 0;
    width: 100%;
    height: 30vh;
    border: 0;
}


</style>
