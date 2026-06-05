'use client';

/* ============================================
   고객용 공통 네비게이션 헤더 (Organisms)
   파일명: apps/customer-web/src/components/organisms/Header.tsx
   역할: 고객용 웹사이트 상단 내비게이션 바
   ============================================ */

import Link from 'next/link';
import Image from 'next/image';
/**
 * 고객용 헤더 네비게이션 컴포넌트
 * @returns {JSX.Element} 상단 헤더 바
 */
export default function Header() {

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gold-100">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/Main_logo.png" alt="Golden Take Studio Logo" width={160} height={40} className="h-10 w-auto object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.15)]" priority />
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <li><Link href="/portfolio/snap" className="hover:text-gold-500 transition-colors pb-1 border-b-2 border-transparent hover:border-gold-500">SNAP</Link></li>
          <li><Link href="/portfolio/dvd" className="hover:text-gold-500 transition-colors pb-1 border-b-2 border-transparent hover:border-gold-500">DVD</Link></li>
          <li><Link href="/pricing" className="hover:text-gold-500 transition-colors pb-1 border-b-2 border-transparent hover:border-gold-500">비용 안내</Link></li>
          <li><Link href="/terms" className="hover:text-gold-500 transition-colors pb-1 border-b-2 border-transparent hover:border-gold-500">이용 약관</Link></li>
          <li className="pl-4 flex items-center gap-2">
            <Link href="/reservation" className="px-5 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-xs tracking-wider font-bold transition-colors shadow-sm shadow-gold-500/20">
              예약 신청
            </Link>
            <Link href="/lookup" className="px-5 py-2 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-600 rounded-lg text-xs tracking-wider font-bold transition-colors shadow-sm">
              예약 조회
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
