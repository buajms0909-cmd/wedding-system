/* ============================================
   공통 데이터베이스 타입 정의
   파일명: shared/types/index.ts
   역할: Supabase 테이블 스키마에 대응하는 TypeScript 타입 (양쪽 앱에서 @shared/types로 참조)
   ============================================ */

/** 사용자 역할 타입 */
export type UserRole = 'customer' | 'admin' | 'photographer';

/** 예약 진행 상태 타입 */
export type ReservationStatus = 'pending' | 'pending_balance' | 'confirmed' | 'completed' | 'cancelled';

/** users_profile 테이블 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

/** reservations 테이블 */
export interface Reservation {
  id: string;
  customer_id: string | null;
  customer_name: string;
  customer_phone: string;
  wedding_date: string;
  wedding_time: string;
  location: string;
  product_name: string;
  status: ReservationStatus;
  assigned_photographer?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

/** attendance 테이블 */
export interface Attendance {
  id: string;
  photographer_id: string;
  reservation_id: string | null;
  departure_time: string | null;
  arrival_time: string | null;
  end_time: string | null;
  created_at: string;
}
