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

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
            ></textarea>
            <!-- reason validation will be added next -->
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- Display cards after submission -->
        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem;"
            >
              <div class="card-header">User Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formEl = ref(null)

// Reactive form state
const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

// Errors for Vue validation
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

// Submit with Vue validation for username + password + gender
function submitForm() {
  validateName(true)
  validatePassword(true)
  validateGender(true)

  if (errors.value.username || errors.value.password || errors.value.gender) return

  submittedCards.value.push({ ...formData.value })
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
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275FDA;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item { padding: 10px; }
.text-danger { font-size: 0.9rem; }
</style>