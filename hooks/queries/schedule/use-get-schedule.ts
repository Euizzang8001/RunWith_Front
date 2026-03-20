import { getSchedules } from '@/api/schedules';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// 모든 스케줄 쿼리

export function useGetSchedule(token?: string, belongId?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.schedule.all, belongId],
    queryFn: () => getSchedules(token!, belongId),
    enabled: !!token,
    retry: false,
  });
}
