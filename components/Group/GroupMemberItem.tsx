import { colors } from '@/constants';
import { User } from '@/types';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Popover from 'react-native-popover-view';

type Props = {
  runner: User;
  isLeader: boolean;
  isTargetLeader: boolean;
  onChangeLeader: (runnerId: string, runnerName: string) => void;
};

export default function GroupMemberItem({
  runner,
  isLeader,
  isTargetLeader,
  onChangeLeader,
}: Props) {
  const [visible, setVisible] = useState(false); // 상태 제어 전용
  const defaultImage = require('@/assets/images/default-avatar.jpg');

  return (
    <Popover
      isVisible={visible} // 직접 넘겨줍니다.
      onRequestClose={() => setVisible(false)} // 배경 누르면 닫힘
      from={(sourceRef) => (
        <View ref={sourceRef as any} collapsable={false}>
          {/* collapsable={false}는 안드로이드 ref 좌표 버그 방지용 */}
          <Pressable
            onPress={() => {
              console.log(isLeader, isTargetLeader);
              // 내가 리더이고 클릭 대상이 리더가 아닐 때만 true로 변경
              if (isLeader && !isTargetLeader) {
                setVisible(true);
              }
            }}
            style={styles.memberInfo}
          >
            <Image
              source={
                runner?.runnerImageLink
                  ? { uri: runner.runnerImageLink }
                  : defaultImage
              }
              style={styles.memberImage}
            />
            <Text style={styles.memberName}>{runner.runnerName}</Text>
          </Pressable>
        </View>
      )}
    >
      <View style={styles.popoverContainer}>
        <Pressable
          style={styles.popoverButton}
          onPress={() => {
            setVisible(false); // 팝오버 닫기
            onChangeLeader(runner.runnerId, runner.runnerName);
          }}
        >
          <Text style={styles.popoverText}>리더 변경</Text>
        </Pressable>
      </View>
    </Popover>
  );
}

const styles = StyleSheet.create({
  // --- 기존 CSS 유지 ---
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  memberName: {
    fontSize: 16,
    color: '#333',
    // 필요시 fontFamily 추가
  },
  // --- 팝오버 전용 CSS ---
  popoverContainer: {
    padding: 4,
    minWidth: 120,
  },
  popoverButton: {
    padding: 12,
    alignItems: 'center',
  },
  popoverText: {
    fontSize: 14,
    color: colors.BLUE || '#007AFF',
    fontWeight: '600',
  },
});
