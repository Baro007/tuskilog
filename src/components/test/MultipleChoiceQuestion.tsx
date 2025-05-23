import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '@/types/test'

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType
  value: string | null
  onChange: (value: string) => void
  className?: string
}

export function MultipleChoiceQuestion({
  question,
  value = null,
  onChange,
  className
}: MultipleChoiceQuestionProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onChange(newValue)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question.text}
        </h3>
        <p className="text-sm text-gray-600">
          Size en uygun seçeneği belirtiniz.
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedValue === option
          
          return (
            <button
              key={index}
              onClick={() => handleValueChange(option)}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                'hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500',
                {
                  'border-primary-500 bg-primary-50 text-primary-900': isSelected,
                  'border-gray-200 bg-white text-gray-700 hover:border-gray-300': !isSelected
                }
              )}
            >
              <div className="flex items-center space-x-4">
                {/* Radio Button */}
                <div className={cn(
                  'flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors',
                  {
                    'border-primary-500 bg-primary-500': isSelected,
                    'border-gray-300': !isSelected
                  }
                )}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>

                {/* Option Letter */}
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                  {
                    'bg-primary-600 text-white': isSelected,
                    'bg-gray-100 text-gray-600': !isSelected
                  }
                )}>
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Option Text */}
                <div className="flex-1">
                  <span className={cn(
                    'font-medium',
                    {
                      'text-primary-900': isSelected,
                      'text-gray-700': !isSelected
                    }
                  )}>
                    {option}
                  </span>
                </div>

                {/* Check Icon */}
                {isSelected && (
                  <div className="flex-shrink-0 text-primary-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedValue === null && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-sm">
            ⚠️ Lütfen bu soru için bir seçenek belirleyin.
          </p>
        </div>
      )}

      {selectedValue !== null && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 text-sm font-medium">
              Seçim kaydedildi: {selectedValue}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 