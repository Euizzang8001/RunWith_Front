import { getActionsDetail } from '@/api/actions';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetActionsDetail(token: string, actionId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.actions.actionsList(token),
    queryFn: () => getActionsDetail({ token: token!, actionId: actionId }),
    enabled: !!token,
    retry: false,
  });
}
