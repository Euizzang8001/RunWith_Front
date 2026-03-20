import { getMySchedules } from '@/api/schedules';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// 내 스케줄 쿼리
export function useGetMySchedule(token?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.schedule.all,
    queryFn: () => getMySchedules(token!),
    enabled: !!token,
    retry: false,
  });
}
