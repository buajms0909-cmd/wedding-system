'use client';

/* ============================================
   고객용 웹사이트 예약 신청 페이지
   파일명: apps/customer-web/src/app/reservation/page.tsx
   역할: 고객이 촬영 예약을 신청하고 결제 링크로 이동할 수 있게 안내하는 화면
   ============================================ */

import ReservationForm from '../../components/organisms/ReservationForm';

/**
 * 예약 신청 페이지 컴포넌트
 * @returns {JSX.Element} 예약 페이지 화면
 */
export default function ReservationPage() {
  /**
   * 예약 성공 시 호출되는 핸들러
   * 사용자 알림 후 외부 스마트스토어 링크로 리다이렉트 처리
   */
  const handleReservationSuccess = (name: string, phone: string) => {
    window.location.href = `/reservation/complete?n=${encodeURIComponent(name)}&p=${encodeURIComponent(phone)}`;
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 py-24 px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-12">
        {/* 상단 헤더 영역 */}
        <div className="text-center space-y-4">
          <span className="text-sm font-semibold tracking-[0.2em] text-gold-600 uppercase">
            Reservation
          </span>
          <h1 className="text-4xl font-serif text-slate-900">
            촬영 예약 신청
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            원하시는 예식 일정과 상품을 선택하여 촬영 예약을 신청해 주세요.<br />
            확인 후 빠르게 연락드리겠습니다.
          </p>
        </div>

        {/* 예약 신청 폼 */}
        <ReservationForm onSuccess={handleReservationSuccess} />
      </div>
    </main>
  );
}
