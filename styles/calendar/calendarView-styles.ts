import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  calendar: { backgroundColor: colors.WHITE, paddingVertical: 10 },
  schedule_container: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  schedule_date: {
    fontSize: 16,
    textAlign: 'left',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  schedule_card: {
    backgroundColor: colors.WHITE_BACKGROUND,
    borderColor: colors.BLUE,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 100,
    marginVertical: 10,
  },
  card_info: {
    padding: 20,
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: '50%',
    maxHeight: '50%',
  },
  selectTime_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    padding: 50,
  },
  startTime: {
    backgroundColor: colors.GRAY,
    padding: 20,
    borderRadius: 12,
  },
  textStartTime: {
    textAlign: 'center',
  },
  endTime: {
    backgroundColor: colors.GRAY,
    padding: 20,
    borderRadius: 12,
  },
  textEndTime: {
    textAlign: 'center',
  },
  wave: {
    padding: 20,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: colors.BLUE,

    padding: 20,
    borderRadius: 24,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.RED,
    padding: 20,
    borderRadius: 24,
  },
  add_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addSchedule: {
    fontSize: 16,
    fontFamily: 'pretendard500',
    borderRadius: 12,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
    padding: 10,
  },
  addSchedule_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    marginBottom: 10,
  },
  noSchedule: {
    fontSize: 16,
    fontFamily: 'pretnedard500',
  },
});
