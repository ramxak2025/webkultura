import type { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CONTACT_INFO } from "@/lib/constants";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с Веб-Культура. Телефон, email, Telegram. Москва.",
};

const contactMethods = [
  { icon: Phone, label: "Телефон", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, gradient: "from-violet-500 to-purple-500" },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, gradient: "from-blue-500 to-cyan-500" },
  { icon: Send, label: "Telegram", value: CONTACT_INFO.telegram, href: `https://t.me/${CONTACT_INFO.telegram.replace("@", "")}`, gradient: "from-sky-500 to-blue-500" },
  { icon: MapPin, label: "Адрес", value: CONTACT_INFO.address, href: null, gradient: "from-pink-500 to-rose-500" },
];

export default function ContactsPage() {
  return (
    <div className="h-full md:overflow-auto p-4">
      <div className="panel p-6 mb-3">
        <h1 className="text-3xl font-bold text-gray-900">
          Свяжитесь <span className="gradient-text">с нами</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Готовы обсудить проект? Свяжитесь любым удобным способом.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 space-y-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/40 border border-white/50 hover:bg-white/70 hover:shadow-md transition-all duration-300">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${method.gradient} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {method.label}
                  </div>
                  <div className="text-gray-800 font-medium text-sm mt-0.5">
                    {method.value}
                  </div>
                </div>
              </div>
            );

            return (
              <Reveal key={method.label}>
                {method.href ? (
                  <a href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>

        <div className="lg:col-span-3">
          <Reveal>
            <div className="panel p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Напишите нам</h2>
              <ContactForm />
            </div>
          </Reveal>
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
