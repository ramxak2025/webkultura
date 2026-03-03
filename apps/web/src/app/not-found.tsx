import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <h2 className="text-xl font-semibold text-white mt-4">
          Страница не найдена
        </h2>
        <p className="text-muted-foreground mt-2 mb-8">
          Запрашиваемая страница не существует или была удалена
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-violet-600/25 hover:scale-105 active:scale-95"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
