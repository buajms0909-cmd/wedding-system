import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 사내 관리용 웹 접근 제어 미들웨어
 * 역할: 로그인하지 않은 사용자가 /(authenticated) 하위 경로에 접근하는 것을 차단
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabaseCookie = req.cookies.get('sb-access-token'); // 기본적으로 로컬스토리지를 쓰지만 SSR 미들웨어에서는 쿠키 확인 필요

  // 참고: 현재 supabase-js는 클라이언트(localStorage) 기반 세션을 쓰도록 설정되어 있어
  // 서버 사이드 미들웨어에서 완벽히 세션을 검증하려면 @supabase/ssr 설정이 필요합니다.
  // 이 미들웨어는 추후 확장을 위한 기본 라우트 보호 뼈대입니다.
  // 클라이언트 측 라우트 보호는 layout.tsx 또는 각 페이지에서 보완합니다.

  // 임시: 세부적인 인증 제어는 나중에 supabase/ssr로 교체
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|images).*)'],
};
