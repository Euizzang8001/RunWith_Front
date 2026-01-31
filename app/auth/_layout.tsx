import { colors } from '@/constants';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function AuthLayout() {
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
        name="signIn"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: 'pretendard700',
                fontSize: 24,
              }}
            >
              RunWith
            </Text>
          ),
          headerShown: false,
          headerBackButtonDisplayMode: 'minimal',

          headerTitleStyle: {
            fontFamily: 'pretendard700',
            fontSize: 24,
          },

          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
