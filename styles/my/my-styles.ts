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
  sectionTitle: {
    fontFamily: 'pretendard700',
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  requestListContainer: {
    paddingHorizontal: 16,
  },
  requestCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  groupInfo: {
    flex: 1,
  },
  groupNameText: {
    fontFamily: 'pretendard600',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'pretendard500',
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 8,
    fontFamily: 'pretendard400',
  },
});
