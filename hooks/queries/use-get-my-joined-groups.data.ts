import { getMyJoinedGroups } from '@/api/belongs';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// 특정 그룹에 속한 모든 러너 조회

export function useGetMyJoinedGroups(runnerId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.joinedGroups(runnerId),
    queryFn: () => getMyJoinedGroups(runnerId),
    enabled: !!runnerId,
  });
}
