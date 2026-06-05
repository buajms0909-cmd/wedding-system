export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 p-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gold-600 uppercase">
            Terms & Conditions
          </h2>
          <h1 className="text-4xl font-serif text-slate-900">
            이용 약관
          </h1>
          <p className="text-slate-500 font-light">골든테이크 스튜디오의 서비스 이용 규정을 안내해 드립니다.</p>
        </header>

        <article className="prose prose-slate max-w-none space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-serif text-slate-900 border-b border-gold-200 pb-2">제 1 조 (계약의 성립)</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              본 계약은 골든테이크 스튜디오(이하 "스튜디오"라 합니다)의 웨딩 촬영 상품을 이용하고자 하는 고객이 본 약관에 동의하고, 예약금을 입금한 시점부터 효력이 발생합니다.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif text-slate-900 border-b border-gold-200 pb-2">제 2 조 (예약금 및 잔금 결제)</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-2 font-light">
              <li>예약금은 300,000원이며, 폼 신청 후 안내되는 스마트스토어를 통해 결제하셔야 예약이 확정됩니다.</li>
              <li>잔금은 예식 당일 기준 7일 전까지 전액 입금 완료되어야 합니다.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif text-slate-900 border-b border-gold-200 pb-2">제 3 조 (계약 취소 및 환불)</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-2 font-light">
              <li>예약 확정 후 7일 이내 취소 시: 예약금 전액 환불</li>
              <li>예식일 기준 90일 전 취소 시: 예약금의 50% 위약금 발생</li>
              <li>예식일 기준 60일 전 취소 시: 예약금 환불 불가 및 총 상품 금액의 30% 위약금 발생</li>
              <li>예식일 기준 30일 이내 취소 시: 총 상품 금액의 80% 위약금 발생</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif text-slate-900 border-b border-gold-200 pb-2">제 4 조 (데이터 보관 및 초상권)</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-2 font-light">
              <li>촬영된 원본 데이터는 예식일 기준 3개월간 보관되며, 이후 자동 파기됩니다.</li>
              <li>스튜디오는 촬영된 결과물을 자사 홈페이지 및 SNS 포트폴리오용으로 활용할 수 있습니다. (초상권 활용 비동의 시 사전 말씀 부탁드립니다.)</li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
