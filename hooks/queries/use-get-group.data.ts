import { getGroups } from '@/api/group';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetGroups() {
  return useQuery({
    queryKey: QUERY_KEYS.group.list,
    queryFn: getGroups,
  });
}
