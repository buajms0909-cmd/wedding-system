import Sidebar from '../../components/organisms/Sidebar';
import AuthGuard from '../../components/organisms/AuthGuard';

/**
 * 인증 후 페이지 전용 레이아웃
 * 사이드바가 포함된 대시보드/출퇴근 등 관리 화면에 적용
 */
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen bg-slate-50">{children}</div>
      </div>
    </AuthGuard>
  );
}
