import { deleteRunner } from '@/api/auth';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteRunner(callbacks?: UseMutaionCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRunner,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.all });

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
