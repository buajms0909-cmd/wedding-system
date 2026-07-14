'use client';

/* ============================================
   고객용 웹사이트 메인 랜딩 페이지
   파일명: apps/customer-web/src/app/page.tsx
   역할: 글래스모피즘이 가미된 프리미엄 홈 화면 (카카오 상담 & 예약 버튼 연동)
   ============================================ */

import Link from 'next/link';

/**
 * 고객용 홈페이지 메인 컴포넌트
 */
export default function HomePage() {
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || 'http://pf.kakao.com/_xdmlGX';

  return (
    <main className="min-h-[90dvh] bg-stone-100 text-slate-800 flex flex-col items-center justify-center p-6 relative overflow-hidden z-0">
      {/* 화사한 다채로운 컬러 광원 배경 (글래스모피즘 투과용) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-orange-400/40 to-rose-400/30 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-amber-300/40 to-orange-200/30 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-white/60 blur-[90px] pointer-events-none -z-10" />
      
      {/* 히어로 영역 - 글래스모피즘 카드 */}
      <section className="max-w-xl w-full z-10 glass-card p-10 md:p-14 rounded-3xl text-center space-y-10 animate-fade-in-right-1">
        <div className="space-y-4">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.25em] text-orange-500 uppercase">
            GOLDEN TAKE STUDIO
          </h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 leading-[1.4] tracking-wide break-keep text-balance">
            당신의 가장 찬란한 순간<br />
            <span className="text-orange-500 mt-2 sm:mt-3 inline-block font-extrabold">영원으로 간직되다</span>
          </h1>
        </div>

        <p className="text-stone-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm mx-auto font-serif italic break-keep text-balance">
          생애 단 한 번뿐인 순간을<br className="hidden sm:block" />
          가장 아름답고 자연스럽게 담아드립니다.
        </p>

        {/* 액션 버튼 그룹 */}
        <div className="flex flex-col gap-3.5 pt-4">
          <Link
            href="/reservation"
            className="w-full py-4 glass-btn-primary text-center font-extrabold tracking-wider rounded-xl transition-all duration-300"
          >
            촬영 예약 신청
          </Link>
          
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 glass-btn-secondary text-center font-bold tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-5.523 0-10 3.5-10 7.828 0 2.81 1.83 5.27 4.67 6.64l-1.22 4.46c-.05.18.17.31.31.21l5.25-3.46c1.3.16 2.63.16 3.99 0 5.523 0 10-3.5 10-7.828S17.523 3 12 3z" />
            </svg>
            카카오톡 1:1 상담하기
          </a>
        </div>
      </section>
    </main>
  );
}
