'use client';

/* ============================================
   예약 신청 폼 컴포넌트 (Organisms)
   파일명: apps/customer-web/src/components/organisms/ReservationForm.tsx
   역할: 글래스모피즘 스타일이 적용된 예약 신청 UI
   ============================================ */

import { useReservationForm } from '../../hooks/useReservationForm';
import ReservationFormField from '../molecules/ReservationFormField';

interface ReservationFormProps {
  onSuccess: (name: string, phone: string) => void;
}

/**
 * 예약 신청 폼 컴포넌트
 * @param {ReservationFormProps} props - 성공 콜백 함수
 */
export default function ReservationForm({ onSuccess }: ReservationFormProps) {
  const {
    name,
    setName,
    phone,
    setPhone,
    date,
    setDate,
    time,
    setTime,
    location,
    setLocation,
    productName1,
    setProductName1,
    productName2,
    setProductName2,
    notes,
    setNotes,
    isSubmitting,
    checkPhoneWarning,
    handleSubmit,
  } = useReservationForm({ onSuccess });

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto glass-card p-8 rounded-3xl shadow-lg space-y-6">
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
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="010-0000-0000"
          />
          {checkPhoneWarning() && (
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
          onChange={(e) => setDate(e.target.value)}
          required
          placeholder="2026-06-05"
        />
        <ReservationFormField
          label="예식 시간 (HH:MM)"
          id="wedding_time"
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
            className="w-full px-4 py-2.5 glass-input rounded-lg text-slate-800 transition-all text-sm font-medium"
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
            className="w-full px-4 py-2.5 glass-input rounded-lg text-slate-800 transition-all text-sm font-medium"
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
          className="w-full px-4 py-2.5 glass-input rounded-lg text-slate-800 transition-all text-sm resize-none custom-scrollbar font-medium"
          placeholder="특별히 요청하고 싶으신 사항이나 추가 메모가 있다면 편하게 적어주세요."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 glass-btn-primary font-bold tracking-wider rounded-xl transition-all duration-300 disabled:opacity-50 mt-4"
      >
        {isSubmitting ? '신청 처리 중...' : '예약 신청하기'}
      </button>
    </form>
  );
}
