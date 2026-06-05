/* ============================================
   예약 신청 폼 입력 필드 컴포넌트 (Molecules)
   파일명: apps/customer-web/src/components/molecules/ReservationFormField.tsx
   역할: 라벨과 입력창이 조합된 형태의 재사용 가능한 폼 필드 컴포넌트
   ============================================ */

import React from 'react';

interface ReservationFormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

/**
 * 예약 신청 폼 필드 컴포넌트
 * @param {ReservationFormFieldProps} props - 폼 필드 속성
 */
export default function ReservationFormField({
  label,
  id,
  type,
  value,
  onChange,
  required = false,
  placeholder,
}: ReservationFormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-stone-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
      />
    </div>
  );
}
