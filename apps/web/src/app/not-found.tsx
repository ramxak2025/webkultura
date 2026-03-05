import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center panel p-10">
        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          Страница не найдена
        </h2>
        <p className="text-gray-500 mt-2 mb-8">
          Запрашиваемая страница не существует или была удалена
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/25 hover:scale-105 active:scale-95"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
