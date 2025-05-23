'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TEST_CONFIG, ROUTES } from '@/lib/constants'
import { testModules } from '@/data/questions'

export default function WelcomePage() {
  const totalQuestions = testModules.reduce((total, module) => total + module.questions.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600">TUSKİLOG</h1>
            <div className="text-sm text-gray-600">
              Hoş geldin! Teste başlamaya hazır mısın?
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Merhaba! 👋
              <span className="block text-primary-600 mt-2">
                Kişiliğini Keşfetmeye Hazır mısın?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TUSKİLOG kişilik ve tercih testi ile sana en uygun tıp uzmanlık dallarını keşfetmeye başlayacağız. 
              Bu test sayesinde kişiliğin, çalışma tarzın ve motivasyon kaynaklarınla uyumlu 
              uzmanlık dallarını belirleyeceğiz.
            </p>
          </div>
        </div>

        {/* Test Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Süre
            </h3>
            <p className="text-gray-600">
              Yaklaşık {TEST_CONFIG.ESTIMATED_TIME_MINUTES} dakika
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Soru Sayısı
            </h3>
            <p className="text-gray-600">
              {totalQuestions} soru, {testModules.length} modül
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sonuç
            </h3>
            <p className="text-gray-600">
              En uygun 5 uzmanlık dalı + MBTI
            </p>
          </div>
        </div>

        {/* Test Modules Preview */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Test Modülleri
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {testModules.map((module, index) => (
              <div key={module.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.questions.length} soru</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Önemli Notlar
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Her soruyu dikkatlice okuyun ve içtenlikle yanıtlayın
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              "Doğru" veya "yanlış" cevap yoktur, sadece sizi en iyi yansıtan seçenekleri işaretleyin
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              İlk aklınıza gelen cevabı verin, uzun süre düşünmeyin
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Test boyunca geri dönüp cevaplarınızı değiştirebilirsiniz
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Link href={ROUTES.TEST.VALUES}>
            <Button size="lg" className="px-12 py-4 text-lg transform hover:scale-105">
              Teste Başla 🚀
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Teste başladığınızda, verileriniz güvenli şekilde kaydedilecektir.
          </p>
        </div>
      </main>
    </div>
  )
} 