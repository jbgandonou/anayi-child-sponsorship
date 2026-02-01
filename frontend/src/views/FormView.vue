<template>
  <div class="page-container">
    <header class="header">
      <div class="logo">
        <img src="@/assets/anayi-logo.jpg" alt="Anayi Logo" class="logo-image">
       
      </div>
      <div class="header-right">
        <span class="portal-badge">STAFF PORTAL</span>
        <div class="user-info">
          <span class="user-name">{{ user?.email || 'Utilisateur' }}</span>
          <span class="user-role">Field Coordinator</span>
        </div>
        <div class="user-avatar">{{ user?.email?.charAt(0).toUpperCase() || 'U' }}</div>
        <button @click="logout" class="logout-btn">Se déconnecter</button>
      </div>
    </header>

    <main class="main-content">
      <div class="form-card">
        <div class="form-header">
          <h1 class="form-title">New Child Intake</h1>
          <p class="form-subtitle">Complete the form below to register a new child for sponsorship.</p>
          <div v-if="currentDraft" class="draft-badge">
            <span class="draft-label">Draft ID:</span>
            <span class="draft-id">#{{ currentDraft.id }}</span>
          </div>
        </div>

        <!-- Progress Steps -->
        <div class="progress-container">
          <div class="progress-steps">
            <div v-for="step in steps" :key="step.number" 
                 :class="['step-item', { active: currentStep >= step.number }]"
                 @click="goToStep(step.number)">
              <div class="step-circle">{{ step.number }}</div>
              <div class="step-label">{{ step.label }}</div>
            </div>
          </div>
        </div>

        <div v-if="submitError" class="alert alert-error">⚠️ {{ submitError }}</div>

        <!-- Step 1 -->
        <div v-show="currentStep === 1" class="form-section">
          <div class="section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#2D3748"/></svg>
            <h2 class="section-title">Personal Information</h2>
          </div>
          <div class="form-group">
            <label class="form-label required">Full Name</label>
            <input v-model="formData.fullName" type="text" class="form-control" placeholder="e.g. Samuel Kalu">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Date of Birth</label>
              <input v-model="formData.dateOfBirth" type="date" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label required">Gender</label>
              <select v-model="formData.gender" class="form-control">
                <option value="">Select gender</option>
                <option value="Masculin">Male</option>
                <option value="Féminin">Female</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Birth Certificate / Proof of Age</label>
            <div class="file-upload-area" @click="$refs.birthCertInput.click()">
              <input type="file" ref="birthCertInput" @change="handleFile($event, 'birthCertificate')" accept=".pdf,.jpg,.jpeg,.png" style="display:none">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="#CBD5E0"/></svg>
              <p v-if="!formData.birthCertificate">Upload a file or drag and drop</p>
              <p v-else class="uploaded">✓ File uploaded</p>
              <span class="upload-hint">PNG, JPG, PDF up to 5MB</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label required">Place of Birth</label>
            <input v-model="formData.placeOfBirth" type="text" class="form-control" placeholder="City, Region">
          </div>
          <div class="form-group">
            <label class="form-label required">Current Village of Residence</label>
            <input v-model="formData.currentVillage" type="text" class="form-control" placeholder="Village name">
          </div>
          <div class="form-group">
            <label class="form-label required">Nationality</label>
            <select v-model="formData.nationality" class="form-control">
              <option value="">Select nationality</option>
              <option value="Béninoise">Béninoise</option>
              <option value="Nigériane">Nigériane</option>
              <option value="Togolaise">Togolaise</option>
              <option value="Autres">Other</option>
            </select>
          </div>
          <div v-if="formData.nationality==='Autres'" class="form-group">
            <label class="form-label required">Please Specify</label>
            <input v-model="formData.otherNationality" type="text" class="form-control" placeholder="Specify nationality">
          </div>
        </div>

        <!-- Step 2 -->
        <div v-show="currentStep === 2" class="form-section">
          <div class="section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z" fill="#2D3748"/></svg>
            <h2 class="section-title">Family Background</h2>
          </div>
          <div class="form-group">
            <label class="form-label required">Father's Status</label>
            <select v-model="formData.fatherStatus" class="form-control">
              <option value="">Select status</option>
              <option value="Alive">Alive</option>
              <option value="Deceased">Deceased</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Mother's Status</label>
            <select v-model="formData.motherStatus" class="form-control">
              <option value="">Select status</option>
              <option value="Alive">Alive</option>
              <option value="Deceased">Deceased</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Family Status</label>
            <div class="radio-group">
              <label v-for="st in ['Orphelin de père','Orphelin de mère','Des deux','Enfant vulnérable','Enfant vivant avec les parents','Autres']" :key="st" class="radio-label">
                <input type="radio" v-model="formData.familyStatus" :value="st">
                <span>{{ st }}</span>
              </label>
            </div>
          </div>
          <div v-if="formData.familyStatus==='Autres'" class="form-group">
            <label class="form-label required">Please Specify</label>
            <input v-model="formData.otherFamilyStatus" type="text" class="form-control">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Annual Household Income (USD)</label>
              <div class="input-prefix-group">
                <span class="prefix">$</span>
                <input v-model="formData.householdIncome" type="number" class="form-control with-prefix" placeholder="0.00">
                <span class="suffix">USD</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label required">Number of Siblings</label>
              <input v-model.number="formData.numberOfSiblings" type="number" class="form-control" placeholder="0" min="0">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Guardian / Family Notes</label>
            <textarea v-model="formData.familyNotes" class="form-control" rows="4" placeholder="Additional information..."></textarea>
          </div>
          <h3 class="subsection-title">Living Conditions</h3>
          <div class="form-group">
            <label class="form-label required">Type of Housing</label>
            <div class="radio-group">
              <label v-for="ht in ['En dur','En matériaux précaires','Sans abri fixe','Autres']" :key="ht" class="radio-label">
                <input type="radio" v-model="formData.housingType" :value="ht">
                <span>{{ ht }}</span>
              </label>
            </div>
          </div>
          <div v-if="formData.housingType==='Autres'" class="form-group">
            <label class="form-label required">Please Specify</label>
            <input v-model="formData.otherHousingType" type="text" class="form-control">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Access to Drinking Water?</label>
              <select v-model="formData.accessToWater" class="form-control">
                <option value="">Select</option>
                <option value="OUI">Yes</option>
                <option value="NON">No</option>
                <option value="On ne sait pas">Unknown</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label required">Access to Electricity?</label>
              <select v-model="formData.accessToElectricity" class="form-control">
                <option value="">Select</option>
                <option value="OUI">Yes</option>
                <option value="NON">No</option>
                <option value="On ne sait pas">Unknown</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label required">Sufficient Food?</label>
            <select v-model="formData.sufficientFood" class="form-control">
              <option value="">Select</option>
              <option value="OUI">Yes</option>
              <option value="NON">No</option>
              <option value="On ne sait pas">Unknown</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Guardian Activity Applicable?</label>
            <select v-model="formData.guardianActivity" class="form-control">
              <option value="">Select</option>
              <option value="OUI">Yes</option>
              <option value="NON">No</option>
              <option value="On ne sait pas">Unknown</option>
            </select>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-show="currentStep === 3" class="form-section">
          <div class="section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#2D3748"/></svg>
            <h2 class="section-title">Education & Health</h2>
          </div>
          <h3 class="subsection-title">Education</h3>
          <div class="form-group">
            <label class="form-label required">School Attended</label>
            <input v-model="formData.school" type="text" class="form-control" placeholder="Name of school">
          </div>
          <div class="form-group">
            <label class="form-label required">Current Level/Grade</label>
            <select v-model="formData.currentLevel" class="form-control">
              <option value="">Select level</option>
              <option v-for="l in ['CI','CP','CE1','CE2','CM1','CM2','Autres']" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div v-if="formData.currentLevel==='Autres'" class="form-group">
            <label class="form-label required">Please Specify</label>
            <input v-model="formData.otherLevel" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label required">Attendance Frequency</label>
            <select v-model="formData.attendance" class="form-control">
              <option value="">Select frequency</option>
              <option value="Régulière">Regular</option>
              <option value="Irrégulière">Irregular</option>
              <option value="Non scolarisée">Not enrolled</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Identified School Needs</label>
            <div class="checkbox-group">
              <label v-for="n in ['Frais','Fournitures','Uniformes','Accompagnement scolaire','Autres']" :key="n" class="checkbox-label">
                <input type="checkbox" v-model="formData.schoolNeeds" :value="n">
                <span>{{ n }}</span>
              </label>
            </div>
          </div>
          <div v-if="formData.schoolNeeds.includes('Autres')" class="form-group">
            <label class="form-label required">Please Specify</label>
            <input v-model="formData.otherSchoolNeeds" type="text" class="form-control">
          </div>
          <h3 class="subsection-title">Health</h3>
          <div class="form-group">
            <label class="form-label required">General Health Status</label>
            <select v-model="formData.healthStatus" class="form-control">
              <option value="">Select status</option>
              <option value="Bon">Good</option>
              <option value="Suivi médical régulier">Regular medical follow-up</option>
              <option value="Fragile">Fragile</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Main Vaccinations Up to Date?</label>
            <select v-model="formData.vaccinationsUpToDate" class="form-control">
              <option value="">Select</option>
              <option value="OUI">Yes</option>
              <option value="NON">No</option>
              <option value="On ne sait pas">Unknown</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Specific Health Problems (Optional)</label>
            <textarea v-model="formData.specificHealthProblems" class="form-control" rows="4" placeholder="Describe any specific health problems..."></textarea>
          </div>
        </div>

        <!-- Step 4 -->
        <div v-show="currentStep === 4" class="form-section">
          <div class="section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#2D3748"/></svg>
            <h2 class="section-title">Sponsorship & Identification</h2>
          </div>
          <div class="form-group">
            <label class="form-label required">Wishes to be Enrolled in Sponsorship Program?</label>
            <select v-model="formData.wishesToBeSponsored" class="form-control">
              <option value="">Select</option>
              <option value="OUI">Yes</option>
              <option value="NON">No</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Guardian's Consent for Sponsorship</label>
            <select v-model="formData.guardianConsent" class="form-control">
              <option value="">Select</option>
              <option value="Je suis d'accord">I agree</option>
              <option value="Je ne suis pas d'accord">I do not agree</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Comments / Specific Needs for Sponsorship</label>
            <textarea v-model="formData.specificComments" class="form-control" rows="4" placeholder="Any additional comments..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Recent Photo of Child</label>
            <div class="file-upload-area" @click="$refs.recentPhotoInput.click()">
              <input type="file" ref="recentPhotoInput" @change="handleFile($event, 'recentPhoto')" accept="image/*" style="display:none">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="#CBD5E0"/></svg>
              <p v-if="!formData.recentPhoto">Upload a file or drag and drop</p>
              <p v-else class="uploaded">✓ File uploaded</p>
              <span class="upload-hint">PNG, JPG up to 10MB</span>
            </div>
          </div>
          <h3 class="subsection-title">Volunteer Information</h3>
          <div class="form-group">
            <label class="form-label required">Volunteer Name</label>
            <input v-model="formData.volunteerName" type="text" class="form-control" placeholder="Full name">
          </div>
          <div class="form-group">
            <label class="form-label required">Contact (Phone/WhatsApp)</label>
            <input v-model="formData.volunteerContact" type="tel" class="form-control" placeholder="+229 XX XX XX XX">
          </div>
          <div class="form-group">
            <label class="form-label required">Survey Date</label>
            <input v-model="formData.surveyDate" type="date" class="form-control">
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <div class="form-actions-left">
            <button v-if="currentStep > 1" @click="previousStep" :disabled="isSubmitting" class="btn btn-secondary">
              ← Previous
            </button>
          </div>
          <div class="form-actions-center">
            <button @click="saveDraft" :disabled="isSubmitting || draftStore.isLoading" class="btn btn-outline">
              💾 {{ draftStore.isLoading ? 'Sauvegarde...' : 'Enregistrer brouillon' }}
            </button>
          </div>
          <div class="form-actions-right">
            <button v-if="currentStep < 4" @click="nextStep" :disabled="isSubmitting" class="btn btn-primary">
              Next →
            </button>
            <button v-if="currentStep === 4" @click="submit" :disabled="isSubmitting" class="btn btn-success">
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useFormStore } from '@/stores/formStore'
import { useAuthStore } from '@/stores/authStore'
import { useDraftStore } from '@/stores/draftStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useFormStore()
const authStore = useAuthStore()
const draftStore = useDraftStore()
const { formData, currentStep, isSubmitting, submitError } = storeToRefs(store)
const { user } = storeToRefs(authStore)
const { currentDraft } = storeToRefs(draftStore)
const { nextStep, previousStep, goToStep, updateField } = store

