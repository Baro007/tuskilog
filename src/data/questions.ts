import { TestModule, MultiSelectQuestion, LikertQuestion, MultipleChoiceQuestion, BinaryQuestion } from '@/types/test'

// Değerler Modülü
const valuesModule: TestModule = {
  id: 'values',
  title: 'Değerler',
  description: 'Senin için bir meslek ne ifade etmeli? En fazla 4 seçenek seçiniz.',
  order: 1,
  questions: [
    {
      id: 'values-1',
      text: 'Senin için bir meslek ne ifade etmeli?',
      type: 'multi-select',
      category: 'values',
      maxSelections: 4,
      options: [
        'Boş zamanım olsun, hayatımı yaşayabileyim.',
        'Başarı hissi beni motive eder.',
        'Saygınlık ve prestij benim için önemlidir.',
        'Kararları kendim alabilmeliyim.',
        'Özgür ve bağımsız çalışmak isterim.',
        'Zihinsel uğraşları seviyorum.',
        'El becerilerimi kullanmayı severim.',
        'İnsanlarla birebir iletişimden keyif alırım.',
        'Mesleki güvence ve istikrar benim için öncelikli.',
        'Her gün farklı şeylerle uğraşmak isterim.',
        'Maddi olarak iyi kazanmak istiyorum.',
        'Yaratıcılığımı kullanabileceğim bir alan olmalı.',
        'Yaptığım işe dair geri bildirim almak beni geliştirir.',
        'İnsanlara doğrudan yardım etmek beni tatmin eder.'
      ]
    } as MultiSelectQuestion
  ]
}

