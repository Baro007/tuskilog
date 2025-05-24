import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/ai/providers/openai';
import { SPECIALTIES } from '@/data/specialties';

// 45 Türkiye TUS Uzmanlık Dalları
const TUS_SPECIALTIES = [
  "Acil Tıp", "Adli Tıp", "Anesteziyoloji ve Reanimasyon", "Aile Hekimliği",
  "Beyin ve Sinir Cerrahisi", "Çocuk Cerrahisi", "Çocuk Sağlığı ve Hastalıkları",
  "Dermatoloji", "Fiziksel Tıp ve Rehabilitasyon", "Genel Cerrahi",
  "Göğüs Cerrahisi", "Göğüs Hastalıkları", "Göz Hastalıkları", "Jinekologi ve Obstetrik",
  "Halk Sağlığı", "İç Hastalıkları", "Kalp ve Damar Cerrahisi", "Kardiyoloji",
  "Kulak Burun Boğaz Hastalıkları", "Nöroloji", "Nükleer Tıp", "Ortopedi ve Travmatoloji",
  "Patoloji", "Plastik Rekonstrüktif ve Estetik Cerrahi", "Psikiyatri",
  "Radyoloji", "Radyasyon Onkolojisi", "Spor Hekimliği", "Tıbbi Biyokimya",
  "Tıbbi Farmakoloji", "Tıbbi Genetik", "Tıbbi Mikrobiyoloji", "Tıbbi Onkoloji",
  "Tıbbi Patoloji", "Üroloji", "Enfeksiyon Hastalıkları", "Endokrinoloji",
  "Gastroenteroloji", "Hematoloji", "İmmünoloji", "Nefroloji", "Romatoloji",
  "Geriatri", "Yoğun Bakım", "Algoloji"
];

interface TestAnswers {
  values: string[];
  thinkingStyle: number[];
  workStyle: number[];
  communication: number[];
  motivation: number[];
  skills: number[];
  lifestyle: number[];
  mbti: {
    EI: string[];
    SN: string[];
    TF: string[];
    JP: string[];
  };
  clinicalPreferences: string[];
}

