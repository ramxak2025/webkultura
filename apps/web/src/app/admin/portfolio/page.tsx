"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@webkultura/ui";

interface Project {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category: { name: string };
  createdAt: string;
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/portfolio/admin/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  async function togglePublish(id: string, published: boolean) {
    const token = localStorage.getItem("admin_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/portfolio/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !published }),
      }
    );
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !published } : p))
    );
  }

  async function deleteProject(id: string) {
    if (!confirm("Удалить проект?")) return;
    const token = localStorage.getItem("admin_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/portfolio/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) return <div className="text-neutral-500">Загрузка...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Портфолио</h1>
        <Button size="sm">
          <Plus size={16} className="mr-1" /> Добавить проект
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-neutral-500">Нет проектов</p>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-4 font-medium text-neutral-600">Название</th>
                <th className="text-left p-4 font-medium text-neutral-600">Категория</th>
                <th className="text-left p-4 font-medium text-neutral-600">Статус</th>
                <th className="text-left p-4 font-medium text-neutral-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-medium text-neutral-900">{project.title}</td>
                  <td className="p-4 text-neutral-500">{project.category?.name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${project.published ? "text-green-600" : "text-neutral-400"}`}>
                      {project.published ? <><Eye size={12} /> Опубликован</> : <><EyeOff size={12} /> Черновик</>}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(project.id, project.published)}
                        className="p-1.5 text-neutral-400 hover:text-brand-600 transition-colors"
                        title={project.published ? "Снять с публикации" : "Опубликовать"}
                      >
                        {project.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button className="p-1.5 text-neutral-400 hover:text-brand-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
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
        </div>
      )}
    </div>
  );
}
