import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-800 py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-6">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gold-600 uppercase">
            Pricing & Policy
          </h2>
          <h1 className="text-4xl font-serif text-slate-900">
            상품 및 안내
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            안녕하세요, 신랑신부님!<br />
            인생의 가장 소중한 날, <strong className="text-slate-800 font-semibold">골든 테이크</strong>를 믿고 선택해 주셔서 진심으로 감사드립니다.<br />
            안전하고 명확한 진행을 위해 예약 및 환불 규정을 안내해 드립니다.
          </p>
        </header>

        <div className="space-y-8">
          {/* 상품 및 결제 안내 */}
          <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-sm">1</span>
              상품 및 결제 안내
            </h3>
            
            <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-stone-800 mb-2">본식 영상 <span className="text-base font-normal text-stone-500">(1인 2캠 촬영)</span></h4>
              
              <ul className="space-y-3 mt-4 text-sm text-stone-600">
                <li className="flex justify-between items-center py-2 border-b border-stone-200/50">
                  <span>정상 가</span>
                  <span className="line-through text-stone-400">380,000원</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-stone-200/50">
                  <span className="flex items-center gap-2">할인 혜택 <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">마케팅 활용 동의 시</span></span>
                  <span className="text-rose-500 font-medium">- 50,000원</span>
                </li>
                <li className="flex justify-between items-center py-4 border-b-2 border-stone-800">
                  <span className="font-bold text-stone-800 text-base">최종 상품 금액</span>
                  <span className="font-bold text-stone-900 text-xl">330,000원</span>
                </li>
                <li className="flex justify-between items-center py-2 text-stone-500 pt-4">
                  <span>예약금 <span className="text-xs">(일정 선점 및 계약 확정 비용)</span></span>
                  <span className="font-semibold text-stone-700">100,000원</span>
                </li>
                <li className="flex justify-between items-center py-2 text-stone-500">
                  <span>잔금 <span className="text-xs">(예식일 7일 전까지 입금)</span></span>
                  <span className="font-semibold text-stone-700">230,000원</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 예약 신청 방법 */}
          <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-sm">2</span>
              예약 신청 방법
            </h3>
            
            <div className="space-y-4 text-sm text-stone-600">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                <p className="mb-1 text-xs text-stone-500">입금 계좌</p>
                <p className="font-bold text-stone-800 text-base">국민은행 041301-04-343992</p>
                <p className="text-xs text-stone-500 mt-1">예금주: 스튜디오 시간교 정태환</p>
              </div>
              
              <ul className="list-disc pl-5 space-y-2 text-stone-500 leading-relaxed">
                <li><strong className="text-stone-700">입금 기한:</strong> 본 안내문 수신 후 24시간 이내</li>
                <li>예약금 입금 순으로 일정이 최종 마감됩니다.</li>
                <li>입금 후 <strong className="text-stone-700">[신랑 성함 / 신부 성함 / 예식 날짜 / 마케팅 동의 여부(Y/N)]</strong>를 <a href="http://pf.kakao.com/_xdmlGX" target="_blank" rel="noreferrer" className="text-gold-600 font-semibold underline underline-offset-2 hover:text-gold-700">카카오톡 채널</a>로 보내주시면 확인 후 '예약 확정 안내'를 발송해 드립니다.</li>
              </ul>
            </div>
          </section>

          {/* 취소 및 환불 규정 */}
          <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm">3</span>
              취소 및 환불 규정
            </h3>
            
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              본식 영상은 하루에 제한된 팀만 예약제로 진행되므로, 예약 확정 이후에는 동일한 날짜의 다른 촬영 문의를 모두 거절하게 됩니다. 이에 따라 타 고객님의 예약 기회비용을 보호하고자 아래와 같이 취소 및 환불 규정을 적용하고 있으니 신중한 확인을 부탁드립니다.
            </p>
            
            <div className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200/50">
                <h4 className="font-bold text-stone-800 mb-3 text-sm">기본 환불 규정</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500 font-bold min-w-[90px]">100% 전액 환불</span>
                    <span className="leading-relaxed">예약금 입금일 기준 7일 이내 취소 시<br/><span className="text-xs text-stone-400">(단, 예식일이 30일 이내로 남은 시점의 계약은 즉시 취소하더라도 환불 불가)</span></span>
                  </li>
                  <li className="flex items-start gap-2 mt-2">
                    <span className="text-rose-500 font-bold min-w-[90px]">예약금 환불 불가</span>
                    <span className="leading-relaxed">입금 7일 이후 ~ 예식일 90일 전 취소 시</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50/30 p-4 rounded-lg border border-rose-100">
                <h4 className="font-bold text-stone-800 mb-3 text-sm">취소 위약금 안내 <span className="text-xs font-normal text-stone-500">(최종 금액 33만 원 기준)</span></h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex justify-between items-center py-1 border-b border-rose-100/50">
                    <span>예식일 60일 ~ 89일 전 취소</span>
                    <span className="font-semibold text-stone-800">최종 금액의 30% 발생 <span className="text-xs text-stone-500 font-normal">(예약금 제외 추가 0원)</span></span>
                  </li>
                  <li className="flex justify-between items-center py-1 border-b border-rose-100/50">
                    <span>예식일 30일 ~ 59일 전 취소</span>
                    <span className="font-semibold text-stone-800">최종 금액의 50% 발생 <span className="text-xs text-rose-500 font-normal">(예약금 제외 추가 65,000원)</span></span>
                  </li>
                  <li className="flex justify-between items-center py-1">
                    <span>예식일 30일 미만 ~ 당일 취소</span>
                    <span className="font-bold text-rose-600">최종 금액의 100% 발생 <span className="text-xs text-rose-500 font-normal">(환불 불가 및 잔금 전액 청구)</span></span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-stone-200 text-sm text-stone-500 leading-relaxed text-center">
              <p>본 예약금을 입금해 주시면 상기 안내해 드린 결제 및 취소/환불 규정에 동의하신 것으로 간주되어 계약이 최종 체결됩니다.</p>
              <p className="mt-4 text-stone-700 font-medium">두 분의 가장 아름다운 순간을 최고의 영상으로 담아낼 수 있도록 정성을 다해 준비하겠습니다.<br/>감사합니다.</p>
              <p className="mt-6 font-bold text-stone-900 tracking-wider">골든 테이크 <span className="text-xs font-normal text-stone-500">(대표 정태환)</span></p>
            </div>
          </section>
        </div>

        <div className="text-center pt-8">
          <Link href="/reservation" className="inline-block px-10 py-4 bg-gold-500 text-white font-bold rounded-lg shadow-md shadow-gold-500/20 hover:bg-gold-600 transition-all">
            규정 동의 및 예약 신청하기
          </Link>
        </div>
      </div>
    </main>
  );
}
