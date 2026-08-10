"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 text-center">
      <div className="max-w-lg rounded-3xl border border-gray-200 bg-slate-50 p-10 shadow-sm">
        <p className="text-6xl font-black text-cyan-600">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Trang không tồn tại
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          Quay lại home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
