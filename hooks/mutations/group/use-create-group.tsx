import { createGroup } from '@/api/group';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateGroup(callbacks?: UseMutaionCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.group.list });

      if (callbacks?.onSuccess) return callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) return callbacks.onError(error);
    },
  });
}
