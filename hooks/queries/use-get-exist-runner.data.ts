import { getExistRunner } from '@/api/auth';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetExistRunner(token?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.auth.existRunner(token),
    queryFn: async () => {
      if (!token) throw new Error('토큰이 없습니다.');

      const response = await getExistRunner(token);
      return response;
    },
    enabled: !!token,
    retry: false,
  });
}
