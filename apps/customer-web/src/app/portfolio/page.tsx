'use client';

/* ============================================
   고객용 포트폴리오 갤러리 페이지
   파일명: apps/customer-web/src/app/portfolio/page.tsx
   역할: 웨딩 Snap(사진)과 DVD(영상) 포트폴리오를 탭으로 분리하여 보여주는 페이지
   ============================================ */

import { useState } from 'react';
import PortfolioCard from '../../components/molecules/PortfolioCard';
import portfolioData from '../../../../../contents/portfolio/portfolio.json';

/**
 * 포트폴리오 페이지 컴포넌트
 * @returns {JSX.Element} 포트폴리오 갤러리 화면
 */
export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<'snap' | 'dvd'>('snap');

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* 헤더 */}
        <div className="text-center space-y-3">
          <span className="text-sm font-semibold tracking-wider text-amber-600 uppercase">Portfolio</span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">포트폴리오</h1>
          <p className="text-sm text-stone-500 max-w-md mx-auto">두 분만의 가장 빛나는 순간을 감상해 보세요.</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center gap-4 border-b border-stone-200 pb-px">
          <button
            onClick={() => setActiveTab('snap')}
            className={`pb-4 px-2 text-lg font-bold transition-colors border-b-2 ${
              activeTab === 'snap' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Snap
          </button>
          <button
            onClick={() => setActiveTab('dvd')}
            className={`pb-4 px-2 text-lg font-bold transition-colors border-b-2 ${
              activeTab === 'dvd' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            DVD
          </button>
        </div>

        {/* 그리드 콘텐츠 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'snap'
            ? portfolioData.snap.map((item, idx) => (
                <PortfolioCard key={`snap-${idx}`} title={item.title} youtubeId={item.youtubeId} description={item.description} />
              ))
            : portfolioData.dvd.map((item, idx) => (
                <PortfolioCard key={`dvd-${idx}`} title={item.title} youtubeId={item.youtubeId} description={item.description} />
              ))}
        </div>
      </div>
    </main>
  );
}
