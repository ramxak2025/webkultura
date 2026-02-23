import type { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CONTACT_INFO } from "@/lib/constants";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Веб-Культура. Телефон, email, Telegram. Офис в Москве.",
};

const contactMethods = [
  {
    icon: Phone,
    label: "Телефон",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Send,
    label: "Telegram",
    value: CONTACT_INFO.telegram,
    href: `https://t.me/${CONTACT_INFO.telegram.replace("@", "")}`,
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: CONTACT_INFO.address,
    href: null,
  },
];

export default function ContactsPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Контакты
            </h1>
            <p className="text-lg text-neutral-500">
              Готовы обсудить проект или у вас есть вопросы? Свяжитесь с нами
              любым удобным способом.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact methods */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const Wrapper = method.href ? "a" : "div";
              return (
                <Reveal key={method.label}>
                  <Wrapper
                    {...(method.href ? { href: method.href } : {})}
                    className="flex items-start gap-4 p-5 rounded-xl border border-neutral-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                        {method.label}
                      </div>
                      <div className="text-neutral-900 font-medium mt-0.5">
                        {method.value}
                      </div>
                    </div>
                  </Wrapper>
                </Reveal>
              );
            })}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="p-8 rounded-2xl border border-neutral-200 bg-white">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Напишите нам
                </h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Веб-Культура",
            telephone: CONTACT_INFO.phone,
            email: CONTACT_INFO.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              addressCountry: "RU",
            },
          }),
        }}
      />
    </div>
  );
}
