'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TestStore } from '@/lib/testStore';

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps = [
    { id: 1, title: "Test Verilerini Topluyor", description: "Cevaplarınız güvenli şekilde işleniyor" },
    { id: 2, title: "Kişilik Profilinizi Analiz Ediyor", description: "MBTI ve kişilik özellikleriniz değerlendiriliyor" },
    { id: 3, title: "Uzmanlık Uyumluluğunu Hesaplıyor", description: "Her uzmanlık dalı için uyumluluk puanları hesaplanıyor" },
    { id: 4, title: "AI Önerilerini Hazırlıyor", description: "Size özel detaylı analiz ve öneriler oluşturuluyor" },
    { id: 5, title: "Son Raporu Hazırlıyor", description: "Tüm veriler bir araya getiriliyor" }
  ];

  useEffect(() => {
    // Test verilerini kontrol et
    const testStore = TestStore.getInstance();
    const session = testStore.getCurrentSession();
    
    if (!session || !session.completedAt) {
      router.push('/welcome');
      return;
    }

    const startAnalysis = async () => {
      setIsAnalyzing(true);
      
      try {
        // Test verilerini hazırla
        const answers = testStore.getFormattedAnswers();
        
        // AI analizini başlat
        const response = await fetch('/api/test/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers }),
        });

        if (!response.ok) {
          throw new Error('Analiz başarısız oldu');
        }

        const result = await response.json();
        
        if (result.success) {
          // Sonuçları localStorage'a kaydet
          localStorage.setItem('tuskilog_analysis_result', JSON.stringify(result.analysis));
          localStorage.setItem('tuskilog_analysis_timestamp', result.timestamp);
        } else {
          throw new Error(result.error || 'Analiz başarısız oldu');
        }

      } catch (error) {
        console.error('Analysis error:', error);
        alert('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        router.push('/test/clinical');
        return;
      }
    };

    // Progress animasyonunu başlat
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Analysis tamamlandığında results'a yönlendir
          setTimeout(() => {
            router.push('/results');
          }, 2000);
          return 100;
        }
        
        // Her %20'de bir sonraki adıma geç
        const newProgress = prev + 1.5; // Biraz daha yavaş
        const newStep = Math.floor(newProgress / 20);
        if (newStep !== currentStep && newStep < steps.length) {
          setCurrentStep(newStep);
        }
        
        return newProgress;
      });
    }, 200); // Her 200ms'de %1.5 artır = ~13 saniyede %100

    // Analizi başlat
    startAnalysis();

    return () => clearInterval(timer);
  }, [currentStep, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Analiz Ediliyor
          </h1>
          <p className="text-xl text-gray-600">
            AI sistemimiz test sonuçlarınızı analiz ederek size en uygun uzmanlık dallarını belirlemiyor
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>İlerleme</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              {currentStep + 1}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {steps[currentStep]?.title}
            </h3>
          </div>
          <p className="text-gray-600 ml-11">
            {steps[currentStep]?.description}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-green-50 text-green-700' 
                  : index === currentStep 
                    ? 'bg-blue-50 text-blue-700 animate-pulse' 
                    : 'bg-gray-50 text-gray-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs font-bold ${
                index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
              }`}>
                {index < currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div>
                <div className="font-medium">{step.title}</div>
                <div className="text-sm opacity-75">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Bu işlem yaklaşık 10-15 saniye sürmektedir. Lütfen sayfayı kapatmayınız.
          </p>
        </div>
      </div>
    </div>
  );
} 