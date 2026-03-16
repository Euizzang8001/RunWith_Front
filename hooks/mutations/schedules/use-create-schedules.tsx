import { createSchedules } from '@/api/schedules';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutaionCallback } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateSchedule(callbacks?: UseMutaionCallback) {
  const queryCilent = useQueryClient();
  return useMutation({
    mutationFn: createSchedules,
    onSuccess: (data) => {
      queryCilent.invalidateQueries({ queryKey: QUERY_KEYS.schedule.all });

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
