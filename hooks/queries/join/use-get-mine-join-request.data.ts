import { getMyJoinRequestList } from '@/api/join';
import auth from '@react-native-firebase/auth';
import { useQuery } from '@tanstack/react-query';

export function useGetMineRequestList(token: string) {
  return useQuery({
    queryKey: ['mineRequestList'],
    // 토큰 갱신
    queryFn: async () => {
      const freshToken = (await auth().currentUser?.getIdToken()) ?? token;
      return getMyJoinRequestList(freshToken);
    },
    enabled: !!token,
    retry: 1,
  });
}
