import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { LikertQuestion as LikertQuestionType } from '@/types/test'

interface LikertQuestionProps {
  question: LikertQuestionType
  value: number | null
  onChange: (value: number) => void
  className?: string
}

export function LikertQuestion({
  question,
  value = null,
  onChange,
  className
}: LikertQuestionProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleValueChange = (newValue: number) => {
    setSelectedValue(newValue)
    onChange(newValue)
  }

  const getOptionText = (value: number): string => {
    return question.scale.labels[value] || `${value}`
  }

  const getScaleItems = () => {
    const items = []
    for (let i = question.scale.min; i <= question.scale.max; i++) {
      items.push(i)
    }
    return items
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question.text}
        </h3>
        <p className="text-sm text-gray-600">
          Aşağıdaki ifadeye ne kadar katıldığınızı belirtiniz.
        </p>
      </div>

      {/* Scale Options */}
      <div className="space-y-3">
        {getScaleItems().map((scaleValue) => {
          const isSelected = selectedValue === scaleValue
          
          return (
            <button
              key={scaleValue}
              onClick={() => handleValueChange(scaleValue)}
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

                {/* Scale Number */}
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                  {
                    'bg-primary-600 text-white': isSelected,
                    'bg-gray-100 text-gray-600': !isSelected
                  }
                )}>
                  {scaleValue}
                </div>

                {/* Scale Label */}
                <div className="flex-1">
                  <span className={cn(
                    'font-medium',
                    {
                      'text-primary-900': isSelected,
                      'text-gray-700': !isSelected
                    }
                  )}>
                    {getOptionText(scaleValue)}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Scale Visual Indicator */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
          <span>{getOptionText(question.scale.min)}</span>
          <span>{getOptionText(question.scale.max)}</span>
        </div>
        
        <div className="relative">
          {/* Scale Line */}
          <div className="h-2 bg-gray-200 rounded-full">
            {selectedValue !== null && (
              <div 
                className="h-2 bg-primary-500 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((selectedValue - question.scale.min) / (question.scale.max - question.scale.min)) * 100}%` 
                }}
              />
            )}
          </div>
          
          {/* Scale Markers */}
          <div className="flex justify-between mt-1">
            {getScaleItems().map((scaleValue) => (
              <div 
                key={scaleValue}
                className={cn(
                  'w-1 h-4 rounded-full transition-colors',
                  {
                    'bg-primary-500': selectedValue !== null && scaleValue <= selectedValue,
                    'bg-gray-300': selectedValue === null || scaleValue > selectedValue
                  }
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedValue === null && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-sm">
            ⚠️ Lütfen bu soru için bir seçenek belirleyin.
          </p>
        </div>
      )}
    </div>
  )
} 