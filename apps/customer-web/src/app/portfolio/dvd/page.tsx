import Link from 'next/link';

export default function DvdPortfolioPage() {
  const videos = [
    { id: 'M5RYf68ZTYE', title: '골든 테이크 본식 영상 하이라이트 1' },
    { id: 's2u-n46hM8k', title: '골든 테이크 본식 영상 하이라이트 2' }
  ];

  return (
    <main className="min-h-screen bg-stone-50 text-slate-800 py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gold-600 uppercase">
            Portfolio
          </h2>
          <h1 className="text-4xl font-serif text-slate-900">
            Cinematic DVD
          </h1>
          <p className="text-slate-500 font-light">가장 찬란하고 아름다운 순간을 한 편의 영화처럼 기록합니다.</p>
        </header>

        {/* 비디오 갤러리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((video, idx) => (
            <div key={video.id} className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-stone-200">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-lg text-slate-800 font-medium">#{idx + 1}. {video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <Link href="/pricing" className="inline-block px-8 py-3 bg-gold-500 text-white font-medium rounded-sm hover:bg-gold-600 transition-colors shadow-md shadow-gold-500/20">
            상품 안내 및 예약하기
          </Link>
        </div>
      </div>
    </main>
  );
}
