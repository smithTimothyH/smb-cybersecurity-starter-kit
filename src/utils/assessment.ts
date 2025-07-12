import { AssessmentData, Recommendation } from '../types/assessment';

export const calculateMaturityScore = (data: Partial<AssessmentData>): number => {
  let totalScore = 0;
  let totalQuestions = 0;

  Object.values(data).forEach(section => {
    if (section && typeof section === 'object') {
      Object.values(section).forEach(score => {
        if (typeof score === 'number') {
          totalScore += score;
          totalQuestions += 1;
        }
      });
    }
  });

  return totalQuestions > 0 ? totalScore / totalQuestions : 0;
};

export const generateRecommendations = (data: AssessmentData): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Identify Function Recommendations
  if (data.identify.assetManagement < 3) {
    recommendations.push({
      title: 'Implement Asset Management Program',
      description: 'Create a comprehensive inventory of all organizational assets including hardware, software, and data. Implement asset tracking and lifecycle management processes.',
      priority: 'high',
      function: 'identify'
    });
  }

  if (data.identify.riskAssessment < 3) {
    recommendations.push({
      title: 'Establish Regular Risk Assessments',
      description: 'Implement a formal risk assessment process to identify, analyze, and evaluate cybersecurity risks to organizational operations and assets.',
      priority: 'high',
      function: 'identify'
    });
  }

  if (data.identify.governance < 3) {
    recommendations.push({
      title: 'Develop Cybersecurity Governance Framework',
      description: 'Establish cybersecurity policies, procedures, and governance structures. Define roles and responsibilities for cybersecurity management.',
      priority: 'medium',
      function: 'identify'
    });
  }

  // Protect Function Recommendations
  if (data.protect.accessControl < 3) {
    recommendations.push({
      title: 'Strengthen Access Control Measures',
      description: 'Implement principle of least privilege, multi-factor authentication, and regular access reviews. Ensure proper user provisioning and deprovisioning processes.',
      priority: 'high',
      function: 'protect'
    });
  }

  if (data.protect.awareness < 3) {
    recommendations.push({
      title: 'Enhance Security Awareness Training',
      description: 'Develop comprehensive security awareness training program for all personnel. Include phishing simulations and regular security updates.',
      priority: 'medium',
      function: 'protect'
    });
  }

  if (data.protect.dataSecurityDefense < 3) {
    recommendations.push({
      title: 'Implement Data Protection Controls',
      description: 'Deploy data encryption, backup solutions, and data loss prevention tools. Establish data classification and handling procedures.',
      priority: 'high',
      function: 'protect'
    });
  }

  // Detect Function Recommendations
  if (data.detect.securityMonitoring < 3) {
    recommendations.push({
      title: 'Deploy Security Monitoring Solutions',
      description: 'Implement continuous monitoring tools such as SIEM, IDS/IPS, and endpoint detection. Establish security monitoring procedures and alerting.',
      priority: 'high',
      function: 'detect'
    });
  }

  if (data.detect.anomaliesEvents < 3) {
    recommendations.push({
      title: 'Enhance Anomaly Detection Capabilities',
      description: 'Improve ability to detect anomalous activities and events that could indicate cybersecurity incidents. Implement baseline monitoring and alerting.',
      priority: 'medium',
      function: 'detect'
    });
  }

  // Respond Function Recommendations
  if (data.respond.responsePlanning < 3) {
    recommendations.push({
      title: 'Develop Incident Response Plan',
      description: 'Create comprehensive incident response procedures including roles, responsibilities, communication plans, and escalation procedures.',
      priority: 'high',
      function: 'respond'
    });
  }

  if (data.respond.communications < 3) {
    recommendations.push({
      title: 'Establish Incident Communication Protocols',
      description: 'Define internal and external communication procedures for cybersecurity incidents. Include stakeholder notification and media relations.',
      priority: 'medium',
      function: 'respond'
    });
  }

  // Recover Function Recommendations
  if (data.recover.recoveryPlanning < 3) {
    recommendations.push({
      title: 'Create Business Continuity and Recovery Plans',
      description: 'Develop comprehensive business continuity and disaster recovery plans. Include backup and restoration procedures, alternate site operations.',
      priority: 'high',
      function: 'recover'
    });
  }

  if (data.recover.improvements < 3) {
    recommendations.push({
      title: 'Implement Continuous Improvement Process',
      description: 'Establish processes to incorporate lessons learned from incidents and exercises into recovery planning improvements.',
      priority: 'low',
      function: 'recover'
    });
  }

  // Sort by priority
  const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
  return recommendations.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
};