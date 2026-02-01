import { colors } from '@/constants';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { setCustomText } from 'react-native-global-props';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          pretendard400: require('@/assets/fonts/Pretendard-Regular.ttf'),
          pretendard500: require('@/assets/fonts/Pretendard-Medium.ttf'),
          pretendard600: require('@/assets/fonts/Pretendard-SemiBold.ttf'),
          pretendard700: require('@/assets/fonts/Pretendard-Bold.ttf'),
          pretendard800: require('@/assets/fonts/Pretendard-ExtraBold.ttf'),
          pretendard900: require('@/assets/fonts/Pretendard-Black.ttf'),
        });

        const customTextProps = {
          style: {
            fontFamily: 'pretendard500',
          },
        };
        setCustomText(customTextProps);
        setFontLoaded(true);
      } catch (error) {
        console.error(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.WHITE,
            },
          }}
        />

        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
