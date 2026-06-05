'use client';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Reservation {
  id: string;
  customer_name: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: string;
}

interface Attendance {
  id: string;
  reservation_id: string;
  photographer_id: string;
  check_in_time: string;
  check_out_time: string | null;
}

// ==========================================
// 2. STATE & HOOKS
// ==========================================
export default function AttendancePage() {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // 오늘 날짜 예약 가져오기
  const { data: todayReservations = [], isLoading: isLoadingReservations } = useQuery({
    queryKey: ['todayReservations', todayStr],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('wedding_date', todayStr)
        .neq('status', 'cancelled')
        .order('wedding_time', { ascending: true });
      if (error) throw error;
      return data as Reservation[];
    },
  });

  // 현재 로그인한 작가의 오늘자 출퇴근 기록 가져오기
  const { data: attendances = [] } = useQuery({
    queryKey: ['attendances', todayStr, userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('photographer_id', userId)
        .gte('created_at', `${todayStr}T00:00:00Z`)
        .lte('created_at', `${todayStr}T23:59:59Z`);
      if (error) throw error;
      return data as Attendance[];
    },
    enabled: !!userId,
  });

  const checkInMutation = useMutation({
    mutationFn: async (reservationId: string) => {
      if (!userId) throw new Error('Not authenticated');
      const { error } = await supabase.from('attendance').insert({
        photographer_id: userId,
        reservation_id: reservationId,
        check_in_time: new Date().toISOString()
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['attendances'] }),
  });

  const checkOutMutation = useMutation({
    mutationFn: async (attendanceId: string) => {
      const { error } = await supabase.from('attendance').update({
        check_out_time: new Date().toISOString()
      }).eq('id', attendanceId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['attendances'] }),
  });

  // ==========================================
  // 3. HANDLERS & LOGIC
  // ==========================================
  const handleCheckIn = (reservationId: string) => {
    if (confirm('현재 시간으로 출근 기록을 하시겠습니까?')) {
      checkInMutation.mutate(reservationId);
    }
  };

  const handleCheckOut = (attendanceId: string) => {
    if (confirm('현재 시간으로 퇴근 기록을 하시겠습니까?')) {
      checkOutMutation.mutate(attendanceId);
    }
  };

  const timeString = currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  // ==========================================
  // 4. RENDER
  // ==========================================
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center p-4 pb-20">
      <div className="w-full max-w-md space-y-6 pt-6">
        {/* 헤더 & 시계 */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">현장 출퇴근 인증</h1>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-1">
            <p className="text-3xl font-extrabold text-slate-800 font-mono tracking-tight">{timeString}</p>
            <p className="text-xs text-slate-500 font-medium">{dateString}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 px-1">오늘의 배정 일정 ({todayReservations.length}건)</h2>
          
          {isLoadingReservations ? (
            <p className="text-center text-sm text-slate-400 py-10">일정을 불러오는 중입니다...</p>
          ) : todayReservations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">오늘 예정된 촬영 일정이 없습니다.</p>
            </div>
          ) : (
            todayReservations.map(res => {
              const myAttendance = attendances.find(a => a.reservation_id === res.id);
              const isCheckedIn = !!myAttendance;
              const isCheckedOut = !!myAttendance?.check_out_time;

              return (
                <div key={res.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  {/* 정보 영역 */}
                  <div className="p-5 border-b border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-lg">{res.product_name}</span>
                      <span className="text-sm font-extrabold text-slate-800">{res.wedding_time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mt-2">{res.customer_name} 신랑/신부님</h3>
                    <p className="text-sm text-slate-500 flex items-center">
                      <span className="mr-1">📍</span> {res.location}
                    </p>
                  </div>
                  
                  {/* 버튼 영역 */}
                  <div className="bg-slate-50 p-4">
                    {!isCheckedIn ? (
                      <button 
                        onClick={() => handleCheckIn(res.id)}
                        disabled={checkInMutation.isPending}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-sm transition-colors"
                      >
                        {checkInMutation.isPending ? '처리 중...' : '출근하기'}
                      </button>
                    ) : !isCheckedOut ? (
                      <div className="space-y-3 text-center">
                        <p className="text-xs font-bold text-emerald-600 bg-emerald-50 py-2 rounded-lg border border-emerald-100">
                          ✓ 출근 완료 ({new Date(myAttendance.check_in_time).toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit'})})
                        </p>
                        <button 
                          onClick={() => handleCheckOut(myAttendance.id)}
                          disabled={checkOutMutation.isPending}
                          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition-colors"
                        >
                          {checkOutMutation.isPending ? '처리 중...' : '촬영 종료 (퇴근하기)'}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center bg-slate-200 py-3 rounded-xl border border-slate-300">
                        <span className="text-sm font-bold text-slate-500">
                          ✓ 퇴근 완료 ({new Date(myAttendance.check_out_time!).toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit'})})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
