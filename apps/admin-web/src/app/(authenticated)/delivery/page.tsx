'use client';

/* ============================================
   납품 관리 페이지
   파일명: apps/admin-web/src/app/(authenticated)/delivery/page.tsx
   역할: 촬영 완료된 예식들을 납품 순서대로 조회하고 상태를 관리
   ============================================ */

import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Reservation {
  id: string;
  customer_name: string;
  customer_phone: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: string;
  notes?: string;
}

export default function DeliveryPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'pending' | 'completed'>('pending');

  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ['deliveries'],
    queryFn: async () => {
      // 촬영 완료(completed) 상태인 데이터만 가져와서 납품 우선순위(예식일 오름차순)로 정렬
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('status', 'completed')
        .order('wedding_date', { ascending: true });

      if (error) throw error;
      return data as Reservation[];
    },
  });

  const markDeliveryMutation = useMutation({
    mutationFn: async ({ id, currentNotes, isCompleted }: { id: string; currentNotes: string; isCompleted: boolean }) => {
      let newNotes = currentNotes || '';
      if (isCompleted) {
        if (!newNotes.includes('[납품완료]')) {
          newNotes = `[납품완료] ${newNotes}`.trim();
        }
      } else {
        newNotes = newNotes.replace('[납품완료]', '').trim();
      }

      const { error } = await supabase
        .from('reservations')
        .update({ notes: newNotes })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });

  const handleToggleDelivery = (res: Reservation) => {
    const isCurrentlyCompleted = res.notes?.includes('[납품완료]') || false;
    const actionText = isCurrentlyCompleted ? '납품 대기 상태로 되돌리시겠습니까?' : '납품 완료 처리하시겠습니까?';
    
    if (confirm(actionText)) {
      markDeliveryMutation.mutate({
        id: res.id,
        currentNotes: res.notes || '',
        isCompleted: !isCurrentlyCompleted
      });
    }
  };

  // 납품 완료 태그 유무로 분리
  const pendingDeliveries = deliveries.filter(d => !d.notes?.includes('[납품완료]'));
  const completedDeliveries = deliveries.filter(d => d.notes?.includes('[납품완료]'));

  const displayedData = filter === 'pending' ? pendingDeliveries : completedDeliveries;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">납품 관리</h1>
          <p className="text-sm text-slate-500 mt-1">촬영이 종료된 예약건들의 납품 일정을 관리합니다.</p>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${filter === 'pending' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            납품 대기 ({pendingDeliveries.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${filter === 'completed' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            납품 완료 ({completedDeliveries.length})
          </button>
        </div>

        {/* 리스트 */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-slate-400 py-10">데이터를 불러오는 중...</p>
          ) : displayedData.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              해당하는 납품 건이 없습니다.
            </div>
          ) : (
            <div className="grid gap-4">
              {displayedData.map(res => (
                <div key={res.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-300">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-100 text-slate-600 text-xs font-extrabold px-2.5 py-1 rounded-md">
                        {res.wedding_date}
                      </span>
                      <h3 className="font-bold text-slate-800 text-lg">{res.customer_name} 신랑/신부님</h3>
                      <span className="text-sm font-semibold text-slate-500">{res.customer_phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <p>🎥 <span className="font-semibold text-slate-700">{res.product_name}</span></p>
                      <p>📍 {res.location}</p>
                    </div>
                    {res.notes && res.notes.replace('[납품완료]', '').trim() && (
                      <p className="text-xs text-slate-400 bg-slate-50 p-2 rounded-lg inline-block mt-2">
                        📝 {res.notes.replace('[납품완료]', '').trim()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center justify-end">
                    {filter === 'pending' ? (
                      <button
                        onClick={() => handleToggleDelivery(res)}
                        disabled={markDeliveryMutation.isPending}
                        className="w-full md:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50"
                      >
                        납품 완료 처리
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleDelivery(res)}
                        disabled={markDeliveryMutation.isPending}
                        className="w-full md:w-auto px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                      >
                        대기 상태로 되돌리기
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
