'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MultipleChoiceGroup } from '@/components/test/MultipleChoiceGroup'
import { TestNavigation } from '@/components/test/TestNavigation'
import { TestStore } from '@/lib/testStore'
import { getModuleById } from '@/data/questions'
import { ROUTES } from '@/lib/constants'
import type { MultipleChoiceQuestion } from '@/types/test'

export default function MBTITFTestPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(false)

  const mbtiTFModule = getModuleById('mbti-tf')
  const questions = mbtiTFModule?.questions as MultipleChoiceQuestion[]

  useEffect(() => {
    const testStore = TestStore.getInstance()
    let session = testStore.getCurrentSession()
    if (!session) {
      router.push(ROUTES.TEST.WELCOME)
      return
    }

    const existingAnswers: Record<string, string | null> = {}
    questions?.forEach((_, index) => {
      const answer = testStore.getAnswer(`mbti-tf-${index + 1}`)
      if (answer !== null) {
        existingAnswers[`question-${index}`] = answer
      }
    })
    setAnswers(existingAnswers)
  }, [questions, router])

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [`question-${questionIndex}`]: value }))
    const testStore = TestStore.getInstance()
    testStore.updateAnswer(`mbti-tf-${questionIndex + 1}`, value)
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
      
      if (nextModuleId === 'mbti-jp') router.push(ROUTES.TEST.MBTI_JP)
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
    router.push(ROUTES.TEST.MBTI_SN)
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
          <span>Modül 10 / 12</span>
          <span>MBTI: Düşünen - Hisseden</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">T/F</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MBTI Kişilik Tipi - 3/4</h1>
            <p className="text-gray-600 mt-1">Düşünen (Thinking) vs Hisseden (Feeling)</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-800 text-sm">
            <strong>Yönerge:</strong> Karar verme sürecinizde neye öncelik verdiğinizi değerlendirin. Bu bölüm değer yargılarınızı analiz eder.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">T</div>
            <h3 className="font-bold text-orange-900 mb-2">Düşünen (Thinking)</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Mantık ve analizi önceliklendirir</li>
              <li>• Objektif değerlendirme yapar</li>
              <li>• Adalet ve tutarlılık odaklı</li>
              <li>• Eleştirel düşünme yaklaşımı</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">F</div>
            <h3 className="font-bold text-rose-900 mb-2">Hisseden (Feeling)</h3>
            <ul className="text-sm text-rose-700 space-y-1">
              <li>• Değerler ve empatiyi önceliklendirir</li>
              <li>• Kişisel değerlendirme yapar</li>
              <li>• Uyum ve merhamet odaklı</li>
              <li>• İnsan odaklı düşünme yaklaşımı</li>
            </ul>
          </div>
        </div>
      </div>

      <MultipleChoiceGroup questions={questions} values={answers} onChange={handleAnswerChange} className="mb-8" />

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-amber-900 mb-2">💡 İpucu</h3>
        <p className="text-amber-800 text-sm">
          Tıp alanında hem analitik düşünme hem de empati kritik önem taşır. Hangi yaklaşımın sizin için daha doğal olduğunu düşünün.
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
            <span className="text-gray-700">MBTI 4/4 yükleniyor...</span>
          </div>
        </div>
      )}
    </div>
  )
} 