'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LikertQuestionGroup } from '@/components/test/LikertQuestionGroup'
import { TestNavigation } from '@/components/test/TestNavigation'
import { TestStore } from '@/lib/testStore'
import { getModuleById } from '@/data/questions'
import { ROUTES } from '@/lib/constants'
import type { LikertQuestion } from '@/types/test'

export default function WorkStyleTestPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Get the work style module
  const workStyleModule = getModuleById('work-style')
  const questions = workStyleModule?.questions as LikertQuestion[]

  useEffect(() => {
    // Initialize test store and load existing answers
    const testStore = TestStore.getInstance()
    
    let session = testStore.getCurrentSession()
    if (!session) {
      // If no session, redirect to welcome
      router.push(ROUTES.TEST.WELCOME)
      return
    }

    // Load existing answers
    const existingAnswers: Record<string, number | null> = {}
    questions?.forEach((_, index) => {
      const answer = testStore.getAnswer(`work-style-${index + 1}`)
      if (answer !== null) {
        existingAnswers[`question-${index}`] = answer
      }
    })
    setAnswers(existingAnswers)
  }, [questions, router])

  const handleAnswerChange = (questionIndex: number, value: number) => {
    // Update local state
    setAnswers(prev => ({
      ...prev,
      [`question-${questionIndex}`]: value
    }))

    // Save to store
    const testStore = TestStore.getInstance()
    testStore.updateAnswer(`work-style-${questionIndex + 1}`, value)
  }

  const handleNext = async () => {
    // Check if all questions are answered
    const totalQuestions = questions?.length || 0
    const answeredCount = Object.values(answers).filter(v => v !== null).length

    if (answeredCount < totalQuestions) {
      alert('Lütfen tüm soruları cevaplayın.')
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
    const testStore = TestStore.getInstance()
    const prevModuleId = testStore.previousModule()
    
    if (prevModuleId === 'thinking-style') {
      router.push(ROUTES.TEST.THINKING)
    } else if (prevModuleId === 'values') {
      router.push(ROUTES.TEST.VALUES)
    } else {
      router.push(ROUTES.TEST.WELCOME)
    }
  }

  if (!questions) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Sorular yüklenirken hata oluştu.</p>
      </div>
    )
  }

  const totalQuestions = questions.length
  const answeredCount = Object.values(answers).filter(v => v !== null).length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Modül 3 / 12</span>
          <span>{workStyleModule?.title}</span>
        </div>
      </div>

      {/* Module Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
            3
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {workStyleModule?.title}
            </h1>
            <p className="text-gray-600 mt-1">
              {workStyleModule?.description}
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-purple-800 text-sm">
            <strong>Yönerge:</strong> İş hayatındaki tercihleriniz ve çalışma yaklaşımınız hakkındaki ifadeleri değerlendirin.
          </p>
        </div>
      </div>

      {/* Questions */}
      <LikertQuestionGroup
        questions={questions}
        values={answers}
        onChange={handleAnswerChange}
        className="mb-8"
      />

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-orange-900 mb-2">💡 İpucu</h3>
        <p className="text-orange-800 text-sm">
          Bu bölüm ideal çalışma ortamınızı ve meslek tercihinizi belirlemede kritik öneme sahip. 
          Gerçek duygularınızı yansıtın.
        </p>
      </div>

      {/* Navigation */}
      <TestNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={answeredCount === totalQuestions}
        canGoPrevious={true}
        isFirstModule={false}
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