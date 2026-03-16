import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container_top: {
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 50,
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard500',
    textAlign: 'center',
  },
  arrow_icon: {
    marginLeft: 5,
    width: 48,
    alignItems: 'center',
  },
  right: {
    width: 48,
  },
  inputWrapper: {
    marginTop: 20,
    gap: 30,
  },
  JoinButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  joinButtonText: {
    fontFamily: 'pretendard500',
    fontSize: 16,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
    padding: 20,
    borderRadius: 24,
  },
  image_wrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
});
