import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/organisms/Header';

import QueryProvider from '../components/providers/QueryProvider';

import KakaoFloatingButton from '../components/atoms/KakaoFloatingButton';

export const metadata: Metadata = {
  title: 'Golden Take - 프리미엄 웨딩 촬영',
  description: '감각적인 구도와 영화 같은 색감으로 두 분만의 특별한 웨딩 스토리를 담아냅니다. 본식 스냅, DVD 예약 안내.',
  openGraph: {
    title: 'Golden Take - 프리미엄 웨딩 촬영',
    description: '감각적인 구도와 영화 같은 색감으로 두 분만의 특별한 웨딩 스토리를 담아냅니다.',
    images: ['/images/Main_logo.png'],
    type: 'website',
    locale: 'ko_KR',
  },
  icons: {
    icon: '/images/Main_logo.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <KakaoFloatingButton />
        </QueryProvider>
      </body>
    </html>
  );
}
