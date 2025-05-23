import { storage, generateId } from '@/lib/utils'
import { STORAGE_KEYS, MODULE_ORDER } from '@/lib/constants'
import type { TestProgress, TestSession } from '@/types/test'
import type { TestAnswers } from '@/types/user'

export class TestStore {
  private static instance: TestStore
  private session: TestSession | null = null

  static getInstance(): TestStore {
    if (!TestStore.instance) {
      TestStore.instance = new TestStore()
    }
    return TestStore.instance
  }

  // Initialize new test session
  initializeSession(userId?: string): TestSession {
    const session: TestSession = {
      id: generateId(),
      userId: userId || generateId(),
      startedAt: new Date(),
      progress: {
        currentModule: 0,
        totalModules: MODULE_ORDER.length,
        completedQuestions: 0,
        totalQuestions: 39, // Will be calculated dynamically
        answers: {}
      },
      answers: {}
    }

    this.session = session
    this.saveSession()
    return session
  }

  // Get current session
  getCurrentSession(): TestSession | null {
    if (!this.session) {
      const saved = storage.get(STORAGE_KEYS.TEST_SESSION)
      if (saved) {
        this.session = {
          ...saved,
          startedAt: new Date(saved.startedAt),
          completedAt: saved.completedAt ? new Date(saved.completedAt) : undefined
        }
      }
    }
    return this.session
  }

  // Save session to localStorage
  private saveSession(): void {
    if (this.session) {
      storage.set(STORAGE_KEYS.TEST_SESSION, this.session)
    }
  }

  // Update answer for a question
  updateAnswer(questionId: string, answer: any): void {
    if (!this.session) {
      throw new Error('No active session')
    }

    this.session.answers[questionId] = answer
    this.session.progress.answers[questionId] = answer
    this.saveSession()
  }

  // Get answer for a question
  getAnswer(questionId: string): any {
    return this.session?.answers[questionId] || null
  }

  // Move to next module
  nextModule(): string | null {
    if (!this.session) return null

    const currentIndex = this.session.progress.currentModule
    if (currentIndex < MODULE_ORDER.length - 1) {
      this.session.progress.currentModule = currentIndex + 1
      this.saveSession()
      return MODULE_ORDER[currentIndex + 1]
    }
    return null // End of test
  }

  // Move to previous module
  previousModule(): string | null {
    if (!this.session) return null

    const currentIndex = this.session.progress.currentModule
    if (currentIndex > 0) {
      this.session.progress.currentModule = currentIndex - 1
      this.saveSession()
      return MODULE_ORDER[currentIndex - 1]
    }
    return null
  }

  // Get current module ID
  getCurrentModuleId(): string {
    if (!this.session) {
      return MODULE_ORDER[0]
    }
    return MODULE_ORDER[this.session.progress.currentModule] || MODULE_ORDER[0]
  }

  // Calculate progress percentage
  getProgressPercentage(): number {
    if (!this.session) return 0
    
    const { currentModule, totalModules } = this.session.progress
    return Math.round(((currentModule + 1) / totalModules) * 100)
  }

  // Check if module is completed
  isModuleCompleted(moduleId: string): boolean {
    if (!this.session) return false
    
    // This will be implemented based on specific module requirements
    return false
  }

  // Get all answers in the format expected by AI
  getFormattedAnswers(): Partial<TestAnswers> {
    if (!this.session) return {}

    const answers = this.session.answers
    
    return {
      values: this.getAnswersByCategory('values'),
      thinkingStyle: this.getAnswersByCategory('thinking'),
      workStyle: this.getAnswersByCategory('work-style'),
      communication: this.getAnswersByCategory('communication'),
      motivation: this.getAnswersByCategory('motivation'),
      skills: this.getAnswersByCategory('skills'),
      lifestyle: this.getAnswersByCategory('lifestyle'),
      mbti: {
        EI: this.getAnswersByCategory('mbti-ei'),
        SN: this.getAnswersByCategory('mbti-sn'),
        TF: this.getAnswersByCategory('mbti-tf'),
        JP: this.getAnswersByCategory('mbti-jp')
      },
      clinicalPreferences: this.getAnswersByCategory('clinical')
    }
  }

  private getAnswersByCategory(category: string): any[] {
    if (!this.session) return []
    
    return Object.entries(this.session.answers)
      .filter(([questionId]) => questionId.startsWith(category))
      .map(([, answer]) => answer)
  }

  // Complete test session
  completeSession(): void {
    if (this.session) {
      this.session.completedAt = new Date()
      this.saveSession()
    }
  }

  // Clear session
  clearSession(): void {
    this.session = null
    storage.remove(STORAGE_KEYS.TEST_SESSION)
  }

  // Get session duration in minutes
  getSessionDuration(): number {
    if (!this.session) return 0
    
    const end = this.session.completedAt || new Date()
    const start = this.session.startedAt
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60))
  }
} 