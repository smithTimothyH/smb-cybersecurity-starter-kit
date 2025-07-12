export interface AssessmentData {
  identify: {
    assetManagement: number;
    governance: number;
    riskAssessment: number;
    riskManagement: number;
    supplyChain: number;
  };
  protect: {
    accessControl: number;
    awareness: number;
    dataSecurityDefense: number;
    informationProtection: number;
    maintenance: number;
    protectiveTechnology: number;
  };
  detect: {
    anomaliesEvents: number;
    securityMonitoring: number;
    detectionProcesses: number;
  };
  respond: {
    responsePlanning: number;
    communications: number;
    analysis: number;
    mitigation: number;
    improvements: number;
  };
  recover: {
    recoveryPlanning: number;
    improvements: number;
    communications: number;
  };
}

export interface AssessmentResults {
  overallMaturity: number;
  functionScores: {
    identify: number;
    protect: number;
    detect: number;
    respond: number;
    recover: number;
  };
  recommendations: Recommendation[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  function: string;
}