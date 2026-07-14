'use client';

/* ============================================
   예약 신청 완료 페이지
   파일명: apps/customer-web/src/app/reservation/complete/page.tsx
   역할: 예약 신청 성공 후 글래스모피즘 카드로 결제 안내 및 카카오 상담 유도 제공
   ============================================ */

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/**
 * 예약 성공 상세 콘텐츠 컴포넌트
 */
function CompleteContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('n') || '';
  const phone = searchParams.get('p') || '';
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || 'http://pf.kakao.com/_xdmlGX';

  // 룩업 페이지로 이름, 연락처를 넘겨 바로 조회할 수 있도록 구성
  const lookupUrl = name && phone ? `/lookup?n=${encodeURIComponent(name)}&p=${encodeURIComponent(phone)}` : '/lookup';

  return (
    <div className="w-full max-w-md glass-card p-8 rounded-3xl text-center space-y-8 shadow-lg shadow-stone-100/10">
      {/* 헤더/성공 메시지 */}
      <div className="space-y-4">
        <div className="w-16 h-16 bg-orange-100/60 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-200/50">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">예약 신청 완료</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          예약 신청이 정상적으로 접수되었습니다.<br/>
          아래 안내에 따라 계약금을 결제해 주시면 예약이 최종 확정됩니다.
        </p>
      </div>

      {/* 결제 및 카카오 상담 안내 영역 */}
      <div className="bg-white/40 border border-white/20 rounded-2xl p-6 text-left space-y-5">
        <div>
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">1. 계약금 이체 계좌</div>
          <p className="text-sm text-stone-700 bg-white/60 p-3.5 border border-white/30 rounded-xl leading-relaxed">
            <strong className="text-stone-900">국민은행 041301-04-343992</strong><br/>
            예금주: 스튜디오 시간교 정태환
          </p>
        </div>
        
        <div>
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">2. 네이버 페이 결제 (선택)</div>
          <a
            href="https://smartstore.naver.com"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-3 text-center bg-[#03C75A] hover:bg-[#02b351] text-white font-bold rounded-xl transition-all shadow-sm shadow-[#03C75A]/10 text-sm"
          >
            네이버 스토어에서 결제하기
          </a>
        </div>

        <div className="pt-2 border-t border-stone-200/20">
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">3. 예약 확정 및 상담 문의</div>
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 text-center glass-btn-secondary font-bold rounded-xl transition-all shadow-sm text-sm"
          >
            카카오톡으로 예약 확정 알리기
          </a>
        </div>
      </div>

      {/* 예약 조회 버튼 */}
      <div className="pt-2">
        <Link
          href={lookupUrl}
          className="block w-full py-4 glass-btn-primary font-bold rounded-xl transition-all text-sm tracking-wider"
        >
          예약 내역 조회하기
        </Link>
      </div>
    </div>
  );
}

/**
 * 예약 완료 페이지 컴포넌트
 */
export default function ReservationCompletePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 백그라운드 장식용 블러 서클 */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-orange-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-white/50 blur-[100px] pointer-events-none" />
      
      <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-stone-200 rounded-3xl"></div>}>
        <CompleteContent />
      </Suspense>
    </main>
  );
}
