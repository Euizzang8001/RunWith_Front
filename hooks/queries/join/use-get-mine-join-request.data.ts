import { getMyJoinRequestList } from '@/api/join';
import { QUERY_KEYS } from '@/lib/constants';
import auth from '@react-native-firebase/auth';
import { useQuery } from '@tanstack/react-query';

export function useGetMineRequestList(token: string) {
  return useQuery({
    queryKey: QUERY_KEYS.request.mineRequestList(token),
    // 토큰 갱신
    queryFn: async () => {
      const freshToken = (await auth().currentUser?.getIdToken()) ?? token;
      return getMyJoinRequestList(freshToken);
    },
    enabled: !!token,
    retry: 1,
  });
}
