<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <!-- Form -->
        <form ref="formEl" @submit.prevent="submitForm">
          <!-- row 1: username | gender -->
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

          <!-- row 2: password | confirm password -->
          <div class="row mb-3">
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

            <div class="col-12 col-md-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger mt-1">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <!-- row 3: resident -->
          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  @change="() => validateResident(false)"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
              <div v-if="errors.resident" class="text-danger mt-1">{{ errors.resident }}</div>
            </div>
          </div>

          <!-- row 4: reason -->
          <div class="row mb-3">
            <div class="col-12">
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
              <div v-else-if="friendHint" class="text-success mt-1">Great to have a friend</div>
            </div>
          </div>

          <!-- row 5: Suburb (改成 v-model 雙向綁定) -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="suburb" class="form-label">Suburb</label>
              <input
                type="text"
                class="form-control"
                id="suburb"
                v-model="formData.suburb"
              />
            </div>
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
            <Column field="suburb" header="Suburb" />
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formEl = ref(null)

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

const friendHint = computed(() =>
  /\bfriend\b/i.test(formData.value.reason || '') && !errors.value.reason
)

/* validation 同前，略... (保持不變) */

function submitForm() {
  // 驗證略...
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
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null,
  }
  formEl.value?.reset()
}
</script>

<style scoped>
.text-danger { font-size: 0.9rem; }
.text-success { font-size: 0.9rem; }
.p-datatable { width: 100%; }
</style>