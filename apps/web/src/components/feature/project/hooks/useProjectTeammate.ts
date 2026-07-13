import { useQueryClient } from '@tanstack/react-query';

import {
  getGetProjectByHandleQueryOptions,
  getGetProjectTeammatesQueryOptions,
  useRemoveTeammate as useRemoveTeammateMutation,
  useUpdateTeammate as useUpdateTeammateMutation,
} from '@/api/__generated__/project/project';

async function invalidateProjectTeammates(
  queryClient: ReturnType<typeof useQueryClient>,
  handle: string,
) {
  await Promise.all([
    queryClient.invalidateQueries(getGetProjectTeammatesQueryOptions(handle)),
    queryClient.invalidateQueries(getGetProjectByHandleQueryOptions(handle)),
  ]);
}

export function useUpdateProjectTeammate() {
  const queryClient = useQueryClient();

  return useUpdateTeammateMutation({
    mutation: {
      onSuccess: async (_data, { handle }) => {
        await invalidateProjectTeammates(queryClient, handle);
      },
    },
  });
}

export function useRemoveProjectTeammate() {
  const queryClient = useQueryClient();

  return useRemoveTeammateMutation({
    mutation: {
      onSuccess: async (_data, { handle }) => {
        await invalidateProjectTeammates(queryClient, handle);
      },
    },
  });
}
