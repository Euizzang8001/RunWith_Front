import { signUp } from '@/api/auth';
import { UseMutaionCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callbacks?: UseMutaionCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