// Düşünme Tarzı Modülü
const thinkingStyleModule: TestModule = {
  id: 'thinking-style',
  title: 'Düşünme Tarzı',
  description: 'Aşağıdaki ifadelere ne kadar katıldığınızı belirtiniz.',
  order: 2,
  questions: [
    {
      id: 'thinking-1',
      text: 'Zor vakalarda hep "neden böyle oldu?" diye düşünürüm.',
      type: 'likert',
      category: 'thinking',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'thinking-2',
      text: 'Nadiren görülen olasılıkları da göz önünde bulundururum.',
      type: 'likert',
      category: 'thinking',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'thinking-3',
      text: 'Yeni bir yöntemi uygulamadan önce nasıl çalıştığını iyice anlamak isterim.',
      type: 'likert',
      category: 'thinking',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'thinking-4',
      text: 'Sorunları mantık kurallarıyla çözmeyi severim.',
      type: 'likert',
      category: 'thinking',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion
  ]
}

// Çalışma Tarzı Modülü
const workStyleModule: TestModule = {
  id: 'work-style',
  title: 'Çalışma Tarzı',
  description: 'Çalışma tarzınızla ilgili ifadelere ne kadar katıldığınızı belirtiniz.',
  order: 3,
  questions: [
    {
      id: 'work-1',
      text: 'Sürekli aynı işi yapmak beni çabuk sıkar.',
      type: 'likert',
      category: 'work-style',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'work-2',
      text: 'Detaylara dikkat etmeye özen gösteririm.',
      type: 'likert',
      category: 'work-style',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'work-3',
      text: 'Aynı anda birkaç farklı iş yürütmek hoşuma gider.',
      type: 'likert',
      category: 'work-style',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'work-4',
      text: 'Plan dışı gelişmeler beni huzursuz eder.',
      type: 'likert',
      category: 'work-style',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion
  ]
}

// İletişim ve Sosyal Yön Modülü
const communicationModule: TestModule = {
  id: 'communication',
  title: 'İletişim ve Sosyal Yönüm',
  description: 'İletişim becerileriniz ve sosyal etkileşim tarzınızla ilgili ifadeleri değerlendirin.',
  order: 4,
  questions: [
    {
      id: 'communication-1',
      text: 'Vaka tartışmalarında ekip olarak çalışmayı severim.',
      type: 'likert',
      category: 'communication',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'communication-2',
      text: 'Hastaları uzun süre takip etmek bana iyi hissettirir.',
      type: 'likert',
      category: 'communication',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'communication-3',
      text: 'Başkalarına yardımcı olmak bana tatmin verir.',
      type: 'likert',
      category: 'communication',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'communication-4',
      text: 'Zorlanan meslektaşlarıma destek olmayı isterim.',
      type: 'likert',
      category: 'communication',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion
  ]
}

// Motivasyon ve Kişilik Modülü
const motivationModule: TestModule = {
  id: 'motivation',
  title: 'Motivasyon ve Kişilik',
  description: 'Motivasyon kaynaklarınız ve kişilik özelliklerinizle ilgili ifadeleri değerlendirin.',
  order: 5,
  questions: [
    {
      id: 'motivation-1',
      text: 'Zor kararlar verirken soğukkanlı kalabilirim.',
      type: 'likert',
      category: 'motivation',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'motivation-2',
      text: 'Stresli ortamlarda bile performansımı korurum.',
      type: 'likert',
      category: 'motivation',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'motivation-3',
      text: 'Belirsizlik beni rahatsız eder.',
      type: 'likert',
      category: 'motivation',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'motivation-4',
      text: 'Yeni ve farklı çözümler üretmek beni heyecanlandırır.',
      type: 'likert',
      category: 'motivation',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion
  ]
}

// Beceri & İlgi Alanları Modülü
const skillsModule: TestModule = {
  id: 'skills',
  title: 'Beceri & İlgi Alanları',
  description: 'Sahip olduğunuz beceriler ve ilgi alanlarınızla ilgili ifadeleri değerlendirin.',
  order: 6,
  questions: [
    {
      id: 'skills-1',
      text: 'El becerisi isteyen işleri yapmaktan hoşlanırım.',
      type: 'likert',
      category: 'skills',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'skills-2',
      text: 'Gözlem yapma konusunda kendime güvenirim.',
      type: 'likert',
      category: 'skills',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'skills-3',
      text: 'Yeni cihazları ve teknolojileri çabuk öğrenirim.',
      type: 'likert',
      category: 'skills',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'skills-4',
      text: 'Öğretmek ve başkalarına yol göstermek hoşuma gider.',
      type: 'likert',
      category: 'skills',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion
  ]
}

// Yaşam Tarzı Tercihleri Modülü
const lifestyleModule: TestModule = {
  id: 'lifestyle',
  title: 'Yaşam Tarzı Tercihleri',
  description: 'İş-yaşam dengesi ve yaşam tarzı tercihlerinizle ilgili ifadeleri değerlendirin.',
  order: 7,
  questions: [
    {
      id: 'lifestyle-1',
      text: 'İş-özel hayat dengesi benim için çok önemli.',
      type: 'likert',
      category: 'lifestyle',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'lifestyle-2',
      text: 'Uzun nöbetler yerine esnek çalışma saatlerini tercih ederim.',
      type: 'likert',
      category: 'lifestyle',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'lifestyle-3',
      text: 'Kariyerimde saygınlık ve liderlik benim için önemlidir.',
      type: 'likert',
      category: 'lifestyle',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion,
    {
      id: 'lifestyle-4',
      text: 'Belirli bir düzen olmadan kendimi verimli hissedemem.',
      type: 'likert',
      category: 'lifestyle',
      scale: {
        min: 1,
        max: 5,
        labels: {
          1: 'Katılmıyorum',
          2: 'Kısmen Katılmıyorum',
          3: 'Kararsızım',
          4: 'Kısmen Katılıyorum',
          5: 'Tamamen Katılıyorum'
        }
      }
    } as LikertQuestion
  ]
}

// MBTI EI Modülü
const mbtiEIModule: TestModule = {
  id: 'mbti-ei',
  title: 'Dışadönük - İçedönük',
  description: 'Aşağıdaki ifadelere katılıp katılmadığınızı belirtiniz.',
  order: 8,
  questions: [
    {
      id: 'mbti-ei-1',
      text: 'Acil serviste hızlı hasta akışı beni canlandırır.',
      type: 'multiple-choice',
      category: 'mbti-ei',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-ei-2',
      text: 'Sessiz bir ortamda yalnız çalışmak bana iyi gelir.',
      type: 'multiple-choice',
      category: 'mbti-ei',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-ei-3',
      text: 'Toplantılarda fikirlerimi paylaşmak kolay gelir.',
      type: 'multiple-choice',
      category: 'mbti-ei',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-ei-4',
      text: 'Yoğun bir günün ardından yalnız kalmak isterim.',
      type: 'multiple-choice',
      category: 'mbti-ei',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion
  ]
}

// MBTI SN Modülü
const mbtiSNModule: TestModule = {
  id: 'mbti-sn',
  title: 'Duyusal - Sezgisel',
  description: 'Bilgi toplama ve işleme tarzınızla ilgili ifadeleri değerlendirin.',
  order: 9,
  questions: [
    {
      id: 'mbti-sn-1',
      text: 'Önce tetkik ve görüntülemelere bakarım.',
      type: 'multiple-choice',
      category: 'mbti-sn',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-sn-2',
      text: 'Önce genel tabloyu kavrayıp sonra detaylara inerim.',
      type: 'multiple-choice',
      category: 'mbti-sn',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-sn-3',
      text: 'Yeni teorik yaklaşımlar ilgimi çeker.',
      type: 'multiple-choice',
      category: 'mbti-sn',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-sn-4',
      text: 'Kanıta dayalı rehberlerle çalışmak bana güven verir.',
      type: 'multiple-choice',
      category: 'mbti-sn',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion
  ]
}

// MBTI TF Modülü
const mbtiTFModule: TestModule = {
  id: 'mbti-tf',
  title: 'Düşünen - Hisseden',
  description: 'Karar verme tarzınızla ilgili ifadeleri değerlendirin.',
  order: 10,
  questions: [
    {
      id: 'mbti-tf-1',
      text: 'Karar verirken veriler ve mantık benim için önceliklidir.',
      type: 'multiple-choice',
      category: 'mbti-tf',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-tf-2',
      text: 'Hastaların duygusal durumunu mutlaka hesaba katarım.',
      type: 'multiple-choice',
      category: 'mbti-tf',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-tf-3',
      text: 'Tartışmalarda doğru bildiğimi açıkça savunurum.',
      type: 'multiple-choice',
      category: 'mbti-tf',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-tf-4',
      text: 'Empati kurmak, zor vakaları daha iyi anlamamı sağlar.',
      type: 'multiple-choice',
      category: 'mbti-tf',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion
  ]
}

// MBTI JP Modülü
const mbtiJPModule: TestModule = {
  id: 'mbti-jp',
  title: 'Yargılayan - Algılayan',
  description: 'Yaşam ve çalışma tarzınızla ilgili ifadeleri değerlendirin.',
  order: 11,
  questions: [
    {
      id: 'mbti-jp-1',
      text: 'Hasta planını en baştan ayrıntılı olarak yaparım.',
      type: 'multiple-choice',
      category: 'mbti-jp',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-jp-2',
      text: 'Beklenmedik vakalara çabuk uyum sağlarım.',
      type: 'multiple-choice',
      category: 'mbti-jp',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-jp-3',
      text: 'Randevuları önceden düzenlemeyi severim.',
      type: 'multiple-choice',
      category: 'mbti-jp',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion,
    {
      id: 'mbti-jp-4',
      text: 'Gerekirse anında plan değiştiririm, sorun değil.',
      type: 'multiple-choice',
      category: 'mbti-jp',
      options: ['Katılıyorum', 'Kararsızım', 'Katılmıyorum']
    } as MultipleChoiceQuestion
  ]
}

// Klinik Tercih Stilleri Modülü
const clinicalPreferencesModule: TestModule = {
  id: 'clinical-preferences',
  title: 'Klinik Tercih Stilleri',
  description: 'Aşağıdaki seçeneklerden size daha uygun olanı seçiniz.',
  order: 12,
  questions: [
    {
      id: 'clinical-1',
      text: 'Hasta Öyküsü Alırken:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Ayrıntılı bilgi almayı severim.',
        'Temel bilgiyi alıp hemen fizik muayeneye geçerim.'
      ]
    } as BinaryQuestion,
    {
      id: 'clinical-2',
      text: 'Poliklinik Tercihim:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Uzun süreli hasta ilişkilerini tercih ederim.',
        'Her gün farklı vakalarla ilgilenmek isterim.'
      ]
    } as BinaryQuestion,
    {
      id: 'clinical-3',
      text: 'Acil Durumlarda:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Hemen sorumluluk alırım.',
        'Önce gözlemler, sonra müdahale ederim.'
      ]
    } as BinaryQuestion,
    {
      id: 'clinical-4',
      text: 'Çocuk Hastalarla İlgili:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Onlarla çalışmayı keyifli bulurum.',
        'Erişkinlerle çalışmak bana daha uygun.'
      ]
    } as BinaryQuestion,
    {
      id: 'clinical-5',
      text: 'Tanı Koyma Tarzım:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Zor ve karmaşık vakalar ilgimi çeker.',
        'Belirtileri net olan hastalarla çalışmayı tercih ederim.'
      ]
    } as BinaryQuestion,
    {
      id: 'clinical-6',
      text: 'Ekip Çalışması:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Takım halinde çalışmak bana moral verir.',
        'Kendi başıma karar almayı tercih ederim.'
      ]
    } as BinaryQuestion,
    {
      id: 'clinical-7',
      text: 'Belirsizlik Karşısında:',
      type: 'binary',
      category: 'clinical',
      options: [
        'Belirsizlik bana merak duygusu verir.',
        'Net ve planlı bir süreç beni rahatlatır.'
      ]
    } as BinaryQuestion
  ]
}

export const testModules: TestModule[] = [
  valuesModule,
  thinkingStyleModule,
  workStyleModule,
  communicationModule,
  motivationModule,
  skillsModule,
  lifestyleModule,
  mbtiEIModule,
  mbtiSNModule,
  mbtiTFModule,
  mbtiJPModule,
  clinicalPreferencesModule
]

export const getAllQuestions = () => {
  return testModules.flatMap(module => module.questions)
}

export const getModuleById = (id: string) => {
  return testModules.find(module => module.id === id)
}

export const getTotalQuestions = () => {
  return getAllQuestions().length
}

export const getNextModule = (currentModuleId: string) => {
  const currentIndex = testModules.findIndex(module => module.id === currentModuleId)
  if (currentIndex === -1 || currentIndex === testModules.length - 1) {
    return null
  }
  return testModules[currentIndex + 1]
}

export const getPreviousModule = (currentModuleId: string) => {
  const currentIndex = testModules.findIndex(module => module.id === currentModuleId)
  if (currentIndex === -1 || currentIndex === 0) {
    return null
  }
  return testModules[currentIndex - 1]
} 