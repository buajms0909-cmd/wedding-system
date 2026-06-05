import { redirect } from 'next/navigation';

/**
 * 관리자 시스템 루트 페이지
 * 로그인 페이지로 즉시 리다이렉트 처리
 */
export default function AdminRootPage() {
  redirect('/login');
}
