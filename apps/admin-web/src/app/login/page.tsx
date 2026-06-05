'use client';

/* ============================================
   사내 관리용 시스템 로그인 페이지
   파일명: apps/admin-web/src/app/login/page.tsx
   역할: 관리자 및 작가용 자체 계정 로그인 + 역할 선택 화면
   ============================================ */

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

type ViewMode = 'login' | 'role-select';

// ==========================================
// 2. STATE & HOOKS
// ==========================================
export default function AdminLoginPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ==========================================
  // 3. HANDLERS & LOGIC
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // 로그인 성공 → 역할 선택 화면으로 전환
      setViewMode('role-select');
    } catch (error: any) {
      console.error('❌ 로그인 실패:', error);
      setErrorMessage(`로그인 실패: ${error.message || '이메일과 비밀번호를 확인해 주세요.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/staff');
    }
  };

  // ==========================================
  // 4. RENDER
  // ==========================================

  // 역할 선택 화면
  if (viewMode === 'role-select') {
    return (
      <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Golden Take</span>
            <h2 className="text-2xl font-bold text-slate-800">접속할 페이지를 선택하세요</h2>
            <p className="text-sm text-slate-500">역할에 맞는 페이지로 이동합니다.</p>
          </div>

          <div className="space-y-4">
            {/* 대표자 카드 */}
            <button
              onClick={() => handleRoleSelect('admin')}
              className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900">대표자 관리 페이지</h3>
                  <p className="text-xs text-slate-500 mt-1">예약 대시보드, 상태 관리, 작가 배정, 출퇴근 현황 모니터링</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-500 ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* 직원(작가) 카드 */}
            <button
              onClick={() => handleRoleSelect('staff')}
              className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-600">직원(작가) 페이지</h3>
                  <p className="text-xs text-slate-500 mt-1">오늘 배정된 예식 스케줄 확인, 출발 · 도착 · 촬영 종료 인증</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-amber-500 ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <button
            onClick={async () => { await supabase.auth.signOut(); setViewMode('login'); }}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors py-2"
          >
            다른 계정으로 로그인
          </button>
        </div>
      </main>
    );
  }

  // 로그인 화면
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Golden Take Admin</span>
          <h2 className="text-2xl font-bold text-slate-800">사내 시스템 로그인</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-semibold text-slate-600">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs font-semibold text-slate-600">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 mt-2"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
          
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg mt-4 text-center font-bold">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
