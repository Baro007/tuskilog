import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { MultiSelectQuestion as MultiSelectQuestionType } from '@/types/test'

interface MultiSelectQuestionProps {
  question: MultiSelectQuestionType
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export function MultiSelectQuestion({
  question,
  value = [],
  onChange,
  className
}: MultiSelectQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value)
  const maxSelections = question.maxSelections || question.options.length

  useEffect(() => {
    setSelectedOptions(value)
  }, [value])

  const handleOptionToggle = (option: string) => {
    let newSelection: string[]

    if (selectedOptions.includes(option)) {
      // Remove option
      newSelection = selectedOptions.filter(item => item !== option)
    } else {
      // Add option if under limit
      if (selectedOptions.length < maxSelections) {
        newSelection = [...selectedOptions, option]
      } else {
        return // Don't allow more than max selections
      }
    }

    setSelectedOptions(newSelection)
    onChange(newSelection)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {question.text}
        </h2>
        <p className="text-gray-600">
          En fazla {maxSelections} seçenek işaretleyebilirsiniz. 
          <span className="text-primary-600 font-medium ml-1">
            ({selectedOptions.length}/{maxSelections} seçildi)
          </span>
        </p>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOptions.includes(option)
          const isDisabled = !isSelected && selectedOptions.length >= maxSelections

          return (
            <button
              key={index}
              onClick={() => handleOptionToggle(option)}
              disabled={isDisabled}
              className={cn(
                'text-left p-4 rounded-lg border-2 transition-all duration-200',
                'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                {
                  'border-primary-500 bg-primary-50 text-primary-900': isSelected,
                  'border-gray-200 bg-white text-gray-700 hover:border-gray-300': !isSelected && !isDisabled,
                  'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed': isDisabled
                }
              )}
            >
              <div className="flex items-start space-x-3">
                <div className={cn(
                  'flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 transition-colors',
                  {
                    'border-primary-500 bg-primary-500': isSelected,
                    'border-gray-300': !isSelected && !isDisabled,
                    'border-gray-200 bg-gray-100': isDisabled
                  }
                )}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm leading-5">
                  {option}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {selectedOptions.length === maxSelections && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            ✅ Maksimum seçim sayısına ulaştınız. Başka bir seçenek eklemek için önce mevcut seçimlerden birini kaldırın.
          </p>
        </div>
      )}
    </div>
  )
} 