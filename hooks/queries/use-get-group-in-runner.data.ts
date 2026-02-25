import { getGroupInRunner } from '@/api/belongs';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

// 특정 그룹에 속한 모든 러너 조회

export function useGetGroupInRunner(groupId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.runnersList(groupId),
    queryFn: () => getGroupInRunner(groupId),
    enabled: !!groupId,
  });
}
