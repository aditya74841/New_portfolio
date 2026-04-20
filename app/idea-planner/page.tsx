"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus, RefreshCw } from "lucide-react";

import { useAuth } from "../Providers";
import type { Idea, IdeaStatus } from "./types";
import { ideaService } from "./services/ideaService";

const STATUS_OPTIONS: Array<{ value: IdeaStatus; label: string }> = [
  { value: "idea", label: "Idea" },
  { value: "researching", label: "Researching" },
  { value: "building", label: "Building" },
  { value: "shipped", label: "Shipped" },
  { value: "paused", label: "Paused" },
];

export default function IdeaPlannerPage() {
  const router = useRouter();
  const { user, token, isLoading: isAuthLoading } = useAuth();

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IdeaStatus>("idea");

  useEffect(() => {
    if (!isAuthLoading && !user) router.push("/login");
  }, [user, isAuthLoading, router]);

  const canUse = useMemo(() => !!user && user.role === "admin" && !!token, [user, token]);

  const fetchIdeas = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const list = await ideaService.listIdeas(token);
      setIdeas(list);
    } catch (e) {
      console.error("Failed to fetch ideas:", e);
      toast.error("Failed to fetch ideas");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!canUse) return;
    fetchIdeas();
  }, [canUse, fetchIdeas]);

  const handleCreate = async () => {
    if (!token) return;
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setIsSaving(true);
      const created = await ideaService.createIdea(token, {
        title: title.trim(),
        description: description.trim(),
        status,
      });
      toast.success("Idea created");
      setTitle("");
      setDescription("");
      setStatus("idea");
      setIdeas((prev) => [created, ...prev]);
    } catch (e: unknown) {
      console.error("Failed to create idea:", e);
      toast.error(e instanceof Error ? e.message : "Failed to create idea");
    } finally {
      setIsSaving(false);
    }
  };

  if (isAuthLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="text-gray-400 mt-2">Idea Planner is admin-only.</p>
          <Link
            href="/"
            className="inline-flex mt-4 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Idea Planner
              </h1>
              <p className="text-gray-400 text-sm mt-1">Capture ideas, track progress, keep research notes.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/project-admin"
                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                ← Back to Admin
              </Link>
              <button
                onClick={fetchIdeas}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
              >
                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-lg font-semibold">New idea</h2>
            <div className="mt-4 space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={5}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex items-center justify-between gap-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as IdeaStatus)}
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500"
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleCreate}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg font-medium transition-colors"
                >
                  <Plus size={18} />
                  Create
                </button>
              </div>
            </div>
          </section>

          <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your ideas</h2>
              <span className="text-sm text-gray-400">{ideas.length}</span>
            </div>

            <div className="mt-4">
              {isLoading ? (
                <div className="text-gray-400">Loading…</div>
              ) : ideas.length === 0 ? (
                <div className="text-gray-400">No ideas yet. Create your first one.</div>
              ) : (
                <div className="space-y-3">
                  {ideas.map((idea) => (
                    <Link
                      key={idea._id}
                      href={`/idea-planner/${idea._id}`}
                      className="block p-4 rounded-xl bg-gray-950/40 border border-gray-800 hover:border-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold">{idea.title}</div>
                          <div className="text-sm text-gray-400 line-clamp-2 mt-1">{idea.description}</div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-200">
                          {idea.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-3">
                        Updates: {idea.updates?.length ?? 0} • Last updated{" "}
                        {new Date(idea.updatedAt).toLocaleString()}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

