'use client';

/* ============================================
   소셜 로그인 버튼 컴포넌트 (Atoms)
   파일명: apps/customer-web/src/components/atoms/SocialLoginButton.tsx
   역할: 구글, 네이버, 카카오 OAuth 로그인 동작을 지원하는 단일 버튼 컴포넌트
   ============================================ */

import { supabase } from '../../utils/supabase';

interface SocialLoginButtonProps {
  provider: 'google' | 'naver' | 'kakao';
}

/**
 * 소셜 로그인 버튼 컴포넌트
 * @param {SocialLoginButtonProps} props - 소셜 로그인 공급자 정보
 */
export default function SocialLoginButton({ provider }: SocialLoginButtonProps) {
  /**
   * Supabase OAuth 로그인 핸들러
   */
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(`${provider} 로그인 중 오류 발생:`, error.message);
    }
  };

  // 공급자별 스타일 및 문구 설정
  const themes = {
    google: {
      bg: 'bg-white hover:bg-stone-50 border border-stone-200 text-stone-700',
      label: 'Google 로그인',
    },
    naver: {
      bg: 'bg-[#03C75A] hover:bg-[#02b350] text-white',
      label: '네이버 로그인',
    },
    kakao: {
      bg: 'bg-[#FEE500] hover:bg-[#fddc00] text-[#191919]',
      label: '카카오 로그인',
    },
  };

  const currentTheme = themes[provider];

  return (
    <button
      onClick={handleLogin}
      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ${currentTheme.bg}`}
    >
      <span>{currentTheme.label}</span>
    </button>
  );
}
