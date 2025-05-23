'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MultipleChoiceGroup } from '@/components/test/MultipleChoiceGroup'
import { TestNavigation } from '@/components/test/TestNavigation'
import { TestStore } from '@/lib/testStore'
import { getModuleById } from '@/data/questions'
import { ROUTES } from '@/lib/constants'
import type { MultipleChoiceQuestion } from '@/types/test'

export default function MBTISNTestPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(false)

  const mbtiSNModule = getModuleById('mbti-sn')
  const questions = mbtiSNModule?.questions as MultipleChoiceQuestion[]

  useEffect(() => {
    const testStore = TestStore.getInstance()
    let session = testStore.getCurrentSession()
    if (!session) {
      router.push(ROUTES.TEST.WELCOME)
      return
    }

    const existingAnswers: Record<string, string | null> = {}
    questions?.forEach((_, index) => {
      const answer = testStore.getAnswer(`mbti-sn-${index + 1}`)
      if (answer !== null) {
        existingAnswers[`question-${index}`] = answer
      }
    })
    setAnswers(existingAnswers)
  }, [questions, router])

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [`question-${questionIndex}`]: value }))
    const testStore = TestStore.getInstance()
    testStore.updateAnswer(`mbti-sn-${questionIndex + 1}`, value)
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
      const nextModuleId = testStore.nextModule()
      
      if (nextModuleId === 'mbti-tf') router.push(ROUTES.TEST.MBTI_TF)
      else router.push(ROUTES.PROCESSING)
    } catch (error) {
      console.error('Navigation error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    const testStore = TestStore.getInstance()
    testStore.previousModule()
    router.push(ROUTES.TEST.MBTI_EI)
  }

  if (!questions) {
    return <div className="text-center py-12"><p className="text-gray-600">Sorular yüklenirken hata oluştu.</p></div>
  }

  const totalQuestions = questions.length
  const answeredCount = Object.values(answers).filter(v => v !== null).length

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Modül 9 / 12</span>
          <span>MBTI: Duyusal - Sezgisel</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">S/N</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MBTI Kişilik Tipi - 2/4</h1>
            <p className="text-gray-600 mt-1">Duyusal (Sensing) vs Sezgisel (Intuition)</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            <strong>Yönerge:</strong> Bilgi toplama ve işleme tarzınızı değerlendirin. Bu bölüm nasıl öğrendiğinizi ve karar verdiğinizi analiz eder.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">S</div>
            <h3 className="font-bold text-green-900 mb-2">Duyusal (Sensing)</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Gerçek ve somut bilgilere odaklanır</li>
              <li>• Detaylara dikkat eder</li>
              <li>• Pratik ve uygulanabilir çözümler</li>
              <li>• Deneyim temelli öğrenme</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">N</div>
            <h3 className="font-bold text-blue-900 mb-2">Sezgisel (Intuition)</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Kavramlar ve teorilere odaklanır</li>
              <li>• Büyük resmi görme</li>
              <li>• Yaratıcı ve yenilikçi çözümler</li>
              <li>• Soyut düşünme tercihli</li>
            </ul>
          </div>
        </div>
      </div>

      <MultipleChoiceGroup questions={questions} values={answers} onChange={handleAnswerChange} className="mb-8" />

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-emerald-900 mb-2">💡 İpucu</h3>
        <p className="text-emerald-800 text-sm">
          Tıp alanında hem detay odaklı hem de büyük resim görebilen doktorlara ihtiyaç var. Doğal eğiliminizi belirleyin.
        </p>
      </div>

      <TestNavigation onPrevious={handlePrevious} onNext={handleNext} canGoNext={answeredCount === totalQuestions} canGoPrevious={true} isFirstModule={false} isLastModule={false} />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-gray-700">MBTI 3/4 yükleniyor...</span>
          </div>
        </div>
      )}
    </div>
  )
} 