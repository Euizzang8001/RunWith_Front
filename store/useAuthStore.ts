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
          setHasHydrated: (state: boolean) => set({ isLoaded: state }),
        },
      })),
      {
        name: 'authStore',
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => (state) => {
          state?.actions.setHasHydrated(true);
        },
        partialize: (state) => ({
          user: state.user,
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
