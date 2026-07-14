import { useState } from 'react';
import { supabase } from '../utils/supabase';

interface UseReservationFormProps {
  onSuccess: (name: string, phone: string) => void;
}

/**
 * 예약 신청 폼의 입력 상태 관리 및 제출 처리를 담당하는 커스텀 훅
 * @param {UseReservationFormProps} props - 성공 콜백
 */
export function useReservationForm({ onSuccess }: UseReservationFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [productName1, setProductName1] = useState('');
  const [productName2, setProductName2] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 휴대폰 번호 입력 시 010-0000-0000 형태로 자동 포매팅
   * @param {string} val - 입력값
   */
  const formatPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  /**
   * 예식일 입력 시 YYYY-MM-DD 형태로 자동 포매팅
   * @param {string} val - 입력값
   */
  const formatDate = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
  };

  /**
   * 예식 시간 입력 시 HH:MM 형태로 자동 포매팅
   * @param {string} val - 입력값
   */
  const formatTime = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
  };

  /**
   * 연락처 유효성 검사 (경고 문구 표시용)
   * @param {string} val - 연락처
   */
  const checkPhoneWarning = (val: string) => {
    if (!val) return false;
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length < 3) return false;
    if (!cleaned.startsWith('010')) return true;
    if (cleaned.length >= 7 && cleaned.length < 11) return true;
    return false;
  };

  /**
   * 예약 데이터를 Supabase에 전송
   * @param {React.FormEvent} e - 폼 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
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

      onSuccess(name, phone);
    } catch (error: any) {
      console.error('예약 제출 중 오류 발생:', error.message);
      alert('예약 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone: (val: string) => setPhone(formatPhone(val)),
    date,
    setDate: (val: string) => setDate(formatDate(val)),
    time,
    setTime: (val: string) => setTime(formatTime(val)),
    location,
    setLocation,
    productName1,
    setProductName1,
    productName2,
    setProductName2,
    notes,
    setNotes,
    isSubmitting,
    checkPhoneWarning: () => checkPhoneWarning(phone),
    handleSubmit,
  };
}
