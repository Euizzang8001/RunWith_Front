import { signInWithPassword } from '@/api/auth';
import { UseMutaionCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useSignInWithPassword(callbacks?: UseMutaionCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
}
