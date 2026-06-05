'use client';

/* ============================================
   대표용 월별 예약 스케줄 대시보드 페이지
   파일명: apps/admin-web/src/app/(authenticated)/dashboard/page.tsx
   역할: 예약 현황 시각화 및 상세 모달 조회/수정
   ============================================ */

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../utils/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Attendance {
  id: string;
  photographer_id: string;
  check_in_time: string;
  check_out_time: string | null;
}

interface Reservation {
  id: string;
  customer_name: string;
  customer_phone: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: string;
  assigned_photographer?: string;
  notes?: string;
  created_at?: string;
  attendance?: Attendance[];
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

// ==========================================
// 2. STATE & HOOKS
// ==========================================
export default function DashboardPage() {
  const queryClient = useQueryClient();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // 예약 상세 모달 상태 (이제 폼 형태이므로 Partial 허용)
  const [selectedReservation, setSelectedReservation] = useState<Partial<Reservation> | null>(null);
  
  // 새 예약 등록 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReservation, setNewReservation] = useState<Partial<Reservation>>({
    customer_name: '',
    customer_phone: '',
    wedding_date: '',
    wedding_time: '',
    location: '',
    product_name: '스냅',
    status: 'pending',
    assigned_photographer: '',
    notes: '',
  });

  const { data: reservations = [] } = useQuery({
    queryKey: ['reservations', currentYear, currentMonth],
    queryFn: async () => {
      const startDate = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
      const endDate = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('reservations')
        .select('*, attendance(*)')
        .gte('wedding_date', startDate)
        .lte('wedding_date', endDate)
        .order('wedding_date', { ascending: true });

      if (error) throw error;
      return data as Reservation[];
    },
  });

  // 예약 중복 검사 로직 (동기식)
  const checkIsDoubleBooked = (date?: string, time?: string, excludeId?: string) => {
    if (!date || !time || time.length < 5) return false;
    return reservations.some(r => 
      r.wedding_date === date && 
      r.wedding_time.substring(0, 5) === time && 
      r.status !== 'cancelled' && 
      r.id !== excludeId
    );
  };

  const isDoubleBooked = isAddModalOpen 
    ? checkIsDoubleBooked(newReservation.wedding_date, newReservation.wedding_time)
    : selectedReservation 
      ? checkIsDoubleBooked(selectedReservation.wedding_date, selectedReservation.wedding_time, selectedReservation.id)
      : false;

  // 전화번호 경고 체크 로직
  const checkPhoneWarning = (val?: string) => {
    if (!val) return false;
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length < 3) return false; // 3자리 미만은 경고 안함
    if (!cleaned.startsWith('010')) return true; // 3자리 이상인데 010 아니면 경고
    if (cleaned.length >= 7 && cleaned.length < 11) return true; // 7자리 이상 입력했는데 11자리가 안되면 경고
    return false;
  };

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('reservations').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: async (reservationData: any) => {
      const { error } = await supabase.from('reservations').insert(reservationData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      setIsAddModalOpen(false);
      setNewReservation({ customer_name: '', customer_phone: '', wedding_date: '', wedding_time: '', location: '', product_name: '', status: 'confirmed' });
      alert('새 예약이 성공적으로 등록되었습니다.');
    },
    onError: (error: any) => {
      console.error(error);
      alert(`예약 등록 중 오류가 발생했습니다.\n상세: ${error.message || JSON.stringify(error)}`);
    }
  });

  // ==========================================
  // 3. HANDLERS & LOGIC
  // ==========================================
  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentYear(currentYear - 1); setCurrentMonth(11); }
    else { setCurrentMonth(currentMonth - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentYear(currentYear + 1); setCurrentMonth(0); }
    else { setCurrentMonth(currentMonth + 1); }
  };

  // 상태 변경 및 수정본 일괄 처리하는 뮤테이션 (상세 모달용)
  const updateReservationMutation = useMutation({
    mutationFn: async (updatedData: Partial<Reservation>) => {
      const { error } = await supabase
        .from('reservations')
        .update({
          customer_name: updatedData.customer_name,
          customer_phone: updatedData.customer_phone,
          wedding_date: updatedData.wedding_date,
          wedding_time: updatedData.wedding_time,
          location: updatedData.location,
          product_name: updatedData.product_name,
          status: updatedData.status,
          assigned_photographer: updatedData.assigned_photographer,
          notes: updatedData.notes
        })
        .eq('id', updatedData.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      alert('예약 정보가 성공적으로 업데이트되었습니다.');
      setSelectedReservation(null);
    },
    onError: (error: any) => {
      console.error(error);
      alert('업데이트 중 오류가 발생했습니다: ' + error.message);
    }
  });

  const handleUpdateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReservation || !selectedReservation.id) return;
    
    // 포맷 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!selectedReservation.wedding_date || !dateRegex.test(selectedReservation.wedding_date)) {
      alert('예식일은 YYYY-MM-DD 형식으로 입력해주세요. (예: 2026-06-05)');
      return;
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!selectedReservation.wedding_time || !timeRegex.test(selectedReservation.wedding_time)) {
      alert('예식 시간은 24시간제 HH:MM 형식으로 올바르게 입력해주세요. (예: 14:30)');
      return;
    }
    
    updateReservationMutation.mutate(selectedReservation);
  };

  const handleUpdateWithStatus = (statusOverride: string) => {
    if (formRef.current?.reportValidity()) {
      if (!selectedReservation || !selectedReservation.id) return;
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!selectedReservation.wedding_date || !dateRegex.test(selectedReservation.wedding_date)) {
        alert('예식일은 YYYY-MM-DD 형식으로 입력해주세요. (예: 2026-06-05)');
        return;
      }
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!selectedReservation.wedding_time || !timeRegex.test(selectedReservation.wedding_time)) {
        alert('예식 시간은 24시간제 HH:MM 형식으로 올바르게 입력해주세요. (예: 14:30)');
        return;
      }
      
      updateReservationMutation.mutate({ ...selectedReservation, status: statusOverride });
    }
  };

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReservation.customer_name || !newReservation.wedding_date || !newReservation.wedding_time) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    // 포맷 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(newReservation.wedding_date)) {
      alert('예식일은 YYYY-MM-DD 형식으로 입력해주세요. (예: 2026-06-05)');
      return;
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(newReservation.wedding_time)) {
      alert('예식 시간은 24시간제 HH:MM 형식으로 올바르게 입력해주세요. (예: 14:30)');
      return;
    }

    createReservationMutation.mutate(newReservation);
  };

  // 자동 마스킹(포매팅) 함수
  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 3) return nums;
    if (nums.length <= 7) return nums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return nums.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3').slice(0, 13);
  };

  const formatDate = (value: string) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 4) return nums;
    if (nums.length <= 6) return nums.replace(/(\d{4})(\d{1,2})/, '$1-$2');
    return nums.replace(/(\d{4})(\d{2})(\d{1,2})/, '$1-$2-$3').slice(0, 10);
  };

  const formatTime = (value: string) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 2) return nums;
    return nums.replace(/(\d{2})(\d{1,2})/, '$1:$2').slice(0, 5);
  };

  const generateCalendarDays = (): (number | null)[] => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= totalDays; d++) days.push(d);
    return days;
  };

  const calendarDays = generateCalendarDays();
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  // 대기 중인 예약 필터링
  const pendingReservations = reservations.filter(r => r.status === 'pending');

  // ==========================================
  // 4. RENDER
  // ==========================================
  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">대시보드</h1>
            <p className="text-sm text-slate-500 mt-1">예약 현황 및 일정을 한눈에 확인하세요.</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            + 새 예약 등록
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* 좌측 메인 (달력 & 선택한 날짜 상세) */}
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <button onClick={handlePrevMonth} className="font-bold">←</button>
                <h2 className="text-lg font-bold">{currentYear}년 {currentMonth + 1}월</h2>
                <button onClick={handleNextMonth} className="font-bold">→</button>
              </div>
              <div className="grid grid-cols-7 text-center text-xs font-semibold border-b py-2 text-slate-400">
                {dayLabels.map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-px bg-slate-100">
                {calendarDays.map((day, idx) => {
                  if (day === null) return <div key={`empty-${idx}`} className="bg-white p-2 min-h-[72px]" />;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const count = reservations.filter(r => r.wedding_date === dateStr).length;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(selectedDate === dateStr ? null : dateStr)}
                      className={`bg-white p-2 min-h-[72px] text-left hover:bg-slate-50 relative ${selectedDate === dateStr ? 'ring-2 ring-slate-800' : ''}`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {count > 0 && <span className="mt-1 block text-[10px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full w-fit">{count}건</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 예약 목록 */}
            {selectedDate && (
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-800">{selectedDate} 예약 목록</h3>
                <div className="space-y-3">
                  {reservations.filter(r => r.wedding_date === selectedDate).map(r => {
                    const latestAttendance = (r.attendance && r.attendance.length > 0) ? r.attendance[r.attendance.length - 1] : null;
                    const isCheckedIn = !!latestAttendance?.check_in_time;
                    const isCheckedOut = !!latestAttendance?.check_out_time;
                    
                    return (
                      <div key={r.id} onClick={() => setSelectedReservation({...r, wedding_time: r.wedding_time.slice(0, 5)})} className="cursor-pointer flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{r.customer_name} ({r.customer_phone})</p>
                            {isCheckedOut ? (
                              <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md">퇴근완료</span>
                            ) : isCheckedIn ? (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md">출근 (진행중)</span>
                            ) : null}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{r.wedding_time.slice(0, 5)} · {r.location}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColors[r.status]}`}>{statusLabels[r.status]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 우측 사이드바 (승인 대기 목록) */}
          <div className="xl:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800">승인 대기 중</h3>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{pendingReservations.length}건</span>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 custom-scrollbar">
              {pendingReservations.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                  <p className="text-xs text-slate-400">새로운 대기 예약이 없습니다.</p>
                </div>
              ) : (
                pendingReservations.map(r => (
                  <div 
                    key={r.id} 
                    onClick={() => setSelectedReservation({...r, wedding_time: r.wedding_time.slice(0, 5)})} 
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">{r.wedding_date}</span>
                      <span className="text-xs text-slate-400">{r.wedding_time.slice(0, 5)}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">{r.customer_name} 신랑/신부님</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{r.product_name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 상세 모달 (승인/수정 폼) */}
        {selectedReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-800">예약 상세 정보 및 승인</h3>
                  <button onClick={() => setSelectedReservation(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                </div>
                
                <form ref={formRef} onSubmit={handleUpdateReservation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">고객명 *</label>
                      <input type="text" required value={selectedReservation.customer_name || ''} onChange={e => setSelectedReservation({...selectedReservation, customer_name: e.target.value})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="홍길동" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">연락처 *</label>
                      <input type="text" required value={selectedReservation.customer_phone || ''} onChange={e => setSelectedReservation({...selectedReservation, customer_phone: formatPhone(e.target.value)})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="010-0000-0000" />
                      {checkPhoneWarning(selectedReservation.customer_phone) && (
                        <p className="text-[10px] text-amber-600 font-bold mt-0.5">⚠️ 번호를 확인해주세요</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">예식일 (년/월/일) *</label>
                      <input type="text" required value={selectedReservation.wedding_date || ''} onChange={e => setSelectedReservation({...selectedReservation, wedding_date: formatDate(e.target.value)})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="YYYY-MM-DD" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">예식 시간 (24시간제) *</label>
                      <input type="text" required value={selectedReservation.wedding_time || ''} onChange={e => setSelectedReservation({...selectedReservation, wedding_time: formatTime(e.target.value)})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="HH:MM" />
                    </div>
                  </div>

                  {isDoubleBooked && (
                    <p className="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-md">⚠️ 동일한 시간에 예약이 있습니다. 배정에 유의하세요.</p>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">예식 장소 *</label>
                    <input type="text" required value={selectedReservation.location || ''} onChange={e => setSelectedReservation({...selectedReservation, location: e.target.value})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="예식장 및 상세 주소" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 1 *</label>
                      <select required value={selectedReservation.product_name?.split(',')[0]?.trim() || ''} onChange={e => {
                        const p2 = selectedReservation.product_name?.split(',')[1]?.trim() || '';
                        setSelectedReservation({...selectedReservation, product_name: [e.target.value, p2].filter(Boolean).join(', ')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <option value="">상품 선택</option>
                        <option value="스냅">스냅</option>
                        <option value="DVD">DVD</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 1 담당 작가</label>
                      <input type="text" value={selectedReservation.assigned_photographer?.split(',')[0]?.trim() || ''} onChange={e => {
                        const a2 = selectedReservation.assigned_photographer?.includes(',') ? selectedReservation.assigned_photographer.split(',')[1].trim() : '';
                        setSelectedReservation({...selectedReservation, assigned_photographer: `${e.target.value}, ${a2}`.replace(/^, |, $/g, '')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50" placeholder="이름 입력" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 2 (선택)</label>
                      <select value={selectedReservation.product_name?.split(',')[1]?.trim() || ''} onChange={e => {
                        const p1 = selectedReservation.product_name?.split(',')[0]?.trim() || '';
                        setSelectedReservation({...selectedReservation, product_name: [p1, e.target.value].filter(Boolean).join(', ')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <option value="">추가 안함</option>
                        <option value="스냅">스냅</option>
                        <option value="DVD">DVD</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 2 담당 작가</label>
                      <input type="text" value={selectedReservation.assigned_photographer?.includes(',') ? selectedReservation.assigned_photographer.split(',')[1]?.trim() : ''} onChange={e => {
                        const a1 = selectedReservation.assigned_photographer?.split(',')[0]?.trim() || '';
                        setSelectedReservation({...selectedReservation, assigned_photographer: `${a1}, ${e.target.value}`.replace(/^, |, $/g, '')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50" placeholder="이름 입력" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">현재 상태 *</label>
                    <select value={selectedReservation.status || ''} onChange={e => setSelectedReservation({...selectedReservation, status: e.target.value})} className={`w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold ${statusColors[selectedReservation.status || 'pending']}`}>
                      {Object.entries(statusLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">요청사항</label>
                    <textarea value={selectedReservation.notes || ''} onChange={e => setSelectedReservation({...selectedReservation, notes: e.target.value})} rows={3} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 resize-none" placeholder="고객 요청사항 및 메모" />
                  </div>

                  {/* 출퇴근 기록 표시란 */}
                  {selectedReservation.attendance && selectedReservation.attendance.length > 0 && (
                    <div className="pt-2 border-t mt-2 space-y-2">
                      <span className="text-xs font-semibold text-slate-500">출퇴근 현황</span>
                      {selectedReservation.attendance.map((att: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                          <div>
                            <p className="text-emerald-700 font-bold">✓ 출근: {new Date(att.check_in_time).toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit'})}</p>
                            {att.check_out_time && (
                              <p className="text-slate-500 mt-1">✓ 퇴근: {new Date(att.check_out_time).toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit'})}</p>
                            )}
                          </div>
                          {!att.check_out_time && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 font-bold rounded-md animate-pulse">촬영 진행중</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2 pt-4 border-t mt-4">
                    <button type="button" onClick={() => setSelectedReservation(null)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">취소</button>
                    <button type="button" onClick={() => handleUpdateWithStatus('confirmed')} disabled={updateReservationMutation.isPending} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50">
                      예약금 확인
                    </button>
                    <button type="button" onClick={() => handleUpdateWithStatus('pending_balance')} disabled={updateReservationMutation.isPending} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors disabled:opacity-50">
                      잔금 확인
                    </button>
                    <button type="button" onClick={() => handleUpdateWithStatus('completed')} disabled={updateReservationMutation.isPending} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors disabled:opacity-50">
                      촬영 종료
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 새 예약 등록 모달 */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-800">새 예약 직접 등록</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                </div>
                
                <form onSubmit={handleCreateReservation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">고객명 *</label>
                      <input type="text" required value={newReservation.customer_name} onChange={e => setNewReservation({...newReservation, customer_name: e.target.value})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="홍길동" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">연락처 *</label>
                      <input type="text" required value={newReservation.customer_phone} onChange={e => setNewReservation({...newReservation, customer_phone: formatPhone(e.target.value)})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="010-0000-0000" />
                      {checkPhoneWarning(newReservation.customer_phone) && (
                        <p className="text-[10px] text-amber-600 font-bold mt-0.5">⚠️ 번호를 확인해주세요</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">예식일 (년/월/일) *</label>
                      <input type="text" required value={newReservation.wedding_date} onChange={e => setNewReservation({...newReservation, wedding_date: formatDate(e.target.value)})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="YYYY-MM-DD" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">예식 시간 (24시간제) *</label>
                      <input type="text" required value={newReservation.wedding_time} onChange={e => setNewReservation({...newReservation, wedding_time: formatTime(e.target.value)})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="HH:MM" />
                    </div>
                  </div>

                  {isDoubleBooked && (
                    <p className="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-md">⚠️ 동일한 시간에 예약이 있습니다. 배정에 유의하세요.</p>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">예식 장소 *</label>
                    <input type="text" required value={newReservation.location} onChange={e => setNewReservation({...newReservation, location: e.target.value})} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="예식장 및 상세 주소" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 1 *</label>
                      <select required value={newReservation.product_name?.split(',')[0]?.trim() || ''} onChange={e => {
                        const p2 = newReservation.product_name?.split(',')[1]?.trim() || '';
                        setNewReservation({...newReservation, product_name: [e.target.value, p2].filter(Boolean).join(', ')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <option value="">상품 선택</option>
                        <option value="스냅">스냅</option>
                        <option value="DVD">DVD</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 1 담당 작가</label>
                      <input type="text" value={newReservation.assigned_photographer?.split(',')[0]?.trim() || ''} onChange={e => {
                        const a2 = newReservation.assigned_photographer?.includes(',') ? newReservation.assigned_photographer.split(',')[1].trim() : '';
                        setNewReservation({...newReservation, assigned_photographer: `${e.target.value}, ${a2}`.replace(/^, |, $/g, '')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50" placeholder="이름 입력" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 2 (선택)</label>
                      <select value={newReservation.product_name?.split(',')[1]?.trim() || ''} onChange={e => {
                        const p1 = newReservation.product_name?.split(',')[0]?.trim() || '';
                        setNewReservation({...newReservation, product_name: [p1, e.target.value].filter(Boolean).join(', ')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <option value="">추가 안함</option>
                        <option value="스냅">스냅</option>
                        <option value="DVD">DVD</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">상품 2 담당 작가</label>
                      <input type="text" value={newReservation.assigned_photographer?.includes(',') ? newReservation.assigned_photographer.split(',')[1]?.trim() : ''} onChange={e => {
                        const a1 = newReservation.assigned_photographer?.split(',')[0]?.trim() || '';
                        setNewReservation({...newReservation, assigned_photographer: `${a1}, ${e.target.value}`.replace(/^, |, $/g, '')})
                      }} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50" placeholder="이름 입력" />
                    </div>
                  </div>

                  <div className="space-y-1 mt-4">
                    <label className="text-xs font-semibold text-slate-500">요청사항</label>
                    <textarea value={newReservation.notes || ''} onChange={e => setNewReservation({...newReservation, notes: e.target.value})} rows={3} className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 resize-none" placeholder="고객 요청사항 및 메모" />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">취소</button>
                    <button type="submit" disabled={createReservationMutation.isPending} className="px-5 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold hover:bg-amber-700 transition-colors disabled:opacity-50">
                      {createReservationMutation.isPending ? '저장 중...' : '저장하기'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
