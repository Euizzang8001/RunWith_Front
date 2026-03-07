import { getRunnerGroup } from '@/api/belongs';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// 특정 러너가 속한 모든 그룹 조회

export function useGetRunnerGroups(runnerId: string, token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.joinedGroups(token, runnerId),
    queryFn: () => getRunnerGroup({ token, runnerId }),
    enabled: !!token,
  });
}
