import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { ArrowLeft, Download, FileText, AlertTriangle, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { AssessmentResults } from '../types/assessment';

interface ResultsProps {
  results: AssessmentResults;
  onStartOver: () => void;
  onViewResources: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onStartOver, onViewResources }) => {
  const chartData = [
    { name: 'Identify', score: results.functionScores.identify, fullMark: 5 },
    { name: 'Protect', score: results.functionScores.protect, fullMark: 5 },
    { name: 'Detect', score: results.functionScores.detect, fullMark: 5 },
    { name: 'Respond', score: results.functionScores.respond, fullMark: 5 },
    { name: 'Recover', score: results.functionScores.recover, fullMark: 5 }
  ];

  const barChartData = Object.entries(results.functionScores).map(([key, value]) => ({
    function: key.charAt(0).toUpperCase() + key.slice(1),
    score: value
  }));

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getMaturityLabel = (score: number) => {
    if (score >= 4.5) return 'Optimized';
    if (score >= 3.5) return 'Managed';
    if (score >= 2.5) return 'Defined';
    if (score >= 1.5) return 'Developing';
    return 'Initial';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Results</h1>
            <p className="text-gray-600">Your cybersecurity maturity assessment based on NIST CSF</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onStartOver}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Start Over
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Overall Maturity</h3>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {results.overallMaturity.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mb-4">out of 5.0</div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {getMaturityLabel(results.overallMaturity)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Level</h3>
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-lg border-2 font-semibold text-lg ${getRiskLevelColor(results.riskLevel)}`}>
              {results.riskLevel.toUpperCase()}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Based on current security posture
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Priority Actions</h3>
            <Target className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {results.recommendations.length}
            </div>
            <div className="text-sm text-gray-600 mb-4">recommendations</div>
            <button
              onClick={onViewResources}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
            >
              View Resources
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="function" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maturity Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar name="Current Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(results.functionScores).map(([func, score]) => (
            <div key={func} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">{func}</h4>
                <p className="text-sm text-gray-600">{getMaturityLabel(score)} Level</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
                <span className="font-semibold text-gray-900 w-12 text-right">
                  {score.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Recommendations</h3>
        <div className="space-y-4">
          {results.recommendations.map((recommendation, index) => (
            <div key={index} className="flex gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{recommendation.title}</h4>
                <p className="text-gray-700 mb-2">{recommendation.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                    recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {recommendation.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 capitalize">{recommendation.function} Function</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onViewResources}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Access Implementation Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;