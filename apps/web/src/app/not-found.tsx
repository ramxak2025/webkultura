import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-neutral-200">404</h1>
        <h2 className="text-xl font-semibold text-neutral-900 mt-4">
          Страница не найдена
        </h2>
        <p className="text-neutral-500 mt-2 mb-6">
          Запрашиваемая страница не существует или была удалена
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 px-6 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
