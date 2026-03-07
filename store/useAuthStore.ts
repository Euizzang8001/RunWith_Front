import { User } from '@/types';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type State = {
  user: User | null;
  isLoaded: boolean;
};

const initialState = {
  user: null,
  isLoaded: false,
} as State;

export const useAuthStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setLogin: (user: User) => set({ user, isLoaded: true }),
        setLogOut: () => set({ user: null, isLoaded: true }),
      },
    })),
    { name: 'authStore' },
  ),
);

export const useUserSession = () => {
  const user = useAuthStore((store) => store.user);
  return user;
};

export const useAuthActions = () => {
  const authActions = useAuthStore((store) => store.actions);
  return authActions;
};
