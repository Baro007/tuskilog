export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  birthDate: Date
  createdAt: Date
  testResults?: TestResult[]
}

export interface TestResult {
  id: string
  userId: string
  answers: TestAnswers
  aiResponse: AIResponse
  mbtiProfile: MBTIProfile
  createdAt: Date
}

export interface TestAnswers {
  values: string[] // Max 4 selection
  thinkingStyle: number[] // 1-5 likert
  workStyle: number[] // 1-5 likert
  communication: number[] // 1-5 likert
  motivation: number[] // 1-5 likert
  skills: number[] // 1-5 likert
  lifestyle: number[] // 1-5 likert
  mbti: {
    EI: string[] // 'agree'|'neutral'|'disagree'
    SN: string[]
    TF: string[]
    JP: string[]
  }
  clinicalPreferences: string[] // 'A'|'B'
}

export interface AIResponse {
  specialties: Specialty[]
}

export interface Specialty {
  specialty: string
  score: number // 0-85
  reasons: string[]
  description: string
}

export interface MBTIProfile {
  type: string // e.g., "INTJ"
  dimensions: {
    EI: number // -100 to 100
    SN: number
    TF: number
    JP: number
  }
  description: string
} 