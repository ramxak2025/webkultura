import type { Metadata } from "next";
import { ConfiguratorWizard } from "@/components/configurator/wizard";

export const metadata: Metadata = {
  title: "Конфигуратор услуг",
  description:
    "Подберите нужные digital-услуги, получите предварительную оценку стоимости и сроков.",
};

export default function ConfiguratorPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main max-w-4xl">
        <ConfiguratorWizard />
      </div>
    </div>
  );
}
