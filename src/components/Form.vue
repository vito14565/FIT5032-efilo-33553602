<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <!-- username + password -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
              />
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
            </div>
          </div>

          <!-- checkbox + gender -->
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" class="form-select" v-model="formData.gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
            ></textarea>
          </div>

          <!-- buttons -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  password: '',
  isAustralian: false,
  gender: 'female',
  reason: ''
})

function submitForm() {
  
  console.log('Submitted:', JSON.parse(JSON.stringify(formData)))
  alert('Form submitted!')
}

function clearForm() {
  formData.username = ''
  formData.password = ''
  formData.isAustralian = false
  formData.gender = 'female'
  formData.reason = ''
}
</script>