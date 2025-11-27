<template>
  <div class="materials-page">
    <h1>Find Materials</h1>

    <!-- Multi-Step Form -->
    <div v-if="currentStep < 4" class="form-container">
      <div class="step-indicator">
        <div v-for="(_, idx) in 4" :key="idx" :class="['step-dot', { active: idx === currentStep, completed: idx < currentStep }]">
          {{ idx + 1 }}
        </div>
      </div>

      <!-- Step 1: Audience -->
      <div v-if="currentStep === 0" class="step">
        <h2>What is the target audience?</h2>
        <div v-if="audienceOptions.length === 0" class="no-options">No audience options available</div>
        <div v-else class="radio-group">
          <label v-for="opt in audienceOptions" :key="opt.value" class="radio-option">
            <input 
              type="radio" 
              name="audience"
              :value="opt.value"
              :checked="formData.audience === opt.value"
              @change="formData.audience = opt.value"
            />
            <span class="radio-label">{{ opt.label }}</span>
          </label>
        </div>
      </div>

      <!-- Step 2: Level -->
      <div v-if="currentStep === 1" class="step">
        <h2>What is the competency level?</h2>
        <div v-if="levelOptions.length === 0" class="no-options">No level options available</div>
        <div v-else class="radio-group">
          <label v-for="opt in levelOptions" :key="opt.value" class="radio-option">
            <input 
              type="radio" 
              name="level"
              :value="opt.value"
              :checked="formData.level === opt.value"
              @change="formData.level = opt.value"
            />
            <span class="radio-label">{{ opt.label }}<br/>{{ opt.text }}</span>
          </label>
        </div>
      </div>

      <!-- Step 3: Type -->
      <div v-if="currentStep === 2" class="step">
        <h2>What kind of course are you planning?</h2>
        <div v-if="typeOptions.length === 0" class="no-options">No type options available</div>
        <div v-else class="radio-group">
          <label v-for="opt in typeOptions" :key="opt.value" class="radio-option">
            <input 
              type="radio" 
              name="type"
              :value="opt.value"
              :checked="formData.type === opt.value"
              @change="formData.type = opt.value"
            />
            <span class="radio-label">{{ opt.label }}<br/>{{ opt.text }}</span>
          </label>
        </div>
      </div>

      <!-- Navigation -->
      <div class="button-group">
        <button v-if="currentStep > 0" class="btn btn-secondary" @click="previousStep">← Back</button>
        <button class="btn btn-primary" @click="nextStep" :disabled="!isStepValid">
          Next →
        </button>
      </div>
    </div>

    <!-- Step 4: Results -->
    <div v-if="currentStep === 3" class="results-container">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import collection from './ttt-materials/materials/collection.json'

// Normalize data
const items = collection.map(it => ({
  title: it.title || 'Untitled',
  description: it.description || '',
  url: it.url || '#',
  type: it.type || '',
  audience: Array.isArray(it.audience) ? it.audience : (it.audience ? [it.audience] : []),
  topics: Array.isArray(it.topics) ? it.topics : (it.topics ? [it.topics] : []),
  category: Array.isArray(it.category) ? it.category : (it.category ? [it.category] : []),
  domain: Array.isArray(it.domain) ? it.domain : (it.domain ? [it.domain] : []),
  workflow_stage: Array.isArray(it.workflow_stage) ? it.workflow_stage : (it.workflow_stage ? [it.workflow_stage] : []),
  format: Array.isArray(it.format) ? it.format : (it.format ? [it.format] : [])
}))

console.log('Loaded items:', items.length, items)

const audienceOptions = computed(() => {
  const set = new Set()
  set.add({value: "b12", label: "Bachelor Students, early semesters"})
  set.add({value: "b34", label: "Bachelor Students, late semesters"})
  set.add({value: "master", label: "Master Students"})
  set.add({value: "phd", label: "PhD Students"})
  set.add({value: "industry", label: "Professionals"})  
  return Array.from(set)
})

