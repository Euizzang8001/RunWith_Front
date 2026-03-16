import { ProfileImage } from '@/components/ProfileImage';
import { useGetMineRequestList } from '@/hooks/queries/join/use-get-mine-join-request.data';
import { useAuthActions, useUserSession } from '@/store/useAuthStore';
import { styles } from '@/styles/my/my-styles';
import { JoinRequest } from '@/types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyScreen() {
  const user = useUserSession();
  const { setLogOut } = useAuthActions();
  const queryClient = useQueryClient();

  const { data: mineRequestGroup } = useGetMineRequestList(user?.token || '');
  const handleEditNickname = () => {
    router.push({
      pathname: '/auth/profileSetting',
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container_top}>
        <Text style={styles.header}>내 정보</Text>
      </View>

      <View style={styles.user}>
        <View style={styles.iconWrapper}>
          <ProfileImage uri={user?.runnerImageLink} size={80} />
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
