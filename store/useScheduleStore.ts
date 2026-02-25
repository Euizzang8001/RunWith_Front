import { Schedule } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';

type State = {
  schedules: Schedule[];
};

const intialState = {
  schedules: [],
} as State;

export const useScheduleStore = create(
  devtools(
    persist(
      combine(intialState, (set) => ({
        actions: {
          addSchedule: (newContent: Omit<Schedule, 'id'>) =>
            set((state) => ({
              schedules: [
                ...state.schedules,
                { ...newContent, id: `${Date.now()}-${Math.random()}` },
              ],
            })),

          deleteSchedule: (id: string) =>
            set((state) => ({
              schedules: state.schedules.filter((item) => item.id !== id),
            })),
          updateSchedule: (id: string, updates: Partial<Schedule>) =>
            set((state) => ({
              schedules: state.schedules.map((item) =>
                item.id === id ? { ...item, ...updates } : item,
              ),
            })),
        },
      })),
      {
        name: 'ScheduleStore',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (store) => ({
          schedules: store.schedules,
        }),
      },
    ),
    { name: 'ScheduleStore' },
  ),
);
export const useSchedules = () => {
  const schedules = useScheduleStore((store) => store.schedules);
  return schedules;
};

export const useActionsSchedules = () => {
  const actionsSchedules = useScheduleStore((store) => store.actions);
  return actionsSchedules;
};
