'use client';

import Link from 'next/link';

export default function KakaoFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="http://pf.kakao.com/_xdmlGX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#FEE500] text-[#000000] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="카카오톡 상담하기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12 3c-5.523 0-10 3.5-10 7.828 0 2.81 1.83 5.27 4.67 6.64l-1.22 4.46c-.05.18.17.31.31.21l5.25-3.46c1.3.16 2.63.16 3.99 0 5.523 0 10-3.5 10-7.828S17.523 3 12 3z" />
        </svg>
      </Link>
    </div>
  );
}
