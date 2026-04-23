import { getActionsDetail } from '@/api/actions';
import { useQuery } from '@tanstack/react-query';
export function useGetActionsDetail(token: string, actionId: string) {
  return useQuery({
    queryKey: ['actionsDetail', token, actionId],
    queryFn: () => getActionsDetail({ token, actionId }),
    enabled: Boolean(token && actionId),
    retry: false,
  });
}
