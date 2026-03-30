import { getGroups } from '@/api/group';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetGroups(token: string, groupName: string) {
  return useQuery({
    queryKey: QUERY_KEYS.group.searchGroups(token, groupName),
    queryFn: () => getGroups(token, groupName),
    enabled: !!token || !!groupName,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
