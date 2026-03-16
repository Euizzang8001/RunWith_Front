import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container_top: {
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard500',
    textAlign: 'center',
  },
  user: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  iconWrapper: {
    marginLeft: 30,
    width: 100,
    height: 100,
    borderRadius: 60,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 60,
  },
  textWrapper: {
    marginTop: 20,
    marginLeft: 20,
    gap: 30,
  },
  setting_space: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  setting_container: {
    bottom: 0,
  },
  logOut: {
    padding: 16,
  },
  logOut_text: {
    textAlign: 'left',
    color: colors.RED,
  },
});
