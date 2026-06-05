/* ============================================
   Supabase 클라이언트 초기화 유틸
   파일명: apps/admin-web/src/utils/supabase.ts
   역할: 사내 관리자용 웹에서 사용할 Supabase 클라이언트 인스턴스 생성
   ============================================ */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

/**
 * Supabase 클라이언트 인스턴스
 * 관리자 권한 및 데이터베이스 쿼리를 수행할 때 사용됩니다.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
