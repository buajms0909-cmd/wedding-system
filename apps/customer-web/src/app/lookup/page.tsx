'use client';

/* ============================================
   비회원 예약 조회 페이지
   파일명: apps/customer-web/src/app/lookup/page.tsx
   역할: 이름과 연락처로 예약 내역을 조회하는 페이지
   ============================================ */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

interface Reservation {
  id: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  pending: '계약금 입금 대기',
  pending_balance: '잔금 입금 대기중',
  confirmed: '예약 확정',
  completed: '촬영 완료',
  cancelled: '취소됨',
};

const statusColors: Record<string, string> = {
  pending: 'bg-stone-100 text-stone-600 border-stone-200',
  pending_balance: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  completed: 'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-rose-100 text-rose-600 border-rose-200',
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

export default function LookupPage() {
  const router = useRouter();
  
  // 조회 폼 상태
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // 결과 상태
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // URL 쿼리 파라미터에서 자동 세팅
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const n = params.get('n');
      const p = params.get('p');
      if (n && p) {
        setName(n);
        setPhone(p);
      }
    }
  }, []);

  // 전화번호 자동 하이픈 포매팅
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 3 && val.length <= 7) {
      val = `${val.slice(0, 3)}-${val.slice(3)}`;
    } else if (val.length > 7) {
      val = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`;
    }
    setPhone(val);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('예약자 성함과 연락처를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('customer_name', name)
        .eq('customer_phone', phone)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
      setIsSearched(true);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
      alert('예약 내역을 조회하는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setIsSearched(false);
    setName('');
    setPhone('');
    setReservations([]);
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900">예약 조회</h1>
            <p className="text-sm text-stone-500 mt-1">
              {isSearched ? `${name}님의 예약 현황입니다.` : '예약 시 입력한 정보로 내역을 조회합니다.'}
            </p>
          </div>
          {isSearched && (
            <button onClick={resetSearch} className="px-4 py-2 bg-white border border-stone-200 text-stone-600 text-sm font-bold rounded-lg hover:bg-stone-100 transition-colors">
              다시 조회하기
            </button>
          )}
        </div>

        {/* 1. 조회 폼 (검색 전) */}
        {!isSearched && (
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm max-w-md mx-auto mt-12">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-stone-700">예약자 성함</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-stone-700">연락처</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="010-0000-0000"
                    maxLength={13}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
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
              <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center shadow-sm mt-8">
                <p className="text-stone-500 mb-4">일치하는 예약 내역이 없습니다.</p>
                <button onClick={() => router.push('/reservation')} className="px-6 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors">
                  예약 신청하기
                </button>
              </div>
            ) : (
              <div className="grid gap-4 mt-4">
                {reservations.map((res) => (
                  <div key={res.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColors[res.status]}`}>
                          {statusLabels[res.status]}
                        </span>
                        <span className="text-xs text-stone-400">신청일: {new Date(res.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="font-bold text-stone-800 text-lg">{res.product_name}</p>
                      <p className="text-sm text-stone-600">{res.wedding_date} {res.wedding_time.slice(0, 5)}</p>
                      <p className="text-sm text-stone-500">장소: {res.location}</p>
                    </div>
                    
                    {res.status === 'pending' && (
                      <div className="text-right">
                        <div className="mb-3">
                          <p className="text-xs text-stone-600">입금하기 (국민은행 041301-04-343992 스튜디오 시간교 정태환)</p>
                        </div>
                        <a href="https://smartstore.naver.com" target="_blank" rel="noreferrer" className="inline-block px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-gold-500/20">
                          결제하기 (네이버 상품페이지)
                        </a>
                        <p className="text-[10px] text-rose-500 mt-2">결제 후 확정 상태로 변경됩니다.</p>
                      </div>
                    )}

                    {res.status === 'pending_balance' && (
                      <div className="text-right">
                        <span className="inline-block px-6 py-2.5 bg-stone-200 text-stone-600 text-sm font-bold rounded-lg cursor-not-allowed">
                          잔금 입금 예정
                        </span>
                        <p className="text-[10px] text-stone-500 mt-2">안내받으신 계좌로 잔금을 입금해주세요.</p>
                      </div>
                    )}

                    {res.status === 'confirmed' && (
                      <div className="text-right">
                        {calculateDDay(res.wedding_date) > 0 ? (
                          <div className="inline-block px-6 py-3 border-2 border-gold-400 bg-gold-50 text-gold-700 text-lg font-black rounded-xl shadow-sm">
                            웨딩까지 D-{calculateDDay(res.wedding_date)}일
                          </div>
                        ) : (
                          <div className="inline-block px-6 py-3 bg-stone-800 text-white text-sm font-bold rounded-xl shadow-sm">
                            상품 준비중
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
