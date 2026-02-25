import { joinGroup } from '@/api/belongs';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useJoinGroup(callbacks?: UseMutaionCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinGroup,
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.group.all });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.group.joinedGroups(params.runnerId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.group.runnersList(params.groupId),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
