/* ============================================
   예약 신청 폼 입력 필드 컴포넌트 (Molecules)
   파일명: apps/customer-web/src/components/molecules/ReservationFormField.tsx
   역할: 글래스모피즘 테마가 적용된 라벨 및 입력 필드 컴포넌트
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
        className="w-full px-3.5 py-2.5 glass-input rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none transition-all text-sm"
      />
    </div>
  );
}
