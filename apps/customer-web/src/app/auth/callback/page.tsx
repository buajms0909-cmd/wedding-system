'use client';

/* ============================================
   OAuth 인증 콜백 처리 페이지
   파일명: apps/customer-web/src/app/auth/callback/page.tsx
   역할: Supabase OAuth 로그인 후 리다이렉트되어 세션을 설정하고 다른 페이지로 이동시킴
   ============================================ */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';

/**
 * 인증 콜백 컴포넌트
 * @returns {JSX.Element} 로그인 처리중 화면
 */
export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    /**
     * 인증 상태 변화를 감지하여 세션 생성 완료 후 페이지 이동
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/reservation');
      } else if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    // 만료되거나 세션 처리가 즉시 끝났을 때를 대비해 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/reservation');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4">
        {/* 심플하고 우아한 로딩 인디케이터 */}
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-stone-600 font-medium">로그인 처리 중입니다...</p>
        <p className="text-xs text-stone-400">잠시만 기다려 주세요.</p>
      </div>
    </main>
  );
}