function createAnalysisPrompt(answers: TestAnswers): string {
  return `
SENARYO: Sen deneyimli bir TUS Koçu ve Kişilik Analisti'sin. Türkiye'de TUS'ta resmi olarak 45 uzmanlık dalı var.

GÖREV: Bu test sonuçlarından yola çıkarak, kullanıcının kişilik özelliklerini analiz et ve en uygun 5 uzmanlık dalını seç. Her öneriyi KİŞİSELLEŞTİRİLMİŞ bir şekilde açıkla.

TEST SONUÇLARI:

1. DEĞERLER (Seçilen değerler):
${answers.values.join(', ')}

2. KIŞILIK DİMENSYONLARI (1-5 skala):
- Düşünme Tarzı: ${answers.thinkingStyle.join(', ')}
- Çalışma Tarzı: ${answers.workStyle.join(', ')}
- İletişim: ${answers.communication.join(', ')}
- Motivasyon: ${answers.motivation.join(', ')}
- Beceriler: ${answers.skills.join(', ')}
- Yaşam Tarzı: ${answers.lifestyle.join(', ')}

3. MBTI BOYUTLARI:
- Extraversion/Introversion: ${answers.mbti.EI.join(', ')}
- Sensing/Intuition: ${answers.mbti.SN.join(', ')}
- Thinking/Feeling: ${answers.mbti.TF.join(', ')}
- Judging/Perceiving: ${answers.mbti.JP.join(', ')}

4. KLİNİK TERCİHLER:
${answers.clinicalPreferences.join(', ')}

ANALİZ İSTEĞİ:
1. MBTI tipi belirleme (örn: INTJ, ENFP)
2. Kişilik özelliklerini 4 boyutta puanlama (0-100)
3. En uygun 5 uzmanlık dalını seçme

Her uzmanlık için:
- "specialty": Dal adı (aşağıdaki listeden)
- "score": 75-95 aralığında uyum puanı  
- "reasons": 3-4 maddelik kısa açıklama (kullanıcının cevaplarına göre)
- "description": 2-3 cümle KİŞİSELLEŞTİRİLMİŞ açıklama. Kullanıcının değerlerini, kişilik özelliklerini ve tercihlerini doğrudan referans al.
- "personalizedReason": Bu uzmanlığın NEDEN kullanıcıya uygun olduğunu test cevaplarına dayanarak açıklayan 2-3 cümle.

AÇIKLAMA YAZIM KURALLARI:
- "Sen" dili kullan (örn: "Senin analitik yaklaşımın...")
- Test cevaplarına direkt referans ver
- Kullanıcının seçtiği değerleri ve kişilik özelliklerini bağla
- Motivasyonel ve pozitif dil kullan
- Somut örnekler ver

45 UZMANLIK DALI:
${TUS_SPECIALTIES.join(', ')}

YANIT FORMATINI KESINLIKLE BU ŞEKİLDE DÖN:
{
  "mbtiType": "INTJ",
  "mbtiDescription": "Mimar",
  "personalityTraits": {
    "extraversion": 25,
    "sensing": 70,
    "thinking": 85,
    "judging": 80
  },
  "specialties": [
    {
      "specialty": "Radyoloji",
      "score": 92,
      "reasons": ["Test sonuçlarına göre analitik düşünce", "Teknoloji odaklı çalışma tercihin", "Bağımsız çalışma eğilimine uygun"],
      "description": "Senin teknoloji ve analitik düşünce konusundaki güçlü yönlerin radyoloji alanında mükemmel bir uyum gösteriyor. Görüntüleme teknolojileri ile tanı koyma süreçleri, senin detaylı analiz yapma becerinle örtüşüyor.",
      "personalizedReason": "Test sonuçlarında teknolojiye olan ilgin ve sistematik çalışma tarzın öne çıkıyor. Radyoloji alanında bu özellikler sayesinde karmaşık görüntüleri analiz ederek kesin tanılara ulaşabilirsin."
    }
  ]
}
`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers) {
      return NextResponse.json(
        { error: 'Test cevapları gerekli' },
        { status: 400 }
      );
    }

    let analysisResult;

    // OpenAI API key kontrolü
    const hasValidApiKey = process.env.OPENAI_API_KEY && 
                          process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';

    if (hasValidApiKey) {
      try {
        // AI analizini çağır
        const prompt = createAnalysisPrompt(answers);
        
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Sen profesyonel bir TUS koçu ve kişilik analistisin. Verilen test sonuçlarını analiz ederek en uygun tıp uzmanlık dallarını belirlersin."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.9,
          max_tokens: 8000,
        });

        const aiResponse = completion.choices[0]?.message?.content;
        
        if (aiResponse) {
          analysisResult = JSON.parse(aiResponse);
        } else {
          throw new Error('AI response boş');
        }
      } catch (aiError) {
        console.warn('OpenAI API error, using fallback:', aiError);
        analysisResult = null; // Fallback'e geç
      }
    } else {
      console.warn('OpenAI API key not configured, using fallback data');
      analysisResult = null; // Fallback'e geç
    }

    // Fallback data (OpenAI kullanılamazsa)
    if (!analysisResult) {
      analysisResult = {
        mbtiType: "INTJ",
        mbtiDescription: "Mimar",
        personalityTraits: {
          extraversion: 25,
          sensing: 70,
          thinking: 85,
          judging: 80
        },
        specialties: [
          {
            specialty: "Radyoloji",
            score: 95,
            reasons: ["Analitik düşünce yapısı", "Teknoloji odaklı", "Bağımsız çalışma"],
            description: "Görüntüleme teknolojileri ve tanısal analizler için ideal bir uzmanlık dalı.",
            personalizedReason: "Test sonuçlarında teknolojiye olan ilgin ve sistematik çalışma tarzın öne çıkıyor. Radyoloji alanında bu özellikler sayesinde karmaşık görüntüleri analiz ederek kesin tanılara ulaşabilirsin."
          },
          {
            specialty: "Patoloji", 
            score: 92,
            reasons: ["Detaylı analiz yeteneği", "Sistematik yaklaşım", "Araştırma odaklı"],
            description: "Hastalıkların mikroskobik incelenmesi ile kesin tanıya ulaşma.",
            personalizedReason: "Detaylı analiz yeteneği ve sistematik yaklaşımınız, hastalıkların mikroskobik incelenmesi ile kesin tanıya ulaşmanıza yardımcı oluyor."
          },
          {
            specialty: "Anesteziyoloji ve Reanimasyon",
            score: 88,
            reasons: ["Hızlı karar verme", "Kritik durum yönetimi", "Teknik beceri"],
            description: "Ameliyat süreçlerinde hayati öneme sahip hasta güvenliği.",
            personalizedReason: "Hızlı karar verme ve kritik durum yönetimi becerileriniz, ameliyat süreçlerinde hasta güvenliğinin sağlanmasına yardımcı oluyor."
          },
          {
            specialty: "Nöroloji",
            score: 85,
            reasons: ["Kompleks analiz", "Bilimsel yaklaşım", "Uzun vadeli takip"],
            description: "Sinir sistemi hastalıklarının tanı ve tedavisinde uzmanlaşma.",
            personalizedReason: "Kompleks analiz ve bilimsel yaklaşımınız, sinir sistemi hastalıklarının tanı ve tedavisinde uzmanlaşmanıza yardımcı oluyor."
          },
          {
            specialty: "Psikiyatri",
            score: 82,
            reasons: ["İnsan davranışı analizi", "Empati yeteneği", "Uzun vadeli terapi"],
            description: "Ruh sağlığı alanında bireysel ve toplumsal katkı sağlama.",
            personalizedReason: "İnsan davranışı analizi ve empati yeteneğiniz, ruh sağlığı alanında bireysel ve toplumsal katkı sağlamanıza yardımcı oluyor."
          }
        ]
      };
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      timestamp: new Date().toISOString(),
      usedFallback: !hasValidApiKey || !analysisResult
    });

  } catch (error) {
    console.error('API Analysis Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Analiz sırasında bir hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
} 