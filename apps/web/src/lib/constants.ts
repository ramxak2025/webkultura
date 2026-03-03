export const NAV_ITEMS = [
  { label: "Услуги", href: "/services" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
] as const;

export const SITE_NAME = "Веб-Культура";
export const SITE_DESCRIPTION =
  "Digital-агентство полного цикла. Создаём сайты, запускаем рекламу, разрабатываем бренды.";

export const CONTACT_INFO = {
  phone: "+7 (999) 000-00-00",
  email: "hello@webkultura.ru",
  telegram: "@webkultura",
  address: "Москва, Россия",
} as const;

export const STATS = [
  { value: 150, suffix: "+", label: "Проектов" },
  { value: 7, suffix: "", label: "Лет опыта" },
  { value: 98, suffix: "%", label: "Клиентов довольны" },
  { value: 50, suffix: "+", label: "Клиентов" },
] as const;

export interface ServiceCategory {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
  readonly services: readonly {
    readonly title: string;
    readonly price: string;
    readonly duration: string;
  }[];
}

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  {
    title: "Маркетинг",
    slug: "marketing",
    description: "Привлекаем клиентов через digital-каналы. Яндекс Директ, таргет, SEO, контент-маркетинг.",
    icon: "TrendingUp",
    color: "from-blue-500 to-cyan-400",
    services: [
      { title: "Контекстная реклама", price: "от 30 000 ₽", duration: "от 2 недель" },
      { title: "SEO-продвижение", price: "от 40 000 ₽", duration: "от 3 месяцев" },
      { title: "Таргетированная реклама", price: "от 25 000 ₽", duration: "от 2 недель" },
      { title: "Контент-маркетинг", price: "от 35 000 ₽", duration: "от 1 месяца" },
    ],
  },
  {
    title: "Разработка",
    slug: "development",
    description: "Создаём сайты и веб-приложения на современном стеке. React, Next.js, Node.js.",
    icon: "Code2",
    color: "from-violet-500 to-purple-400",
    services: [
      { title: "Корпоративный сайт", price: "от 150 000 ₽", duration: "от 4 недель" },
      { title: "Интернет-магазин", price: "от 250 000 ₽", duration: "от 6 недель" },
      { title: "Веб-приложение", price: "от 350 000 ₽", duration: "от 8 недель" },
      { title: "Landing page", price: "от 50 000 ₽", duration: "от 1 недели" },
    ],
  },
  {
    title: "Дизайн",
    slug: "design",
    description: "Проектируем интерфейсы и создаём визуальные решения. UI/UX, брендинг, айдентика.",
    icon: "Palette",
    color: "from-pink-500 to-rose-400",
    services: [
      { title: "UI/UX дизайн", price: "от 80 000 ₽", duration: "от 3 недель" },
      { title: "Фирменный стиль", price: "от 60 000 ₽", duration: "от 2 недель" },
      { title: "Брендинг", price: "от 120 000 ₽", duration: "от 4 недель" },
      { title: "Дизайн презентации", price: "от 25 000 ₽", duration: "от 1 недели" },
    ],
  },
] as const;

export const PORTFOLIO_PROJECTS = [
  {
    id: "1",
    slug: "fintech-platform",
    title: "FinTech платформа",
    category: "Разработка",
    cover: "",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    challenge: "Создать удобную платформу для управления инвестициями с real-time данными и аналитикой.",
    solution: "Разработали SPA на React с WebSocket для live-обновлений, Node.js бэкенд с микросервисной архитектурой.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    metrics: { "Конверсия": "+340%", "Скорость": "0.8s", "Пользователи": "15K+" },
  },
  {
    id: "2",
    slug: "ecommerce-luxury",
    title: "Luxury E-Commerce",
    category: "Разработка",
    cover: "",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    challenge: "Запустить премиальный интернет-магазин с 3D-просмотром товаров и персонализацией.",
    solution: "Next.js + Three.js для 3D, AI-рекомендации, headless CMS для управления каталогом.",
    techStack: ["Next.js", "Three.js", "Strapi", "Stripe", "AWS"],
    metrics: { "Средний чек": "+180%", "Время на сайте": "5.2 мин", "Продажи": "+420%" },
  },
  {
    id: "3",
    slug: "brand-identity-nova",
    title: "Nova — Ребрендинг",
    category: "Дизайн",
    cover: "",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    challenge: "Полный ребрендинг IT-компании: от логотипа до всех цифровых носителей.",
    solution: "Разработали новую визуальную систему, брендбук на 80 страниц, шаблоны для соцсетей и презентаций.",
    techStack: ["Figma", "After Effects", "Illustrator"],
    metrics: { "Узнаваемость": "+250%", "Вовлечённость": "+180%", "NPS": "92" },
  },
  {
    id: "4",
    slug: "marketing-saas",
    title: "SaaS маркетинг-платформа",
    category: "Маркетинг",
    cover: "",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    challenge: "Увеличить MRR B2B SaaS-продукта через digital-маркетинг.",
    solution: "Запустили комплексную стратегию: SEO, контент, Яндекс Директ, ретаргетинг.",
    techStack: ["Яндекс Директ", "Google Ads", "SEO", "Content Marketing"],
    metrics: { "MRR": "+280%", "CAC": "-45%", "LTV": "+320%" },
  },
  {
    id: "5",
    slug: "medical-portal",
    title: "Медицинский портал",
    category: "Разработка",
    cover: "",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    challenge: "Разработать портал для записи к врачам с интеграцией в МИС клиники.",
    solution: "Full-stack разработка на Next.js + NestJS, интеграция с 1С:Медицина, личный кабинет пациента.",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "1С", "Docker"],
    metrics: { "Онлайн-записи": "+500%", "Нагрузка на колл-центр": "-60%", "NPS": "89" },
  },
  {
    id: "6",
    slug: "restaurant-chain",
    title: "Сеть ресторанов — Digital",
    category: "Маркетинг",
    cover: "",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    challenge: "Увеличить посещаемость сети из 12 ресторанов через digital-каналы.",
    solution: "Геотаргетинг, UGC-контент, программа лояльности, SMM-стратегия.",
    techStack: ["Таргет", "SMM", "Influence", "CRM"],
    metrics: { "Трафик": "+200%", "Повторные визиты": "+85%", "ROI": "380%" },
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Алексей Петров",
    role: "CEO, TechStart",
    text: "Команда Веб-Культуры превратила наши идеи в работающий продукт. Профессиональный подход, чёткие сроки, результат превзошёл ожидания.",
    rating: 5,
  },
  {
    name: "Мария Козлова",
    role: "CMO, FoodChain",
    text: "За 3 месяца работы ROI маркетинговых кампаний вырос на 380%. Ребята реально разбираются в digital-маркетинге.",
    rating: 5,
  },
  {
    name: "Дмитрий Волков",
    role: "Founder, Nova",
    text: "Ребрендинг полностью изменил восприятие компании. Клиенты отмечают премиальность и стиль. Рекомендую однозначно.",
    rating: 5,
  },
] as const;

export const TEAM_MEMBERS = [
  { name: "Руслан", role: "Основатель & CEO", gradient: "from-violet-500 to-purple-500" },
  { name: "Анна", role: "Арт-директор", gradient: "from-pink-500 to-rose-500" },
  { name: "Максим", role: "Lead Developer", gradient: "from-blue-500 to-cyan-500" },
  { name: "Елена", role: "Маркетолог", gradient: "from-amber-500 to-orange-500" },
] as const;