const steps = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Family Background' },
  { number: 3, label: 'Education & Health' },
  { number: 4, label: 'Identification' }
]

function handleFile(e, field) {
  const file = e.target.files[0]
  if (file) {
    updateField(field + 'File', file)
    updateField(field, URL.createObjectURL(file))
  }
}

async function submit() {
  if (await store.submitForm()) router.push('/success')
}

async function saveDraft() {
  const success = await draftStore.saveDraft(formData.value, currentStep.value)
  if (success) {
    alert('Brouillon sauvegardé avec succès !')
  } else {
    alert('Erreur lors de la sauvegarde du brouillon')
  }
}

function logout() {
  authStore.logout()
  router.push('/login')
}

// Load drafts on component mount
onMounted(async () => {
  await draftStore.loadDrafts()
  // If there are drafts, load the most recent one
  if (draftStore.drafts.length > 0) {
    const mostRecentDraft = draftStore.drafts[0] // Assuming drafts are ordered by creation date
    await draftStore.loadDraft(mostRecentDraft.id)
    // Restore form data and step
    if (currentDraft.value) {
      Object.keys(currentDraft.value.formData).forEach(key => {
        store.updateField(key, currentDraft.value.formData[key])
      })
      if (currentDraft.value.currentStep) {
        goToStep(currentDraft.value.currentStep)
      }
    }
  }
})
</script>

