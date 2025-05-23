'use client'

import { useEffect, useState } from 'react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { TestStore } from '@/lib/testStore'
import { testModules } from '@/data/questions'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [progress, setProgress] = useState(0)
  const [currentModuleTitle, setCurrentModuleTitle] = useState('')

  useEffect(() => {
    const testStore = TestStore.getInstance()
    
    // Initialize session if not exists
    let session = testStore.getCurrentSession()
    if (!session) {
      session = testStore.initializeSession()
    }

    // Update progress
    const progressPercent = testStore.getProgressPercentage()
    setProgress(progressPercent)

    // Get current module title
    const currentModuleId = testStore.getCurrentModuleId()
    const currentModule = testModules.find(m => m.id === currentModuleId)
    setCurrentModuleTitle(currentModule?.title || '')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-600">TUSKİLOG</h1>
              <div className="hidden md:block text-sm text-gray-600">
                {currentModuleTitle}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                İlerleme: {progress}%
              </div>
              <div className="w-32">
                <ProgressBar 
                  value={progress} 
                  showText={false} 
                  size="sm" 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              TUSKİLOG - TUS Uzmanlık Tercih Sistemi
            </div>
            <div>
              Verileriniz güvenli şekilde saklanır
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 