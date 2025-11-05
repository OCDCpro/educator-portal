---
title: OCDCpro Educator Portal Overview
---

# Overview

The OCDCpro Educator Portal is designed to support educators in implementing chip design challenges in their classrooms. It provides a resources, including references to teaching materials, guidelines, and tools to help educators create engaging and effective learning experiences for their students.

## Goals

- Provide educators with a centralized platform to understand the didactics of chip design challenges.
- Ease the entry into the design flow if you are new to it.
- Offer easy access to teaching materials and resources.

## Your journey to the course

<script setup>
import { ref } from "vue";
import MarkdownIt from "markdown-it";

const events = ref([
    { title: 'Jump right in', text: 'To get you started, our [Handbook](/handbook) contains a chapter on didactic methods and course types that help you understanding the differences and implications of variants.', link: '/handbook/didactic-methods-and-course-types', video: "https://youtube.com" },
    { title: 'Understand the flow', text: 'Familiarize yourself with the overall flow of the open source chip design flow. The [Handbook](/handbook) provides a comprehensive overview, and can be used by you and your students as a reference for learning and teaching.', link: '/handbook', video: "https://youtube.com" },
    { title: 'Get and give an overview', text: 'Ensure that you and your students have a solid understanding of the fundamentals. The [overview slides](/overview-slides) provide a top-down explanation of the steps of the chip design from design entry to implementation. You can use them here or download and modify to your needs.', link: '/overview-slides', video: "https://youtube.com" },
    { title: 'Prepare your materials', text: 'Open chip design challenges are different from other other courses in that they are more focused on hands-on, practical experience. Depending on your specific course setting, our materials list can be filtered to provide a good starting point for your course.', link: '/materials', video: "https://youtube.com", video: "https://youtube.com" }
]);

const md = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true
});

const renderMd = (s) => md.render(s || "");

</script>

<div class="card">
    <PrimeTimeline :value="events" align="alternate">
        <template #content="slotProps">
            <PrimeCard class="mt-4">
            <template #title>
                {{ slotProps.item.title }}
            </template>
            <template #content>
                <div v-html="renderMd(slotProps.item.text)"></div>
                <a v-if="slotProps.item.video" :href="slotProps.item.video" target="_blank" rel="noopener noreferrer">
                  <PrimeButton label="Watch video" icon="pi pi-video" severity="secondary" text />
                </a>
                <a v-if="slotProps.item.link" :href="slotProps.item.link">
                  <PrimeButton label="Read more" icon="pi pi-book" severity="secondary" text />
                </a>
            </template>
            </PrimeCard>
        </template>
    </PrimeTimeline>
</div>