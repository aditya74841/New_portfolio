"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

import { useAuth } from "../../Providers";
import type { Idea, IdeaStatus } from "../types";
import { ideaService } from "../services/ideaService";

const STATUS_OPTIONS: Array<{ value: IdeaStatus; label: string }> = [
  { value: "idea", label: "Idea" },
  { value: "researching", label: "Researching" },
  { value: "building", label: "Building" },
  { value: "shipped", label: "Shipped" },
  { value: "paused", label: "Paused" },
];

export default function IdeaDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { user, token, isLoading: isAuthLoading } = useAuth();

  const [idea, setIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<IdeaStatus>("idea");

  const [newUpdate, setNewUpdate] = useState("");
  const [newLinks, setNewLinks] = useState("");

  useEffect(() => {
    if (!isAuthLoading && !user) router.push("/login");
  }, [user, isAuthLoading, router]);

  const canUse = useMemo(() => !!user && user.role === "admin" && !!token, [user, token]);

  const fetchIdea = useCallback(async () => {
    if (!token || !id) return;
    try {
      setIsLoading(true);
      const data = await ideaService.getIdeaById(token, id);
      setIdea(data);
      setEditTitle(data.title);
      setEditDescription(data.description);
      setEditStatus(data.status);
    } catch (e) {
      console.error("Failed to fetch idea:", e);
      toast.error("Failed to fetch idea");
    } finally {
      setIsLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    if (!canUse) return;
    fetchIdea();
  }, [canUse, fetchIdea]);

  const handleSave = async () => {
    if (!token || !id) return;
    if (!editTitle.trim() || !editDescription.trim()) {
      toast.error("Title and description are required");
      return;
    }
    try {
      setIsSaving(true);
      const updated = await ideaService.updateIdea(token, id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        status: editStatus,
      });
      setIdea(updated);
      toast.success("Saved");
    } catch (e: unknown) {
      console.error("Failed to save:", e);
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddUpdate = async () => {
    if (!token || !id) return;
    if (!newUpdate.trim()) {
      toast.error("Update description is required");
      return;
    }
    const links = newLinks
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    try {
      setIsAdding(true);
      const updated = await ideaService.addUpdate(token, id, {
        description: newUpdate.trim(),
        links,
      });
      setIdea(updated);
      setNewUpdate("");
      setNewLinks("");
      toast.success("Update added");
    } catch (e) {
      console.error("Failed to add update:", e);
      toast.error("Failed to add update");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteUpdate = async (updateId: string) => {
    if (!token || !id) return;
    if (!confirm("Delete this update?")) return;

    try {
      const updated = await ideaService.deleteUpdate(token, id, updateId);
      setIdea(updated);
      toast.success("Update deleted");
    } catch (e) {
      console.error("Failed to delete update:", e);
      toast.error("Failed to delete update");
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/idea-planner")}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl font-semibold">{idea?.title || "Idea"}</h1>
                <p className="text-gray-400 text-sm">Edit details and add timeline updates.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/project-admin"
                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Admin
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors"
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-gray-400">Loading…</div>
        ) : !idea ? (
          <div className="text-gray-400">Idea not found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-lg font-semibold">Idea</h2>
              <div className="mt-4 space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex items-center justify-between gap-3">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as IdeaStatus)}
                    className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500"
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-500">
                    Updated {new Date(idea.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-lg font-semibold">Add timeline update</h2>
              <div className="mt-4 space-y-3">
                <textarea
                  value={newUpdate}
                  onChange={(e) => setNewUpdate(e.target.value)}
                  placeholder="What did you do / learn / decide?"
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  value={newLinks}
                  onChange={(e) => setNewLinks(e.target.value)}
                  placeholder="Links (one per line, optional)"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddUpdate}
                  disabled={isAdding}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors"
                >
                  Add update
                </button>
              </div>
            </section>

            <section className="lg:col-span-2 bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Timeline</h2>
                <span className="text-sm text-gray-400">{idea.updates?.length ?? 0}</span>
              </div>

              <div className="mt-4 space-y-3">
                {idea.updates?.length ? (
                  idea.updates.map((u) => (
                    <div
                      key={u._id}
                      className="p-4 rounded-xl bg-gray-950/40 border border-gray-800"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm text-gray-400">
                            {new Date(u.createdAt).toLocaleString()}
                          </div>
                          <div className="mt-2 whitespace-pre-wrap">{u.description}</div>
                          {!!u.links?.length && (
                            <div className="mt-3 space-y-1">
                              {u.links.map((l, idx) => (
                                <a
                                  key={`${u._id}-${idx}`}
                                  href={l}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block text-sm text-blue-400 hover:text-blue-300 truncate"
                                >
                                  {l}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteUpdate(u._id)}
                          className="p-2 rounded-lg hover:bg-red-900/30 text-red-400 hover:text-red-300 transition-colors"
                          aria-label="Delete update"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">No updates yet. Add your first update above.</div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