<style scoped>
* { box-sizing: border-box; }
.page-container { min-height: 100vh; background: #F7FAFC; }
.header { background: #fff; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.logo { display: flex; align-items: center; gap: 0.5rem; }
.logo-image { height: 32px; width: auto; border-radius: 4px; }
.logo-text { font-size: 1.5rem; font-weight: 700; color: #2D3748; }
.header-right { display: flex; align-items: center; gap: 1rem; }
.portal-badge { font-size: 0.75rem; font-weight: 600; color: #718096; letter-spacing: 0.05em; }
.user-info { display: flex; flex-direction: column; align-items: flex-end; }
.user-name { font-size: 0.875rem; font-weight: 600; color: #2D3748; }
.user-role { font-size: 0.75rem; color: #718096; }
.user-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; font-size: 0.875rem; }
.main-content { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
.form-card { background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.form-header { margin-bottom: 2rem; }
.form-title { font-size: 1.75rem; font-weight: 700; color: #1A202C; margin-bottom: 0.5rem; }
.form-subtitle { font-size: 0.875rem; color: #718096; margin-bottom: 1rem; }
.draft-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: #EDF2F7; border-radius: 6px; font-size: 0.8125rem; }
.draft-label { color: #718096; }
.draft-id { color: #2D3748; font-weight: 600; }
.progress-container { margin: 2rem 0; }
.progress-steps { display: flex; justify-content: space-between; position: relative; }
.step-item { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; cursor: pointer; z-index: 2; }
.step-circle { width: 40px; height: 40px; border-radius: 50%; background: #E2E8F0; color: #718096; display: flex; align-items: center; justify-content: center; font-weight: 600; transition: all 0.3s; }
.step-item.active .step-circle { background: #FF6B35; color: #fff; }
.step-label { font-size: 0.8125rem; color: #718096; font-weight: 500; white-space: nowrap; }
.step-item.active .step-label { color: #2D3748; font-weight: 600; }
.alert { padding: 0.875rem 1rem; border-radius: 6px; margin-bottom: 1.5rem; }
.alert-error { background: #FED7D7; color: #C53030; }
.form-section { animation: fadeIn 0.3s; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.section-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 2px solid #E2E8F0; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #2D3748; margin: 0; }
.subsection-title { font-size: 1rem; font-weight: 600; color: #2D3748; margin: 2rem 0 1rem; }
.form-group { margin-bottom: 1.5rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
.form-label { display: block; font-size: 0.875rem; font-weight: 600; color: #2D3748; margin-bottom: 0.5rem; }
.form-label.required::after { content: ' *'; color: #E53E3E; }
.form-control { width: 100%; padding: 0.625rem 0.875rem; border: 1px solid #CBD5E0; border-radius: 6px; font-size: 0.875rem; color: #2D3748; transition: all 0.2s; }
.form-control:focus { outline: none; border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
.form-control::placeholder { color: #A0AEC0; }
.file-upload-area { border: 2px dashed #CBD5E0; border-radius: 8px; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.2s; background: #F7FAFC; }
.file-upload-area:hover { border-color: #FF6B35; background: #FFF5F5; }
.file-upload-area p { margin: 0.75rem 0 0.25rem; font-size: 0.875rem; color: #4A5568; }
.file-upload-area .uploaded { color: #48BB78; font-weight: 600; }
.upload-hint { font-size: 0.75rem; color: #A0AEC0; }
.radio-group, .checkbox-group { display: flex; flex-direction: column; gap: 0.75rem; }
.radio-label, .checkbox-label { display: flex; align-items: center; gap: 0.625rem; cursor: pointer; font-size: 0.875rem; color: #2D3748; }
.radio-label input, .checkbox-label input { width: 18px; height: 18px; cursor: pointer; accent-color: #FF6B35; }
.input-prefix-group { position: relative; display: flex; align-items: center; }
.prefix { position: absolute; left: 0.875rem; color: #718096; font-size: 0.875rem; font-weight: 500; }
.form-control.with-prefix { padding-left: 2rem; padding-right: 4rem; }
.suffix { position: absolute; right: 0.875rem; color: #718096; font-size: 0.75rem; font-weight: 500; }
.form-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #E2E8F0; }
.form-actions-left { display: flex; gap: 0.5rem; }
.form-actions-center { display: flex; justify-content: center; flex: 1; }
.form-actions-right { display: flex; justify-content: flex-end; gap: 0.5rem; }
.btn { padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: #FF6B35; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #E55A2B; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,53,0.3); }
.btn-secondary { background: #E2E8F0; color: #2D3748; }
.btn-secondary:hover:not(:disabled) { background: #CBD5E0; }
.btn-outline { background: transparent; color: #FF6B35; border: 2px solid #FF6B35; }
.btn-outline:hover:not(:disabled) { background: #FF6B35; color: #fff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,53,0.3); }
.logout-btn { background: #E53E3E; color: #fff; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
.logout-btn:hover { background: #C53030; }
.btn-success { background: #48BB78; color: #fff; }
.btn-success:hover:not(:disabled) { background: #38A169; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(72,187,120,0.3); }
@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
  .header { flex-direction: column; gap: 1rem; padding: 1rem; }
  .form-card { padding: 1.5rem 1rem; }
}
</style>
