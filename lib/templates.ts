import { ReportConfig, ChartType } from '@/types/leanix';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  query: string;
  config: ReportConfig;
}

export const TEMPLATES: Record<string, Template> = {
  'application-landscape': {
    id: 'application-landscape',
    name: 'Application Landscape',
    description: 'Overview of all applications with their lifecycle status and business criticality',
    icon: '📊',
    query: `
      query {
        allApplications(first: 100) {
          edges {
            node {
              id
              displayName
              businessCriticality
              technicalSuitability
              functionalSuitability
              lxSixRClassification
              updatedAt
            }
          }
        }
      }
    `,
    config: {
      id: 'application-landscape',
      name: 'Application Landscape',
      factSheetType: 'Application',
      chartType: 'table',
    },
  },
  'tech-stack': {
    id: 'tech-stack',
    name: 'Technology Stack Analysis',
    description: 'Analyze technologies in use across applications',
    icon: '🛠️',
    query: `
      query {
        allTechnologyStacks(first: 50) {
          edges {
            node {
              id
              displayName
              description
              state
            }
          }
        }
      }
    `,
    config: {
      id: 'tech-stack',
      name: 'Technology Stack Analysis',
      factSheetType: 'TechnologyStack',
      chartType: 'bar',
    },
  },
  'portfolio': {
    id: 'portfolio',
    name: 'Application Portfolio',
    description: 'Portfolio view with lifecycle and business metrics',
    icon: '📈',
    query: `
      query {
        allApplications(first: 100) {
          edges {
            node {
              id
              displayName
              businessCriticality
              technicalSuitability
              lxSixRClassification
            }
          }
        }
      }
    `,
    config: {
      id: 'portfolio',
      name: 'Application Portfolio',
      factSheetType: 'Application',
      chartType: 'scatter',
    },
  },
  'integration-map': {
    id: 'integration-map',
    name: 'Integration Map',
    description: 'Interactive network visualization showing application integrations and connections',
    icon: '🔗',
    query: `
      query {
        allApplications(first: 50) {
          edges {
            node {
              id
              displayName
              description
              businessCriticality
              technicalSuitability
              functionalSuitability
              state
            }
          }
        }
      }
    `,
    config: {
      id: 'integration-map',
      name: 'Integration Map',
      factSheetType: 'Application',
      chartType: 'graph',
    },
  },
  'risk-dashboard': {
    id: 'risk-dashboard',
    name: 'Risk Assessment',
    description: 'Technical and business risk assessment dashboard',
    icon: '⚠️',
    query: `
      query {
        allApplications(first: 100) {
          edges {
            node {
              id
              displayName
              technicalSuitability
              functionalSuitability
              businessCriticality
            }
          }
        }
      }
    `,
    config: {
      id: 'risk-dashboard',
      name: 'Risk Assessment',
      factSheetType: 'Application',
      chartType: 'pie',
    },
  },
};

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES[id];
}

export function getAllTemplates(): Template[] {
  return Object.values(TEMPLATES);
}
