'use client';

/* ============================================
   예약 신청 폼 컴포넌트 (Organisms)
   파일명: apps/customer-web/src/components/organisms/ReservationForm.tsx
   역할: 고객으로부터 예약 정보를 입력받아 Supabase 데이터베이스에 저장하는 폼 컴포넌트
   ============================================ */

import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import ReservationFormField from '../molecules/ReservationFormField';

interface ReservationFormProps {
  onSuccess: (name: string, phone: string) => void;
}

/**
 * 예약 신청 폼 컴포넌트 (Organisms)
 * @param {ReservationFormProps} props - 성공 콜백
 */
export default function ReservationForm({ onSuccess }: ReservationFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [productName1, setProductName1] = useState('');
  const [productName2, setProductName2] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 자동 마스킹(포매팅) 함수
  const formatPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  const formatDate = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
  };

  const formatTime = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
  };

  const checkPhoneWarning = (val: string) => {
    if (!val) return false;
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length < 3) return false;
    if (!cleaned.startsWith('010')) return true;
    if (cleaned.length >= 7 && cleaned.length < 11) return true;
    return false;
  };

  /**
   * 예약 데이터 제출 처리 핸들러
   * @param {React.FormEvent} e - 폼 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 1. 비회원 예약 허용 (로그인 체크 삭제)
      
      // 2. 예약 데이터 Supabase 저장
      const { error: insertError } = await supabase.from('reservations').insert({
        customer_name: name,
        customer_phone: phone,
        wedding_date: date,
        wedding_time: time,
        location: location,
        product_name: [productName1, productName2].filter(Boolean).join(', '),
        status: 'pending',
        notes: notes,
      });

      if (insertError) {
        throw insertError;
      }

      // 3. 성공 콜백 호출
      onSuccess(name, phone);
    } catch (error: any) {
      console.error('예약 제출 중 오류 발생:', error.message);
      alert('예약 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReservationFormField
          label="신랑/신부 성함"
          id="customer_name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="성함을 입력하세요"
        />
        <div className="flex flex-col gap-1">
          <ReservationFormField
            label="연락처"
            id="customer_phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            required
            placeholder="010-0000-0000"
          />
          {checkPhoneWarning(phone) && (
            <p className="text-[10px] text-rose-500 font-semibold px-1">⚠️ 번호를 확인해주세요</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReservationFormField
          label="예식일 (YYYY-MM-DD)"
          id="wedding_date"
          type="text"
          value={date}
          onChange={(e) => setDate(formatDate(e.target.value))}
          required
          placeholder="2026-06-05"
        />
        <ReservationFormField
          label="예식 시간 (HH:MM)"
          id="wedding_time"
          type="text"
          value={time}
          onChange={(e) => setTime(formatTime(e.target.value))}
          required
          placeholder="14:00"
        />
      </div>

      <ReservationFormField
        label="예식 장소"
        id="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        placeholder="예식장 및 상세 주소를 입력하세요"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="product_name_1" className="text-sm font-medium text-slate-700">상품 선택 1 <span className="text-rose-500">*</span></label>
          <select
            id="product_name_1"
            value={productName1}
            onChange={(e) => setProductName1(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-slate-800 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
          >
            <option value="">원하시는 상품 선택</option>
            <option value="스냅">스냅</option>
            <option value="DVD">DVD</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="product_name_2" className="text-sm font-medium text-slate-700">상품 선택 2 (선택)</label>
          <select
            id="product_name_2"
            value={productName2}
            onChange={(e) => setProductName2(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-slate-800 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
          >
            <option value="">추가 안함</option>
            <option value="스냅">스냅</option>
            <option value="DVD">DVD</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-medium text-slate-700">요청사항 (선택)</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-slate-800 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none custom-scrollbar"
          placeholder="특별히 요청하고 싶으신 사항이나 추가 메모가 있다면 편하게 적어주세요."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-sm shadow-md shadow-gold-500/20 transition-all duration-300 disabled:opacity-50 mt-4"
      >
        {isSubmitting ? '신청 처리 중...' : '예약 신청하기'}
      </button>
    </form>
  );
}
