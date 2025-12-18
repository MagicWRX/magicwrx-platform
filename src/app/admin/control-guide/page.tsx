'use client'

import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useControlGuideData, executeHealthCheck, executeDeployment } from '@/hooks/useControlGuide'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminControlGuidePage() {
  const { user, loading } = useAdminAuth()
  const { data: guideData, loading: dataLoading } = useControlGuideData()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('overview')
  const [executingCommand, setExecutingCommand] = useState<string | null>(null)
  const [commandResult, setCommandResult] = useState<string | null>(null)
  const supabase = createClient()

  const executeCommand = async (command: string, type: 'health-check' | 'deployment') => {
    setExecutingCommand(command)
    setCommandResult(null)
    
    try {
      let result
      if (type === 'health-check') {
        result = await executeHealthCheck(command)
      } else {
        result = await executeDeployment(command as 'vercel' | 'firebase')
      }
      setCommandResult(result.message)
    } catch (error) {
      setCommandResult(`Error executing ${command}: ${error}`)
    } finally {
      setExecutingCommand(null)
    }
  }

  useEffect(() => {
    // Component initialization
  }, [user])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const sections = [
    { id: 'overview', name: 'Service Overview', icon: '🌐' },
    { id: 'environment', name: 'Environment Management', icon: '🔐' },
    { id: 'deployment', name: 'Deployment Protocols', icon: '🚀' },
    { id: 'monitoring', name: 'Monitoring & Status', icon: '📊' },
    { id: 'configuration', name: 'Service Configurations', icon: '⚙️' },
    { id: 'emergency', name: 'Emergency Procedures', icon: '🚨' },
    { id: 'reference', name: 'Quick Reference', icon: '📚' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-blue-400 hover:text-blue-300">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold gradient-text">Magic WRX Master Control Guide</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, {user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="text-sm">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg">
              {/* Content Header */}
              <div className="border-b border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-blue-400">
                    {sections.find(s => s.id === activeSection)?.icon} {sections.find(s => s.id === activeSection)?.name}
                  </h2>
                  <div className="flex space-x-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Version v1.1.3</span>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Live</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                {activeSection === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-green-400">🟢 Service Health Status</h3>
                      {guideData ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {guideData.services.map((service, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span>{service.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className={`${service.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                  {service.status === 'active' ? '🟢' : '🔴'} {service.status}
                                </span>
                                <span className="text-xs text-gray-400">({service.responseTime})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Vercel</span>
                              <span className="text-green-400">🟢 Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Firebase</span>
                              <span className="text-green-400">🟢 Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Supabase</span>
                              <span className="text-green-400">🟢 Active</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Stripe</span>
                              <span className="text-green-400">🟢 Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Resend</span>
                              <span className="text-green-400">�� Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GitHub</span>
                              <span className="text-green-400">🟢 Active</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-blue-400">🌐 Project URLs</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Production:</span>
                          <a href="https://magic-g7ua1cnfl-magicwrxs-projects.vercel.app" target="_blank" className="text-blue-400 ml-2 hover:underline">
                            magic-g7ua1cnfl-magicwrxs-projects.vercel.app
                          </a>
                        </div>
                        <div>
                          <span className="text-gray-400">Development:</span>
                          <a href="http://localhost:3000" target="_blank" className="text-blue-400 ml-2 hover:underline">
                            localhost:3000
                          </a>
                        </div>
                        <div>
                          <span className="text-gray-400">Admin Panel:</span>
                          <a href="/admin/login" className="text-blue-400 ml-2 hover:underline">
                            /admin/login
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'environment' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-yellow-400">🔐 Environment Files</h3>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="text-gray-300">.env.local - Main environment configuration</div>
                        <div className="text-gray-300">.env.example - Template file</div>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-green-400">✅ Service Configuration Status</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Firebase Config</span>
                            <span className="text-green-400">✅ Complete</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Supabase Config</span>
                            <span className="text-green-400">✅ Complete</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Stripe Config</span>
                            <span className="text-green-400">✅ Complete</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Resend Config</span>
                            <span className="text-green-400">✅ Complete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'deployment' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-blue-400">🚀 Quick Deploy Commands</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-400 mb-2">Vercel (Primary)</h4>
                          <div className="flex items-center space-x-2">
                            <code className="bg-gray-800 px-3 py-2 rounded block text-sm flex-1">./deploy-vercel.sh</code>
                            <button 
                              onClick={() => executeCommand('vercel', 'deployment')}
                              disabled={executingCommand === 'vercel'}
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-3 py-2 rounded text-sm flex items-center"
                            >
                              {executingCommand === 'vercel' ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                              ) : null}
                              Deploy
                            </button>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-400 mb-2">Firebase (Backup)</h4>
                          <div className="flex items-center space-x-2">
                            <code className="bg-gray-800 px-3 py-2 rounded block text-sm flex-1">./deploy.sh</code>
                            <button 
                              onClick={() => executeCommand('firebase', 'deployment')}
                              disabled={executingCommand === 'firebase'}
                              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-3 py-2 rounded text-sm flex items-center"
                            >
                              {executingCommand === 'firebase' ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                              ) : null}
                              Deploy
                            </button>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-400 mb-2">Git Workflow</h4>
                          <code className="bg-gray-800 px-3 py-2 rounded block text-sm">./push-to-github.sh</code>
                        </div>
                      </div>
                      {commandResult && (
                        <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
                          <div className="text-sm text-green-400">{commandResult}</div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-green-400">📋 Deployment Status</h3>
                      {guideData ? (
                        <div className="space-y-2 text-sm">
                          {guideData.deployments.slice(0, 3).map((deployment, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span>{deployment.date} - {deployment.platform}</span>
                              <div className="flex items-center space-x-2">
                                <span className={deployment.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                                  {deployment.status === 'success' ? '✅' : '❌'} {deployment.status}
                                </span>
                                <span className="text-xs text-gray-400">({deployment.duration})</span>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
                            <span>Current Version</span>
                            <span className="text-blue-400">{guideData.version}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Last Vercel Deploy</span>
                            <span className="text-green-400">23 Jul 2025 - Success</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current Version</span>
                            <span className="text-blue-400">v1.1.3</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Build Status</span>
                            <span className="text-green-400">✅ Passing</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeSection === 'monitoring' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-blue-400">📊 Health Check Scripts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                          onClick={() => executeCommand('firebase', 'health-check')}
                          disabled={executingCommand === 'firebase'}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors text-sm flex items-center justify-center"
                        >
                          {executingCommand === 'firebase' ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : null}
                          ./firebase-status.sh
                        </button>
                        <button 
                          onClick={() => executeCommand('setup', 'health-check')}
                          disabled={executingCommand === 'setup'}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors text-sm flex items-center justify-center"
                        >
                          {executingCommand === 'setup' ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : null}
                          ./verify-setup.sh
                        </button>
                        <button 
                          onClick={() => executeCommand('integrations', 'health-check')}
                          disabled={executingCommand === 'integrations'}
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors text-sm flex items-center justify-center"
                        >
                          {executingCommand === 'integrations' ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : null}
                          ./test-integrations.sh
                        </button>
                      </div>
                      {commandResult && (
                        <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
                          <div className="text-sm text-green-400">{commandResult}</div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-yellow-400">🔗 Service Dashboards</h3>
                      <div className="space-y-2 text-sm">
                        <a href="https://vercel.com/dashboard" target="_blank" className="block text-blue-400 hover:underline">
                          📊 Vercel Analytics
                        </a>
                        <a href="https://console.firebase.google.com/project/magic-wrx" target="_blank" className="block text-blue-400 hover:underline">
                          🔥 Firebase Console
                        </a>
                        <a href="https://supabase.com/dashboard/project/ujfcflnrtrkdgfclwelz" target="_blank" className="block text-blue-400 hover:underline">
                          💾 Supabase Dashboard
                        </a>
                        <a href="https://dashboard.stripe.com" target="_blank" className="block text-blue-400 hover:underline">
                          💳 Stripe Dashboard
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'configuration' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-purple-400">⚙️ Configuration Files</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="text-blue-400 font-semibold">Core Config</div>
                          <div className="text-gray-300">vercel.json</div>
                          <div className="text-gray-300">firebase.json</div>
                          <div className="text-gray-300">next.config.js</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-green-400 font-semibold">Rules & Security</div>
                          <div className="text-gray-300">firestore.rules</div>
                          <div className="text-gray-300">storage.rules</div>
                          <div className="text-gray-300">.firebaserc</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-orange-400">🔧 Service Integration Status</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Vercel Framework</span>
                          <span className="text-green-400">Next.js 15</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Firebase Project</span>
                          <span className="text-green-400">magic-wrx</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Supabase Region</span>
                          <span className="text-green-400">East US</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stripe Mode</span>
                          <span className="text-yellow-400">Test Mode</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'emergency' && (
                  <div className="space-y-6">
                    <div className="bg-red-900 border border-red-600 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4 text-red-400">🚨 Emergency Procedures</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-red-300 mb-2">Vercel Outage</h4>
                          <code className="bg-gray-800 px-2 py-1 rounded">./deploy.sh</code>
                          <span className="ml-2 text-gray-300">(Switch to Firebase)</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-300 mb-2">Database Issues</h4>
                          <code className="bg-gray-800 px-2 py-1 rounded">firebase firestore:export</code>
                          <span className="ml-2 text-gray-300">(Backup data)</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-300 mb-2">Rollback Deployment</h4>
                          <code className="bg-gray-800 px-2 py-1 rounded">vercel rollback</code>
                          <span className="ml-2 text-gray-300">(Previous version)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-yellow-400">📞 Emergency Contacts</h3>
                      <div className="space-y-2 text-sm">
                        <div>Primary: brian@amazinglystrange.com</div>
                        <div>Backup: brian@magicwrx.com</div>
                        <div>GitHub: @MagicWRX</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'reference' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-blue-400">📚 Essential Commands</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-green-400 mb-2">Development</h4>
                          <div className="space-y-1 font-mono text-xs">
                            <div>npm run dev</div>
                            <div>npm run build</div>
                            <div>./start-dev.sh</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-400 mb-2">Deployment</h4>
                          <div className="space-y-1 font-mono text-xs">
                            <div>vercel --prod</div>
                            <div>firebase deploy</div>
                            <div>./deploy-vercel.sh</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold mb-4 text-orange-400">🗂️ Important Paths</h3>
                      <div className="text-sm space-y-1 font-mono">
                        <div className="text-gray-300">/.env.local</div>
                        <div className="text-gray-300">/vercel.json</div>
                        <div className="text-gray-300">/firebase.json</div>
                        <div className="text-gray-300">/src/app/admin/</div>
                        <div className="text-gray-300">/src/components/</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
