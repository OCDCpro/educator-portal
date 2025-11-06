<template>
  <div class="materials-page">
    <h1>Start your challenge now</h1>

    <p>Based on your selection, we suggest the following course setup and supplying materials to get started.</p>

    <h2>Your course for the challenge</h2>

    <table>
      <tbody>
        <tr>
          <td><strong>Cohort:</strong></td>
          <td>Bachelor Students, late semesters</td>
        </tr>
        <tr>
          <td><strong>Targeted major:</strong></td>
          <td>Computer Science</td>
        </tr>
        <tr>
          <td><strong>Type of course:</strong></td>
          <td>Block Course</td>
        </tr>
        <tr>
          <td><strong>Competence level:</strong></td>
          <td>Beginner, Intermediate (students have basic knowledge, some might have prior experience in designing a chip)</td>
        </tr>
      </tbody>
    </table>
          
    <h2>Suggested Schedule and Didactic Methods</h2>

    <p>For a block course, we suggest a schedule of two full weeks with a mix of a few impulse sessions. The actual challenge is conducted as a project work spanning the entire duration.</p>

    <p>The method of project-based learning is particularly effective here, as it allows students to apply theoretical knowledge in a practical context. Impulse sessions can be used to introduce key concepts and tools, while the project work encourages collaboration and problem-solving skills.</p>

    <PrimeButton label="Learn more" icon="pi pi-book" severity="secondary" text />

    <h2>Practical Setup</h2>

    TODO

    <h2>Tools</h2>

    Those are tools that students will be using.

    <PrimeDataTable
      :value="filteredTools"
      dataKey="url"
      tableStyle="min-width: 60rem"
      :stripedRows="true"
      :rows="20"
      :paginator="true"
      :rowsPerPageOptions="[10,20,50]"
      responsiveLayout="scroll"
    >
      <PrimeColumn field="title" header="Title" sortable>
        <template #body="{ data }">
          <a :href="data.url" target="_blank" rel="noopener noreferrer">{{ data.title }}</a>
        </template>
      </PrimeColumn>
      <PrimeColumn field="description" header="Description"></PrimeColumn>
    </PrimeDataTable>

    <h2>Materials Collection</h2>

    <h2>Communities and Support</h2>

    <PrimeDataTable
      :value="filteredItems"
      dataKey="url"
      tableStyle="min-width: 60rem"
      :stripedRows="true"
      :rows="20"
      :paginator="true"
      :rowsPerPageOptions="[10,20,50]"
      responsiveLayout="scroll"
    >
      <PrimeColumn field="title" header="Title" sortable>
        <template #body="{ data }">
          <a :href="data.url" target="_blank" rel="noopener noreferrer">{{ data.title }}</a>
        </template>
      </PrimeColumn>
      <PrimeColumn field="type" header="Type" sortable></PrimeColumn>
      <PrimeColumn header="Category">
        <template #body="{ data }">
          <div class="chip-row">
            <Tag v-for="(c, idx) in data.category" :key="idx" :value="c" severity="info" class="mr-2 mb-1" />
          </div>
        </template>
      </PrimeColumn>
      <PrimeColumn header="Domain">
        <template #body="{ data }">
          <div class="chip-row">
            <Tag v-for="(d, idx) in data.domain" :key="idx" :value="d" severity="success" class="mr-2 mb-1" />
          </div>
        </template>
      </PrimeColumn>
      <PrimeColumn header="Workflow Stages">
        <template #body="{ data }">
          <div class="chip-row">
            <Tag v-for="(w, idx) in data.workflow_stage" :key="idx" :value="w" severity="warning" class="mr-2 mb-1" />
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MultiSelect from 'primevue/multiselect'
import Tag from 'primevue/tag'
// DataTable and Column are globally registered in the VitePress theme, but can be used directly in templates

import collection from '../materials/collection.json'

// Normalize data: ensure arrays exist
const items = (collection || []).map((it) => ({
  id: it.id || '',
  title: it.title || '',
  description: it.description || '',
  url: it.url || '#',
  type: it.type || '',
  category: Array.isArray(it.category) ? it.category : (it.category ? [it.category] : []),
  domain: Array.isArray(it.domain) ? it.domain : (it.domain ? [it.domain] : []),
  workflow_stage: Array.isArray(it.workflow_stage) ? it.workflow_stage : (it.workflow_stage ? [it.workflow_stage] : [])
}))

const filteredItems = computed(() => {
  return items
})

const filteredTools = computed(() => {
  return items.filter(it => it.type == 'tool')
})

</script>

<style scoped>
.materials-page {
  padding-bottom: 2rem;
}
.filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0 1.5rem;
}
label {
  font-weight: 600;
}
.clear-btn {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
}
.mr-2 { margin-right: 0.5rem; }
.mb-1 { margin-bottom: 0.25rem; }
.w-full { width: 100%; }
.md\:w-30rem { width: 30rem; }
</style>