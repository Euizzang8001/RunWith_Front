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
  modalOverlay: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontFamily: 'pretendard700',
    fontSize: 20,
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 4,
  },
  requestScroll: {
    padding: 16,
  },
  requestCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    // 그림자 설정
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  requestRunnerName: {
    fontFamily: 'pretendard600',
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptBtn: {
    backgroundColor: '#3498db', // 연한 초록 배경
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  acceptBtnText: {
    fontFamily: 'pretendard700',
    fontSize: 14,
    color: '#ffffff', // 진한 초록 글씨
  },
  rejectBtn: {
    backgroundColor: '#FFEBEE', // 연한 빨강 배경
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  rejectBtnText: {
    fontFamily: 'pretendard700',
    fontSize: 14,
    color: '#C62828', // 진한 빨강 글씨
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontFamily: 'pretendard400',
    fontSize: 15,
    color: '#999',
  },
});
