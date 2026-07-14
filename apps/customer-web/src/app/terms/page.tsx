export default function TermsPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-800 py-24 px-6 relative overflow-hidden">
      {/* 몽환적 백그라운드 블러 효과 */}
      <div className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-white/60 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <header className="text-center space-y-6">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-orange-500 uppercase">
            Terms & Conditions
          </h2>
          <h1 className="text-4xl font-serif text-stone-900 tracking-tight">
            이용 약관
          </h1>
          <p className="text-stone-500 font-medium">골든테이크 스튜디오의 서비스 이용 규정을 안내해 드립니다.</p>
        </header>

        <article className="glass-card p-10 md:p-14 rounded-3xl space-y-10 shadow-lg">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200/50 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              제 1 조 (계약의 성립)
            </h3>
            <p className="text-stone-600 leading-relaxed font-medium pl-3">
              본 계약은 골든테이크 스튜디오(이하 "스튜디오"라 합니다)의 웨딩 촬영 상품을 이용하고자 하는 고객이 본 약관에 동의하고, 예약금을 입금한 시점부터 효력이 발생합니다.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200/50 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              제 2 조 (예약금 및 잔금 결제)
            </h3>
            <ul className="list-disc pl-8 text-stone-600 space-y-2.5 font-medium">
              <li>예약금은 100,000원이며, 안내되는 스튜디오 공식 계좌를 통해 입금하셔야 예약이 확정됩니다.</li>
              <li>잔금은 예식 당일 기준 7일 전까지 전액 입금 완료되어야 합니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200/50 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
              제 3 조 (계약 취소 및 환불)
            </h3>
            <ul className="list-disc pl-8 text-stone-600 space-y-2.5 font-medium">
              <li>예약 확정 후 7일 이내 취소 시: 예약금 전액 환불 <span className="text-xs text-stone-400">(단, 예식일 30일 이내 계약은 환불 불가)</span></li>
              <li>입금 7일 이후 ~ 예식일 90일 전 취소 시: 예약금 환불 불가</li>
              <li>예식일 기준 60일 ~ 89일 전 취소 시: 최종 금액의 30% 위약금 발생</li>
              <li>예식일 기준 30일 ~ 59일 전 취소 시: 최종 금액의 50% 위약금 발생</li>
              <li className="text-rose-600 font-bold">예식일 기준 30일 미만 ~ 당일 취소 시: 최종 금액의 100% 위약금 발생</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200/50 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              제 4 조 (데이터 보관 및 초상권)
            </h3>
            <ul className="list-disc pl-8 text-stone-600 space-y-2.5 font-medium">
              <li>촬영된 원본 데이터는 예식일 기준 3개월간 보관되며, 이후 자동 파기됩니다.</li>
              <li>스튜디오는 촬영된 결과물을 자사 홈페이지 및 SNS 포트폴리오용으로 활용할 수 있습니다. <span className="text-orange-600 font-bold bg-orange-50/80 border border-orange-200/50 px-2 py-0.5 rounded-lg">(마케팅 활용 동의 시 5만원 할인 적용)</span></li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
