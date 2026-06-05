import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

export default function SnapPortfolioPage() {
  const snapDir = path.join(process.cwd(), 'public', 'images', 'snap');
  let images: string[] = [];

  try {
    if (fs.existsSync(snapDir)) {
      const files = fs.readdirSync(snapDir);
      // 이미지 확장자만 필터링
      images = files.filter(f => f.match(/\.(jpg|jpeg|png|webp|gif)$/i)).map(f => `/images/snap/${f}`);
    }
  } catch (error) {
    console.error('Error reading snap images:', error);
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-800 py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gold-600 uppercase">
            Portfolio
          </h2>
          <h1 className="text-4xl font-serif text-slate-900">
            Snap Photography
          </h1>
          <p className="text-slate-500 font-light">두 분만의 특별한 감정을 사진 한 장에 오롯이 담아냅니다.</p>
        </header>

        {images.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {images.map((src, i) => (
              <div key={i} className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-sm border border-stone-200 bg-white">
                <Image 
                  src={src} 
                  alt={`Wedding Snap ${i + 1}`} 
                  width={600} 
                  height={800} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-stone-200 shadow-sm">
             <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
             <p className="text-stone-600 font-medium text-lg">포트폴리오 사진이 준비 중입니다.</p>
             <p className="text-sm text-stone-400 mt-2">안내: <code className="bg-stone-100 px-2 py-1 rounded">apps/customer-web/public/images/snap</code> 폴더에 사진을 업로드해 주시면 자동으로 반영됩니다.</p>
          </div>
        )}

        <div className="text-center pt-12">
          <Link href="/pricing" className="inline-block px-8 py-3 bg-gold-500 text-white font-medium rounded-sm hover:bg-gold-600 transition-colors shadow-md shadow-gold-500/20">
            상품 안내 및 예약하기
          </Link>
        </div>
      </div>
    </main>
  );
}
