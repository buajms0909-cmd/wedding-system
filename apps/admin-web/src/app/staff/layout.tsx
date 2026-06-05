import AuthGuard from '../../components/organisms/AuthGuard';

/**
 * 직원(작가) 전용 레이아웃
 * 사이드바 없이 모바일 풀스크린 최적화
 */
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-100">
        {children}
      </div>
    </AuthGuard>
  );
}
