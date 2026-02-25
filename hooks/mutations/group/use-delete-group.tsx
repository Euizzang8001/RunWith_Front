import { deleteGroup } from '@/api/group';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteGroup(callbacks?: UseMutaionCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.group.list });

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
