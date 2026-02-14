import { signInWithPassword } from '@/api/auth';
import { UseMutaionCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useSignInWithPassword(callbacks?: UseMutaionCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error('로그인 실패 원인:', error);
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
}
