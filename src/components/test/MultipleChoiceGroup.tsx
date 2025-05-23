import { useState, useEffect } from 'react'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion'
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '@/types/test'

interface MultipleChoiceGroupProps {
  questions: MultipleChoiceQuestionType[]
  values: Record<string, string | null>
  onChange: (questionIndex: number, value: string) => void
  className?: string
}

export function MultipleChoiceGroup({
  questions,
  values,
  onChange,
  className = ''
}: MultipleChoiceGroupProps) {
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string | null>>(values)

  useEffect(() => {
    setCurrentAnswers(values)
  }, [values])

  const handleQuestionChange = (questionIndex: number, value: string) => {
    const questionId = `question-${questionIndex}`
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    onChange(questionIndex, value)
  }

  const getAnsweredCount = () => {
    return Object.values(currentAnswers).filter(value => value !== null).length
  }

  const getTotalQuestions = () => {
    return questions.length
  }

  return (
    <div className={className}>
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            Kişilik Tipi Değerlendirmesi
          </h2>
          <span className="text-sm text-primary-600 font-medium">
            {getAnsweredCount()} / {getTotalQuestions()} soru tamamlandı
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(getAnsweredCount() / getTotalQuestions()) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {questions.map((question, index) => {
          const questionId = `question-${index}`
          const isAnswered = currentAnswers[questionId] !== null && currentAnswers[questionId] !== undefined

          return (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 ${
                isAnswered ? 'border-green-200 bg-green-50' : ''
              }`}
            >
              <div className="flex items-start mb-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 ${
                  isAnswered 
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isAnswered ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <MultipleChoiceQuestion
                    question={question}
                    value={currentAnswers[questionId] || null}
                    onChange={(value) => handleQuestionChange(index, value)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      {getAnsweredCount() === getTotalQuestions() && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 font-medium">
              Tüm sorular tamamlandı! Sonraki modüle geçebilirsiniz.
            </span>
          </div>
        </div>
      )}

      {getAnsweredCount() > 0 && getAnsweredCount() < getTotalQuestions() && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            📝 {getTotalQuestions() - getAnsweredCount()} soru daha kaldı. 
            Tüm soruları tamamlayın ve sonraki modüle geçin.
          </p>
        </div>
      )}
    </div>
  )
} 