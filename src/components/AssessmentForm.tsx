import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { AssessmentData } from '../types/assessment';

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
  onBack: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete, onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<AssessmentData>({
    identify: {
      assetManagement: 1,
      governance: 1,
      riskAssessment: 1,
      riskManagement: 1,
      supplyChain: 1
    },
    protect: {
      accessControl: 1,
      awareness: 1,
      dataSecurityDefense: 1,
      informationProtection: 1,
      maintenance: 1,
      protectiveTechnology: 1
    },
    detect: {
      anomaliesEvents: 1,
      securityMonitoring: 1,
      detectionProcesses: 1
    },
    respond: {
      responsePlanning: 1,
      communications: 1,
      analysis: 1,
      mitigation: 1,
      improvements: 1
    },
    recover: {
      recoveryPlanning: 1,
      improvements: 1,
      communications: 1
    }
  });

  const sections = [
    {
      name: 'Identify',
      description: 'Develop organizational understanding to manage cybersecurity risk',
      questions: [
        { key: 'assetManagement', label: 'Asset Management', description: 'Organizational assets including information systems, hardware, software, data, and facilities are inventoried, classified, and managed throughout their lifecycle with appropriate security controls and ownership assignments' },
        { key: 'governance', label: 'Governance', description: 'Policies, procedures, and processes to manage and monitor cybersecurity risk' },
        { key: 'riskAssessment', label: 'Risk Assessment', description: 'Regular risk assessments are conducted to identify cybersecurity risks' },
        { key: 'riskManagement', label: 'Risk Management Strategy', description: 'Risk management processes are established and managed' },
        { key: 'supplyChain', label: 'Supply Chain Risk Management', description: 'Third-party relationships and supply chain risks are managed' }
      ]
    },
    {
      name: 'Protect',
      description: 'Develop and implement appropriate safeguards',
      questions: [
        { key: 'accessControl', label: 'Access Control', description: 'Access to assets is limited to authorized users and processes' },
        { key: 'awareness', label: 'Awareness and Training', description: 'Personnel are provided cybersecurity awareness education' },
        { key: 'dataSecurityDefense', label: 'Data Security', description: 'Data is protected in accordance with risk strategy' },
        { key: 'informationProtection', label: 'Information Protection', description: 'Information protection processes are maintained' },
        { key: 'maintenance', label: 'Maintenance', description: 'Maintenance and repairs are performed with integrity' },
        { key: 'protectiveTechnology', label: 'Protective Technology', description: 'Technical security solutions are managed to ensure resilience' }
      ]
    },
    {
      name: 'Detect',
      description: 'Develop and implement activities to identify cybersecurity events',
      questions: [
        { key: 'anomaliesEvents', label: 'Anomalies and Events', description: 'Anomalous activity is detected and the potential impact is understood' },
        { key: 'securityMonitoring', label: 'Security Continuous Monitoring', description: 'Information systems are monitored to detect cybersecurity events' },
        { key: 'detectionProcesses', label: 'Detection Processes', description: 'Detection processes are maintained and tested' }
      ]
    },
    {
      name: 'Respond',
      description: 'Develop and implement activities to take action regarding detected cybersecurity events',
      questions: [
        { key: 'responsePlanning', label: 'Response Planning', description: 'Response processes and procedures are executed and maintained' },
        { key: 'communications', label: 'Communications', description: 'Response activities are coordinated with internal and external stakeholders' },
        { key: 'analysis', label: 'Analysis', description: 'Analysis is conducted to ensure response is effective' },
        { key: 'mitigation', label: 'Mitigation', description: 'Activities are performed to prevent expansion of an event' },
        { key: 'improvements', label: 'Improvements', description: 'Response activities are improved through lessons learned' }
      ]
    },
    {
      name: 'Recover',
      description: 'Develop and implement activities to maintain resilience and restore capabilities',
      questions: [
        { key: 'recoveryPlanning', label: 'Recovery Planning', description: 'Recovery processes and procedures are executed and maintained' },
        { key: 'improvements', label: 'Improvements', description: 'Recovery planning is improved through lessons learned' },
        { key: 'communications', label: 'Communications', description: 'Recovery activities are coordinated with internal and external parties' }
      ]
    }
  ];

  const maturityLevels = [
    { value: 1, label: 'Initial', description: 'Partial - Ad hoc processes' },
    { value: 2, label: 'Developing', description: 'Risk-informed processes' },
    { value: 3, label: 'Defined', description: 'Repeatable processes' },
    { value: 4, label: 'Managed', description: 'Adaptive processes' },
    { value: 5, label: 'Optimized', description: 'Continuously improving' }
  ];

  const handleInputChange = (section: string, question: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof AssessmentData],
        [question]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      onBack();
    }
  };

  const currentSectionData = sections[currentSection];
  const sectionKey = currentSectionData.name.toLowerCase() as keyof AssessmentData;
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentSectionData.name} Function
        </h2>
        <p className="text-gray-600">{currentSectionData.description}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentSectionData.questions.map((question) => (
          <div key={question.key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {question.label}
            </h3>
            <p className="text-gray-600 mb-4">{question.description}</p>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Current Maturity Level:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {maturityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => handleInputChange(sectionKey, question.key, level.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      formData[sectionKey][question.key as keyof typeof formData[typeof sectionKey]] === level.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {formData[sectionKey][question.key as keyof typeof formData[typeof sectionKey]] === level.value && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="font-medium">{level.value}</span>
                    </div>
                    <div className="text-sm font-medium">{level.label}</div>
                    <div className="text-xs">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentSection === 0 ? 'Back to Home' : 'Previous'}
        </button>
        
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentSection === sections.length - 1 ? 'View Results' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;