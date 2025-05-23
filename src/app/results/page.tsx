'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Analiz sonucu tipini tanımlayalım
interface AnalysisResult {
  mbtiType: string;
  mbtiDescription: string;
  personalityTraits: {
    extraversion: number;
    sensing: number;
    thinking: number;
    judging: number;
  };
  specialties: Array<{
    specialty: string;
    score: number;
    reasons: string[];
    description: string;
    personalizedReason?: string;
  }>;
}

export default function ResultsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // localStorage'dan analiz sonuçlarını oku
    try {
      const savedResult = localStorage.getItem('tuskilog_analysis_result');
      const savedTimestamp = localStorage.getItem('tuskilog_analysis_timestamp');
      
      if (!savedResult || !savedTimestamp) {
        // Analiz sonucu yoksa processing'e yönlendir
        router.push('/processing');
        return;
      }

      // 1 saatten eski sonuçları geçersiz say
      const timestamp = new Date(savedTimestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 1) {
        localStorage.removeItem('tuskilog_analysis_result');
        localStorage.removeItem('tuskilog_analysis_timestamp');
        router.push('/processing');
        return;
      }

      const result = JSON.parse(savedResult);
      setAnalysisResult(result);
      setLoading(false);
      
    } catch (error) {
      console.error('Error loading analysis result:', error);
      router.push('/processing');
    }
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!analysisResult) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // PDF için özel bir view oluştur
      const pdfContent = document.createElement('div');
      pdfContent.style.width = '800px';
      pdfContent.style.padding = '40px';
      pdfContent.style.fontFamily = 'Arial, sans-serif';
      pdfContent.style.backgroundColor = 'white';
      pdfContent.style.color = 'black';
      
      // PDF içeriği oluştur
      pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #2563eb; font-size: 32px; margin-bottom: 10px;">TUSKİLOG</h1>
          <h2 style="color: #64748b; font-size: 24px;">Kişiselleştirilmiş Uzmanlık Analiz Raporu</h2>
          <p style="color: #64748b; font-size: 14px;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Kişilik Profili</h3>
          <div style="display: flex; align-items: center; margin: 20px 0;">
            <div style="width: 80px; height: 80px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
              <span style="font-size: 24px; font-weight: bold; color: #2563eb;">${analysisResult.mbtiType}</span>
            </div>
            <div>
              <h4 style="font-size: 18px; margin: 0; color: #1f2937;">${analysisResult.mbtiDescription}</h4>
              <p style="color: #6b7280; margin: 5px 0;">Myers-Briggs Kişilik Tipi</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Önerilen Uzmanlık Dalları</h3>
          ${analysisResult.specialties.map((specialty, index) => `
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h4 style="color: #1f2937; font-size: 18px; margin: 0;">${index + 1}. ${specialty.specialty}</h4>
                <span style="background: #dcfce7; color: #166534; padding: 5px 15px; border-radius: 20px; font-weight: bold;">%${specialty.score} Uyum</span>
              </div>
              
              <p style="color: #4b5563; margin: 15px 0; line-height: 1.6;">${specialty.description}</p>
              
              ${specialty.personalizedReason ? `
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0;">
                  <p style="color: #1e40af; margin: 0; line-height: 1.6;"><strong>Neden Size Uygun:</strong> ${specialty.personalizedReason}</p>
                </div>
              ` : ''}
              
              <div style="margin-top: 15px;">
                <strong style="color: #374151;">Uyumluluk Faktörleri:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  ${specialty.reasons.map(reason => `<li style="color: #4b5563; margin: 5px 0;">${reason}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px;">Bu rapor TUSKİLOG AI sistemi tarafından oluşturulmuştur.</p>
          <p style="color: #9ca3af; font-size: 12px;">tuskilog.com</p>
        </div>
      `;
      
      // Sayfaya geçici olarak ekle (görünmez)
      document.body.appendChild(pdfContent);
      pdfContent.style.position = 'fixed';
      pdfContent.style.left = '-9999px';
      
      // Canvas'a çevir
      const canvas = await html2canvas(pdfContent, {
        width: 800,
        height: pdfContent.scrollHeight,
        scale: 2,
        backgroundColor: 'white'
      });
      
      // PDF oluştur
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 genişliği
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Eğer sayfa yüksekliği A4'ten büyükse, birden fazla sayfaya böl
      let yPosition = 0;
      const pageHeight = 297; // A4 yüksekliği
      
      while (yPosition < imgHeight) {
        const remainingHeight = imgHeight - yPosition;
        const currentPageHeight = Math.min(pageHeight, remainingHeight);
        
        // Canvas'ın bir bölümünü al
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCanvas.width = canvas.width;
          pageCanvas.height = (currentPageHeight * canvas.width) / imgWidth;
          
          pageCtx.drawImage(
            canvas,
            0, (yPosition * canvas.width) / imgWidth,
            canvas.width, pageCanvas.height,
            0, 0,
            canvas.width, pageCanvas.height
          );
          
          const pageImageData = pageCanvas.toDataURL('image/png');
          
          if (yPosition > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(pageImageData, 'PNG', 0, 0, imgWidth, currentPageHeight);
        }
        
        yPosition += currentPageHeight;
      }
      
      // PDF'i indir
      pdf.save(`TUSKİLOG_Analiz_Raporu_${new Date().toLocaleDateString('tr-TR').replace(/\./g, '_')}.pdf`);
      
      // Geçici elementi kaldır
      document.body.removeChild(pdfContent);
      
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert('PDF oluştururken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getMBTITrait = (trait: string, value: number) => {
    const traits = {
      extraversion: value > 50 ? 'Extraversion' : 'Introversion',
      sensing: value > 50 ? 'Sensing' : 'Intuition',
      thinking: value > 50 ? 'Thinking' : 'Feeling',
      judging: value > 50 ? 'Judging' : 'Perceiving'
    };
    return traits[trait as keyof typeof traits];
  };

  // Loading state
  if (loading || !analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Sonuçlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600">TUSKİLOG</h1>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>PDF Hazırlanıyor...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>PDF İndir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Analiz Tamamlandı! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Size en uygun uzmanlık dalları ve detaylı kişilik analizi hazır
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('mbti')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'mbti' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              MBTI Profili
            </button>
            <button
              onClick={() => setActiveTab('specialties')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'specialties' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Uzmanlık Önerileri
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* MBTI Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kişilik Tipiniz</h3>
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary-600">{analysisResult.mbtiType}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{analysisResult.mbtiDescription}</h4>
              </div>
              <div className="space-y-3">
                {Object.entries(analysisResult.personalityTraits).map(([trait, value]) => (
                  <div key={trait} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {getMBTITrait(trait, value)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Specialty */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">En Uygun Uzmanlık</h3>
              <div className="text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getScoreColor(analysisResult.specialties[0]?.score || 0)}`}>
                  %{analysisResult.specialties[0]?.score || 0} Uyum
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {analysisResult.specialties[0]?.specialty || 'Belirlenmedi'}
                </h4>
                <p className="text-gray-600 mb-4">
                  {analysisResult.specialties[0]?.description || 'Açıklama mevcut değil'}
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-800">Neden size uygun:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysisResult.specialties[0]?.reasons.map((reason, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {reason}
                      </li>
                    )) || []}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mbti' && (
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-primary-600">{analysisResult.mbtiType}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{analysisResult.mbtiDescription}</h2>
              <p className="text-gray-600">Myers-Briggs Kişilik Tipi Analizi</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(analysisResult.personalityTraits).map(([trait, value]) => (
                <div key={trait} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800 capitalize">
                      {trait === 'extraversion' ? 'Extraversion vs Introversion' :
                       trait === 'sensing' ? 'Sensing vs Intuition' :
                       trait === 'thinking' ? 'Thinking vs Feeling' : 'Judging vs Perceiving'}
                    </h4>
                    <span className="text-sm font-medium text-primary-600">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>{getMBTITrait(trait, value)}</strong> eğilimi gösteriyorsunuz
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specialties' && (
          <div className="space-y-6">
            {analysisResult.specialties.map((specialty, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{specialty.specialty}</h3>
                      <p className="text-gray-600">{specialty.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(specialty.score)}`}>
                    %{specialty.score} Uyum
                  </div>
                </div>
                
                {/* Kişiselleştirilmiş Açıklama */}
                {specialty.personalizedReason && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Neden Size Uygun
                    </h4>
                    <p className="text-blue-800 leading-relaxed">{specialty.personalizedReason}</p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Uyumluluk Faktörleri:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialty.reasons.map((reason, reasonIndex) => (
                      <span 
                        key={reasonIndex}
                        className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200"
                      >
                        ✓ {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-primary-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Sonuçlarınızı Kaydedin</h3>
            <p className="text-primary-100 mb-6">
              Detaylı analiz raporunuzu PDF olarak indirin ve ileride referans için kullanın
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="bg-white text-primary-600 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Rapor Hazırlanıyor...</span>
                </>
              ) : (
                <span>Raporu PDF Olarak İndir</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 