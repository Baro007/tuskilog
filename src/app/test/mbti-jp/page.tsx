'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MultipleChoiceGroup } from '@/components/test/MultipleChoiceGroup'
import { TestNavigation } from '@/components/test/TestNavigation'
import { TestStore } from '@/lib/testStore'
import { getModuleById } from '@/data/questions'
import { ROUTES } from '@/lib/constants'
import type { MultipleChoiceQuestion } from '@/types/test'

export default function MBTIJPTestPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(false)

  const mbtiJPModule = getModuleById('mbti-jp')
  const questions = mbtiJPModule?.questions as MultipleChoiceQuestion[]

  useEffect(() => {
    const testStore = TestStore.getInstance()
    let session = testStore.getCurrentSession()
    if (!session) {
      router.push(ROUTES.TEST.WELCOME)
      return
    }

    const existingAnswers: Record<string, string | null> = {}
    questions?.forEach((_, index) => {
      const answer = testStore.getAnswer(`mbti-jp-${index + 1}`)
      if (answer !== null) {
        existingAnswers[`question-${index}`] = answer
      }
    })
    setAnswers(existingAnswers)
  }, [questions, router])

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [`question-${questionIndex}`]: value }))
    const testStore = TestStore.getInstance()
    testStore.updateAnswer(`mbti-jp-${questionIndex + 1}`, value)
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
      
      if (nextModuleId === 'clinical-preferences') router.push(ROUTES.TEST.CLINICAL)
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
    router.push(ROUTES.TEST.MBTI_TF)
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
          <span>Modül 11 / 12</span>
          <span>MBTI: Yargılayan - Algılayan</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">J/P</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MBTI Kişilik Tipi - 4/4</h1>
            <p className="text-gray-600 mt-1">Yargılayan (Judging) vs Algılayan (Perceiving)</p>
          </div>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-violet-800 text-sm">
            <strong>Yönerge:</strong> Yaşam tarzınızı ve dış dünyayla etkileşim biçiminizi değerlendirin. Bu bölüm organizasyon ve esneklik tercihlerinizi analiz eder.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">J</div>
            <h3 className="font-bold text-violet-900 mb-2">Yargılayan (Judging)</h3>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• Yapılandırılmış ve planlı yaklaşım</li>
              <li>• Kesin sonuçlar ve kapanış arar</li>
              <li>• Düzenli ve organize yaşam tarzı</li>
              <li>• Zaman yönetimi odaklı</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">P</div>
            <h3 className="font-bold text-indigo-900 mb-2">Algılayan (Perceiving)</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Esnek ve adapte olabilir yaklaşım</li>
              <li>• Açık seçenekler ve süreç odaklı</li>
              <li>• Spontane yaşam tarzı</li>
              <li>• Fırsat ve adaptasyon odaklı</li>
            </ul>
          </div>
        </div>
      </div>

      <MultipleChoiceGroup questions={questions} values={answers} onChange={handleAnswerChange} className="mb-8" />

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-purple-900 mb-2">💡 İpucu</h3>
        <p className="text-purple-800 text-sm">
          Tıp alanında hem yapılandırılmış protokoller hem de esnek yaklaşımlar gereklidir. Hangi tarzın size daha uygun olduğunu düşünün.
        </p>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-emerald-900 mb-2">🎯 Tebrikler!</h3>
        <p className="text-emerald-800 text-sm">
          MBTI değerlendirmesini tamamladınız! Son modül olan <strong>Klinik Tercihler</strong> bölümüne geçiyorsunuz.
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
            <span className="text-gray-700">Son modül yükleniyor...</span>
          </div>
        </div>
      )}
    </div>
  )
} 