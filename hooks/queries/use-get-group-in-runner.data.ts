import { getRunnerInGroups } from '@/api/belongs';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetGroupInRunner(groupId: string, token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.runnersList(groupId),
    queryFn: () => getRunnerInGroups(groupId, token),
    enabled: !!groupId && !!token,
  });
}
