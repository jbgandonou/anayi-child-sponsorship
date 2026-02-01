import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { childService } from '../services/api'

export const useFormStore = defineStore('form', () => {
  const formData = ref({
    // Informations personnelles
    fullName: '',
    childPhoto: null,
    childPhotoFile: null,
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    currentVillage: '',
    nationality: '',
    otherNationality: '',
    familyStatus: '',
    otherFamilyStatus: '',
    numberOfSiblings: 0,

    // Scolarité
    school: '',
    currentLevel: '',
    otherLevel: '',
    attendance: '',
    schoolNeeds: [],
    otherSchoolNeeds: '',

    // Santé
    healthStatus: '',
    vaccinationsUpToDate: '',
    specificHealthProblems: '',

    // Conditions de vie
    housingType: '',
    otherHousingType: '',
    accessToWater: '',
    accessToElectricity: '',
    sufficientFood: '',
    guardianActivity: '',

    // Parrainage
    wishesToBeSponsored: '',
    guardianConsent: '',
    specificComments: '',

    // Documents
    birthCertificate: null,
    birthCertificateFile: null,
    schoolCertificate: null,
    schoolCertificateFile: null,
    recentPhoto: null,
    recentPhotoFile: null,

    // Informations du volontaire
    volunteerName: '',
    volunteerContact: '',
    surveyDate: ''
  })

  const currentStep = ref(1)
  const isSubmitting = ref(false)
  const submitError = ref(null)
  const submittedChildId = ref(null)

  // Computed
  const isStep1Valid = computed(() => {
    return (
      formData.value.fullName &&
      formData.value.gender &&
      formData.value.dateOfBirth &&
      formData.value.placeOfBirth &&
      formData.value.currentVillage &&
      formData.value.nationality
    )
  })

  const isStep2Valid = computed(() => {
    return (
      formData.value.familyStatus &&
      formData.value.numberOfSiblings !== '' &&
      formData.value.housingType &&
      formData.value.accessToWater &&
      formData.value.accessToElectricity &&
      formData.value.sufficientFood &&
      formData.value.guardianActivity
    )
  })

  const isStep3Valid = computed(() => {
    return (
      formData.value.school &&
      formData.value.currentLevel &&
      formData.value.attendance &&
      formData.value.schoolNeeds.length > 0 &&
      formData.value.healthStatus &&
      formData.value.vaccinationsUpToDate
    )
  })

  const isStep4Valid = computed(() => {
    return (
      formData.value.wishesToBeSponsored &&
      formData.value.guardianConsent &&
      formData.value.volunteerName &&
      formData.value.volunteerContact &&
      formData.value.surveyDate
    )
  })

  // Actions
  function updateField(field, value) {
    formData.value[field] = value
  }

  function nextStep() {
    if (currentStep.value < 4) {
      const validationMap = {
        1: isStep1Valid,
        2: isStep2Valid,
        3: isStep3Valid,
      }

      if (validationMap[currentStep.value]?.value) {
        currentStep.value++
      } else {
        alert('Please fill all required fields before proceeding.')
      }
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function goToStep(step) {
    if (step >= 1 && step <= 4) {
      currentStep.value = step
    }
  }

  async function submitForm() {
    if (!isStep4Valid.value) {
      alert('Please fill all required fields.')
      return false
    }

    isSubmitting.value = true
    submitError.value = null

    try {
      // Upload files first
      const filesToUpload = []
      const fileMapping = {}

      if (formData.value.childPhotoFile) {
        filesToUpload.push(formData.value.childPhotoFile)
        fileMapping['childPhoto'] = filesToUpload.length - 1
      }
      if (formData.value.birthCertificateFile) {
        filesToUpload.push(formData.value.birthCertificateFile)
        fileMapping['birthCertificate'] = filesToUpload.length - 1
      }
      if (formData.value.schoolCertificateFile) {
        filesToUpload.push(formData.value.schoolCertificateFile)
        fileMapping['schoolCertificate'] = filesToUpload.length - 1
      }
      if (formData.value.recentPhotoFile) {
        filesToUpload.push(formData.value.recentPhotoFile)
        fileMapping['recentPhoto'] = filesToUpload.length - 1
      }

      let uploadedFiles = []
      if (filesToUpload.length > 0) {
        const uploadResponse = await childService.uploadFiles(filesToUpload)
        uploadedFiles = uploadResponse.files
      }

      // Prepare data for submission
      const submissionData = {
        fullName: formData.value.fullName,
        gender: formData.value.gender,
        dateOfBirth: formData.value.dateOfBirth,
        placeOfBirth: formData.value.placeOfBirth,
        currentVillage: formData.value.currentVillage,
        nationality: formData.value.nationality,
        otherNationality: formData.value.otherNationality || null,
        familyStatus: formData.value.familyStatus,
        otherFamilyStatus: formData.value.otherFamilyStatus || null,
        numberOfSiblings: parseInt(formData.value.numberOfSiblings) || 0,
        school: formData.value.school,
        currentLevel: formData.value.currentLevel,
        otherLevel: formData.value.otherLevel || null,
        attendance: formData.value.attendance,
        schoolNeeds: formData.value.schoolNeeds,
        otherSchoolNeeds: formData.value.otherSchoolNeeds || null,
        healthStatus: formData.value.healthStatus,
        vaccinationsUpToDate: formData.value.vaccinationsUpToDate,
        specificHealthProblems: formData.value.specificHealthProblems || null,
        housingType: formData.value.housingType,
        otherHousingType: formData.value.otherHousingType || null,
        accessToWater: formData.value.accessToWater,
        accessToElectricity: formData.value.accessToElectricity,
        sufficientFood: formData.value.sufficientFood,
        guardianActivity: formData.value.guardianActivity,
        wishesToBeSponsored: formData.value.wishesToBeSponsored,
        guardianConsent: formData.value.guardianConsent,
        specificComments: formData.value.specificComments || null,
        volunteerName: formData.value.volunteerName,
        volunteerContact: formData.value.volunteerContact,
        surveyDate: formData.value.surveyDate,
      }

      // Add file paths
      if (fileMapping['childPhoto'] !== undefined) {
        submissionData.childPhoto = uploadedFiles[fileMapping['childPhoto']].path
      }
      if (fileMapping['birthCertificate'] !== undefined) {
        submissionData.birthCertificate = uploadedFiles[fileMapping['birthCertificate']].path
      }
      if (fileMapping['schoolCertificate'] !== undefined) {
        submissionData.schoolCertificate = uploadedFiles[fileMapping['schoolCertificate']].path
      }
      if (fileMapping['recentPhoto'] !== undefined) {
        submissionData.recentPhoto = uploadedFiles[fileMapping['recentPhoto']].path
      }

      // Submit the form
      const result = await childService.create(submissionData)
      submittedChildId.value = result.id
      
      isSubmitting.value = false
      return true
    } catch (error) {
      console.error('Submission error:', error)
      submitError.value = error.response?.data?.message || error.message || 'An error occurred'
      isSubmitting.value = false
      return false
    }
  }

  function resetForm() {
    formData.value = {
      fullName: '',
      childPhoto: null,
      childPhotoFile: null,
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      currentVillage: '',
      nationality: '',
      otherNationality: '',
      familyStatus: '',
      otherFamilyStatus: '',
      numberOfSiblings: 0,
      school: '',
      currentLevel: '',
      otherLevel: '',
      attendance: '',
      schoolNeeds: [],
      otherSchoolNeeds: '',
      healthStatus: '',
      vaccinationsUpToDate: '',
      specificHealthProblems: '',
      housingType: '',
      otherHousingType: '',
      accessToWater: '',
      accessToElectricity: '',
      sufficientFood: '',
      guardianActivity: '',
      wishesToBeSponsored: '',
      guardianConsent: '',
      specificComments: '',
      birthCertificate: null,
      birthCertificateFile: null,
      schoolCertificate: null,
      schoolCertificateFile: null,
      recentPhoto: null,
      recentPhotoFile: null,
      volunteerName: '',
      volunteerContact: '',
      surveyDate: ''
    }
    currentStep.value = 1
    isSubmitting.value = false
    submitError.value = null
    submittedChildId.value = null
  }

  return {
    formData,
    currentStep,
    isSubmitting,
    submitError,
    submittedChildId,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    isStep4Valid,
    updateField,
    nextStep,
    previousStep,
    goToStep,
    submitForm,
    resetForm
  }
})
