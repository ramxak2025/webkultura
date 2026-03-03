import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-10">
          Политика конфиденциальности
        </h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки
              и защиты персональных данных пользователей сайта Веб-Культура.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Сбор данных</h2>
            <p>
              Мы собираем только те данные, которые вы добровольно предоставляете
              через формы на сайте: имя, телефон, email, Telegram.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Использование данных</h2>
            <p>
              Ваши данные используются исключительно для связи с вами по вопросам
              оказания услуг. Мы не передаём данные третьим лицам.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Защита данных</h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для
              защиты ваших персональных данных от несанкционированного доступа.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Контакты</h2>
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
