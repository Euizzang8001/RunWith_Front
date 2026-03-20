import { colors } from '@/constants';
import { User } from '@/types';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Popover from 'react-native-popover-view';
import { ProfileImage } from '../ProfileImage';

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
  const [visible, setVisible] = useState(false);
  const defaultImage = require('@/assets/images/default-avatar.jpg');

  return (
    <Popover
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      from={(sourceRef) => (
        <View ref={sourceRef as any} collapsable={false}>
          <Pressable
            onPress={() => {
              console.log(isLeader, isTargetLeader);

              if (isLeader && !isTargetLeader) {
                setVisible(true);
              }
            }}
            style={styles.memberInfo}
          >
            <ProfileImage
              uri={runner.runnerImageLink}
              size={80}
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
            setVisible(false);
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
  },

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
