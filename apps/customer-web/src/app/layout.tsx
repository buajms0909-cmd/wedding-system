import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/organisms/Header';

import QueryProvider from '../components/providers/QueryProvider';

import KakaoFloatingButton from '../components/atoms/KakaoFloatingButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://goldentake.co.kr'),
  title: 'Golden Take (골든테이크) - 프리미엄 웨딩 본식 DVD & 스냅',
  description: '가장 찬란한 순간을 완벽한 한 컷으로. 감각적인 구도와 영화 같은 색감으로 두 분만의 특별한 웨딩 스토리를 담아냅니다. 본식 스냅, DVD 예약 안내.',
  keywords: ['본식 스냅', '본식 DVD', '웨딩 영상', '골든테이크', 'Golden Take', '웨딩 스냅 추천', '결혼식 영상', '프리미엄 웨딩'],
  openGraph: {
    title: 'Golden Take - 프리미엄 웨딩 촬영',
    description: '감각적인 구도와 영화 같은 색감으로 두 분만의 특별한 웨딩 스토리를 담아냅니다.',
    url: 'https://goldentake.co.kr',
    siteName: 'Golden Take',
    images: [
      {
        url: '/images/Main_logo.png',
        width: 800,
        height: 600,
        alt: 'Golden Take Logo',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
