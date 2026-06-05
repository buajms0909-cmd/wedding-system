'use client';

/* ============================================
   고객용 공통 네비게이션 헤더 (Organisms)
   파일명: apps/customer-web/src/components/organisms/Header.tsx
   역할: 고객용 웹사이트 상단 내비게이션 바
   ============================================ */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * 고객용 헤더 네비게이션 컴포넌트
 * @returns {JSX.Element} 상단 헤더 바
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gold-100">
      <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image src="/images/Main_logo.png" alt="Golden Take Studio Logo" width={160} height={40} className="h-8 md:h-10 w-auto object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.15)]" priority />
        </Link>
        
        {/* 모바일 햄버거 버튼 */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-600 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 네비게이션 메뉴 */}
        <ul className={`w-full md:w-auto md:flex flex-col md:flex-row items-center gap-1.5 md:gap-6 text-sm font-medium text-slate-600 mt-4 md:mt-0 ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <li><Link href="/portfolio/snap" className="block py-1.5 md:py-0 hover:text-gold-500 transition-colors md:border-b-2 border-transparent hover:border-gold-500">SNAP</Link></li>
          <li><Link href="/portfolio/dvd" className="block py-1.5 md:py-0 hover:text-gold-500 transition-colors md:border-b-2 border-transparent hover:border-gold-500">DVD</Link></li>
          <li><Link href="/pricing" className="block py-1.5 md:py-0 hover:text-gold-500 transition-colors md:border-b-2 border-transparent hover:border-gold-500">비용 안내</Link></li>
          <li><Link href="/terms" className="block py-1.5 md:py-0 hover:text-gold-500 transition-colors md:border-b-2 border-transparent hover:border-gold-500">이용 약관</Link></li>
          <li className="pt-2 md:pt-0 md:pl-4 flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <Link href="/reservation" className="w-full md:w-auto text-center px-5 py-2.5 md:py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-xs tracking-wider font-bold transition-colors shadow-sm shadow-gold-500/20">
              예약 신청
            </Link>
            <Link href="/lookup" className="w-full md:w-auto text-center px-5 py-2.5 md:py-2 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-600 rounded-lg text-xs tracking-wider font-bold transition-colors shadow-sm">
              예약 조회
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
