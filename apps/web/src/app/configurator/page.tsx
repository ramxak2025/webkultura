import type { Metadata } from "next";
import { ConfiguratorWizard } from "@/components/configurator/wizard";

export const metadata: Metadata = {
  title: "Конфигуратор услуг",
  description:
    "Подберите нужные digital-услуги, получите предварительную оценку стоимости и сроков.",
};

export default function ConfiguratorPage() {
  return (
    <div className="h-full md:overflow-auto p-3">
      <div className="max-w-4xl mx-auto">
        <ConfiguratorWizard />
      </div>
    </div>
  );
}
