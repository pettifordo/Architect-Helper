import { gql } from 'graphql-request';

// Get all applications with key fields
export const ALL_APPLICATIONS_QUERY = gql`
  query GetApplications($first: Int, $after: String) {
    allApplications(first: $first, after: $after) {
      edges {
        node {
          id
          displayName
          description
          state
          functionalSuitability
          technicalSuitability
          businessCriticality
          lxHostingType
          lxSixRClassification
          updatedAt
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get application detail
export const APPLICATION_DETAIL_QUERY = gql`
  query GetApplicationDetail($id: ID!) {
    application(id: $id) {
      id
      displayName
      description
      state
      functionalSuitability
      technicalSuitability
      businessCriticality
      lxHostingType
      lxSixRClassification
      updatedAt
      createdAt
    }
  }
`;

// Get IT Components
export const ALL_IT_COMPONENTS_QUERY = gql`
  query GetITComponents($first: Int, $after: String) {
    allITComponents(first: $first, after: $after) {
      edges {
        node {
          id
          displayName
          description
          state
          updatedAt
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get Platforms
export const ALL_PLATFORMS_QUERY = gql`
  query GetPlatforms($first: Int, $after: String) {
    allPlatforms(first: $first, after: $after) {
      edges {
        node {
          id
          displayName
          description
          state
          updatedAt
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get Technology Stacks
export const ALL_TECHNOLOGY_STACKS_QUERY = gql`
  query GetTechnologyStacks($first: Int, $after: String) {
    allTechnologyStacks(first: $first, after: $after) {
      edges {
        node {
          id
          displayName
          description
          state
          updatedAt
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get Business Capabilities
export const ALL_BUSINESS_CAPABILITIES_QUERY = gql`
  query GetBusinessCapabilities($first: Int, $after: String) {
    allBusinessCapabilities(first: $first, after: $after) {
      edges {
        node {
          id
          displayName
          description
          state
          updatedAt
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get application to IT component relationships
export const APPLICATION_TO_IT_COMPONENTS = gql`
  query GetApplicationITComponents($applicationId: ID!) {
    application(id: $applicationId) {
      id
      displayName
      relToITComponent {
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  }
`;

// Get application to platform relationships
export const APPLICATION_TO_PLATFORMS = gql`
  query GetApplicationPlatforms($applicationId: ID!) {
    application(id: $applicationId) {
      id
      displayName
      relToPlatform {
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  }
`;

// Helper function to build filtered queries
export function buildFilteredQuery(
  factSheetType: string,
  filters?: Record<string, any>
): string {
  // This is a placeholder - actual implementation would need
  // to handle LeanIX's filter syntax
  const factSheetTypeMap: Record<string, string> = {
    Application: 'allApplications',
    ITComponent: 'allITComponents',
    Platform: 'allPlatforms',
    TechnologyStack: 'allTechnologyStacks',
    BusinessCapability: 'allBusinessCapabilities',
  };

  const queryName = factSheetTypeMap[factSheetType];
  if (!queryName) {
    throw new Error(`Unsupported fact sheet type: ${factSheetType}`);
  }

  return `query { ${queryName} { edges { node { id displayName } } } }`;
}
