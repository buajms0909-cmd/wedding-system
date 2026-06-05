import type { Metadata } from 'next';
import './globals.css';

import QueryProvider from '../components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'Wedding Admin - 사내 관리 시스템',
  description: '웨딩 촬영 예약 관리 및 작가 출퇴근 관리 시스템',
};

/**
 * 루트 레이아웃 — 사이드바 없이 html/body만 제공
 * 사이드바는 (dashboard) 그룹 레이아웃에서 별도 적용
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
