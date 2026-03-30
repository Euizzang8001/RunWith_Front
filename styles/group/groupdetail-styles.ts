import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow_icon: {
    marginLeft: 5,
    width: 48,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard600',
  },
  icon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_icon_Wrapper: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  user_icon: {
    width: 50,
    height: 50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  userSelcetd: {
    borderWidth: 2,
    borderColor: colors.BLUE,
  },
  text_container: {
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  seletedUserText: {
    fontFamily: 'pretendard500',
    fontSize: 16,
  },
  schedule_container: {
    marginTop: 20,
    backgroundColor: colors.GRAY,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recognizesButton: {
    minWidth: 50,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  noScheduleDay: {
    marginTop: 100,
    color: colors.GRAY_FONT,
    width: '100%',
    textAlign: 'center',
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  action_list_wrapper: {
    marginTop: 15,
    paddingHorizontal: 5,
    flex: 1,
  },
  action_item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.BLUE,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 2,
  },
  action_info: {
    flex: 1,
  },
  action_image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  action_name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  action_time_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action_time_text: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  modal_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modal_subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    marginBottom: 10,
    marginLeft: 5,
  },
  close_button: {
    marginBottom: 30,
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  close_button_text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  no_action_text: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 14,
  },
  memberHeader: {
    paddingHorizontal: 16,
  },

  memberText: {
    fontFamily: 'pretendard700',
    fontSize: 18,
    color: '#1A1A1A',
    lineHeight: 22,
  },

  addScheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 2,
  },

  addScheduleText: {
    fontFamily: 'pretendard600',
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  camera_button: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1.5,
    borderColor: '#DEE2E6',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  camera_icon_container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  camera_text: {
    fontSize: 11,
    color: '#ADB5BD',
    fontFamily: 'pretendard600',
  },

  image_overlay_badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
