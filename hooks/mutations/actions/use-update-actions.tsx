import { updateActions } from '@/api/actions';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateActions(callbacks?: UseMutaionCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateActions,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['actions'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['actionsDetail'],
      });

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
