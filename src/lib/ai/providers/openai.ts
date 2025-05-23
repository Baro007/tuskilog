import OpenAI from 'openai'
import { API_CONFIG } from '@/lib/constants'
import type { TestAnswers, Specialty } from '@/types/user'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AnalysisResult {
  specialties: Specialty[]
  success: boolean
  error?: string
}

export class OpenAIProvider {
  private static instance: OpenAIProvider
  private rateLimit: Map<string, number> = new Map()

  static getInstance(): OpenAIProvider {
    if (!OpenAIProvider.instance) {
      OpenAIProvider.instance = new OpenAIProvider()
    }
    return OpenAIProvider.instance
  }

  private checkRateLimit(userId: string): boolean {
    const now = Date.now()
    const lastRequest = this.rateLimit.get(userId) || 0
    const timeDiff = now - lastRequest
    
    // 1 minute rate limit
    if (timeDiff < 60000) {
      return false
    }
    
    this.rateLimit.set(userId, now)
    return true
  }

  async analyzeTestResults(
    userId: string,
    answers: TestAnswers,
    specialties: string[]
  ): Promise<AnalysisResult> {
    try {
      // Check rate limit
      if (!this.checkRateLimit(userId)) {
        return {
          specialties: [],
          success: false,
          error: 'Rate limit exceeded. Please wait before making another request.'
        }
      }

      const prompt = this.buildAnalysisPrompt(answers, specialties)
      
      const completion = await openai.chat.completions.create({
        model: API_CONFIG.OPENAI.MODEL,
        messages: [
          {
            role: 'system',
            content: 'Sen deneyimli bir TUS koçu ve kariyer danışmanısın. Doktorların kişilik özelliklerini analiz ederek en uygun uzmanlık dallarını önerirsin.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: API_CONFIG.OPENAI.MAX_TOKENS,
        temperature: API_CONFIG.OPENAI.TEMPERATURE,
        response_format: { type: "json_object" }
      })

      const responseText = completion.choices[0]?.message?.content
      if (!responseText) {
        throw new Error('No response from OpenAI')
      }

      const analysisResult = JSON.parse(responseText)
      
      // Validate response structure
      if (!this.validateAnalysisResult(analysisResult)) {
        throw new Error('Invalid response format from AI')
      }

      return {
        specialties: analysisResult.specialties,
        success: true
      }

    } catch (error) {
      console.error('OpenAI Analysis Error:', error)
      return {
        specialties: [],
        success: false,
        error: error instanceof Error ? error.message : 'Analysis failed'
      }
    }
  }

  private buildAnalysisPrompt(answers: TestAnswers, specialties: string[]): string {
    const prompt = `
GÖREV: Türkiye'de TUS'ta bulunan uzmanlık dalları arasından kullanıcının test cevaplarına göre en uygun 5-10 tanesini seç ve değerlendir.

KULLANICI CEVAPLARI:
- Değerler: ${answers.values.join(', ')}
- Düşünme Tarzı: ${answers.thinkingStyle.join(', ')}
- Çalışma Tarzı: ${answers.workStyle.join(', ')}
- İletişim: ${answers.communication.join(', ')}
- Motivasyon: ${answers.motivation.join(', ')}
- Beceriler: ${answers.skills.join(', ')}
- Yaşam Tarzı: ${answers.lifestyle.join(', ')}
- MBTI Boyutları: EI: ${answers.mbti.EI.join(',')}, SN: ${answers.mbti.SN.join(',')}, TF: ${answers.mbti.TF.join(',')}, JP: ${answers.mbti.JP.join(',')}
- Klinik Tercihler: ${answers.clinicalPreferences.join(', ')}

UZMANLIK DALLARI:
${specialties.join(', ')}

ÇIKTI FORMATI:
Yanıtını JSON formatında ver. Her uzmanlık dalı için:
- "specialty": Dal adı
- "score": 0-85 arası uyum puanı
- "reasons": 3-5 maddelik gerekçe listesi
- "description": Motivasyonel açıklama paragrafı

Örnek format:
{
  "specialties": [
    {
      "specialty": "İç Hastalıkları",
      "score": 78,
      "reasons": ["Analitik düşünce becerin güçlü", "Hasta iletişimini seviyorsun", "Kapsamlı bilgi edinmeyi tercih ediyorsun"],
      "description": "İç hastalıkları senin analitik yaklaşımın ve hasta odaklı çalışma tarzınla mükemmel uyum gösteriyor..."
    }
  ]
}
`

    return prompt
  }

  private validateAnalysisResult(result: any): boolean {
    if (!result || !result.specialties || !Array.isArray(result.specialties)) {
      return false
    }

    return result.specialties.every((specialty: any) => 
      specialty.specialty && 
      typeof specialty.score === 'number' &&
      specialty.score >= 0 && 
      specialty.score <= 85 &&
      Array.isArray(specialty.reasons) &&
      specialty.reasons.length >= 3 &&
      specialty.reasons.length <= 5 &&
      typeof specialty.description === 'string'
    )
  }
} 