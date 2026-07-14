'use client';

import Link from 'next/link';

export default function PricingPage() {
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || 'http://pf.kakao.com/_xdmlGX';

  return (
    <main className="min-h-screen bg-stone-50 text-slate-800 py-24 px-6 relative overflow-hidden">
      {/* 백그라운드 글래스모피즘 효과 */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/60 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <header className="text-center space-y-6">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-orange-500 uppercase">
            Pricing & Policy
          </h2>
          <h1 className="text-4xl font-serif text-stone-900 tracking-tight">
            상품 및 안내
          </h1>
          <p className="text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            안녕하세요, 신랑신부님!<br />
            인생의 가장 소중한 날, <strong className="text-stone-800 font-semibold">골든 테이크</strong>를 믿고 선택해 주셔서 진심으로 감사드립니다.<br />
            안전하고 명확한 진행을 위해 예약 및 환불 규정을 안내해 드립니다.
          </p>
        </header>

        <div className="space-y-8">
          {/* 상품 안내 */}
          <section className="glass-card p-10 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-orange-100/80 text-orange-600 flex items-center justify-center text-sm border border-orange-200/50">1</span>
              OPTION 상품 안내
            </h3>

            <div className="space-y-6">
              {/* OPTION 1. 베이직 */}
              <div className="bg-white/40 border border-white/40 rounded-2xl p-8 flex flex-col items-center text-center">
                <h4 className="text-2xl font-serif text-stone-900 mb-3 font-bold">OPTION 1. 베이직</h4>
                <div className="bg-stone-800 text-stone-50 px-4 py-1.5 rounded-full text-sm mb-6 font-bold tracking-wider shadow-md">
                  대표작가 1인 2캠 | 4K촬영
                </div>
                <div className="space-y-2 text-stone-700 font-medium mb-8">
                  <p>본식 풀영상 보정본</p>
                  <p>+3분 뮤직비디오 +부모님/하객 인터뷰</p>
                  <p>+웨딩 USB 증정</p>
                </div>
                <div className="flex items-center gap-4 text-stone-500 font-medium border-t border-stone-200/50 pt-6 w-full justify-center">
                  <div className="text-sm">정상가<br/><span className="line-through text-stone-400">430,000원</span></div>
                  <div className="text-stone-300">→</div>
                  <div className="text-rose-600">오픈할인가<br/><span className="text-2xl font-extrabold text-rose-600">380,000원</span></div>
                </div>
              </div>

              {/* OPTION 2. 프리미엄 */}
              <div className="bg-white/40 border border-white/40 rounded-2xl p-8 flex flex-col items-center text-center">
                <h4 className="text-2xl font-serif text-stone-900 mb-3 font-bold">OPTION 2. 프리미엄</h4>
                <div className="bg-stone-800 text-stone-50 px-4 py-1.5 rounded-full text-sm mb-6 font-bold tracking-wider shadow-md">
                  대표작가 2인 3캠 | 4K촬영
                </div>
                <div className="space-y-2 text-stone-700 font-medium mb-8">
                  <p>본식 풀영상 보정본</p>
                  <p>+3분 뮤직비디오 +부모님/하객 인터뷰</p>
                  <p>+웨딩 USB 증정</p>
                </div>
                <div className="flex items-center gap-4 text-stone-500 font-medium border-t border-stone-200/50 pt-6 w-full justify-center">
                  <div className="text-sm">정상가<br/><span className="line-through text-stone-400">860,000원</span></div>
                  <div className="text-stone-300">→</div>
                  <div className="text-rose-600">오픈할인가<br/><span className="text-2xl font-extrabold text-rose-600">800,000원</span></div>
                </div>
              </div>

              <p className="text-center text-sm font-medium text-stone-500 py-2">
                *모든 옵션의 촬영 구성은 <strong className="text-stone-700">신부대기실 - 본식 - 원판</strong>으로 진행됩니다.
              </p>

              {/* OPTION 3. 실속액션캠 */}
              <div className="bg-white/40 border border-white/40 rounded-2xl p-8 flex flex-col items-center text-center mt-8">
                <h4 className="text-2xl font-serif text-stone-900 mb-3 font-bold">OPTION 3. 실속액션캠</h4>
                <div className="bg-stone-800 text-stone-50 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider shadow-md">
                  대표작가 1인 2캠 | 4K촬영
                </div>
                <p className="text-xs text-stone-500 mb-6 mt-2">*오즈모 포켓4 촬영</p>
                <div className="space-y-2 text-stone-700 font-medium mb-8">
                  <p>본식 풀영상 보정본</p>
                  <p>+3분 뮤직비디오 +부모님/하객 인터뷰 +웨딩 USB 증정</p>
                </div>
                <div className="text-2xl font-extrabold text-rose-600 border-t border-stone-200/50 pt-6 w-full">
                  300,000원
                </div>
              </div>
              
              {/* 출장비 및 추가 옵션 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-stone-200/50 rounded-2xl p-6 border border-stone-200 text-center">
                  <h4 className="text-lg font-bold text-stone-800 mb-4">출장비</h4>
                  <ul className="space-y-3 text-sm text-stone-700 font-medium">
                    <li className="flex justify-between"><span>서울</span><span>추가금 없음</span></li>
                    <li className="flex justify-between"><span>경기/인천</span><span>+50,000원</span></li>
                    <li className="flex justify-between"><span>경기/인천 외</span><span>+100,000원</span></li>
                  </ul>
                </div>
                <div className="bg-stone-200/50 rounded-2xl p-6 border border-stone-200 text-center">
                  <h4 className="text-lg font-bold text-stone-800 mb-4">추가 옵션</h4>
                  <ul className="space-y-3 text-sm text-stone-700 font-medium">
                    <li className="flex justify-between"><span>2부(연회장)</span><span>+50,000원</span></li>
                    <li className="flex justify-between"><span>2부 추가 행사</span><span>+50,000원</span></li>
                    <li className="flex justify-between"><span>폐백</span><span>+50,000원</span></li>
                  </ul>
                </div>
              </div>

              {/* 하단 공지 */}
              <div className="text-center space-y-3 mt-10 text-xs sm:text-sm font-medium text-stone-600 leading-relaxed border-t border-stone-200/50 pt-8">
                <p>2026년 7월 기준가로 추후 금액은 변동될 수 있습니다.</p>
                <p>골든테이크 필름은 <strong className="text-rose-600">하루에 단 1팀 예약제로 진행되는 프리미엄 DVD업체</strong>로<br className="hidden sm:block"/> 예약확정 이후에는 동일한 날짜의 문의 건들을 받지 않고 있습니다.</p>
                <p>이에 따라, <strong className="text-stone-800">예약금 환불 규정 및 위약금</strong>을 따로 안내드리고 있으니<br className="hidden sm:block"/> 자세한 사항은 <strong className="text-stone-800">카카오채널</strong>에서 확인 부탁드립니다.</p>
              </div>

            </div>
          </section>

          {/* 예약 신청 방법 */}
          <section className="glass-card p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-orange-100/80 text-orange-600 flex items-center justify-center text-sm border border-orange-200/50">2</span>
              예약 신청 방법
            </h3>
            
            <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
              <div className="bg-white/40 p-4 rounded-2xl border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <p className="mb-0.5 text-xs font-semibold text-stone-500 tracking-wider">입금 계좌</p>
                  <p className="font-bold text-stone-800 text-lg">국민은행 041301-04-343992</p>
                  <p className="text-xs text-stone-500">예금주: 스튜디오 시간교 정태환</p>
                </div>
              </div>
              
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600 font-medium">
                <li>예약금 입금 순으로 일정이 최종 마감됩니다.</li>
                <li className="leading-relaxed">
                  입금 후 <strong className="text-stone-800">[신랑 성함 / 신부 성함 / 예식 날짜 / 마케팅 동의 여부(Y/N)]</strong>를<br/>
                  <a href={kakaoUrl} target="_blank" rel="noreferrer" className="text-orange-600 font-bold underline underline-offset-4 hover:text-orange-700 transition-colors mx-1">카카오톡 채널</a>로 보내주시면 확인 후 '예약 확정 안내'를 발송해 드립니다.
                </li>
              </ul>
            </div>
          </section>

          {/* 취소 및 환불 규정 */}
          <section className="glass-card p-10 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center text-sm border border-rose-200/50">3</span>
              취소 및 환불 규정
            </h3>
            
            <p className="text-sm text-stone-500 leading-relaxed mb-8">
              본식 영상은 하루에 제한된 팀만 예약제로 진행되므로, 예약 확정 이후에는 동일한 날짜의 다른 촬영 문의를 모두 거절하게 됩니다. 이에 따라 타 고객님의 예약 기회비용을 보호하고자 아래와 같이 취소 및 환불 규정을 적용하고 있으니 신중한 확인을 부탁드립니다.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/40 p-6 rounded-2xl border border-white/40">
                <h4 className="font-bold text-stone-800 mb-4 text-sm tracking-wide">기본 환불 규정</h4>
                <ul className="space-y-4 text-sm text-stone-600">
                  <li className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-orange-600 font-extrabold min-w-[120px] bg-orange-50 px-3 py-1.5 rounded-lg inline-block text-center border border-orange-200/50">100% 전액 환불</span>
                    <span className="leading-relaxed font-medium">예약금 입금일 기준 7일 이내 취소 시<br/><span className="text-xs text-stone-400 font-normal">(단, 예식일이 30일 이내로 남은 시점의 계약은 환불 불가)</span></span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-center gap-2 pt-2 md:pt-0">
                    <span className="text-rose-500 font-extrabold min-w-[120px] bg-rose-50 px-3 py-1.5 rounded-lg inline-block text-center border border-rose-200/50">예약금 환불 불가</span>
                    <span className="leading-relaxed font-medium">입금 7일 이후 ~ 예식일 90일 전 취소 시</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50/40 p-6 rounded-2xl border border-rose-100">
                <h4 className="font-bold text-stone-800 mb-4 text-sm tracking-wide">취소 위약금 안내 <span className="text-xs font-normal text-stone-500 ml-1">(최종 금액 33만 원 기준)</span></h4>
                <ul className="space-y-3 text-sm text-stone-600 font-medium">
                  <li className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-rose-100/50">
                    <span>예식일 60일 ~ 89일 전 취소</span>
                    <span className="font-bold text-stone-800">최종 금액의 30% <span className="text-xs text-stone-500 font-normal">(예약금 제외 추가 0원)</span></span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-rose-100/50">
                    <span>예식일 30일 ~ 59일 전 취소</span>
                    <span className="font-bold text-stone-800">최종 금액의 50% <span className="text-xs text-rose-500 font-normal">(예약금 제외 65,000원 추가입금)</span></span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-center justify-between py-2">
                    <span>예식일 30일 미만 ~ 당일 취소</span>
                    <span className="font-black text-rose-600">최종 금액의 100% <span className="text-xs text-rose-500 font-normal">(환불 불가 및 잔금 전액 청구)</span></span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-stone-200/50 text-sm text-stone-500 leading-relaxed text-center font-medium">
              <p>본 예약금을 입금해 주시면 상기 안내해 드린 결제 및 취소/환불 규정에 동의하신 것으로 간주되어 계약이 최종 체결됩니다.</p>
              <p className="mt-4 text-stone-700">두 분의 가장 아름다운 순간을 최고의 영상으로 담아낼 수 있도록 정성을 다해 준비하겠습니다.<br/>감사합니다.</p>
              <p className="mt-6 font-bold text-stone-900 tracking-wider">골든 테이크 <span className="text-xs font-normal text-stone-400">대표 정태환</span></p>
            </div>
          </section>
        </div>

        <div className="text-center pt-6 pb-12">
          <Link href="/reservation" className="inline-block px-12 py-5 glass-btn-primary font-bold tracking-widest rounded-xl transition-all hover:-translate-y-0.5 text-sm md:text-base">
            규정 동의 및 예약 신청하기
          </Link>
        </div>
      </div>
    </main>
  );
}
