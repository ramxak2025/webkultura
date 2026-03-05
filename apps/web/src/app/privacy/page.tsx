import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="h-full md:overflow-auto p-3">
      <div className="panel p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Политика конфиденциальности
        </h1>

        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки
              и защиты персональных данных пользователей сайта Веб-Культура.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Сбор данных</h2>
            <p>
              Мы собираем только те данные, которые вы добровольно предоставляете
              через формы на сайте: имя, телефон, email, Telegram.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Использование данных</h2>
            <p>
              Ваши данные используются исключительно для связи с вами по вопросам
              оказания услуг. Мы не передаём данные третьим лицам.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Защита данных</h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для
              защиты ваших персональных данных от несанкционированного доступа.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь
              по email: hello@webkultura.ru
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
