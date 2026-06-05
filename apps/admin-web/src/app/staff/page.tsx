'use client';

/* ============================================
   직원(작가) 전용 출퇴근 인증 페이지
   경로: /staff
   역할: 오늘 배정된 예식 스케줄 확인 + 출발/도착/촬영종료 3단계 인증
   모바일 최적화 풀스크린 디자인
   ============================================ */

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

interface ScheduleItem {
  id: string;
  customer_name: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: string;
}

type AttendanceStep = 'waiting' | 'departed' | 'arrived' | 'completed';

interface AttendanceRecord {
  reservation_id: string;
  step: AttendanceStep;
  departure_time: string | null;
  arrival_time: string | null;
  end_time: string | null;
  arrival_photo: string | null;
}

// ==========================================
// 2. MOCK DATA (테스트용 더미 데이터)
// ==========================================
const todayStr = new Date().toISOString().split('T')[0];

const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: 'mock-001',
    customer_name: '김민수 ♥ 이서연',
    wedding_date: todayStr,
    wedding_time: '11:30',
    location: '더채플앳청담 그랜드홀',
    product_name: '본식 DVD',
    status: 'confirmed',
  },
  {
    id: 'mock-002',
    customer_name: '박준형 ♥ 최수진',
    wedding_date: todayStr,
    wedding_time: '14:00',
    location: '서울가든호텔 로즈홀',
    product_name: '본식 DVD',
    status: 'confirmed',
  },
  {
    id: 'mock-003',
    customer_name: '정현우 ♥ 한지민',
    wedding_date: todayStr,
    wedding_time: '16:30',
    location: '그랜드 인터컨티넨탈 서울',
    product_name: '본식 DVD',
    status: 'pending_balance',
  },
];

