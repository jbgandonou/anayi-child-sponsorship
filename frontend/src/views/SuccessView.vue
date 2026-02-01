<template>
  <div class="container">
    <header class="header">
      <div class="logo">
        <img src="@/assets/anayi-logo.jpg" alt="Anayi Logo" class="logo-image">
       
      </div>
    </header>
    <main class="main">
      <div class="card">
        <div class="icon">✅</div>
        <h1>Soumission Réussie!</h1>
        <p>Le profil de l'enfant a été enregistré.</p>
        <div class="summary">
          <h3>Résumé</h3>
          <p><strong>Nom:</strong> {{ formData.fullName }}</p>
          <p><strong>Genre:</strong> {{ formData.gender }}</p>
          <p><strong>Date naissance:</strong> {{ formData.dateOfBirth }}</p>
          <p><strong>Village:</strong> {{ formData.currentVillage }}</p>
          <p><strong>École:</strong> {{ formData.school }}</p>
          <p><strong>Volontaire:</strong> {{ formData.volunteerName }}</p>
        </div>
        <div class="actions">
          <button @click="generatePDF" class="btn primary">📄 Télécharger PDF</button>
          <button @click="reset" class="btn">Nouveau</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/formStore'
import { storeToRefs } from 'pinia'
const router = useRouter()
const store = useFormStore()
const { formData } = storeToRefs(store)
function reset() {
  store.resetForm()
  router.push('/')
}
function generatePDF() {
  import('jspdf').then(({ default: jsPDF }) => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text('Résumé Enfant', 20, 20)
    doc.setFontSize(12)
    let y = 40
    const add = (l, v) => { doc.text(l + ': ' + (v || 'N/A'), 20, y); y += 10 }
    add('Nom', formData.value.fullName)
    add('Genre', formData.value.gender)
    add('Date naissance', formData.value.dateOfBirth)
    add('Village', formData.value.currentVillage)
    add('École', formData.value.school)
    add('Volontaire', formData.value.volunteerName)
    doc.save('enfant-' + formData.value.fullName + '.pdf')
  })
}
</script>

<style scoped>
.container{min-height:100vh;background:#f5f7fa;display:flex;flex-direction:column}
.header{background:#fff;padding:1rem 2rem;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
.logo{display:flex;align-items:center;gap:0.5rem;font-size:1.5rem;font-weight:700}
.logo-image{height:32px;width:auto;border-radius:4px}
.heart{color:#FF6B35}
.main{flex:1;display:flex;align-items:center;justify-content:center;padding:2rem}
.card{background:#fff;border-radius:12px;padding:3rem;max-width:600px;text-align:center;box-shadow:0 4px 6px rgba(0,0,0,0.1)}
.icon{font-size:5rem;margin-bottom:1.5rem}
h1{font-size:1.75rem;margin-bottom:0.75rem}
p{color:#718096;margin-bottom:2rem}
.summary{background:#f7fafc;padding:1.5rem;border-radius:8px;text-align:left;margin-bottom:2rem}
.summary h3{margin-bottom:1rem}
.summary p{margin-bottom:0.5rem;color:#2d3748}
.actions{display:flex;gap:1rem;justify-content:center}
.btn{padding:0.75rem 1.5rem;border:none;border-radius:8px;font-weight:600;cursor:pointer;background:#e2e8f0;color:#2d3748}
.primary{background:#FF6B35;color:#fff}
</style>
