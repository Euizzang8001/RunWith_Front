import { getMyJoinRequestList } from '@/api/join';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export function useGetMineRequestList(token: string) {
  const { isLoaded } = useAuthStore();
  return useQuery({
    queryKey: QUERY_KEYS.request.mineRequestList(token),
    queryFn: () => getMyJoinRequestList(token),
    enabled: !!token && token.length > 0 && isLoaded,
    retry: false,
  });
}
