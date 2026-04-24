import { ActionModal } from '@/components/Actions/ActionModal';
import { colors } from '@/constants';
import { useGetActions } from '@/hooks/queries/actions/use-get-action';
import { useGetMySchedule } from '@/hooks/queries/schedule/use-get-my-schedule';
import { useUserSession } from '@/store/useAuthStore';
import { Schedule } from '@/types';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import FeedItem from './FeedItem';

export default function FeedList() {
  const user = useUserSession();
  const { data: mySchedules = [] } = useGetMySchedule(user?.token);

  const [actionImages, setActionImages] = useState<
    Record<string, ImagePicker.ImagePickerAsset[]>
  >({});

  const [refreshing, setRefreshing] = useState(false);
  const [selecetdFeed, setSelectedFeed] = useState<Schedule | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: getActions = [] } = useGetActions(
    user?.token || '',
    selecetdFeed?.scheduleId || '',
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const todaySchedule = useMemo(() => {
    if (!mySchedules) return [];

    return mySchedules.filter((schedule: Schedule) => {
      const isYearMatch = Number(schedule.scheduleYear) === year;
      const isMonthMatch = Number(schedule.scheduleMonth) === month;
      const isDateMatch = Number(schedule.scheduleDate) === date;

      return isYearMatch && isMonthMatch && isDateMatch;
    });
  }, [mySchedules, year, month, date]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const handleOpenFeed = (feed: Schedule) => {
    setSelectedFeed(feed);
    setIsModalOpen(true);
  };

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todaySchedule}
        renderItem={({ item }) => (
          <FeedItem
            schedule={item}
            onPress={() => {
              handleOpenFeed(item);
            }}
          />
        )}
        keyExtractor={(item) => String(item.scheduleId)}
        contentContainerStyle={styles.contentContainerStyle}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptySchedule}>
            <Text style={styles.emptySchedule_Text}>
              오늘의 일정이 없습니다.
            </Text>
          </View>
        }
      />

      <ActionModal
        isVisible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        selectedSchedule={selecetdFeed}
        getActions={getActions}
        actionImages={actionImages}
        onPickImage={pickActionImage}
        clearActionImages={clearActionImages}
        isMe={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE_BACKGROUND,
  },
  emptySchedule: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySchedule_Text: {
    textAlign: 'center',
    fontFamily: 'pretendard400',
    fontSize: 16,
    color: colors.GRAY_FONT,
  },
});
