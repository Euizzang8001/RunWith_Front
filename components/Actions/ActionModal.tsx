import useUpdateActions from '@/hooks/mutations/actions/use-update-actions';
import { useGetActionsDetail } from '@/hooks/queries/actions/use-get-actions-detail';
import { useUserSession } from '@/store/useAuthStore';
import { styles } from '@/styles/group/groupdetail-styles';
import { Actions, Schedule } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
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
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
        }}
      >
        {selectedSchedule && (
          <View style={{ flex: 1 }}>
            <Text style={styles.modal_title}>
              {selectedSchedule.scheduleDescription}
            </Text>

            <ScrollView style={styles.action_list_wrapper}>
              {getActions.length > 0 ? (
                getActions.map((action: Actions) => (
                  <ActionItem
                    key={action.actionId}
                    action={action}
                    token={user?.token || ''}
                    localImages={actionImages[action.actionId] || []}
                    onPickImage={() => onPickImage(action.actionId)}
                    updateActions={updateActions}
                    isPending={isPending}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    아직 등록된 일정이 없습니다.
                  </Text>
                </View>
              )}
            </ScrollView>

            <Pressable style={styles.close_button} onPress={handleClose}>
              <Text style={styles.close_button_text}>닫기</Text>
            </Pressable>
          </View>
        )}
      </View>
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
  onDeleteServerImage,
}: any) => {
  const shouldFetchDetail =
    !action.actionImageLinks || action.actionImageLinks.length === 0;

  const { data: detail } = useGetActionsDetail(
    shouldFetchDetail ? token : '',
    shouldFetchDetail ? action.actionId : '',
  );

  const serverImages = useMemo(() => {
    if (action.actionImageLinks && action.actionImageLinks.length > 0) {
      return action.actionImageLinks;
    }
    return detail?.actionImageLinks || detail?.actionImageLinkList || [];
  }, [action.actionImageLinks, detail]);

  const totalCount = serverImages.length + localImages.length;

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedServerIndices, setSelectedServerIndices] = useState<
    Set<number>
  >(new Set());
  const [selectedLocalIndices, setSelectedLocalIndices] = useState<Set<number>>(
    new Set(),
  );

  const allImagesForViewer = useMemo(
    () => [
      ...serverImages.map((uri: string) => ({ uri })),
      ...localImages.map((img: any) => ({ uri: img.uri })),
    ],
    [serverImages, localImages],
  );

  const openViewer = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  }, []);

  const handlePickImage = useCallback(() => {
    onPickImage();
  }, [onPickImage]);

  const toggleDeleteMode = useCallback(() => {
    setIsDeleteMode((prev) => !prev);
    setSelectedServerIndices(new Set());
    setSelectedLocalIndices(new Set());
  }, []);

  const toggleServerImage = useCallback((index: number) => {
    setSelectedServerIndices((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }, []);

  const toggleLocalImage = useCallback((index: number) => {
    setSelectedLocalIndices((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }, []);

  const selectedCount = selectedServerIndices.size + selectedLocalIndices.size;

  // 삭제
  const handleDelete = useCallback(() => {
    if (selectedCount === 0) return;

    Alert.alert(
      '이미지 삭제',
      `선택한 이미지 ${selectedCount}장을 삭제할까요?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            if (selectedLocalIndices.size > 0) {
              onDeleteServerImage?.({
                actionId: action.actionId,
                type: 'local',
                indices: [...selectedLocalIndices],
              });
            }

            if (selectedServerIndices.size > 0) {
              const fbUser = auth().currentUser;
              if (!fbUser) {
                Alert.alert('인증 만료', '다시 로그인해주세요.');
                return;
              }
              const freshToken = await fbUser.getIdToken();

              const remainingServerImages = serverImages
                .filter((_: string, i: number) => !selectedServerIndices.has(i))
                .map((uri: string, i: number) => ({
                  uri,
                  fileName: `existing_${i}.jpg`,
                  mimeType: 'image/jpeg',
                }));

              updateActions({
                token: freshToken,
                actionId: action.actionId,
                actionImageLink: remainingServerImages,
                actionName: action.actionName,
                actionDescription: action.actionDescription || ' ',
                actionStartHour: action.actionStartHour,
                actionStartMinute: action.actionStartMinute,
                actionEndHour: action.actionEndHour,
                actionEndMinute: action.actionEndMinute,
              });
            }

            setIsDeleteMode(false);
            setSelectedServerIndices(new Set());
            setSelectedLocalIndices(new Set());
          },
        },
      ],
    );
  }, [
    selectedCount,
    selectedServerIndices,
    selectedLocalIndices,
    serverImages,
    action,
    updateActions,
    onDeleteServerImage,
  ]);

  const onSave = useCallback(async () => {
    if (localImages.length === 0) return;
    const fbUser = auth().currentUser;
    if (!fbUser) {
      Alert.alert('인증 만료', '로그인이 끊겼습니다. 다시 로그인해주세요.');
      return;
    }
    try {
      const freshToken = await fbUser.getIdToken();
      if (!freshToken) {
        Alert.alert('인증 실패', '새 토큰을 받아오지 못했습니다.');
        return;
      }
      const existingImagePayloads = serverImages.map(
        (uri: string, index: number) => ({
          uri,
          fileName: `existing_${index}.jpg`,
          mimeType: 'image/jpeg',
        }),
      );
      const newImagePayloads = localImages.map((img: any, index: number) => ({
        uri: img.uri,
        fileName: img.fileName || `action_${Date.now()}_${index}.jpg`,
        mimeType: img.mimeType || 'image/jpeg',
      }));
      updateActions({
        token: freshToken,
        actionId: action.actionId,
        actionImageLink: [...existingImagePayloads, ...newImagePayloads],
        actionName: action.actionName,
        actionDescription: action.actionDescription || ' ',
        actionStartHour: action.actionStartHour,
        actionStartMinute: action.actionStartMinute,
        actionEndHour: action.actionEndHour,
        actionEndMinute: action.actionEndMinute,
      });
    } catch (e) {
      Alert.alert('에러', '인증 처리 도중 문제가 발생했습니다.');
    }
  }, [localImages, serverImages, action, updateActions]);

  return (
    <View style={styles.action_item}>
      <View style={styles.action_info}>
        {/* 헤더 행 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.action_name}>{action.actionName}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {/* 삭제 모드 버튼 */}
            {totalCount > 0 && (
              <Pressable
                onPress={toggleDeleteMode}
                style={{
                  backgroundColor: isDeleteMode ? '#FF6B6B' : '#F0F0F0',
                  padding: 6,
                  borderRadius: 4,
                }}
              >
                <Ionicons
                  name={isDeleteMode ? 'close' : 'trash-outline'}
                  size={16}
                  color={isDeleteMode ? 'white' : '#666'}
                />
              </Pressable>
            )}
            {isDeleteMode && selectedCount > 0 && (
              <Pressable
                onPress={handleDelete}
                disabled={isPending}
                style={{
                  backgroundColor: isPending ? '#FFAAAA' : '#FF3B30',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                >
                  {selectedCount}장 삭제
                </Text>
              </Pressable>
            )}
            {/* 저장 버튼 */}
            {!isDeleteMode && localImages.length > 0 && (
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
          {/* 서버 이미지 */}
          {serverImages.map((uri: string, index: number) => (
            <Pressable
              key={`server-${index}`}
              style={{ marginRight: 8 }}
              onPress={() =>
                isDeleteMode ? toggleServerImage(index) : openViewer(index)
              }
            >
              <Image source={{ uri }} style={styles.action_image} />
              {isDeleteMode && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: selectedServerIndices.has(index)
                      ? 'rgba(255,59,48,0.5)'
                      : 'rgba(0,0,0,0.15)',
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedServerIndices.has(index) && (
                    <Ionicons name="checkmark-circle" size={28} color="white" />
                  )}
                </View>
              )}
            </Pressable>
          ))}

          {/* 로컬이미지 */}
          {localImages.map((img: any, index: number) => (
            <Pressable
              key={`local-${action.actionId}-${index}`}
              style={{ marginRight: 8 }}
              onPress={() =>
                isDeleteMode
                  ? toggleLocalImage(index)
                  : openViewer(serverImages.length + index)
              }
            >
              <Image
                source={{ uri: img.uri }}
                style={[
                  styles.action_image,
                  { opacity: isDeleteMode ? 1 : 0.6 },
                ]}
              />
              {/* 이미지 삭제 */}
              {isDeleteMode && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: selectedLocalIndices.has(index)
                      ? 'rgba(255,59,48,0.5)'
                      : 'rgba(0,0,0,0.15)',
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedLocalIndices.has(index) && (
                    <Ionicons name="checkmark-circle" size={28} color="white" />
                  )}
                </View>
              )}
            </Pressable>
          ))}

          {/* 카메라 버튼*/}
          {!isDeleteMode && totalCount < 5 && (
            <Pressable onPress={handlePickImage} style={styles.camera_button}>
              <View style={styles.camera_icon_container}>
                <Ionicons name="camera" size={24} color="#ADB5BD" />
                <Text style={styles.camera_text}>{totalCount}/5</Text>
              </View>
            </Pressable>
          )}
        </ScrollView>
      </View>

      {/* 이미지 뷰어 모달 */}
      <Modal
        visible={isViewerOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsViewerOpen(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setIsViewerOpen(false)}
          />
          <View style={styles.imageContainer}>
            {allImagesForViewer[currentImageIndex] && (
              <Image
                source={{ uri: allImagesForViewer[currentImageIndex].uri }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsViewerOpen(false)}
            >
              <Ionicons name="close-circle" size={44} color="white" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
