import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ALL_APPLICATIONS_QUERY, APPLICATION_DETAIL_QUERY } from '@/lib/queries';
import { Application, LeanIXResponse, FactSheetConnection } from '@/types/leanix';

export function useApplications(first: number = 100, after?: string) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['applications', first, after],
    queryFn: async () => {
      if (!session?.leanixAccessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/leanix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ALL_APPLICATIONS_QUERY,
          variables: { first, after },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = (await response.json()) as LeanIXResponse<{
        allApplications: FactSheetConnection<Application>;
      }>;

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      return data.data?.allApplications || { edges: [], pageInfo: { hasNextPage: false } };
    },
    enabled: !!session?.leanixAccessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useApplicationDetail(id: string) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['application', id],
    queryFn: async () => {
      if (!session?.leanixAccessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/leanix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: APPLICATION_DETAIL_QUERY,
          variables: { id },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch application detail');
      }

      const data = (await response.json()) as LeanIXResponse<{
        application: Application;
      }>;

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      return data.data?.application;
    },
    enabled: !!session?.leanixAccessToken && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useApplicationITComponents(applicationId: string) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['application-it-components', applicationId],
    queryFn: async () => {
      if (!session?.leanixAccessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/leanix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              application(id: "${applicationId}") {
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
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch IT components');
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      return data.data?.application?.relToITComponent?.edges || [];
    },
    enabled: !!session?.leanixAccessToken && !!applicationId,
    staleTime: 5 * 60 * 1000,
  });
}
