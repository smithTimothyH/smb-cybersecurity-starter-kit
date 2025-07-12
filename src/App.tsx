import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Users, Settings, BarChart3, Download, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import AssessmentForm from './components/AssessmentForm';
import Results from './components/Results';
import ResourceLibrary from './components/ResourceLibrary';
import { AssessmentData, AssessmentResults } from './types/assessment';
import { calculateMaturityScore, generateRecommendations } from './utils/assessment';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'assessment' | 'results' | 'resources'>('welcome');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    const calculatedResults = {
      overallMaturity: calculateMaturityScore(data),
      functionScores: {
        identify: calculateMaturityScore({ identify: data.identify }),
        protect: calculateMaturityScore({ protect: data.protect }),
        detect: calculateMaturityScore({ detect: data.detect }),
        respond: calculateMaturityScore({ respond: data.respond }),
        recover: calculateMaturityScore({ recover: data.recover })
      },
      recommendations: generateRecommendations(data),
      riskLevel: calculateMaturityScore(data) < 2 ? 'high' : calculateMaturityScore(data) < 3 ? 'medium' : 'low'
    };
    setResults(calculatedResults);
    setCurrentStep('results');
  };

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SMB Cybersecurity <span className="text-blue-600">Starter Kit</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive cybersecurity assessment and resource kit for small-to-medium businesses, 
            built on the NIST Cybersecurity Framework (CSF) to help you protect your organization 
            from cyber threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setCurrentStep('assessment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Start Assessment <ArrowRight className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setCurrentStep('resources')}
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Browse Resources <FileText className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">NIST CSF Assessment</h3>
            <p className="text-gray-600">
              Evaluate your organization's cybersecurity maturity across all five NIST CSF functions: 
              Identify, Protect, Detect, Respond, and Recover.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready-to-Use Templates</h3>
            <p className="text-gray-600">
              Access comprehensive policy templates, procedures, and documentation 
              tailored for small-to-medium businesses.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Implementation Guidance</h3>
            <p className="text-gray-600">
              Get step-by-step implementation guides and best practices 
              designed specifically for resource-constrained environments.
            </p>
          </div>
        </div>

        {/* NIST CSF Overview */}
        <div className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Built on the NIST Cybersecurity Framework
          </h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: 'Identify', icon: '🔍', color: 'blue', description: 'Asset management, risk assessment, governance' },
              { name: 'Protect', icon: '🛡️', color: 'green', description: 'Access control, training, data security' },
              { name: 'Detect', icon: '👁️', color: 'yellow', description: 'Monitoring, anomaly detection, continuous monitoring' },
              { name: 'Respond', icon: '🚨', color: 'orange', description: 'Response planning, communications, analysis' },
              { name: 'Recover', icon: '🔄', color: 'purple', description: 'Recovery planning, improvements, communications' }
            ].map((func, index) => (
              <div key={func.name} className="text-center">
                <div className={`bg-${func.color}-100 p-4 rounded-full w-fit mx-auto mb-3`}>
                  <span className="text-2xl">{func.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{func.name}</h3>
                <p className="text-sm text-gray-600">{func.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentStep === 'welcome' && renderWelcomeScreen()}
      {currentStep === 'assessment' && (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <AssessmentForm 
            onComplete={handleAssessmentComplete}
            onBack={() => setCurrentStep('welcome')}
          />
        </div>
      )}
      {currentStep === 'results' && results && (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Results 
            results={results}
            onStartOver={() => {
              setCurrentStep('welcome');
              setAssessmentData(null);
              setResults(null);
            }}
            onViewResources={() => setCurrentStep('resources')}
          />
        </div>
      )}
      {currentStep === 'resources' && (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <ResourceLibrary onBack={() => setCurrentStep('welcome')} />
        </div>
      )}
    </>
  );
}

export default App;