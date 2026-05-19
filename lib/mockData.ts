// Mock LeanIX data for demo purposes
export const mockApplications = {
  allApplications: {
    edges: [
      {
        node: {
          id: 'app-1',
          displayName: 'SAP ERP System',
          description: 'Enterprise Resource Planning system for finance and operations',
          state: 'APPROVED',
          functionalSuitability: 'perfect',
          technicalSuitability: 'adequate',
          businessCriticality: 'missionCritical',
          lxHostingType: 'onPremise',
          lxSixRClassification: 'retain',
          updatedAt: '2024-05-15T10:30:00Z',
          createdAt: '2022-01-10T08:00:00Z',
        },
      },
      {
        node: {
          id: 'app-2',
          displayName: 'Salesforce CRM',
          description: 'Customer relationship management and sales automation',
          state: 'APPROVED',
          functionalSuitability: 'perfect',
          technicalSuitability: 'fullyAppropriate',
          businessCriticality: 'businessCritical',
          lxHostingType: 'saas',
          lxSixRClassification: 'retain',
          updatedAt: '2024-05-14T14:20:00Z',
          createdAt: '2021-06-15T09:00:00Z',
        },
      },
      {
        node: {
          id: 'app-3',
          displayName: 'Legacy Mainframe System',
          description: 'Legacy banking system running on mainframe',
          state: 'APPROVED',
          functionalSuitability: 'appropriate',
          technicalSuitability: 'inappropriate',
          businessCriticality: 'missionCritical',
          lxHostingType: 'onPremise',
          lxSixRClassification: 'rearchitect',
          updatedAt: '2024-05-10T11:45:00Z',
          createdAt: '2019-03-20T07:00:00Z',
        },
      },
      {
        node: {
          id: 'app-4',
          displayName: 'Jira Project Management',
          description: 'Issue tracking and project management tool',
          state: 'APPROVED',
          functionalSuitability: 'appropriate',
          technicalSuitability: 'adequate',
          businessCriticality: 'businessOperational',
          lxHostingType: 'saas',
          lxSixRClassification: 'retain',
          updatedAt: '2024-05-13T09:15:00Z',
          createdAt: '2021-09-01T10:00:00Z',
        },
      },
      {
        node: {
          id: 'app-5',
          displayName: 'Custom Analytics Platform',
          description: 'Internal business intelligence and reporting platform',
          state: 'APPROVED',
          functionalSuitability: 'perfect',
          technicalSuitability: 'fullyAppropriate',
          businessCriticality: 'businessOperational',
          lxHostingType: 'paas',
          lxSixRClassification: 'retain',
          updatedAt: '2024-05-16T13:00:00Z',
          createdAt: '2022-11-05T08:30:00Z',
        },
      },
      {
        node: {
          id: 'app-6',
          displayName: 'Email & Collaboration Suite',
          description: 'Microsoft 365 for email, Teams, and document collaboration',
          state: 'APPROVED',
          functionalSuitability: 'perfect',
          technicalSuitability: 'fullyAppropriate',
          businessCriticality: 'missionCritical',
          lxHostingType: 'saas',
          lxSixRClassification: 'retain',
          updatedAt: '2024-05-17T10:45:00Z',
          createdAt: '2020-02-10T09:00:00Z',
        },
      },
      {
        node: {
          id: 'app-7',
          displayName: 'HR Management System',
          description: 'Human resources and payroll management',
          state: 'APPROVED',
          functionalSuitability: 'appropriate',
          technicalSuitability: 'adequate',
          businessCriticality: 'businessOperational',
          lxHostingType: 'saas',
          lxSixRClassification: 'retain',
          updatedAt: '2024-05-12T15:30:00Z',
          createdAt: '2021-04-20T08:00:00Z',
        },
      },
      {
        node: {
          id: 'app-8',
          displayName: 'Data Migration Tool (Legacy)',
          description: 'Legacy data migration utility - planned for retirement',
          state: 'APPROVED',
          functionalSuitability: 'insufficient',
          technicalSuitability: 'unreasonable',
          businessCriticality: 'administrativeService',
          lxHostingType: 'onPremise',
          lxSixRClassification: 'retire',
          updatedAt: '2024-01-05T11:20:00Z',
          createdAt: '2018-07-15T07:30:00Z',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: 'app-8',
    },
  },
};

export const mockTechnologyStacks = {
  allTechnologyStacks: {
    edges: [
      {
        node: {
          id: 'tech-1',
          displayName: 'Java Spring Boot',
          description: 'Spring Boot microservices framework',
          state: 'APPROVED',
          updatedAt: '2024-05-16T10:00:00Z',
          createdAt: '2021-01-15T08:00:00Z',
        },
      },
      {
        node: {
          id: 'tech-2',
          displayName: 'React.js',
          description: 'Modern JavaScript UI framework',
          state: 'APPROVED',
          updatedAt: '2024-05-17T11:30:00Z',
          createdAt: '2022-03-20T09:00:00Z',
        },
      },
      {
        node: {
          id: 'tech-3',
          displayName: 'PostgreSQL',
          description: 'Open source relational database',
          state: 'APPROVED',
          updatedAt: '2024-05-15T14:45:00Z',
          createdAt: '2021-06-10T08:30:00Z',
        },
      },
      {
        node: {
          id: 'tech-4',
          displayName: 'Kubernetes',
          description: 'Container orchestration platform',
          state: 'APPROVED',
          updatedAt: '2024-05-14T09:20:00Z',
          createdAt: '2022-09-01T10:00:00Z',
        },
      },
      {
        node: {
          id: 'tech-5',
          displayName: 'Apache Kafka',
          description: 'Event streaming platform',
          state: 'APPROVED',
          updatedAt: '2024-05-13T16:15:00Z',
          createdAt: '2023-02-15T08:00:00Z',
        },
      },
      {
        node: {
          id: 'tech-6',
          displayName: 'Next.js',
          description: 'React framework for production applications',
          state: 'APPROVED',
          updatedAt: '2024-05-17T13:00:00Z',
          createdAt: '2023-05-20T09:30:00Z',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: 'tech-6',
    },
  },
};

export const mockITComponents = {
  allITComponents: {
    edges: [
      {
        node: {
          id: 'itc-1',
          displayName: 'Java Application Server',
          description: 'Application server for running Java services',
          state: 'APPROVED',
          updatedAt: '2024-05-16T10:00:00Z',
          createdAt: '2021-01-15T08:00:00Z',
        },
      },
      {
        node: {
          id: 'itc-2',
          displayName: 'Web Server (Apache)',
          description: 'Apache web server for static content',
          state: 'APPROVED',
          updatedAt: '2024-05-15T14:45:00Z',
          createdAt: '2020-03-10T08:30:00Z',
        },
      },
      {
        node: {
          id: 'itc-3',
          displayName: 'Load Balancer',
          description: 'Load balancing infrastructure',
          state: 'APPROVED',
          updatedAt: '2024-05-14T09:20:00Z',
          createdAt: '2021-08-01T10:00:00Z',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: 'itc-3',
    },
  },
};

export const mockBusinessCapabilities = {
  allBusinessCapabilities: {
    edges: [
      {
        node: {
          id: 'bc-1',
          displayName: 'Financial Planning & Analysis',
          description: 'Budget planning and financial forecasting',
          state: 'APPROVED',
          updatedAt: '2024-05-16T10:00:00Z',
          createdAt: '2021-01-15T08:00:00Z',
        },
      },
      {
        node: {
          id: 'bc-2',
          displayName: 'Customer Relationship Management',
          description: 'Manage customer interactions and relationships',
          state: 'APPROVED',
          updatedAt: '2024-05-15T14:45:00Z',
          createdAt: '2021-06-10T08:30:00Z',
        },
      },
      {
        node: {
          id: 'bc-3',
          displayName: 'Human Resources Management',
          description: 'Employee management and HR operations',
          state: 'APPROVED',
          updatedAt: '2024-05-14T09:20:00Z',
          createdAt: '2021-08-01T10:00:00Z',
        },
      },
      {
        node: {
          id: 'bc-4',
          displayName: 'Supply Chain & Procurement',
          description: 'Procurement and supply chain operations',
          state: 'APPROVED',
          updatedAt: '2024-05-13T16:15:00Z',
          createdAt: '2021-09-05T09:15:00Z',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: 'bc-4',
    },
  },
};

// Helper function to get mock data by fact sheet type
export function getMockDataByType(factSheetType: string) {
  const typeMap: Record<string, any> = {
    Application: mockApplications,
    ITComponent: mockITComponents,
    TechnologyStack: mockTechnologyStacks,
    BusinessCapability: mockBusinessCapabilities,
  };

  return typeMap[factSheetType] || mockApplications;
}
