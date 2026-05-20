import { ApplicationNode } from './graphDataTransform';

export interface Insight {
  category: 'risk' | 'opportunity' | 'recommendation' | 'metric';
  title: string;
  description: string;
  severity?: 'high' | 'medium' | 'low';
}

export function generateApplicationInsights(applications: ApplicationNode[]): Insight[] {
  const insights: Insight[] = [];

  if (applications.length === 0) return insights;

  // Risk Analysis: Mission-critical systems with poor technical suitability
  const missionCriticalApps = applications.filter(
    (app) => app.businessCriticality === 'missionCritical'
  );

  const missionCriticalAtRisk = missionCriticalApps.filter(
    (app) => app.technicalSuitability === 'inappropriate' || app.technicalSuitability === 'unreasonable'
  );

  if (missionCriticalAtRisk.length > 0) {
    insights.push({
      category: 'risk',
      title: 'Mission-Critical Technical Risk',
      description: `${missionCriticalAtRisk.length} mission-critical system${
        missionCriticalAtRisk.length > 1 ? 's' : ''
      } ${missionCriticalAtRisk.length > 1 ? 'have' : 'has'} inadequate technical suitability: ${missionCriticalAtRisk
        .map((a) => a.displayName)
        .join(', ')}. These require immediate modernization attention.`,
      severity: 'high',
    });
  }

  // Integration complexity analysis
  const totalIntegrations = applications.reduce(
    (sum, app) => sum + (app.integrations?.length || 0),
    0
  );
  const avgIntegrationsPerApp = (totalIntegrations / applications.length).toFixed(1);

  const highlyIntegrated = applications.filter((app) => (app.integrations?.length || 0) > 3);

  if (highlyIntegrated.length > 0) {
    insights.push({
      category: 'metric',
      title: 'Integration Complexity',
      description: `Average of ${avgIntegrationsPerApp} integrations per system. ${highlyIntegrated.length} application${
        highlyIntegrated.length > 1 ? 's are' : ' is'
      } highly integrated (>3 connections): ${highlyIntegrated
        .map((a) => `${a.displayName} (${a.integrations?.length})`)
        .join(', ')}.`,
      severity: 'medium',
    });
  }

  // Retirement candidates
  const retirementCandidates = applications.filter(
    (app) => app.lxSixRClassification === 'retire'
  );

  if (retirementCandidates.length > 0) {
    insights.push({
      category: 'recommendation',
      title: 'Legacy System Retirement',
      description: `${retirementCandidates.length} system${
        retirementCandidates.length > 1 ? 's are' : ' is'
      } planned for retirement: ${retirementCandidates
        .map((a) => a.displayName)
        .join(', ')}. Ensure data migration strategies are in place.`,
      severity: 'medium',
    });
  }

  // System health: Approved vs other states
  const approvedApps = applications.filter((app) => app.state === 'APPROVED');
  const approvalRate = ((approvedApps.length / applications.length) * 100).toFixed(0);

  if (approvalRate !== '100') {
    insights.push({
      category: 'metric',
      title: 'Architecture Governance',
      description: `${approvalRate}% of applications are in APPROVED state (${approvedApps.length}/${applications.length}). Review non-approved applications for quality assurance compliance.`,
    });
  }

  // Modernization opportunities
  const modernizationCandidates = applications.filter(
    (app) =>
      app.lxSixRClassification === 'rearchitect' ||
      app.lxSixRClassification === 'replatform'
  );

  if (modernizationCandidates.length > 0) {
    insights.push({
      category: 'opportunity',
      title: 'Modernization Initiatives',
      description: `${modernizationCandidates.length} system${
        modernizationCandidates.length > 1 ? 's require' : ' requires'
      } rearchitecture or replatforming: ${modernizationCandidates
        .map((a) => a.displayName)
        .join(', ')}. Consider prioritizing based on business criticality.`,
    });
  }

  // SaaS adoption
  const saasApps = applications.filter((app) => app.lxHostingType === 'saas');
  const saasPercentage = ((saasApps.length / applications.length) * 100).toFixed(0);

  insights.push({
    category: 'metric',
    title: 'Cloud & SaaS Adoption',
    description: `${saasPercentage}% of portfolio is SaaS-based (${saasApps.length}/${applications.length}). ${
      parseInt(saasPercentage) > 50
        ? 'Strong cloud adoption strategy in place.'
        : 'Opportunity to increase cloud and SaaS utilization.'
    }`,
  });

  return insights;
}

export function generateTechnologyInsights(technologies: any[]): Insight[] {
  const insights: Insight[] = [];

  if (technologies.length === 0) return insights;

  insights.push({
    category: 'metric',
    title: 'Technology Stack Summary',
    description: `${technologies.length} technologies tracked in the architecture. Ensure all critical components have maintenance plans and vendor support agreements.`,
  });

  return insights;
}
