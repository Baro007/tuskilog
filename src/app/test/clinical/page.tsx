'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BinaryChoiceQuestion } from '@/components/test/BinaryChoiceQuestion'
import { TestNavigation } from '@/components/test/TestNavigation'
import { TestStore } from '@/lib/testStore'
import { getModuleById } from '@/data/questions'
import { ROUTES } from '@/lib/constants'
import type { BinaryQuestion } from '@/types/test'

export default function ClinicalPreferencesTestPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(false)

  const clinicalModule = getModuleById('clinical-preferences')
  const questions = clinicalModule?.questions as BinaryQuestion[]

  useEffect(() => {
    const testStore = TestStore.getInstance()
    let session = testStore.getCurrentSession()
    if (!session) {
      router.push(ROUTES.TEST.WELCOME)
      return
    }

    const existingAnswers: Record<string, string | null> = {}
    questions?.forEach((_, index) => {
      const answer = testStore.getAnswer(`clinical-${index + 1}`)
      if (answer !== null) {
        existingAnswers[`question-${index}`] = answer
      }
    })
    setAnswers(existingAnswers)
  }, [questions, router])

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [`question-${questionIndex}`]: value }))
    const testStore = TestStore.getInstance()
    testStore.updateAnswer(`clinical-${questionIndex + 1}`, value)
  }

  const handleNext = async () => {
    const totalQuestions = questions?.length || 0
    const answeredCount = Object.values(answers).filter(v => v !== null).length

    if (answeredCount < totalQuestions) {
      alert('Lütfen tüm soruları cevaplayın.')
      return
    }

    setIsLoading(true)
    try {
      const testStore = TestStore.getInstance()
      testStore.completeSession()
      router.push(ROUTES.PROCESSING)
    } catch (error) {
      console.error('Test completion error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    const testStore = TestStore.getInstance()
    testStore.previousModule()
    router.push(ROUTES.TEST.MBTI_JP)
  }

  if (!questions) {
    return <div className="text-center py-12"><p className="text-gray-600">Sorular yüklenirken hata oluştu.</p></div>
  }

  const totalQuestions = questions.length
  const answeredCount = Object.values(answers).filter(v => v !== null).length
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Modül 12 / 12</span>
          <span>{clinicalModule?.title}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
            12
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{clinicalModule?.title}</h1>
            <p className="text-gray-600 mt-1">{clinicalModule?.description}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            <strong>Yönerge:</strong> İki seçenek arasından size daha çekici gelen klinik yaklaşımı belirleyin. Her soru klinik tercihlerinizi değerlendirir.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-purple-900">🎯 Son Modül!</h3>
          <span className="text-sm text-purple-700 font-medium">{answeredCount} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-purple-800 text-sm">
          Testi tamamlamak üzeresiniz! Bu bölümde klinik pratik tercihlerinizi değerlendiriyoruz.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {questions?.map((question, index) => (
          <BinaryChoiceQuestion
            key={index}
            question={question}
            value={answers[`question-${index}`] || null}
            onChange={(value) => handleAnswerChange(index, value)}
          />
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-green-900 mb-2">🎉 Harika!</h3>
        <p className="text-green-800 text-sm mb-2">
          Bu son modül! Tüm soruları cevapladığınızda kişilik analiziniz hazırlanacak.
        </p>
        <div className="text-xs text-green-700">
          💡 <strong>Sonraki adım:</strong> AI analizimiz tüm cevaplarınızı değerlendirip size en uygun tıp uzmanlık dallarını belirleyecek.
        </div>
      </div>

      <TestNavigation 
        onPrevious={handlePrevious} 
        onNext={handleNext} 
        canGoNext={answeredCount === totalQuestions} 
        canGoPrevious={true} 
        isFirstModule={false} 
        isLastModule={true}
        nextButtonText="Analizi Başlat"
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Test Tamamlandı!</h3>
              <p className="text-gray-600 text-sm mb-4">
                Cevaplarınız analiz ediliyor ve size özel uzmanlık önerileri hazırlanıyor...
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs">
                  Bu işlem yaklaşık 30-60 saniye sürebilir. Lütfen bekleyin.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 