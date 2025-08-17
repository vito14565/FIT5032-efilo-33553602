<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <!-- Form (Vue-driven validation; no HTML built-in validation) -->
        <form ref="formEl" @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- Username -->
            <div class="col-12 col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
            </div>

            <!-- Password -->
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-12 col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
              >
                <option value="" disabled>Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- PrimeVue DataTable -->
        <div class="row mt-5" v-if="submittedCards.length">
          <h3 class="mb-3">Submitted Users</h3>
          <DataTable
            :value="submittedCards"
            dataKey="__rowid"
            :paginator="true"
            :rows="5"
            sortMode="multiple"
            responsiveLayout="scroll"
            class="p-datatable-sm"
          >
            <Column field="username" header="Username" sortable />
            <Column field="password" header="Password" />
            <Column field="isAustralian" header="Australian Resident" sortable>
              <template #body="{ data }">
                {{ data.isAustralian ? 'Yes' : 'No' }}
              </template>
            </Column>
            <Column field="gender" header="Gender" sortable />
            <Column field="reason" header="Reason" style="min-width: 240px" />
          </DataTable>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formEl = ref(null)

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

// Username validation (>= 3 characters)
const validateName = (onBlur = false) => {
  const val = (formData.value.username || '').trim()
  if (val.length < 3) {
    if (onBlur || errors.value.username) {
      errors.value.username = 'Name must be at least 3 characters'
    }
  } else {
    errors.value.username = null
  }
}

// Password validation (>=8 chars, at least one uppercase, one lowercase, one number)
const validatePassword = (onBlur = false) => {
  const val = formData.value.password || ''
  if (val.length < 8) {
    if (onBlur || errors.value.password) {
      errors.value.password = 'Password must be at least 8 characters'
    }
    return
  }
  if (!/[A-Z]/.test(val)) {
    if (onBlur || errors.value.password) {
      errors.value.password = 'Password must contain at least one uppercase letter'
    }
    return
  }
  if (!/[a-z]/.test(val)) {
    if (onBlur || errors.value.password) {
      errors.value.password = 'Password must contain at least one lowercase letter'
    }
    return
  }
  if (!/\d/.test(val)) {
    if (onBlur || errors.value.password) {
      errors.value.password = 'Password must contain at least one number'
    }
    return
  }
  errors.value.password = null
}

// Gender validation (must be selected)
const validateGender = (onBlur = false) => {
  if (!formData.value.gender) {
    if (onBlur || errors.value.gender) {
      errors.value.gender = 'Please select a gender.'
    }
  } else {
    errors.value.gender = null
  }
}

// Reason validation (10–200 characters)
const validateReason = (onBlur = false) => {
  const txt = (formData.value.reason || '').trim()
  if (txt.length < 10) {
    if (onBlur || errors.value.reason) {
      errors.value.reason = 'Reason must be at least 10 characters'
    }
    return
  }
  if (txt.length > 200) {
    if (onBlur || errors.value.reason) {
      errors.value.reason = 'Reason must be less than or equal to 200 characters'
    }
    return
  }
  errors.value.reason = null
}

function submitForm() {
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateReason(true)

  if (errors.value.username || errors.value.password || errors.value.gender || errors.value.reason) return

  const withId = {
    __rowid: (crypto?.randomUUID && crypto.randomUUID()) || Date.now() + Math.random(),
    ...formData.value
  }
  submittedCards.value.push(withId)
  clearForm()
}

function clearForm() {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
  }
  formEl.value?.reset()
}
</script>

<style scoped>
.text-danger { font-size: 0.9rem; }
.p-datatable { width: 100%; }
</style>