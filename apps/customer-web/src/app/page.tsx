/* ============================================
   고객용 웹사이트 메인 랜딩 페이지
   파일명: apps/customer-web/src/app/page.tsx
   역할: 고객용 서비스 소개 및 예약 신청 유도 랜딩 페이지
   ============================================ */

import Link from 'next/link';

/**
 * 고객용 홈페이지 메인 컴포넌트
 * @returns {JSX.Element} 메인 화면 렌더링
 */
export default function HomePage() {
  return (
    <main className="min-h-[100dvh] bg-white text-slate-800 flex flex-col items-center justify-center p-6 pb-24 md:pb-6 relative overflow-hidden">
      {/* 백그라운드 장식 (골드 그라데이션) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-100/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-champagne/40 blur-[100px] pointer-events-none" />

      {/* 히어로 영역 */}
      <section className="max-w-2xl text-center space-y-8 z-10 w-full px-4">
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-xs md:text-base font-semibold tracking-[0.2em] text-gold-600 uppercase animate-fade-in-right-1">
            GOLDEN TAKE STUDIO
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.4] md:leading-loose tracking-wide break-keep">
            <span className="inline-block animate-fade-in-right-2">당신의 가장 찬란한 순간,</span><br className="md:hidden" />
            <br className="hidden md:block" />
            <span className="text-gold-500 mt-2 md:mt-6 inline-block animate-fade-in-right-3">영원으로 간직되다</span>
          </h1>
        </div>
        <p className="text-slate-500 text-base md:text-xl leading-relaxed max-w-xl mx-auto font-serif italic break-keep mt-8 md:mt-12 animate-fade-in-right-4">
          특별한 웨딩의 시작. 사진과 영상으로 기록하세요
        </p>

        {/* 액션 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 md:pt-8 animate-fade-in-right-4 mb-10 md:mb-0">
          <Link
            href="/reservation"
            className="px-8 md:px-10 py-3.5 md:py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold tracking-wider rounded-lg shadow-md shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            예약 신청
          </Link>
        </div>
      </section>
    </main>
  );
}
