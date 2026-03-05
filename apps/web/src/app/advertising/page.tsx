import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Users, TrendingUp, Zap, BarChart3, Globe, MessageCircle, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Реклама — Яндекс Директ, ВК, Telegram Ads",
  description:
    "Настройка и ведение рекламных кампаний. Яндекс Директ, ВКонтакте, Telegram Ads. Увеличиваем продажи и привлекаем клиентов.",
};

const platforms = [
  {
    name: "Яндекс Директ",
    logo: "https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png",
    gradient: "from-yellow-400 to-red-500",
    description: "Контекстная реклама в поисковой выдаче Яндекса и рекламной сети (РСЯ). Ваш продукт увидят именно те, кто ищет его прямо сейчас.",
    features: [
      { icon: Search, text: "Поисковая реклама — показы по ключевым запросам" },
      { icon: Globe, text: "РСЯ — баннеры на тысячах сайтов-партнёров" },
      { icon: Target, text: "Ретаргетинг — возврат ушедших посетителей" },
      { icon: BarChart3, text: "Аналитика — Яндекс Метрика, сквозная аналитика" },
    ],
    benefits: [
      "Горячий трафик — клиенты, которые уже ищут ваш продукт",
      "Гибкая настройка аудитории по гео, времени, устройствам",
      "Оплата за клики — платите только за заинтересованных",
      "Быстрый запуск — результаты в первый же день",
    ],
    price: "от 25 000 ₽/мес",
    caseStudy: {
      metric: "+340%",
      label: "рост конверсий",
      client: "B2B SaaS",
    },
  },
  {
    name: "ВКонтакте",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/200px-VK_Compact_Logo_%282021-present%29.svg.png",
    gradient: "from-blue-500 to-blue-700",
    description: "Таргетированная реклама в крупнейшей социальной сети России. Точное попадание в вашу целевую аудиторию через настройку по интересам, поведению и демографии.",
    features: [
      { icon: Users, text: "97 млн активных пользователей ежемесячно" },
      { icon: Target, text: "Детальный таргетинг по интересам и поведению" },
      { icon: MessageCircle, text: "Форматы: карусели, видео, сторис, клипы" },
      { icon: TrendingUp, text: "Лид-формы — заявки без перехода на сайт" },
    ],
    benefits: [
      "Широкий охват российской аудитории",
      "Look-alike аудитории для масштабирования",
      "Ретаргетинг по посетителям сайта и CRM-базе",
      "Реклама в сообществах и маркет-платформа",
    ],
    price: "от 20 000 ₽/мес",
    caseStudy: {
      metric: "+200%",
      label: "рост трафика",
      client: "Сеть ресторанов",
    },
  },
  {
    name: "Telegram Ads",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/200px-Telegram_logo.svg.png",
    gradient: "from-sky-400 to-blue-500",
    description: "Официальная рекламная платформа Telegram. Нативные рекламные сообщения в публичных каналах — без баннерной слепоты, с высоким CTR.",
    features: [
      { icon: MessageCircle, text: "Нативный формат — рекламное сообщение в канале" },
      { icon: Target, text: "Таргетинг по тематике каналов и языку" },
      { icon: Users, text: "Продвижение каналов, ботов и внешних ссылок" },
      { icon: Zap, text: "Высокий CTR за счёт нативности формата" },
    ],
    benefits: [
      "Платёжеспособная аудитория 25-45 лет",
      "Отсутствие баннерной слепоты — новый формат",
      "Продвижение Telegram-канала или бота",
      "Минимум конкурентов — рынок только развивается",
    ],
    price: "от 30 000 ₽/мес",
    caseStudy: {
      metric: "+500%",
      label: "подписчиков",
      client: "IT-медиа",
    },
  },
];

const additionalChannels = [
  { name: "Яндекс Бизнес", desc: "Продвижение на Картах и в навигаторе", icon: Globe },
  { name: "myTarget", desc: "Реклама в Одноклассниках и проектах VK", icon: Users },
  { name: "Авито", desc: "Продвижение объявлений и магазинов", icon: TrendingUp },
  { name: "SEO", desc: "Органическое продвижение в поиске", icon: Search },
];

export default function AdvertisingPage() {
  return (
    <div className="h-full md:overflow-auto">
      {/* Desktop single-screen layout */}
      <div className="hidden md:block p-3 min-h-full">
        {/* Header panel */}
        <div className="panel p-6 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Рекламные <span className="gradient-text">платформы</span>
              </h1>
              <p className="text-gray-500 mt-1">
                Настраиваем и ведём рекламу на всех ключевых площадках. Прозрачная аналитика и измеримый результат.
              </p>
            </div>
            <Link
              href="/configurator"
              className="group inline-flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-600/20 hover:scale-105 active:scale-95 shrink-0"
            >
              Заказать рекламу
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="panel p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{platform.name}</h2>
                  <span className="text-xs text-indigo-600 font-medium">{platform.price}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {platform.description}
              </p>

              <div className="space-y-2 mb-4">
                {platform.features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.text} className="flex items-start gap-2">
                      <Icon size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-gray-600">{f.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                <div className="text-2xl font-bold gradient-text">{platform.caseStudy.metric}</div>
                <div className="text-xs text-gray-500">{platform.caseStudy.label} / {platform.caseStudy.client}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional channels */}
        <div className="panel p-5">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Другие каналы</h2>
          <div className="grid grid-cols-4 gap-3">
            {additionalChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div key={ch.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/50">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{ch.name}</div>
                    <div className="text-xs text-gray-400">{ch.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden px-4 pt-6 pb-8 space-y-6">
        <div className="glass rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Рекламные <span className="gradient-text">платформы</span>
          </h1>
          <p className="text-sm text-gray-500">
            Настраиваем и ведём рекламу на всех ключевых площадках.
          </p>
        </div>

        {platforms.map((platform) => (
          <div key={platform.name} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center overflow-hidden`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{platform.name}</h2>
                <span className="text-xs text-indigo-600 font-medium">{platform.price}</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{platform.description}</p>

            <div className="space-y-2 mb-4">
              {platform.features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.text} className="flex items-start gap-2">
                    <Icon size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-600">{f.text}</span>
                  </div>
                );
              })}
            </div>

            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Преимущества</h3>
            <ul className="space-y-1.5 mb-4">
              {platform.benefits.map((b) => (
                <li key={b} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">•</span> {b}
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
              <div className="text-2xl font-bold gradient-text">{platform.caseStudy.metric}</div>
              <div className="text-xs text-gray-500">{platform.caseStudy.label} / {platform.caseStudy.client}</div>
            </div>
          </div>
        ))}

        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Другие каналы</h2>
          <div className="grid grid-cols-2 gap-3">
            {additionalChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div key={ch.name} className="flex items-center gap-2 p-3 rounded-xl bg-white/40 border border-white/50">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs">{ch.name}</div>
                    <div className="text-[10px] text-gray-400">{ch.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Link
          href="/configurator"
          className="block w-full text-center h-12 leading-[3rem] bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl"
        >
          Заказать рекламу
        </Link>
      </div>
    </div>
  );
}
