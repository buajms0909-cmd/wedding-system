'use client';

/* ============================================
   사내 관리용 사이드바 네비게이션 (Organisms)
   파일명: apps/admin-web/src/components/organisms/Sidebar.tsx
   역할: 대시보드, 출퇴근 등 관리자 메뉴를 제공하는 사이드 네비게이션
   ============================================ */

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/** 메뉴 항목 정의 */
const MENU_ITEMS = [
  { href: '/dashboard', label: '예약 관리' },
  { href: '/delivery', label: '납품 관리' },
  { href: '/attendance', label: '출퇴근 관리' },
];

/**
 * 사내 관리 시스템 사이드바 컴포넌트
 * @returns {JSX.Element} 사이드바 네비게이션
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-slate-200 p-4 space-y-6 shrink-0 hidden md:block">
      {/* 로고 */}
      <div className="px-1 py-6 flex justify-center">
        <Image src="/images/Main_logo.png" alt="Golden Take Admin Logo" width={300} height={100} className="w-44 h-auto object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.15)]" priority />
      </div>

      {/* 메뉴 */}
      <nav className="space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
