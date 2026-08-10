"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 text-center">
      <div className="max-w-lg rounded-3xl border border-gray-200 bg-slate-50 p-10 shadow-sm">
        <p className="text-6xl font-black text-red-600">Oops!</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Đã xảy ra lỗi
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          {error?.message ?? "Có lỗi xảy ra, vui lòng thử lại."}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
