import { colors } from '@/constants';
import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  calendar: {
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
  },
  schedule_container: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  schedule_date: {
    fontSize: 18,
    fontFamily: 'pretendard700',
    color: '#1A1A1A',
    textAlign: 'left',
    marginVertical: 15,
  },
  schedule_card: {
    backgroundColor: '#F8F9FA',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
  },
  card_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  schedule_text_wrapper: {
    flex: 1,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: height * 0.5,
    maxHeight: height * 0.8,
    gap: 30,
  },

  input_wrapper: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  selectTime_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  startTime: {
    backgroundColor: '#F1F3F5',
    flex: 1,
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStartTime: {
    textAlign: 'center',
    fontFamily: 'pretendard600',
    color: '#333',
  },
  endTime: {
    backgroundColor: '#F1F3F5',
    flex: 1,
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEndTime: {
    textAlign: 'center',
    fontFamily: 'pretendard600',
    color: '#333',
  },
  wave: {
    fontSize: 18,
    color: '#ADB5BD',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: colors.WHITE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addSchedule: {
    fontSize: 14,
    fontFamily: 'pretendard600',
    color: colors.BLUE,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  addSchedule_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  noSchedule: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 15,
    fontFamily: 'pretendard400',
    color: '#999',
  },
});
