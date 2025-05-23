import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { BinaryQuestion as BinaryChoiceQuestionType } from '@/types/test'

interface BinaryChoiceQuestionProps {
  question: BinaryChoiceQuestionType
  value: string | null
  onChange: (value: string) => void
  className?: string
}

export function BinaryChoiceQuestion({
  question,
  value = null,
  onChange,
  className
}: BinaryChoiceQuestionProps) {
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
          İki seçenekten size daha uygun olanı belirtiniz.
        </p>
      </div>

      {/* Binary Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option A */}
        <button
          onClick={() => handleValueChange('A')}
          className={cn(
            'p-6 rounded-xl border-2 transition-all duration-200',
            'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
            {
              'border-primary-500 bg-primary-50': selectedValue === 'A',
              'border-gray-200 bg-white hover:border-gray-300': selectedValue !== 'A'
            }
          )}
        >
          <div className="text-center">
            <div className={cn(
              'w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold',
              {
                'bg-primary-600 text-white': selectedValue === 'A',
                'bg-gray-100 text-gray-600': selectedValue !== 'A'
              }
            )}>
              A
            </div>
            
            <p className={cn(
              'font-medium',
              {
                'text-primary-900': selectedValue === 'A',
                'text-gray-700': selectedValue !== 'A'
              }
            )}>
              {question.options[0]}
            </p>

            {selectedValue === 'A' && (
              <div className="mt-4 flex justify-center">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </button>

        {/* Option B */}
        <button
          onClick={() => handleValueChange('B')}
          className={cn(
            'p-6 rounded-xl border-2 transition-all duration-200',
            'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500',
            {
              'border-primary-500 bg-primary-50': selectedValue === 'B',
              'border-gray-200 bg-white hover:border-gray-300': selectedValue !== 'B'
            }
          )}
        >
          <div className="text-center">
            <div className={cn(
              'w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold',
              {
                'bg-primary-600 text-white': selectedValue === 'B',
                'bg-gray-100 text-gray-600': selectedValue !== 'B'
              }
            )}>
              B
            </div>
            
            <p className={cn(
              'font-medium',
              {
                'text-primary-900': selectedValue === 'B',
                'text-gray-700': selectedValue !== 'B'
              }
            )}>
              {question.options[1]}
            </p>

            {selectedValue === 'B' && (
              <div className="mt-4 flex justify-center">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* VS Indicator */}
      <div className="flex justify-center py-2">
        <div className="bg-gray-100 rounded-full px-4 py-2">
          <span className="text-gray-600 font-medium text-sm">VS</span>
        </div>
      </div>

      {selectedValue === null && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-sm">
            ⚠️ Lütfen A veya B seçeneklerinden birini belirleyin.
          </p>
        </div>
      )}

      {selectedValue !== null && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 text-sm font-medium">
              Seçim kaydedildi: Seçenek {selectedValue}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 