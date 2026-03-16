import InputField from '@/components/InputField';
import { colors } from '@/constants';
import { useJoinRequest } from '@/hooks/mutations/join/use-join-request';
import { useGetGroups } from '@/hooks/queries/group/use-get-group.data';
import { useUserSession } from '@/store/useAuthStore';
import { styles } from '@/styles/group/joinGroup-styles';
import { GroupInfo } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Keyboard, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JoinGroup() {
  const user = useUserSession();

  const [groupName, setGroupName] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    data: searchGroup,
    isFetching: isSearchGroupFetching,
    refetch,
  } = useGetGroups(user?.token || '', searchKeyword);

  // 가입 신청 api
  const { mutate: joinRequest } = useJoinRequest({
    onSuccess: (data: GroupInfo) => {
      Alert.alert('가입 신청', `가입 신청이 완료되었습니다.`);
    },
    onError: () => {
      Alert.alert('오류', '그룹 가입 신청 실패');
    },
  });

  const handleSearch = () => {
    if (groupName.trim() === '') {
      Alert.alert('알림', '그룹을 검색해 주세요.');
    }
    Keyboard.dismiss();
    setSearchKeyword(groupName.trim());
  };

  const searchGroups = searchGroup || [];

  const renderGroupList = ({ item }: { item: GroupInfo }) => (
    <Pressable onPress={() => handleSelectGroup(item)}>
      <Text>{item.groupName}</Text>
    </Pressable>
  );

  const handleSelectGroup = (group: GroupInfo) => {
    Alert.alert('그룹 참여', `${group.groupName}에 가입을 신청하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '신청',
        style: 'destructive',
        onPress: () => {
          joinRequest({
            groupId: group.groupId,
            token: user?.token || '',
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container_top}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>

        <Text style={styles.header}>그룹 찾기</Text>
        <View style={styles.right} />
      </View>

      <View style={styles.inputWrapper}>
        <InputField
          value={groupName}
          onChangeText={setGroupName}
          onSubmitEditing={handleSearch}
          label="그룹 명"
          placeholder="찾고 싶은 그룹명을 입력해 주세요."
        />
        <Pressable onPress={handleSearch}>
          <Feather name="search" size={24} color={colors.BLACK} />
        </Pressable>
      </View>

      <View>
        {isSearchGroupFetching && searchKeyword.length > 0 ? (
          <Text>검색 중...</Text>
        ) : searchGroups && searchGroups.length > 0 ? (
          <FlatList
            data={searchGroups}
            keyExtractor={(item) => item.groupId}
            renderItem={renderGroupList}
          />
        ) : groupName.length > 0 ? (
          <Text>검색 결과가 없습니다.</Text>
        ) : (
          <Text>참여할 그룹의 이름을 입력하세요.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
