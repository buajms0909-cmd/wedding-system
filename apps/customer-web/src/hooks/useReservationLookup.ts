import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export interface ReservationInfo {
  id: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: string;
  created_at: string;
}

export function useReservationLookup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationInfo[]>([]);

  // URL에서 초기값 설정
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

  // 연락처 자동 마스킹
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

  return {
    name,
    setName,
    phone,
    handlePhoneChange,
    isSearched,
    isLoading,
    reservations,
    handleSearch,
    resetSearch
  };
}
