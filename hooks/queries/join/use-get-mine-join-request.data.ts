import { getMyJoinRequestList } from '@/api/join';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetMineRequestList(token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.request.mineRequestList(token),
    queryFn: () => getMyJoinRequestList(token),
    enabled: !!token,
  });
}
