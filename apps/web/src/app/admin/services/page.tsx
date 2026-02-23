"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button, formatPriceRange } from "@webkultura/ui";

interface Service {
  id: string;
  title: string;
  slug: string;
  priceFrom: number | null;
  priceTo: number | null;
  published: boolean;
  children?: Service[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/services/admin/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Удалить услугу?")) return;
    const token = localStorage.getItem("admin_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/services/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchServices();
  }

  if (loading) return <div className="text-neutral-500">Загрузка...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Услуги</h1>
        <Button size="sm">
          <Plus size={16} className="mr-1" /> Добавить услугу
        </Button>
      </div>

      {services.length === 0 ? (
        <p className="text-neutral-500">Нет услуг</p>
      ) : (
        <div className="space-y-6">
          {services.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-neutral-50 border-b border-neutral-200">
                <h2 className="font-semibold text-neutral-900">{category.title}</h2>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-neutral-400 hover:text-brand-600 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>

              {category.children && category.children.length > 0 && (
                <table className="w-full text-sm">
                  <tbody>
                    {category.children.map((svc) => (
                      <tr key={svc.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                        <td className="p-4 font-medium text-neutral-900">{svc.title}</td>
                        <td className="p-4 text-neutral-500">
                          {formatPriceRange(svc.priceFrom, svc.priceTo)}
                        </td>
                        <td className="p-4">
                          <span className={`text-xs font-medium ${svc.published ? "text-green-600" : "text-neutral-400"}`}>
                            {svc.published ? "Активна" : "Скрыта"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-neutral-400 hover:text-brand-600 transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteService(svc.id)}
                              className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
