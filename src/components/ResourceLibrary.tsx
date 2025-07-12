import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, Users, Shield, BookOpen, CheckCircle, Settings, AlertTriangle, Target } from 'lucide-react';

interface ResourceLibraryProps {
  onBack: () => void;
}

const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('policies');

  const categories = [
    { id: 'policies', name: 'Policies & Procedures', icon: FileText, count: 12 },
    { id: 'training', name: 'Training Materials', icon: Users, count: 8 },
    { id: 'templates', name: 'Assessment Templates', icon: CheckCircle, count: 15 },
    { id: 'guides', name: 'Implementation Guides', icon: BookOpen, count: 10 },
    { id: 'compliance', name: 'Compliance Checklists', icon: Shield, count: 6 },
    { id: 'tools', name: 'Tools & Resources', icon: Settings, count: 9 }
  ];

  const resources = {
    policies: [
      {
        title: 'Cybersecurity Policy Template',
        description: 'Comprehensive cybersecurity policy template aligned with NIST CSF',
        type: 'DOCX',
        size: '45 KB',
        category: 'Core Policy',
        priority: 'high'
      },
      {
        title: 'Incident Response Procedure',
        description: 'Step-by-step incident response procedures for SMBs',
        type: 'PDF',
        size: '1.2 MB',
        category: 'Response Planning',
        priority: 'high'
      },
      {
        title: 'Access Control Policy',
        description: 'User access management and control procedures',
        type: 'DOCX',
        size: '32 KB',
        category: 'Protect Function',
        priority: 'medium'
      },
      {
        title: 'Data Classification Policy',
        description: 'Framework for classifying and protecting organizational data',
        type: 'DOCX',
        size: '28 KB',
        category: 'Information Protection',
        priority: 'medium'
      },
      {
        title: 'Vendor Management Policy',
        description: 'Third-party risk management and vendor assessment procedures',
        type: 'DOCX',
        size: '38 KB',
        category: 'Supply Chain',
        priority: 'medium'
      },
      {
        title: 'Business Continuity Plan',
        description: 'Business continuity and disaster recovery planning template',
        type: 'DOCX',
        size: '52 KB',
        category: 'Recover Function',
        priority: 'high'
      }
    ],
    training: [
      {
        title: 'Cybersecurity Awareness Training',
        description: 'Comprehensive security awareness training program for employees',
        type: 'PPTX',
        size: '15.2 MB',
        category: 'General Awareness',
        priority: 'high'
      },
      {
        title: 'Phishing Simulation Kit',
        description: 'Templates and guides for conducting phishing awareness campaigns',
        type: 'ZIP',
        size: '3.4 MB',
        category: 'Email Security',
        priority: 'high'
      },
      {
        title: 'Password Security Training',
        description: 'Best practices for password creation and management',
        type: 'PDF',
        size: '2.1 MB',
        category: 'Access Control',
        priority: 'medium'
      },
      {
        title: 'Remote Work Security Guide',
        description: 'Security guidelines for remote and hybrid work environments',
        type: 'PDF',
        size: '1.8 MB',
        category: 'Remote Security',
        priority: 'medium'
      }
    ],
    templates: [
      {
        title: 'Risk Assessment Worksheet',
        description: 'Comprehensive risk assessment template for SMBs',
        type: 'XLSX',
        size: '85 KB',
        category: 'Risk Management',
        priority: 'high'
      },
      {
        title: 'Asset Inventory Template',
        description: 'IT asset tracking and management spreadsheet',
        type: 'XLSX',
        size: '45 KB',
        category: 'Asset Management',
        priority: 'high'
      },
      {
        title: 'Vulnerability Assessment Checklist',
        description: 'Systematic vulnerability identification and tracking',
        type: 'XLSX',
        size: '38 KB',
        category: 'Vulnerability Management',
        priority: 'medium'
      },
      {
        title: 'Incident Response Checklist',
        description: 'Step-by-step incident response checklist and tracking',
        type: 'XLSX',
        size: '42 KB',
        category: 'Incident Response',
        priority: 'high'
      }
    ],
    guides: [
      {
        title: 'NIST CSF Implementation Guide for SMBs',
        description: 'Complete guide to implementing NIST CSF in small businesses',
        type: 'PDF',
        size: '4.2 MB',
        category: 'Framework Implementation',
        priority: 'high'
      },
      {
        title: 'Network Security Best Practices',
        description: 'Practical network security implementation guide',
        type: 'PDF',
        size: '2.8 MB',
        category: 'Network Security',
        priority: 'medium'
      },
      {
        title: 'Cloud Security Configuration Guide',
        description: 'Security configuration guidelines for common cloud services',
        type: 'PDF',
        size: '3.1 MB',
        category: 'Cloud Security',
        priority: 'medium'
      }
    ],
    compliance: [
      {
        title: 'GDPR Compliance Checklist',
        description: 'GDPR compliance requirements and implementation checklist',
        type: 'PDF',
        size: '1.5 MB',
        category: 'Privacy Compliance',
        priority: 'high'
      },
      {
        title: 'HIPAA Security Checklist',
        description: 'Healthcare organizations security requirements checklist',
        type: 'PDF',
        size: '1.2 MB',
        category: 'Healthcare Compliance',
        priority: 'medium'
      },
      {
        title: 'PCI DSS Self-Assessment',
        description: 'Payment card industry security requirements assessment',
        type: 'PDF',
        size: '2.1 MB',
        category: 'Payment Security',
        priority: 'medium'
      }
    ],
    tools: [
      {
        title: 'Security Configuration Checker',
        description: 'PowerShell script to check Windows security configurations',
        type: 'PS1',
        size: '15 KB',
        category: 'Configuration Management',
        priority: 'medium'
      },
      {
        title: 'Network Scanning Template',
        description: 'Nmap scanning templates for security assessment',
        type: 'TXT',
        size: '8 KB',
        category: 'Network Assessment',
        priority: 'medium'
      },
      {
        title: 'Log Analysis Scripts',
        description: 'Python scripts for basic security log analysis',
        type: 'ZIP',
        size: '25 KB',
        category: 'Log Analysis',
        priority: 'low'
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      case 'pptx': return '📋';
      case 'zip': return '📦';
      default: return '📄';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Library</h1>
            <p className="text-gray-600">Comprehensive collection of cybersecurity templates, policies, and guides</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                activeCategory === category.id
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.count} resources</p>
            </button>
          );
        })}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources[activeCategory as keyof typeof resources]?.map((resource, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getFileIcon(resource.type)}</span>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {resource.type}
                  </span>
                  <div className="text-xs text-gray-400">{resource.size}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(resource.priority)}`}>
                {resource.priority.toUpperCase()}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {resource.category}
              </span>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Guide */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help Getting Started?</h3>
            <p className="text-gray-700 mb-4">
              Our comprehensive implementation guide walks you through setting up each component 
              of your cybersecurity program using the NIST Cybersecurity Framework.
            </p>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Download Implementation Guide
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;