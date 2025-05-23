// Application Constants
export const APP_NAME = 'TUSKİLOG'
export const APP_DESCRIPTION = 'TUS Uzmanlık Tercih Sistemi'
export const APP_VERSION = '1.0.0'

// Test Configuration
export const TEST_CONFIG = {
  TOTAL_MODULES: 12,
  ESTIMATED_TIME_MINUTES: 15,
  MAX_VALUES_SELECTION: 4,
  LIKERT_SCALE: {
    MIN: 1,
    MAX: 5,
    LABELS: {
      1: 'Katılmıyorum',
      2: 'Kısmen Katılmıyorum', 
      3: 'Kararsızım',
      4: 'Kısmen Katılıyorum',
      5: 'Tamamen Katılıyorum'
    }
  },
  MBTI_OPTIONS: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
} as const

// API Configuration
export const API_CONFIG = {
  OPENAI: {
    MODEL: 'gpt-4',
    MAX_TOKENS: 4000,
    TEMPERATURE: 0.3
  },
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 10,
    REQUESTS_PER_HOUR: 100
  }
} as const

// UI Constants
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  SECONDARY: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a'
  }
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  TEST: {
    WELCOME: '/welcome',
    VALUES: '/test/values',
    THINKING: '/test/thinking-style',
    WORK_STYLE: '/test/work-style',
    COMMUNICATION: '/test/communication',
    MOTIVATION: '/test/motivation',
    SKILLS: '/test/skills',
    LIFESTYLE: '/test/lifestyle',
    MBTI_EI: '/test/mbti-ei',
    MBTI_SN: '/test/mbti-sn',
    MBTI_TF: '/test/mbti-tf',
    MBTI_JP: '/test/mbti-jp',
    CLINICAL: '/test/clinical'
  },
  PROCESSING: '/processing',
  RESULTS: '/results'
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  TEST_SESSION: 'tuskilog_test_session',
  USER_PROGRESS: 'tuskilog_user_progress',
  TEMP_ANSWERS: 'tuskilog_temp_answers'
} as const

// Test Modules Order
export const MODULE_ORDER = [
  'values',
  'thinking-style', 
  'work-style',
  'communication',
  'motivation',
  'skills',
  'lifestyle',
  'mbti-ei',
  'mbti-sn',
  'mbti-tf',
  'mbti-jp',
  'clinical-preferences'
] as const

// AI Analysis Configuration
export const AI_ANALYSIS = {
  MIN_SPECIALTY_COUNT: 5,
  MAX_SPECIALTY_COUNT: 10,
  SCORE_RANGE: {
    MIN: 0,
    MAX: 85
  },
  REASON_COUNT: {
    MIN: 3,
    MAX: 5
  }
} as const

// Animation Durations (in milliseconds)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800
} as const 