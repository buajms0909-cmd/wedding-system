'use client';

/* ============================================
   예약 신청 완료 페이지
   파일명: apps/customer-web/src/app/reservation/complete/page.tsx
   역할: 예약 신청 성공 후 노출되는 팝업 성격의 화면 (결제 안내 및 조회 유도)
   ============================================ */

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CompleteContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('n') || '';
  const phone = searchParams.get('p') || '';

  // 룩업 페이지로 이름, 연락처를 넘겨 바로 조회할 수 있도록 구성
  const lookupUrl = name && phone ? `/lookup?n=${encodeURIComponent(name)}&p=${encodeURIComponent(phone)}` : '/lookup';

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-sm text-center space-y-8">
      {/* 헤더/축하 메시지 */}
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">예약 신청 완료</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          예약 신청이 정상적으로 접수되었습니다.<br/>
          아래 안내에 따라 계약금을 결제해 주시면 예약이 최종 확정됩니다.
        </p>
      </div>

      {/* 결제 안내 영역 */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-left space-y-5">
        <div>
          <div className="text-sm font-sans font-semibold text-stone-700 mb-2">1. 계좌이체</div>
          <p className="text-sm text-stone-600 bg-white p-3 border border-stone-200 rounded-lg">
            국민은행 041301-04-343992<br/>
            <span className="text-xs text-stone-500">예금주: 스튜디오 시간교 정태환</span>
          </p>
        </div>
        
        <div>
          <div className="text-sm font-sans font-semibold text-stone-700 mb-2">2. 네이버 페이 결제하기</div>
          <a
            href="https://smartstore.naver.com"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-3 text-center bg-[#03C75A] hover:bg-[#02b351] text-white font-bold rounded-lg transition-colors"
          >
            네이버 스토어로 이동
          </a>
        </div>
      </div>

      {/* 예약 조회 버튼 */}
      <div className="pt-4">
        <Link
          href={lookupUrl}
          className="block w-full py-4 bg-gold-500 hover:bg-gold-600 text-white font-sans font-bold rounded-lg shadow-md shadow-gold-500/20 transition-all"
        >
          예약 조회 가기
        </Link>
      </div>
    </div>
  );
}

export default function ReservationCompletePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 py-24 px-6 flex flex-col items-center justify-center">
      <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-stone-200 rounded-2xl"></div>}>
        <CompleteContent />
      </Suspense>
    </main>
  );
}
