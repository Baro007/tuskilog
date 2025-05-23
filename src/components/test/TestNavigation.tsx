import { Button } from '@/components/ui/Button'

interface TestNavigationProps {
  onPrevious?: () => void
  onNext?: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isFirstModule?: boolean
  isLastModule?: boolean
  nextButtonText?: string
  className?: string
}

export function TestNavigation({
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
  isFirstModule = false,
  isLastModule = false,
  nextButtonText,
  className = ''
}: TestNavigationProps) {
  const getNextButtonText = () => {
    if (nextButtonText) return nextButtonText
    if (isLastModule) return 'Testi Tamamla'
    return 'Sonraki Modül'
  }

  return (
    <div className={`flex justify-between items-center pt-8 ${className}`}>
      <div>
        {!isFirstModule && (
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Önceki</span>
          </Button>
        )}
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center space-x-2"
          variant={isLastModule ? 'secondary' : 'primary'}
        >
          <span>{getNextButtonText()}</span>
          {!isLastModule && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {isLastModule && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  )
} 