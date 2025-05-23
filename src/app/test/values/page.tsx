'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MultiSelectQuestion } from '@/components/test/MultiSelectQuestion'
import { TestNavigation } from '@/components/test/TestNavigation'
import { TestStore } from '@/lib/testStore'
import { getModuleById, getNextModule } from '@/data/questions'
import { ROUTES } from '@/lib/constants'
import type { MultiSelectQuestion as MultiSelectQuestionType } from '@/types/test'

export default function ValuesTestPage() {
  const router = useRouter()
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Get the values module
  const valuesModule = getModuleById('values')
  const question = valuesModule?.questions[0] as MultiSelectQuestionType

  useEffect(() => {
    // Initialize test store and load existing answers
    const testStore = TestStore.getInstance()
    
    let session = testStore.getCurrentSession()
    if (!session) {
      session = testStore.initializeSession()
    }

    // Load existing answer if any
    const existingAnswer = testStore.getAnswer('values-1')
    if (existingAnswer && Array.isArray(existingAnswer)) {
      setSelectedValues(existingAnswer)
    }
  }, [])

  const handleValuesChange = (values: string[]) => {
    setSelectedValues(values)
    
    // Save to store
    const testStore = TestStore.getInstance()
    testStore.updateAnswer('values-1', values)
  }

  const handleNext = async () => {
    if (selectedValues.length === 0) {
      alert('Lütfen en az bir değer seçiniz.')
      return
    }

    setIsLoading(true)

    try {
      const testStore = TestStore.getInstance()
      
      // Move to next module
      const nextModuleId = testStore.nextModule()
      
      if (nextModuleId) {
        // Navigate to next module
        switch (nextModuleId) {
          case 'thinking-style':
            router.push(ROUTES.TEST.THINKING)
            break
          case 'work-style':
            router.push(ROUTES.TEST.WORK_STYLE)
            break
          case 'communication':
            router.push(ROUTES.TEST.COMMUNICATION)
            break
          case 'motivation':
            router.push(ROUTES.TEST.MOTIVATION)
            break
          case 'skills':
            router.push(ROUTES.TEST.SKILLS)
            break
          case 'lifestyle':
            router.push(ROUTES.TEST.LIFESTYLE)
            break
          case 'mbti-ei':
            router.push(ROUTES.TEST.MBTI_EI)
            break
          case 'mbti-sn':
            router.push(ROUTES.TEST.MBTI_SN)
            break
          case 'mbti-tf':
            router.push(ROUTES.TEST.MBTI_TF)
            break
          case 'mbti-jp':
            router.push(ROUTES.TEST.MBTI_JP)
            break
          case 'clinical-preferences':
            router.push(ROUTES.TEST.CLINICAL)
            break
          default:
            router.push(ROUTES.PROCESSING)
        }
      } else {
        // End of test
        router.push(ROUTES.PROCESSING)
      }
    } catch (error) {
      console.error('Navigation error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    // Since this is the first module, go back to welcome
    router.push(ROUTES.TEST.WELCOME)
  }

  if (!question) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Soru yüklenirken hata oluştu.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Modül 1 / 12</span>
          <span>Değerler</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
              1
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {valuesModule?.title}
              </h1>
              <p className="text-sm text-gray-600">
                {valuesModule?.description}
              </p>
            </div>
          </div>
        </div>

        <MultiSelectQuestion
          question={question}
          value={selectedValues}
          onChange={handleValuesChange}
        />
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-blue-900 mb-2">💡 İpucu</h3>
        <p className="text-blue-800 text-sm">
          Seçimlerinizi yaparken kendinizi en iyi tanımlayan değerleri düşünün. 
          İdeal iş hayatınızda hangi faktörler sizin için öncelikli olurdu?
        </p>
      </div>

      {/* Navigation */}
      <TestNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={selectedValues.length > 0}
        canGoPrevious={true}
        isFirstModule={true}
        isLastModule={false}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-gray-700">Sonraki modül yükleniyor...</span>
          </div>
        </div>
      )}
    </div>
  )
} 