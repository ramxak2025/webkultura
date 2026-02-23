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

  // Admin user
  const adminPassword = await hashPassword("admin123");
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

  // Portfolio categories
  const categories = [
    { name: "Веб-разработка", slug: "web-development", order: 1 },
    { name: "Маркетинг", slug: "marketing", order: 2 },
    { name: "Дизайн", slug: "design", order: 3 },
    { name: "Мобильная разработка", slug: "mobile", order: 4 },
  ];

  for (const cat of categories) {
    await prisma.portfolioCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

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

  // Add "often purchased together" relations
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
