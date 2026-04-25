import { Alert } from 'react-native';
import { authFetch } from './authfetch';

// 그룹 가입 신청
export async function joinRequest({
  groupId,
  token,
}: {
  groupId: string;
  token: string;
}) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/join-requests`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ groupId }),
    },
  );
  if (!response.ok) {
    Alert.alert('가입 신청 에러');
  }
  return response.json();
}

// 그룹 신청 거절
export async function joinRequestReject({
  joinRequestId,
  token,
}: {
  joinRequestId: string;
  token: string;
}) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/join-requests/${joinRequestId}/reject`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ joinRequestId }),
    },
  );
  if (!response.ok) {
    Alert.alert('가입 신청 거절 에러');
  }
  return response.json();
}

// 그룹 신청 승인
export async function joinRequestAccept({
  joinRequestId,
  token,
}: {
  joinRequestId: string;
  token: string;
}) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/join-requests/${joinRequestId}/accept`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ joinRequestId }),
    },
  );
  if (!response.ok) {
    Alert.alert('그룹 가입 신청 승인 에러');
  }
  return response.json();
}

// 그룹 신청 명단 보기
export async function getJoinRequestList({
  groupId,
  token,
}: {
  groupId: string;
  token: string;
}) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/join-requests/groups/${groupId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 401) {
    throw new Error('그룹장만 사용가능한 기능입니다.');
  }

  return response.json();
}

// 나의 그룹 신청 명단 보기
export async function getMyJoinRequestList(token: string) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/join-requests/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    Alert.alert('가입 신청 승인 에러');
  }
  return response.json();
}

// 그룹 가입 신청 삭제
export async function deleteJoinRequest({
  joinRequestId,
  token,
}: {
  joinRequestId: string;
  token: string;
}) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/join-requests/${joinRequestId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    Alert.alert('그룹 가입 신청 삭제');
  }
  return response.json();
}
