/* ============================================
   포트폴리오 비디오 카드 컴포넌트 (Molecules)
   파일명: apps/customer-web/src/components/molecules/PortfolioCard.tsx
   역할: 글래스모피즘 카드로 유튜브 영상을 렌더링하며 마우스 호버 효과를 제공
   ============================================ */

import Image from 'next/image';

interface PortfolioCardProps {
  title: string;
  youtubeId?: string;
  imageUrl?: string;
  description: string;
}

/**
 * 포트폴리오 카드 컴포넌트
 * @param {PortfolioCardProps} props - 카드 상세 정보
 */
export default function PortfolioCard({ title, youtubeId, imageUrl, description }: PortfolioCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100/30">
      {/* 미디어 영역 (비디오 또는 이미지) */}
      <div className="w-full aspect-video opacity-95 hover:opacity-100 transition-opacity relative">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-none"
          ></iframe>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
      </div>

      {/* 비디오 설명 영역 */}
      <div className="p-5 flex flex-col gap-1.5 bg-white/30">
        <h3 className="font-bold text-stone-900 text-base line-clamp-1">{title}</h3>
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
