import { joinRequestAccept } from '@/api/join';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAccpetJoinRequest(callbacks?: UseMutaionCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinRequestAccept,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.request.all,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.group.all,
      });
      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
