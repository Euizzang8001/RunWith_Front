import { getSchedules } from '@/api/schedules';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetSchedule(token?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.schedule.all,
    queryFn: () => getSchedules(token!),
    enabled: !!token,
    retry: false,
  });
}
