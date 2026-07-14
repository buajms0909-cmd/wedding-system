'use client';

import { ReservationInfo } from '../../hooks/useReservationLookup';

interface ReservationResultCardProps {
  reservation: ReservationInfo;
}

const statusLabels: Record<string, string> = {
  pending: '계약금 입금 대기',
  pending_balance: '잔금 입금 대기중',
  confirmed: '예약 확정',
  completed: '촬영 완료',
  cancelled: '취소됨',
};

const statusColors: Record<string, string> = {
  pending: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  pending_balance: 'bg-indigo-100/50 text-indigo-700 border-indigo-200/50',
  confirmed: 'bg-emerald-100/50 text-emerald-700 border-emerald-200/50',
  completed: 'bg-amber-100/50 text-amber-700 border-amber-200/50',
  cancelled: 'bg-rose-100/50 text-rose-600 border-rose-200/50',
};

// D-Day 계산 함수
const calculateDDay = (weddingDateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const wDate = new Date(weddingDateStr);
  wDate.setHours(0, 0, 0, 0);
  const diffTime = wDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function ReservationResultCard({ reservation: res }: ReservationResultCardProps) {
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || 'http://pf.kakao.com/_xdmlGX';

  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[res.status]}`}>
            {statusLabels[res.status]}
          </span>
          <span className="text-xs text-stone-500">신청일: {new Date(res.created_at).toLocaleDateString()}</span>
        </div>
        <p className="font-bold text-stone-800 text-lg">{res.product_name}</p>
        <p className="text-sm text-stone-600 font-medium">{res.wedding_date} {res.wedding_time.slice(0, 5)}</p>
        <p className="text-sm text-stone-500">장소: {res.location}</p>
      </div>
      
      {res.status === 'pending' && (
        <div className="text-right">
          <div className="mb-3">
            <p className="text-xs text-stone-600">입금하기 (국민은행 041301-04-343992)</p>
          </div>
          <a href={kakaoUrl} target="_blank" rel="noreferrer" className="inline-block px-5 py-2.5 glass-btn-secondary text-sm font-bold rounded-lg transition-all shadow-sm">
            카카오톡으로 예약 확정 문의
          </a>
          <p className="text-[10px] text-rose-500 mt-2">결제 확인 후 확정 상태로 변경됩니다.</p>
        </div>
      )}

      {res.status === 'pending_balance' && (
        <div className="text-right">
          <span className="inline-block px-6 py-2.5 bg-white/50 text-stone-600 text-sm font-bold rounded-lg border border-white/20 shadow-sm cursor-not-allowed">
            잔금 입금 예정
          </span>
          <p className="text-[10px] text-stone-500 mt-2">안내받으신 계좌로 잔금을 입금해주세요.</p>
        </div>
      )}

      {res.status === 'confirmed' && (
        <div className="text-right">
          {calculateDDay(res.wedding_date) > 0 ? (
            <div className="inline-block px-6 py-3 border border-orange-300/50 bg-orange-50/50 text-orange-600 text-lg font-black rounded-xl shadow-sm backdrop-blur-sm">
              웨딩까지 D-{calculateDDay(res.wedding_date)}일
            </div>
          ) : (
            <div className="inline-block px-6 py-3 bg-stone-800/90 text-white text-sm font-bold rounded-xl shadow-sm backdrop-blur-md">
              상품 준비중
            </div>
          )}
        </div>
      )}
    </div>
  );
}
