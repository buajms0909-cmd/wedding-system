/* ============================================
   포트폴리오 비디오 카드 컴포넌트 (Molecules)
   파일명: apps/customer-web/src/components/molecules/PortfolioCard.tsx
   역할: 유튜브 영상을 반응형으로 제공하며 제목 및 설명을 함께 노출하는 카드 컴포넌트
   ============================================ */

interface PortfolioCardProps {
  title: string;
  youtubeId: string;
  description: string;
}

/**
 * 포트폴리오 카드 컴포넌트
 * @param {PortfolioCardProps} props - 카드 상세 정보
 */
export default function PortfolioCard({ title, youtubeId, description }: PortfolioCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      {/* 반응형 유튜브 비디오 영역 */}
      <div className="w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-none"
        ></iframe>
      </div>

      {/* 비디오 설명 영역 */}
      <div className="p-5 flex flex-col gap-1.5">
        <h3 className="font-bold text-stone-800 text-base line-clamp-1">{title}</h3>
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
