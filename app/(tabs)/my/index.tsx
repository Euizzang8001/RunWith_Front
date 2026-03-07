import { colors } from '@/constants';
import { useGetMineRequestList } from '@/hooks/queries/join/use-get-mine-join-request.data';
import { useAuthActions, useUserSession } from '@/store/useAuthStore';
import { JoinRequest } from '@/types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyScreen() {
  const user = useUserSession();
  const { setLogOut } = useAuthActions();
  const queryClient = useQueryClient();

  const { data: mineRequestGroup } = useGetMineRequestList(user?.token || '');
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  const handleEditNickname = () => {
    router.push({
      pathname: '/auth/nicknameSetting',
      params: {
        mode: 'edit',
        prevRunnerNickname: user?.runnerName,
        prevRunnerImageLink: user?.runnerImageLink,
      },
    });
  };

  const handleLogOut = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        style: 'destructive',
        onPress: async () => {
          try {
            await GoogleSignin.signOut();

            await auth().signOut();

            queryClient.clear();

            router.replace('/auth/signIn');
          } catch (error) {
            console.error('로그아웃 에러', error);
            setLogOut();
            router.replace('/auth/signIn');
          }
        },
      },
    ]);
  };

  const defaultImage = require('@/assets/images/default-avatar.jpg');

  const getProfileSource = () => {
    const link = user?.runnerImageLink;

    if (!link) {
      return defaultImage;
    }
    return { uri: link };
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container_top}>
        <Text style={styles.header}>내 정보</Text>
      </View>

      <View style={styles.user}>
        <View style={styles.iconWrapper}>
          <Image source={getProfileSource()} style={styles.profileImage} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={{ fontFamily: 'pretendard400', fontSize: 16 }}>
            {user?.runnerName}
          </Text>
          <Pressable onPress={handleEditNickname}>
            <Text>닉네임 설정</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text>그룹 신청 현황</Text>

        <View>
          {mineRequestGroup && mineRequestGroup.length > 0 ? (
            mineRequestGroup.map((item: JoinRequest) => {
              const group = item.groupId || item;

              return (
                <View key={item.groupId}>
                  <View>
                    <Text>{item.groupName}</Text>
                  </View>
                  <View>
                    <Text>대기 중</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>신청한 그룹이 없습니다.</Text>
          )}
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
