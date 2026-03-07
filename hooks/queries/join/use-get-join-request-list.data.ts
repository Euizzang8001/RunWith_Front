import { getJoinRequestList } from '@/api/join';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetJoinRequestList(groupId: string, token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.request.joinRequest(groupId),
    queryFn: () => getJoinRequestList({ groupId, token }),
    enabled: !!groupId && !!token,
  });
}
