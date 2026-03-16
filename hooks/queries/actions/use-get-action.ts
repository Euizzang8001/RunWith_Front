import { getActions } from '@/api/actions';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetActions(token: string, scheduleId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.actions.actionsList(scheduleId!),
    queryFn: () => getActions({ token: token!, scheduleId: scheduleId! }),
    enabled: !!token && !!scheduleId,
    retry: false,
  });
}
