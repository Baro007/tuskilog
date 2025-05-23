export interface Question {
  id: string
  text: string
  type: 'likert' | 'multiple-choice' | 'binary' | 'multi-select'
  options?: string[]
  maxSelections?: number
  category: string
  subcategory?: string
}

export interface LikertQuestion extends Question {
  type: 'likert'
  scale: {
    min: number
    max: number
    labels: {
      [key: number]: string
    }
  }
}

export interface MultipleChoiceQuestion extends Question {
  type: 'multiple-choice'
  options: string[]
}

export interface BinaryQuestion extends Question {
  type: 'binary'
  options: [string, string]
}

export interface MultiSelectQuestion extends Question {
  type: 'multi-select'
  options: string[]
  maxSelections: number
}

export type TestQuestion = LikertQuestion | MultipleChoiceQuestion | BinaryQuestion | MultiSelectQuestion

export interface TestModule {
  id: string
  title: string
  description: string
  questions: TestQuestion[]
  order: number
}

export interface TestProgress {
  currentModule: number
  totalModules: number
  completedQuestions: number
  totalQuestions: number
  answers: Record<string, any>
}

export interface TestSession {
  id: string
  userId: string
  startedAt: Date
  completedAt?: Date
  progress: TestProgress
  answers: Record<string, any>
} 