-- ==========================================
-- 1. DATABASE SCHEMA SETUP
-- 파일명: shared/database/schema.sql
-- 역할: Supabase 통합 데이터베이스 테이블 스키마 정의
-- ==========================================

-- 확장 기능 활성화 (UUID 생성용)
create extension if not exists "uuid-ossp";

-- 2. TABLES DEFINITIONS

-- 2.1 유저 프로필 테이블 (auth.users와 연동)
create table public.users_profile (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    name text not null,
    role text not null default 'customer' check (role in ('customer', 'admin', 'photographer')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.2 예약 정보 테이블
create table public.reservations (
    id uuid default gen_random_uuid() primary key,
    customer_id uuid references public.users_profile(id) on delete set null,
    customer_name text not null,
    customer_phone text not null,
    wedding_date date not null,
    wedding_time time without time zone not null,
    location text not null,
    product_name text not null,
    status text not null default 'pending' check (status in ('pending', 'pending_balance', 'confirmed', 'completed', 'cancelled')),
    assigned_photographer text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.3 작가 출퇴근 기록 테이블 (3단계: 출발/도착/촬영종료)
create table public.attendance (
    id uuid default gen_random_uuid() primary key,
    photographer_id uuid references public.users_profile(id) on delete cascade not null,
    reservation_id uuid references public.reservations(id) on delete cascade,
    departure_time timestamp with time zone,
    arrival_time timestamp with time zone,
    end_time timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. FUNCTIONS & TRIGGERS (자동 업데이트 로직)

-- updated_at 컬럼 갱신용 함수
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- 테이블별 updated_at 트리거 등록
create trigger trigger_users_profile_updated_at
    before update on public.users_profile
    for each row execute function public.handle_updated_at();

create trigger trigger_reservations_updated_at
    before update on public.reservations
    for each row execute function public.handle_updated_at();

-- 4. AUTH TRIGGER FOR NEW USERS
-- 회원가입 시 public.users_profile에 자동 추가하는 트리거 생성
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users_profile (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', '사용자'),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
