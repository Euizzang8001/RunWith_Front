import { createActions } from '@/api/actions';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function UseCreateActions(callbacks?: UseMutaionCallback) {
  const queryCilent = useQueryClient();
  return useMutation({
    mutationFn: createActions,
    onSuccess: (data) => {
      queryCilent.invalidateQueries({ queryKey: QUERY_KEYS.actions.all });

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
