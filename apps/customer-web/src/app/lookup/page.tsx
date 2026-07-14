'use client';

/* ============================================
   비회원 예약 조회 페이지
   파일명: apps/customer-web/src/app/lookup/page.tsx
   역할: 글래스모피즘 테마 예약 내역 조회
   ============================================ */

import { useRouter } from 'next/navigation';
import { useReservationLookup } from '../../hooks/useReservationLookup';
import ReservationResultCard from '../../components/organisms/ReservationResultCard';

/**
 * 예약 조회 페이지 컴포넌트
 */
export default function LookupPage() {
  const router = useRouter();
  const {
    name,
    setName,
    phone,
    handlePhoneChange,
    isSearched,
    isLoading,
    reservations,
    handleSearch,
    resetSearch
  } = useReservationLookup();

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 py-12 px-6 relative overflow-hidden">
      {/* 몽환적 백그라운드 블러 효과 */}
      <div className="absolute top-[-5%] right-[10%] w-[40%] h-[40%] rounded-full bg-orange-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-white/60 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between border-b border-stone-200/50 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">예약 조회</h1>
            <p className="text-sm text-stone-500 mt-2">
              {isSearched ? `${name}님의 예약 현황입니다.` : '예약 시 입력한 정보로 내역을 조회합니다.'}
            </p>
          </div>
          {isSearched && (
            <button onClick={resetSearch} className="px-4 py-2 glass-input text-stone-600 text-sm font-bold rounded-lg hover:bg-white/60 transition-colors">
              다시 조회하기
            </button>
          )}
        </div>

        {/* 1. 조회 폼 (검색 전) */}
        {!isSearched && (
          <div className="glass-card p-8 rounded-3xl shadow-lg max-w-md mx-auto mt-12">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-700">예약자 성함</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 glass-input rounded-lg transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-700">연락처</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="010-0000-0000"
                    maxLength={13}
                    className="w-full px-4 py-3 glass-input rounded-lg transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 glass-btn-primary font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? '조회 중...' : '조회하기'}
              </button>
            </form>
          </div>
        )}

        {/* 2. 조회 결과 (검색 후) */}
        {isSearched && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-stone-800">예약 내역 ({reservations.length}건)</h2>
            
            {reservations.length === 0 ? (
              <div className="glass-card p-10 rounded-3xl text-center mt-8">
                <p className="text-stone-500 mb-6 font-medium">일치하는 예약 내역이 없습니다.</p>
                <button onClick={() => router.push('/reservation')} className="px-8 py-3 glass-btn-primary rounded-xl font-bold transition-all">
                  예약 신청하기
                </button>
              </div>
            ) : (
              <div className="grid gap-5 mt-6">
                {reservations.map((res) => (
                  <ReservationResultCard key={res.id} reservation={res} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
