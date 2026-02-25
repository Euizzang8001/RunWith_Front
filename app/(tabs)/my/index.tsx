import { colors } from '@/constants';
import { useAuthActions, useUserSession } from '@/store/useAuthStore';
import { router } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyScreen() {
  const user = useUserSession();
  const { setLogOut } = useAuthActions();

  const handleLogOut = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        style: 'destructive',
        onPress: () => {
          setLogOut();

          router.replace('/auth/signIn');
        },
      },
    ]);
  };
  console.log('현재 세션 유저 정보:', user?.runnerId);
  console.log(JSON.stringify(user, null, 2));

  const defaultImage = require('@/assets/images/default-avatar.jpg');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container_top}>
        <Text style={styles.header}>내 정보</Text>
      </View>

      <View style={styles.user}>
        <View style={styles.iconWrapper}>
          <Image
            source={
              user?.runnerImageLink
                ? { uri: user.runnerImageLink }
                : defaultImage
            }
            style={styles.profileImage}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={{ fontFamily: 'pretendard400', fontSize: 16 }}>
            {user?.runnerName}
          </Text>
          <Text style={{ fontFamily: 'pretendard400', fontSize: 14 }}>
            공부 열심히 하자!
          </Text>
        </View>
      </View>
      <View style={styles.setting_space}>
        <View style={styles.setting_container}>
          <Pressable style={styles.logOut} onPress={handleLogOut}>
            <Text style={styles.logOut_text}>로그아웃</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container_top: {
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard500',
    textAlign: 'center',
  },
  user: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  iconWrapper: {
    marginLeft: 30,
    width: 100,
    height: 100,
    borderRadius: 60,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 60,
  },
  textWrapper: {
    marginTop: 20,
    marginLeft: 20,
    gap: 30,
  },
  setting_space: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  setting_container: {
    bottom: 0,
  },
  logOut: {
    padding: 16,
  },
  logOut_text: {
    textAlign: 'left',
    color: colors.RED,
  },
});
