import useUpdateActions from '@/hooks/mutations/actions/use-update-actions';
import { useGetActionsDetail } from '@/hooks/queries/actions/use-get-actions-detail';
import { useUserSession } from '@/store/useAuthStore';
import { styles } from '@/styles/group/groupdetail-styles';
import { Actions, Schedule } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ⭐️ 라이브러리 임포트
import ImageView from 'react-native-image-viewing';

interface ActionListModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedSchedule: Schedule | null;
  getActions: Actions[];
  actionImages: Record<string, ImagePicker.ImagePickerAsset[]>;
  onPickImage: (actionId: string) => void;
  clearActionImages: () => void;
}

export const ActionModal = ({
  isVisible,
  onClose,
  selectedSchedule,
  getActions,
  actionImages,
  onPickImage,
  clearActionImages,
}: ActionListModalProps) => {
  const user = useUserSession();

  const { mutate: updateActions, isPending } = useUpdateActions({
    onSuccess: async () => {
      Alert.alert('성공', '스케줄이 업데이트되었습니다.');
      clearActionImages();
    },
    onError: (error) => {
      Alert.alert('실패', `서버 업로드 오류 : ${error.message}`);
      console.log('업로드 에러 상세:', error);
    },
  });

  const handleClose = useCallback(() => {
    clearActionImages();
    onClose();
  }, [clearActionImages, onClose]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        {selectedSchedule && (
          <View style={{ flex: 1 }}>
            <Text style={styles.modal_title}>
              {selectedSchedule.scheduleDescription}
            </Text>

            <ScrollView style={styles.action_list_wrapper}>
              {getActions.map((action: Actions) => (
                <ActionItem
                  key={action.actionId}
                  action={action}
                  token={user?.token || ''}
                  localImages={actionImages[action.actionId] || []}
                  onPickImage={() => onPickImage(action.actionId)}
                  updateActions={updateActions}
                  isPending={isPending}
                />
              ))}
            </ScrollView>

            <Pressable style={styles.close_button} onPress={handleClose}>
              <Text style={styles.close_button_text}>닫기</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const ActionItem = ({
  action,
  token,
  localImages,
  onPickImage,
  updateActions,
  isPending,
}: any) => {
  const { data: detail } = useGetActionsDetail(token, action.actionId);

  const serverImages =
    detail?.actionImageLinks ||
    detail?.actionImageLinkList ||
    action.actionImageLinks ||
    [];
  const totalCount = serverImages.length + localImages.length;

  // ⭐️ [추가] 이미지 뷰어 관련 로컬 상태
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ⭐️ [추가] 서버 이미지와 로컬 이미지를 싹 엮어서 하나의 뷰어 리스트로 생성
  const allImagesForViewer = [
    ...serverImages.map((uri: string) => ({ uri })),
    ...localImages.map((img: any) => ({ uri: img.uri })),
  ];

  // ⭐️ [추가] 인덱스 지정 및 뷰어 오픈 함수
  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const onSave = async () => {
    if (localImages.length === 0) return;

    const fbUser = auth().currentUser;
    if (!fbUser) {
      Alert.alert('인증 만료', '로그인이 끊겼습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      const freshToken = await fbUser.getIdToken();

      if (!freshToken) {
        Alert.alert(
          '인증 실패',
          '새 토큰을 받아오지 못했습니다. 다시 시도해주세요.',
        );
        return;
      }

      const imagePayloads = localImages.map((img: any, index: number) => ({
        uri: img.uri,
        fileName: img.fileName || `action_${Date.now()}_${index}.jpg`,
        mimeType: 'image/jpeg',
      }));

      updateActions({
        token: freshToken,
        actionId: action.actionId,
        actionImageLink: imagePayloads,
        actionName: action.actionName,
        actionDescription: action.actionDescription || '액션',
        actionStartHour: action.actionStartHour,
        actionStartMinute: action.actionStartMinute,
        actionEndHour: action.actionEndHour,
        actionEndMinute: action.actionEndMinute,
      });
    } catch (e) {
      console.error('토큰 발급 실패:', e);
      Alert.alert('에러', '인증 처리 도중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.action_item}>
      <View style={styles.action_info}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.action_name}>{action.actionName}</Text>

          {localImages.length > 0 && (
            <Pressable
              onPress={onSave}
              disabled={isPending}
              style={{
                backgroundColor: isPending ? '#A5C8ED' : '#4A90E2',
                padding: 6,
                borderRadius: 4,
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
              >
                {isPending ? '저장 중...' : '저장하기'}
              </Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.action_time_text}>
          {action.actionStartHour}:
          {String(action.actionStartMinute).padStart(2, '0')} ~{' '}
          {action.actionEndHour}:
          {String(action.actionEndMinute).padStart(2, '0')}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {/* 1. 서버 이미지 */}
          {serverImages.map((uri: string, index: number) => (
            <Pressable
              key={`server-${index}`}
              style={{ marginRight: 8 }}
              onPress={() => openViewer(index)} // ⭐️ 클릭 시 확대 모달 오픈
            >
              <Image source={{ uri }} style={styles.action_image} />
            </Pressable>
          ))}

          {/* 2. 내가 방금 추가한 로컬 이미지 (흐리게 표시) */}
          {localImages.map((img: any, index: number) => (
            <Pressable
              key={`local-${action.actionId}-${index}`}
              style={{ marginRight: 8 }}
              // ⭐️ 로컬 이미지는 서버 이미지 다음 순서이므로 인덱스를 더해줌
              onPress={() => openViewer(serverImages.length + index)}
            >
              <Image
                source={{ uri: img.uri }}
                style={[styles.action_image, { opacity: 0.6 }]}
              />
            </Pressable>
          ))}

          {/* 3. 카메라 버튼 */}
          {totalCount < 5 && (
            <Pressable onPress={onPickImage} style={styles.camera_button}>
              <View style={styles.camera_icon_container}>
                <Ionicons name="camera" size={24} color="#ADB5BD" />
                <Text style={styles.camera_text}>{totalCount}/5</Text>
              </View>
            </Pressable>
          )}
        </ScrollView>
      </View>

      {/* ⭐️ [추가] 이미지 확대 뷰어 모달 */}
      <ImageView
        images={allImagesForViewer}
        imageIndex={currentImageIndex}
        visible={isViewerOpen}
        onRequestClose={() => setIsViewerOpen(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
      />
    </View>
  );
};
