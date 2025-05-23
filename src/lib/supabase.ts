import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name?: string
  created_at: string
  last_sign_in?: string
  updated_at: string
}

export interface TestResult {
  id: string
  user_id?: string
  session_id: string
  answers: any
  analysis_result: any
  mbti_type?: string
  created_at: string
  updated_at: string
}

export interface TestSession {
  id: string
  session_id: string
  answers?: any
  analysis_result?: any
  completed_at?: string
  created_at: string
  updated_at: string
  expires_at: string
}

// Helper functions
export async function saveTestResult(
  sessionId: string,
  answers: any,
  analysisResult: any,
  userId?: string
) {
  try {
    if (userId) {
      // Kullanıcı giriş yapmışsa test_results tablosuna kaydet
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: userId,
          session_id: sessionId,
          answers,
          analysis_result: analysisResult,
          mbti_type: analysisResult.mbtiType,
        })
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      // Anonymous kullanıcı için test_sessions tablosunu güncelle
      const { data, error } = await supabase
        .from('test_sessions')
        .upsert({
          session_id: sessionId,
          answers,
          analysis_result: analysisResult,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return data
    }
  } catch (error) {
    console.error('Error saving test result:', error)
    throw error
  }
}

export async function getTestResults(userId: string) {
  try {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching test results:', error)
    throw error
  }
}

export async function getTestSession(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching test session:', error)
    throw error
  }
} 