import { GraphQLClient } from 'graphql-request';

let leanixClient: GraphQLClient | null = null;

export function getLeanIXClient(accessToken: string): GraphQLClient {
  if (!leanixClient) {
    leanixClient = new GraphQLClient('https://syensqo.leanix.net/api/v1/graphql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    // Update the authorization header with new token
    leanixClient.setHeader('Authorization', `Bearer ${accessToken}`);
  }

  return leanixClient;
}

export function resetLeanIXClient() {
  leanixClient = null;
}

// Helper to make requests to LeanIX API with error handling
export async function queryLeanIX<T>(
  query: string,
  variables?: Record<string, any>,
  accessToken?: string
): Promise<T> {
  if (!accessToken) {
    throw new Error('No LeanIX access token provided');
  }

  const client = getLeanIXClient(accessToken);

  try {
    const data = await client.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('LeanIX GraphQL Error:', error);
    throw error;
  }
}
