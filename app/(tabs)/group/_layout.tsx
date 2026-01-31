import { colors } from '@/constants';
import { Stack } from 'expo-router';

export default function GroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: '그룹' }}
      />
    </Stack>
  );
}
