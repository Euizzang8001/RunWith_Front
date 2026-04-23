import { ActionModal } from '@/components/Actions/ActionModal';
import { ProfileImage } from '@/components/ProfileImage';
import { usePostRecognizes } from '@/hooks/mutations/recognizes/use-post-recognizes';
import { useGetActions } from '@/hooks/queries/actions/use-get-action';
import { useGetGroupInRunner } from '@/hooks/queries/group/use-get-group-in-runner.data';
import { useGetMineGroups } from '@/hooks/queries/group/use-get-mine-groups.data';
import { useGetSelfGroup } from '@/hooks/queries/group/use-get-self-group.data';
import { useGetSchedule } from '@/hooks/queries/schedule/use-get-schedule';
import { useUserSession } from '@/store/useAuthStore';
import { GroupInfo, Schedule, User } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../styles/group/groupdetail-styles';

export default function GroupDetail() {
  const user = useUserSession();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const { groupId } = useLocalSearchParams<{
    groupId: string;
  }>();
  const { data: getSelfGroup } = useGetSelfGroup(user?.token || '');
  const { data: getActions = [] } = useGetActions(
    user?.token || '',
    selectedSchedule?.scheduleId || '',
  );
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionImages, setActionImages] = useState<
    Record<string, ImagePicker.ImagePickerAsset[]>
  >({});

  const { data: groups } = useGetMineGroups(user?.token || '');
  const { data: getGroupInRunner = [] } = useGetGroupInRunner(
    groupId,
    user?.token || '',
  );

  const { mutate: postRecognizes } = usePostRecognizes({
    onSuccess: (data) => {
      Alert.alert('성공', '인정 상태를 변경했습니다.');
    },
    onError: (error) => {
      console.error('에러:', error);
      alert('그룹 수정 오류: ' + error.message);
    },
  });

  const group = useMemo(() => {
    if (!groups) return getSelfGroup || null;

    const allGroups = [...groups];
    const myGroup = groups.find((item: GroupInfo) => item.groupId === groupId);
    if (myGroup) return myGroup;

    if (getSelfGroup) {
      allGroups.push(getSelfGroup);
    }
    return allGroups.find((item: GroupInfo) => item.groupId === groupId);
  }, [groups, getSelfGroup, groupId]);

  // 액션 이미지 추가
  const pickActionImage = async (actionId: string) => {
    try {
      const currentImagesSnapshot = actionImages[actionId] || [];
      if (currentImagesSnapshot.length >= 5) {
        Alert.alert('알림', '사진은 최대 5장까지 등록 가능합니다.');
        return;
      }

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '설정에서 사진 접근 권한을 허용해주세요.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled || !result.assets) return;

      const validAssets = result.assets;

      const compressedAssets = await Promise.all(
        validAssets.map(async (asset, index) => {
          try {
            const compressed = await ImageManipulator.manipulateAsync(
              asset.uri,
              [{ resize: { width: 800 } }],
              { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
            );
            return {
              ...asset,
              uri: `${compressed.uri}?t=${Date.now()}_${index}`,
            };
          } catch (manipulateError) {
            console.error('이미지 압축 에러:', manipulateError);
            return asset;
          }
        }),
      );

      setActionImages((prev) => ({
        ...prev,
        [actionId]: [...(prev[actionId] || []), ...compressedAssets].slice(
          0,
          5,
        ),
      }));
    } catch (error) {
      Alert.alert('에러', '사진을 불러오는 중 문제가 발생했습니다.');
    }
  };

  const clearActionImages = () => setActionImages({});

  const goToGroupOption = () => {
    if (!user) {
      Alert.alert('알림', '로그인이 필요한 서비스입니다.');
      return;
    }

    const myInfo = getGroupInRunner?.find(
      (runner: User) => runner.runnerId === user.runnerId,
    );

    router.push({
      pathname: '/(tabs)/group/groupOptions',
      params: {
        groupId: group?.groupId,
        token: myInfo?.token,
      },
    });
  };

  const handleScheduleAdd = () => {
    if (!selectedUser) {
      Alert.alert('알림', '멤버를 먼저 선택해주세요.');
      return;
    }

    const isMe = selectedMemberSchedule?.runnerName === user?.runnerName;

    if (!isMe) {
      Alert.alert('', '본인의 일정만 추가할 수 있습니다.');
      return;
    }

    const selectedRunner = getGroupInRunner?.find(
      (runner: User) => runner.runnerId === selectedUser,
    );

    if (!selectedRunner) return;

    router.push({
      pathname: '/calendar',
      params: {
        belongId: selectedRunner.belongId,
        runnerId: selectedRunner.runnerId,
      },
    });
  };

  // 멤버 리스트 정렬: 내 프로필을 가장 앞으로
  const sortedRunners = useMemo(() => {
    if (!getGroupInRunner) return [];

    return [...getGroupInRunner].sort((a, b) => {
      if (a.runnerName === user?.runnerName) return -1;
      if (b.runnerName === user?.runnerName) return 1;
      return 0;
    });
  }, [getGroupInRunner, user?.runnerId]);

  // 선택한 멤버의 스케줄 불러오기
  const selectedMemberSchedule = useMemo(() => {
    return getGroupInRunner?.find(
      (runner: User) => runner.runnerId === selectedUser,
    );
  }, [selectedUser, getGroupInRunner]);

  const { data: getSchedule = [] } = useGetSchedule(
    user?.token,
    selectedMemberSchedule?.belongId,
  );

  // 선택한 유저의 스케줄(그룹별)
  const selectedUserSchedules = useMemo(() => {
    if (!selectedUser || !getSchedule || !selectedMemberSchedule) return [];

    return getSchedule.filter((schedule: Schedule) => {
      const isYearMatch = Number(schedule.scheduleYear) === year;
      const isMonthMatch = Number(schedule.scheduleMonth) === month;
      const isDateMatch = Number(schedule.scheduleDate) === date;

      const isGroupSchedule =
        String(schedule.belongId) === String(selectedMemberSchedule.belongId);

      return isYearMatch && isMonthMatch && isDateMatch && isGroupSchedule;
    });
  }, [selectedUser, getSchedule, selectedMemberSchedule, year, month, date]);

  if (!group)
    return (
      <SafeAreaView>
        <Text>그룹 데이터가 없습니다.</Text>
      </SafeAreaView>
    );
  const selectedUserName = getGroupInRunner?.find(
    (runner: User) => runner.runnerId === selectedUser,
  );

  const displayName =
    selectedUserName?.belongNickname ||
    selectedUserName?.groupNickname ||
    selectedUserName?.runnerName;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>

        <Text style={styles.title}>{group.groupName}</Text>

        <Pressable style={styles.icon} onPress={goToGroupOption}>
          <View>
            <Ionicons name="menu-outline" size={32} color="black" />
          </View>
        </Pressable>
      </View>

      <View style={styles.user_icon_Wrapper}>
        {sortedRunners?.map((runner: User) => {
          const isSelected = selectedUser === runner.runnerId;

          return (
            <Pressable
              key={runner.runnerId}
              onPress={() => setSelectedUser(runner.runnerId)}
              style={[styles.user_icon, isSelected && styles.userSelcetd]}
            >
              <ProfileImage uri={runner.runnerImageLink} size={50} />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.text_container}>
        {selectedUser !== null ? (
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.seletedUserText}>
                {displayName
                  ? `${displayName}의 일정`
                  : '닉네임을 불러 올 수 없습니다.'}
              </Text>

              <View style={styles.memberHeader}>
                <Pressable
                  onPress={handleScheduleAdd}
                  style={styles.addScheduleButton}
                >
                  <Text style={styles.addScheduleText}>일정 추가</Text>
                </Pressable>
              </View>
            </View>

            {selectedUserSchedules.length > 0 ? (
              selectedUserSchedules.map((schedule: Schedule) => {
                // 내 일정은 인정 버튼 안 보이게 필터링
                const isMe =
                  selectedMemberSchedule?.runnerName === user?.runnerName;

                const isAlreadyRecognized = schedule.recognizedByMe;

                return (
                  <Pressable
                    key={schedule.scheduleId}
                    onPress={() => {
                      setSelectedSchedule(schedule);
                      setIsModalOpen(true);
                    }}
                    style={styles.schedule_container}
                  >
                    <Text>{schedule.scheduleDescription}</Text>
                    <Text>
                      {isMe && <Text> 인정 {schedule.recognizeCount} </Text>}
                    </Text>

                    {!isMe && (
                      <Pressable
                        onPress={() => {
                          if (!user?.token) return;

                          const recognizeStatus = !schedule.recognizedByMe;

                          Alert.alert(
                            '확인',
                            recognizeStatus
                              ? '이 일정을 인정하시겠습니까?'
                              : '인정을 취소하시겠습니까?',
                            [
                              { text: '취소' },
                              {
                                text: '확인',
                                onPress: () => {
                                  postRecognizes({
                                    token: user.token,
                                    scheduleId: schedule.scheduleId,
                                    recognizing: recognizeStatus,
                                  });
                                },
                              },
                            ],
                          );
                        }}
                        style={[
                          styles.recognizesButton,
                          {
                            backgroundColor: isAlreadyRecognized
                              ? '#3078b3'
                              : '#ac3232',
                            paddingHorizontal: 10,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 13,
                          }}
                        >
                          {isAlreadyRecognized ? '인정 완료' : '인정'}
                        </Text>
                      </Pressable>
                    )}
                  </Pressable>
                );
              })
            ) : (
              <Text style={styles.noScheduleDay}>오늘 일정이 없습니다.</Text>
            )}
          </View>
        ) : (
          <View>
            <Text>일정을 확인하고 싶은 멤버를 선택하세요.</Text>
          </View>
        )}
      </View>
      {
        <ActionModal
          isVisible={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          selectedSchedule={selectedSchedule}
          getActions={getActions}
          actionImages={actionImages}
          onPickImage={pickActionImage}
          clearActionImages={clearActionImages}
        />
      }
    </SafeAreaView>
  );
}
