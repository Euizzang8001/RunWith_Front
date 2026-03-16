import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  arrow_container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  groupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

    borderRadius: 60,
  },
  arrow_icon: {
    marginLeft: 5,
    width: 48,
    alignItems: 'center',
  },
  groupInfo_container: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomWidth: 0.7,
    borderColor: colors.GRAY_FONT,
    paddingBottom: 20,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textWrapper: {
    marginTop: 10,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupName: {
    fontSize: 18,
    fontFamily: 'pretendard500',
  },
  groupDescription: {
    color: colors.GRAY_FONT,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomButton: {
    paddingBottom: 20,
    borderTopWidth: 0.7,
    borderColor: colors.GRAY_FONT,
  },
  memberText: {
    fontSize: 14,
    fontFamily: 'pretendard500',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
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
  groupRequestListText: {
    color: colors.BLACK,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  groupDeleteText: {
    paddingTop: 20,
    paddingHorizontal: 20,
    color: colors.RED,
  },
});
