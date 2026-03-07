import { getMineGroups } from '@/api/belongs';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// 특정 러너가 속한 모든 그룹 조회

export function useGetMineGroups(token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.mineGroups(token),
    queryFn: () => getMineGroups({ token }),
    enabled: !!token,
  });
}