// ==========================================
// 3. STATE & HOOKS
// ==========================================
export default function StaffPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [photoModal, setPhotoModal] = useState<{ resId: string; preview: string | null } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  // ==========================================
  // 4. HANDLERS & LOGIC
  // ==========================================
  const getRecord = (resId: string): AttendanceRecord => {
    return records.find(r => r.reservation_id === resId) || {
      reservation_id: resId,
      step: 'waiting',
      departure_time: null,
      arrival_time: null,
      end_time: null,
      arrival_photo: null,
    };
  };

  const handleStep = (resId: string, nextStep: AttendanceStep) => {
    const now = new Date().toISOString();
    const labels: Record<AttendanceStep, string> = {
      waiting: '',
      departed: '출발 기록',
      arrived: '도착 기록',
      completed: '촬영 종료 기록',
    };

    if (!confirm(`현재 시간으로 ${labels[nextStep]}을 하시겠습니까?`)) return;

    setRecords(prev => {
      const existing = prev.find(r => r.reservation_id === resId);
      if (existing) {
        return prev.map(r => {
          if (r.reservation_id !== resId) return r;
          return {
            ...r,
            step: nextStep,
            ...(nextStep === 'departed' && { departure_time: now }),
            ...(nextStep === 'arrived' && { arrival_time: now }),
            ...(nextStep === 'completed' && { end_time: now }),
          };
        });
      }
      return [...prev, {
        reservation_id: resId,
        step: nextStep,
        departure_time: nextStep === 'departed' ? now : null,
        arrival_time: null,
        end_time: null,
        arrival_photo: null,
      }];
    });
  };

  /** 도착 사진 선택 핸들러 */
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !photoModal) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoModal({ ...photoModal, preview: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  /** 도착 사진 업로드 확정 핸들러 */
  const handleArrivalConfirm = () => {
    if (!photoModal?.preview) {
      alert('도착 인증 사진을 촬영해 주세요.');
      return;
    }
    const now = new Date().toISOString();
    setRecords(prev => {
      const existing = prev.find(r => r.reservation_id === photoModal.resId);
      if (existing) {
        return prev.map(r => r.reservation_id === photoModal.resId
          ? { ...r, step: 'arrived' as AttendanceStep, arrival_time: now, arrival_photo: photoModal.preview }
          : r
        );
      }
      return [...prev, {
        reservation_id: photoModal.resId,
        step: 'arrived' as AttendanceStep,
        departure_time: null,
        arrival_time: now,
        end_time: null,
        arrival_photo: photoModal.preview,
      }];
    });
    setPhotoModal(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const formatShortTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  // 상태별 색상
  const stepColors: Record<string, string> = {
    confirmed: 'bg-emerald-100 text-emerald-700',
    pending_balance: 'bg-amber-100 text-amber-700',
  };

  // ==========================================
  // 5. RENDER
  // ==========================================
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-800">골든테이크 스태프</span>
        </div>
        <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">
          로그아웃
        </button>
      </header>

      <div className="flex-1 p-4 pb-20 max-w-lg mx-auto w-full space-y-5">
        {/* 시계 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center space-y-1">
          <p className="text-3xl font-extrabold text-slate-800 font-mono tracking-tight">{timeString}</p>
          <p className="text-xs text-slate-500 font-medium">{dateString}</p>
        </div>

        {/* 일정 목록 */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 px-1">오늘 배정된 스케줄 ({MOCK_SCHEDULES.length}건)</h2>

          {MOCK_SCHEDULES.map(schedule => {
            const record = getRecord(schedule.id);

            return (
              <div key={schedule.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* 예약 정보 */}
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${stepColors[schedule.status] || 'bg-slate-100 text-slate-600'}`}>
                      {schedule.status === 'confirmed' ? '예약 확정' : '잔금 대기'}
                    </span>
                    <span className="text-sm font-extrabold text-slate-800">{schedule.wedding_time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{schedule.customer_name} 님</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <span>📍</span> {schedule.location}
                  </p>
                  <p className="text-xs text-slate-400">{schedule.product_name}</p>
                </div>

                {/* 타임라인 + 버튼 영역 */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 space-y-3">
                  {/* 타임라인 표시 */}
                  {record.departure_time && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                      <span className="text-blue-700 font-bold">출발</span>
                      <span className="text-slate-400">{formatShortTime(record.departure_time)}</span>
                    </div>
                  )}
                  {record.arrival_time && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                      <span className="text-emerald-700 font-bold">도착</span>
                      <span className="text-slate-400">{formatShortTime(record.arrival_time)}</span>
                      {record.arrival_photo && <span className="text-emerald-500 font-bold">📷</span>}
                    </div>
                  )}
                  {record.end_time && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-slate-500 rounded-full shrink-0" />
                      <span className="text-slate-700 font-bold">촬영 종료</span>
                      <span className="text-slate-400">{formatShortTime(record.end_time)}</span>
                    </div>
                  )}

                  {/* 단계별 버튼 */}
                  {record.step === 'waiting' && (
                    <button
                      onClick={() => handleStep(schedule.id, 'departed')}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      출발
                    </button>
                  )}
                  {record.step === 'departed' && (
                    <button
                      onClick={() => setPhotoModal({ resId: schedule.id, preview: null })}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      도착 (사진 인증)
                    </button>
                  )}
                  {record.step === 'arrived' && (
                    <button
                      onClick={() => handleStep(schedule.id, 'completed')}
                      className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      촬영 종료
                    </button>
                  )}
                  {record.step === 'completed' && (
                    <div className="text-center bg-slate-200 py-3 rounded-xl border border-slate-300">
                      <span className="text-sm font-bold text-slate-500">✓ 오늘 촬영이 모두 완료되었습니다</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 도착 사진 업로드 모달 */}
      {photoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">📷 도착 사진 인증</h3>
              <button onClick={() => setPhotoModal(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-500 text-center">현장에 도착한 것을 인증할 수 있는 사진을 촬영해 주세요.<br />(예: 웨딩홀 입구, 안내 보드 등)</p>

              {/* 프리뷰 영역 */}
              {photoModal.preview ? (
                <div className="relative">
                  <img src={photoModal.preview} alt="도착 인증 사진" className="w-full h-64 object-cover rounded-xl border border-slate-200" />
                  <button
                    onClick={() => setPhotoModal({ ...photoModal, preview: null })}
                    className="absolute top-2 right-2 bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold hover:bg-black/70"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="block w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-colors flex flex-col items-center justify-center gap-3">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-slate-400">탭하여 사진 촬영 / 선택</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setPhotoModal(null)}
                className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleArrivalConfirm}
                disabled={!photoModal.preview}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                도착 확인
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
