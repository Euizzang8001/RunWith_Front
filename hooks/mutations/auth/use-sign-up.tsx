import { signUp } from '@/api/auth';
import { UseMutaionCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callbacks?: UseMutaionCallback) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
