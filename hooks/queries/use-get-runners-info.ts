import { getRunnersInfo } from '@/api/auth';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetRunnersInfo(token?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.auth.runnerInfo(),
    queryFn: () => getRunnersInfo({ token: token! }),
    enabled: !!token,
    retry: false,
  });
}
