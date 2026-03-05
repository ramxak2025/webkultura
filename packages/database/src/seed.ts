import { PrismaClient, UserRole } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

async function main() {
  console.log("Seeding database...");

  // Admin user (password from env or default)
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || "admin123");
  await prisma.user.upsert({
    where: { email: "admin@webkultura.ru" },
    update: {},
    create: {
      email: "admin@webkultura.ru",
      password: adminPassword,
      name: "Администратор",
      role: UserRole.ADMIN,
    },
  });
  console.log("  Admin user created");

  // Portfolio categories
  const categories = [
    { name: "Веб-разработка", slug: "web-development", order: 1 },
    { name: "Маркетинг", slug: "marketing", order: 2 },
    { name: "Дизайн", slug: "design", order: 3 },
    { name: "Мобильная разработка", slug: "mobile", order: 4 },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const result = await prisma.portfolioCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.slug] = result.id;
  }
  console.log("  Portfolio categories created");

  // Portfolio projects
  const portfolioProjects = [
    {
      slug: "fintech-platform",
      title: "FinTech платформа",
      categorySlug: "web-development",
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      challenge: "Создать удобную платформу для управления инвестициями с real-time данными и аналитикой.",
      solution: "Разработали SPA на React с WebSocket для live-обновлений, Node.js бэкенд с микросервисной архитектурой.",
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
      metrics: { "Конверсия": "+340%", "Скорость": "0.8s", "Пользователи": "15K+" },
      order: 1,
    },
    {
      slug: "ecommerce-luxury",
      title: "Luxury E-Commerce",
      categorySlug: "web-development",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      challenge: "Запустить премиальный интернет-магазин с 3D-просмотром товаров и персонализацией.",
      solution: "Next.js + Three.js для 3D, AI-рекомендации, headless CMS для управления каталогом.",
      techStack: ["Next.js", "Three.js", "Strapi", "Stripe", "AWS"],
      metrics: { "Средний чек": "+180%", "Время на сайте": "5.2 мин", "Продажи": "+420%" },
      order: 2,
    },
    {
      slug: "brand-identity-nova",
      title: "Nova — Ребрендинг",
      categorySlug: "design",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      challenge: "Полный ребрендинг IT-компании: от логотипа до всех цифровых носителей.",
      solution: "Разработали новую визуальную систему, брендбук на 80 страниц, шаблоны для соцсетей и презентаций.",
      techStack: ["Figma", "After Effects", "Illustrator"],
      metrics: { "Узнаваемость": "+250%", "Вовлечённость": "+180%", "NPS": "92" },
      order: 3,
    },
    {
      slug: "marketing-saas",
      title: "SaaS маркетинг-платформа",
      categorySlug: "marketing",
      gradient: "from-blue-500 via-indigo-500 to-violet-500",
      challenge: "Увеличить MRR B2B SaaS-продукта через digital-маркетинг.",
      solution: "Запустили комплексную стратегию: SEO, контент, Яндекс Директ, ретаргетинг.",
      techStack: ["Яндекс Директ", "Google Ads", "SEO", "Content Marketing"],
      metrics: { "MRR": "+280%", "CAC": "-45%", "LTV": "+320%" },
      order: 4,
    },
    {
      slug: "medical-portal",
      title: "Медицинский портал",
      categorySlug: "web-development",
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
      challenge: "Разработать портал для записи к врачам с интеграцией в МИС клиники.",
      solution: "Full-stack разработка на Next.js + NestJS, интеграция с 1С:Медицина, личный кабинет пациента.",
      techStack: ["Next.js", "NestJS", "PostgreSQL", "1С", "Docker"],
      metrics: { "Онлайн-записи": "+500%", "Нагрузка на колл-центр": "-60%", "NPS": "89" },
      order: 5,
    },
    {
      slug: "restaurant-chain",
      title: "Сеть ресторанов — Digital",
      categorySlug: "marketing",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      challenge: "Увеличить посещаемость сети из 12 ресторанов через digital-каналы.",
      solution: "Геотаргетинг, UGC-контент, программа лояльности, SMM-стратегия.",
      techStack: ["Таргет", "SMM", "Influence", "CRM"],
      metrics: { "Трафик": "+200%", "Повторные визиты": "+85%", "ROI": "380%" },
      order: 6,
    },
  ];

  for (const project of portfolioProjects) {
    const { categorySlug, ...data } = project;
    await prisma.portfolioProject.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        published: true,
        categoryId: categoryMap[categorySlug]!,
      },
    });
  }
  console.log("  Portfolio projects created");

  // Service categories + children
  const services = [
    {
      title: "Маркетинг",
      slug: "marketing",
      description: "Комплексное продвижение вашего бизнеса в интернете",
      icon: "megaphone",
      order: 1,
      children: [
        {
          title: "Яндекс Директ",
          slug: "yandex-direct",
          description: "Настройка и ведение рекламных кампаний в Яндекс Директ",
          priceFrom: 30000,
          priceTo: 150000,
          durationEstimate: "от 2 недель",
          order: 1,
        },
        {
          title: "VK Реклама",
          slug: "vk-ads",
          description: "Таргетированная реклама ВКонтакте",
          priceFrom: 25000,
          priceTo: 120000,
          durationEstimate: "от 2 недель",
          order: 2,
        },
        {
          title: "Telegram Ads",
          slug: "telegram-ads",
          description: "Реклама в Telegram каналах и через Telegram Ads",
          priceFrom: 50000,
          priceTo: 200000,
          durationEstimate: "от 1 недели",
          order: 3,
        },
        {
          title: "SEO-продвижение",
          slug: "seo",
          description: "Поисковая оптимизация и вывод в ТОП Яндекс и Google",
          priceFrom: 40000,
          priceTo: 180000,
          durationEstimate: "от 3 месяцев",
          order: 4,
        },
      ],
    },
    {
      title: "Веб-разработка",
      slug: "web-development",
      description: "Разработка современных веб-сайтов и приложений",
      icon: "code",
      order: 2,
      children: [
        {
          title: "Корпоративный сайт",
          slug: "corporate-website",
          description: "Разработка представительского сайта компании",
          priceFrom: 150000,
          priceTo: 500000,
          durationEstimate: "от 4 недель",
          order: 1,
        },
        {
          title: "Интернет-магазин",
          slug: "ecommerce",
          description: "Разработка онлайн-магазина с каталогом и оплатой",
          priceFrom: 300000,
          priceTo: 1500000,
          durationEstimate: "от 8 недель",
          order: 2,
        },
        {
          title: "Лендинг",
          slug: "landing-page",
          description: "Конверсионная посадочная страница",
          priceFrom: 50000,
          priceTo: 150000,
          durationEstimate: "от 1 недели",
          order: 3,
        },
      ],
    },
    {
      title: "Дизайн",
      slug: "design",
      description: "Создание визуальной идентичности и интерфейсов",
      icon: "palette",
      order: 3,
      children: [
        {
          title: "UI/UX дизайн",
          slug: "ui-ux-design",
          description: "Проектирование пользовательских интерфейсов",
          priceFrom: 80000,
          priceTo: 300000,
          durationEstimate: "от 2 недель",
          order: 1,
        },
        {
          title: "Фирменный стиль",
          slug: "brand-identity",
          description: "Разработка логотипа и фирменного стиля",
          priceFrom: 60000,
          priceTo: 250000,
          durationEstimate: "от 2 недель",
          order: 2,
        },
      ],
    },
  ];

  for (const svc of services) {
    const { children, ...parentData } = svc;
    const parent = await prisma.service.upsert({
      where: { slug: parentData.slug },
      update: {},
      create: { ...parentData, description: parentData.description },
    });

    if (children) {
      for (const child of children) {
        await prisma.service.upsert({
          where: { slug: child.slug },
          update: {},
          create: { ...child, parentId: parent.id },
        });
      }
    }
  }
  console.log("  Services created");

  // Service relations ("often purchased together")
  const yandexDirect = await prisma.service.findUnique({ where: { slug: "yandex-direct" } });
  const seo = await prisma.service.findUnique({ where: { slug: "seo" } });
  const landing = await prisma.service.findUnique({ where: { slug: "landing-page" } });
  const uiux = await prisma.service.findUnique({ where: { slug: "ui-ux-design" } });

  if (yandexDirect && seo) {
    await prisma.serviceRelation.upsert({
      where: { serviceId_relatedId: { serviceId: yandexDirect.id, relatedId: seo.id } },
      update: {},
      create: { serviceId: yandexDirect.id, relatedId: seo.id },
    });
  }

  if (landing && uiux) {
    await prisma.serviceRelation.upsert({
      where: { serviceId_relatedId: { serviceId: landing.id, relatedId: uiux.id } },
      update: {},
      create: { serviceId: landing.id, relatedId: uiux.id },
    });
  }
  console.log("  Service relations created");

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
