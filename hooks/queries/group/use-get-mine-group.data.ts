import { getSelfGroup } from '@/api/group';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetSelfGroup(token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.groupList(token),
    queryFn: () => getSelfGroup(token),
    enabled: !!token,
  });
}
