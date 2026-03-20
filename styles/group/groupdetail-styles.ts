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
    marginTop: 30,
    backgroundColor: colors.GRAY,
    padding: 20,
    borderRadius: 16,
    gap: 10,
  },
  noScheduleDay: {
    marginTop: 30,
    width: '100%',
    textAlign: 'center',
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
});
