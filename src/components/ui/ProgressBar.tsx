import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0-100
  max?: number
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success'
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  showText = true, 
  size = 'md',
  variant = 'primary'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          {
            'h-2': size === 'sm',
            'h-3': size === 'md',
            'h-4': size === 'lg',
          }
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            {
              'bg-primary-600': variant === 'primary',
              'bg-secondary-600': variant === 'secondary',
              'bg-green-600': variant === 'success',
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
} 