import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';

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
    persist(
      combine(initialState, (set) => ({
        actions: {
          setLogin: (user: User) => set({ user, isLoaded: true }),
          setLogOut: () => set({ user: null, isLoaded: true }),
        },
      })),
      {
        name: 'authStore',
        storage: createJSONStorage(() => AsyncStorage),

        partialize: (state) => ({
          user: state.user,
          isLoaded: state.isLoaded,
        }),
      },
    ),
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
