import GroupMemberItem from '@/components/Group/GroupMemberItem';
import { useQuitGroup } from '@/hooks/mutations/belongs/use-delete-join-group';
import { useUpdateLeader } from '@/hooks/mutations/belongs/use-update-leader';
import { useDeleteGroup } from '@/hooks/mutations/group/use-delete-group';
import { useAccpetJoinRequest } from '@/hooks/mutations/join/use-accpet-join-request';
import { useRejectJoinRequest } from '@/hooks/mutations/join/use-reject-join-requset';
import { useGetGroupInRunner } from '@/hooks/queries/group/use-get-group-in-runner.data';
import { useGetGroups } from '@/hooks/queries/group/use-get-group.data';
import { useGetJoinRequestList } from '@/hooks/queries/join/use-get-join-request-list.data';
import { useUserSession } from '@/store/useAuthStore';
import { GroupInfo, JoinRequest, User } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { GroupImage } from '@/components/GroupImage';
import { useGetSelfGroup } from '@/hooks/queries/group/use-get-mine-group.data';
import { styles } from '@/styles/group/groupOptions-styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupOptions() {
  const user = useUserSession();

  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  const [groupName, setGroupName] = useState('');

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const { data: Getgroups } = useGetGroups(user?.token || '', groupName);
  const { data: getGroupInRunner } = useGetGroupInRunner(
    groupId,
    user?.token || '',
  );
  const { data: getSelfGroup } = useGetSelfGroup(user?.token || '');

  const me = getGroupInRunner?.find(
    (runner: User) => runner.runnerName === user?.runnerName,
  );

  const isLeader = me?.leader === true;

  const { data: requestList } = useGetJoinRequestList(
    groupId,
    user?.token || '',
  );

  const { mutate: acceptRequest } = useAccpetJoinRequest({
    onSuccess: () => {
      Alert.alert('승인', '승인이 완료되었습니다.');
    },
    onError: () => {
      Alert.alert('그룹 신청 승인 오류');
    },
  });

  const { mutate: rejectRequest } = useRejectJoinRequest({
    onSuccess: () => {
      Alert.alert('거절', '신청을 거절했습니다.');
    },
    onError: () => {
      Alert.alert('그룹 신청 거절 오류');
    },
  });

  const { mutate: quitGroup } = useQuitGroup({
    onSuccess: () => {
      Alert.alert('그룹을 탈퇴했습니다.');
      router.replace('/(tabs)/group');
    },
    onError: (error: any) => {
      console.error('❌ 탈퇴 에러 발생:', error);
      const errorMsg = error.response?.data?.message || error.message;
      Alert.alert('그룹 탈퇴 실패', `사유: ${errorMsg}`);
    },
  });

  const { mutate: deleteGroup } = useDeleteGroup({
    onSuccess: () => {
      Alert.alert('그룹이 삭제되었습니다.');
      router.replace('/(tabs)/group');
    },
    onError: (error) => {
      Alert.alert('그룹 삭제를 실패했습니다.');
    },
  });

  const { mutate: updateLeader } = useUpdateLeader({
    onSuccess: () => {
      Alert.alert('리더가 변경되었습니다.');
    },
    onError: () => {
      Alert.alert('리더 변경 실패');
    },
  });

  const isSelfGroup = useMemo(() => {
    if (!getSelfGroup) return false;

    return String(getSelfGroup.groupId) === String(groupId);
  }, [getSelfGroup, groupId]);

  const handleUpdateLeader = (runnerId: string, runnerName: string) => {
    Alert.alert('리더 변경', `${runnerName}님으로 리더를 변경하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '변경',
        style: 'destructive',
        onPress: () => {
          if (user?.token) {
            updateLeader({
              groupId,
              token: user.token,
              newLeaderRunnerId: runnerId,
            });
          }
        },
      },
    ]);
  };

  const handleQuitGroup = async (groupId: string) => {
    Alert.alert('그룹 탈퇴', '정말 그룹을 탈퇴하겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '탈퇴',
        style: 'destructive',
        onPress: () => {
          if (user?.token) {
            quitGroup({ groupId, token: user.token });
          } else {
            Alert.alert('탈퇴 오류', '정보가 존재하지 않습니다.');
          }
        },
      },
    ]);
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      const currentUser = auth().currentUser;
      const freshToken = await currentUser?.getIdToken(true);
      if (!groupId || !freshToken) {
        Alert.alert('오류', '삭제할 ID가 없습니다.');
        return;
      }
      Alert.alert(
        '그룹 삭제',
        '되돌릴 수 없습니다. 정말 그룹을 삭제하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '삭제',
            style: 'destructive',
            onPress: () => deleteGroup({ groupId, token: freshToken }),
          },
        ],
      );
    } catch (error) {
      console.error('토큰 에러', error);
    }
  };

  const handleAcceptRequest = (joinRequestId: string) => {
    Alert.alert('요청 승인', '그룹 신청을 승인하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '승인',
        style: 'destructive',
        onPress: () => {
          if (user?.token) {
            acceptRequest({ joinRequestId, token: user.token });
          }
        },
      },
    ]);
  };

  const handleRejectRequest = (joinRequestId: string) => {
    Alert.alert('신청 거절', '그룹 신청을 거절하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '거절',
        style: 'destructive',
        onPress: () => {
          if (user?.token) {
            rejectRequest({ joinRequestId, token: user.token });
          }
        },
      },
    ]);
  };

  const handleGroupEdit = () => {
    router.push({
      pathname: '/(tabs)/group/createGroup',
      params: { groupId: groupId },
    });
  };

  const groupItem = Getgroups?.find(
    (item: GroupInfo) => String(item.groupId) === groupId,
  );

  const sortedRunners = useMemo(() => {
    if (!getGroupInRunner) return [];

    return [...getGroupInRunner].sort((a, b) => {
      if (a.leader && !b.leader) return -1;
      if (!a.leader && b.leader) return 1;
      return 0;
    });
  }, [getGroupInRunner]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.arrow_container}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>
        {/* 리더만 그룹 수정 가능 */}
        {isLeader && (
          <Pressable onPress={handleGroupEdit}>
            <Text style={{ textAlign: 'right' }}>그룹 수정</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.groupInfo_container}>
        <View style={styles.iconWrapper}>
          <GroupImage uri={groupItem?.groupImageLink} size={50} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.groupName}>{groupItem?.groupName}</Text>
          {!isSelfGroup && (
            <Text style={styles.groupDescription}>
              {groupItem?.groupDescription}
            </Text>
          )}
        </View>
      </View>

      <View>
        <Text style={styles.memberText}>멤버</Text>

        <View>
          {sortedRunners?.map((runner: User) => (
            <GroupMemberItem
              key={runner.runnerId}
              runner={runner}
              isLeader={isLeader}
              isTargetLeader={runner.leader === true}
              onChangeLeader={handleUpdateLeader}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.bottomButton}>
          {isLeader && (
            <Pressable onPress={() => setIsRequestModalOpen(true)}>
              <Text style={styles.groupRequestListText}>그룹 신청 명단</Text>
            </Pressable>
          )}
          <Modal
            visible={isRequestModalOpen}
            animationType="slide"
            onRequestClose={() => setIsRequestModalOpen(false)}
          >
            <SafeAreaView style={styles.modalOverlay}>
              {/* 모달 헤더 */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>그룹 신청 명단</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setIsRequestModalOpen(false)}
                >
                  <Feather name="x" size={26} color="black" />
                </Pressable>
              </View>

              {/* 신청자 리스트 */}
              <ScrollView
                contentContainerStyle={styles.requestScroll}
                showsVerticalScrollIndicator={false}
              >
                {(requestList?.length ?? 0) > 0 ? (
                  requestList.map((item: JoinRequest) => (
                    <View key={item.joinRequestId} style={styles.requestCard}>
                      <Text style={styles.requestRunnerName}>
                        {item.runnerName}
                      </Text>

                      <View style={styles.actionButtons}>
                        <Pressable
                          style={styles.acceptBtn}
                          onPress={() =>
                            handleAcceptRequest(item.joinRequestId)
                          }
                        >
                          <Text style={styles.acceptBtnText}>승인</Text>
                        </Pressable>

                        <Pressable
                          style={styles.rejectBtn}
                          onPress={() =>
                            handleRejectRequest(item.joinRequestId)
                          }
                        >
                          <Text style={styles.rejectBtnText}>거절</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      현재 신청한 러너가 없습니다.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </SafeAreaView>
          </Modal>

          {/* 셀프그룹에서만 탈퇴 ui 보기 */}
          {!isLeader && (
            <Pressable onPress={() => handleQuitGroup(groupId)}>
              <Text style={styles.groupDeleteText}>그룹 탈퇴하기</Text>
            </Pressable>
          )}
          {/* 리더만 그룹 삭제 ui 보기 */}
          {isLeader && (
            <Pressable onPress={() => handleDeleteGroup(groupId)}>
              <Text style={styles.groupDeleteText}>그룹 삭제하기</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
