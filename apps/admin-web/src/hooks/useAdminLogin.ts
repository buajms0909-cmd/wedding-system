import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';

export type ViewMode = 'login' | 'role-select';

/**
 * 사내 관리자용 로그인 및 역할 선택 상태를 관리하는 커스텀 훅
 */
export function useAdminLogin() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * 이메일/비밀번호 기반 로그인 처리
   * @param {React.FormEvent} e - 폼 제출 이벤트
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      setViewMode('role-select');
    } catch (error: any) {
      console.error('❌ 로그인 실패:', error);
      setErrorMessage(`로그인 실패: ${error.message || '이메일과 비밀번호를 확인해 주세요.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 역할 선택에 따른 라우팅
   * @param {string} role - 선택한 역할 ('admin' | 'staff')
   */
  const handleRoleSelect = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/staff');
    }
  };

  /**
   * 로그아웃 처리 및 로그인 뷰 복구
   */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setViewMode('login');
  };

  return {
    viewMode,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    errorMessage,
    handleLogin,
    handleRoleSelect,
    handleLogout,
  };
}
