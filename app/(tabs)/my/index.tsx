import { ProfileImage } from '@/components/ProfileImage';
import { useDeleteRunner } from '@/hooks/mutations/auth/use-delete-runner';
import { useGetMineRequestList } from '@/hooks/queries/join/use-get-mine-join-request.data';
import {
  useAuthActions,
  useAuthStore,
  useUserSession,
} from '@/store/useAuthStore';
import { styles } from '@/styles/my/my-styles';
import { JoinRequest } from '@/types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyScreen() {
  const user = useUserSession();
  const { setLogOut } = useAuthActions();
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: mineRequestGroup, refetch: refetchMineRequestGroup } =
    useGetMineRequestList(user?.token || '');

  const { mutate: deleteRunner, isPending: isDeleteRunner } = useDeleteRunner({
    onSuccess: async (data) => {
      try {
        // 1. 구글 세션 정리
        const googleUser = await GoogleSignin.getCurrentUser();
        if (googleUser) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        }
        await auth().signOut();
      } catch (error) {
        Alert.alert('소셜 세션 정리 오류');
      }

      setLogOut();
      queryClient.clear();

      Alert.alert('탈퇴 완료', '그동안 이용해 주셔서 감사합니다.', [
        { text: '확인', onPress: () => router.replace('/auth/signIn') },
      ]);
    },
    onError: (error: any) => {
      console.error('탈퇴 에러 상세:', error);
      Alert.alert('탈퇴 실패', error.message || '다시 시도해주세요.');
    },
  });

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

  const handleDeleteRunner = () => {
    if (!user?.token) return;

    Alert.alert(
      '계정 탈퇴',
      '정말로 탈퇴하시겠습니까? 모든 데이터가 삭제되며 복구할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          style: 'destructive',
          onPress: () => {
            deleteRunner(user.token);
          },
        },
      ],
    );
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([refetchMineRequestGroup()]);
    setIsRefreshing(false);
  }, [refetchMineRequestGroup]);

  const isLoaded = useAuthStore((s) => s.isLoaded);
  if (!isLoaded) return null;

  const handleLogOut = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        style: 'destructive',
        onPress: async () => {
          try {
            await GoogleSignin.signOut();
            await auth().signOut();

            queryClient.clear();

            router.replace('/auth/signIn');

            setLogOut();
          } catch (error) {
            console.error('로그아웃 에러', error);
            router.replace('/auth/signIn');
            setLogOut();
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.container_top}>
          <Text style={styles.header}>내 정보</Text>
        </View>

        <View style={styles.user}>
          <View style={styles.iconWrapper}>
            <ProfileImage uri={user?.runnerImageLink} size={80} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={{ fontFamily: 'pretendard400', fontSize: 16 }}>
              {user?.token && user?.runnerName}
            </Text>
            <Pressable onPress={handleEditNickname}>
              <Text>프로필 수정</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>그룹 신청 현황</Text>

          <View style={styles.requestListContainer}>
            {mineRequestGroup && mineRequestGroup.length > 0 ? (
              mineRequestGroup.map((item: JoinRequest) => (
                <View key={item.groupId} style={styles.requestCard}>
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupNameText}>{item.groupName}</Text>
                  </View>

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>대기 중</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.requestCard}>
                <Text style={styles.emptyText}>신청한 그룹이 없습니다.</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.setting_space}>
          <View style={styles.setting_container}>
            <Pressable
              style={styles.logOut}
              onPress={handleDeleteRunner}
              disabled={isDeleteRunner}
            >
              <Text style={styles.logOut_text}>회원 탈퇴</Text>
            </Pressable>
            <Pressable style={styles.logOut} onPress={handleLogOut}>
              <Text style={styles.logOut_text}>로그아웃</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