const levelOptions = computed(() => {
  const set = new Set()
  set.add({value: "beginner", label: "Beginner", text: "Students have no prior exposure to the topic."})
  set.add({value: "know", label: "Know", text: "Students are familiar with the theoretical concepts, but limited practical experience."})
  set.add({value: "do", label: "Do", text: "Students have hands-on experience, but limited theoretical background."})
  set.add({value: "balanced", label: "Balanced", text: "Students have an even mix of theoretical knowledge and practical skills."})
  return Array.from(set)
})

const typeOptions = computed(() => {
  const set = new Set()
  set.add({value: "sem", label: "Semester course", text: "Course spans an entire semester with regular sessions."})
  set.add({value: "block", label: "Block course", text: "Course is conducted in intensive blocks over a short period."})
  return Array.from(set)
})

// Form state - use reactive object properly
const formData = ref({
  audience: '',
  level: '',
  type: ''
})

// Form state
const currentStep = ref(0)

// Validate current step
const isStepValid = computed(() => {
  let valid = false
  
  if (currentStep.value === 0) {
    valid = formData.value.audience !== ''
  } else if (currentStep.value === 1) {
    valid = formData.value.level !== ''
  } else if (currentStep.value === 2) {
    valid = formData.value.type !== ''
  } else {
    valid = true // Step 3 is always valid
  }
  
  console.log(`Step ${currentStep.value} valid:`, valid, `(audience="${formData.value.audience}", level="${formData.value.level}", type="${formData.value.type}")`)
  return valid
})


// Navigation handlers
const nextStep = () => {
  console.log('=== nextStep clicked ===')
  console.log('currentStep:', currentStep.value)
  console.log('formData:', formData.value)
  console.log('isStepValid:', isStepValid.value)
  console.log('currentStep < 3:', currentStep.value < 3)
  
  if (isStepValid.value && currentStep.value < 3) {
    currentStep.value++
    console.log('✓ Moved to step:', currentStep.value)
  } else {
    console.log('✗ Cannot move: isStepValid=', isStepValid.value, 'currentStep=', currentStep.value)
  }
}

const previousStep = () => {
  console.log('previousStep clicked')
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const restartForm = () => {
  console.log('Restarting form')
  currentStep.value = 0
  formData.value = { audience: '', level: '', type: '' }
}
</script>

<style scoped>
.materials-page {
  padding-bottom: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.form-container {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
}

.step-indicator {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.step-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  color: var(--vp-c-text-2);
}

.step-dot.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.step-dot.completed {
  background: var(--vp-c-green);
  color: white;
  border-color: var(--vp-c-green);
}

.step {
  min-height: 300px;
}

.step h2 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.no-options {
  padding: 2rem;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-option:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.radio-option input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--vp-c-brand);
}

.radio-option input[type="radio"]:checked ~ .radio-label {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.radio-label {
  font-size: 1rem;
  user-select: none;
  flex: 1;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.results-container {
  margin: 2rem 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.results-header p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-2);
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.materials-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg);
}

.materials-table thead {
  background: var(--vp-c-bg-soft);
  border-bottom: 2px solid var(--vp-c-divider);
}

.materials-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  letter-spacing: 0.5px;
}

.materials-table tbody tr {
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background-color 0.2s ease;
}

.materials-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.materials-table td {
  padding: 1rem;
  vertical-align: top;
}

.title-cell {
  max-width: 300px;
}

.title-cell a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.title-cell a:hover {
  text-decoration: underline;
}

.type-cell {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  text-transform: capitalize;
}

.tags-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
}

.tag-info {
  background: #e0f2fe;
  color: #0369a1;
}

.tag-success {
  background: #dcfce7;
  color: #166534;
}

.tag-warning {
  background: #fef3c7;
  color: #92400e;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }

  .step-indicator {
    gap: 0.5rem;
  }

  .step-dot {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .materials-table {
    font-size: 0.9rem;
  }

  .materials-table th,
  .materials-table td {
    padding: 0.75rem 0.5rem;
  }
}
</style>