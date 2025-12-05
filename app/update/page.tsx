"use client"
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  FileText,
  Search,
  Calendar,
} from "lucide-react";
import {
  fetchUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateType {
  _id: string;
  update: string;
  createdAt: string;
  updatedAt: string;
}

interface FormType {
  update: string;
}

const UpdatePage: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateType[]>([]);
  const [form, setForm] = useState<FormType>({
    update: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Fetch updates
  const getUpdates = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await fetchUpdates();
      console.log("Fetched updates:", data);
      setUpdates(data || []);
    } catch (err) {
      toast.error("Failed to fetch updates");
      console.error("Error fetching updates:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (!form.update.trim()) {
        toast.error("Update text is required");
        return;
      }
      try {
        setLoading(true);
        if (editId) {
          await updateUpdate(editId, form);
          toast.success("Update modified successfully");
        } else {
          await createUpdate(form);
          toast.success("Update created successfully");
        }
        setForm({ update: "" });
        setEditId(null);
        getUpdates();
      } catch (err) {
        toast.error(editId ? "Failed to update" : "Failed to create update");
        console.error("Error saving update:", err);
      } finally {
        setLoading(false);
      }
    },
    [editId, form, getUpdates]
  );

  const handleEdit = useCallback((update: UpdateType): void => {
    setForm({
      update: update.update,
    });
    setEditId(update._id);
  }, []);

  const handleCancel = useCallback((): void => {
    setForm({ update: "" });
    setEditId(null);
  }, []);

  const handleDelete = useCallback(
    async (id: string, text: string): Promise<void> => {
      if (!window.confirm(`Are you sure you want to delete this update?`))
        return;
      try {
        setLoading(true);
        await deleteUpdate(id);
        toast.success("Update deleted successfully");
        getUpdates();
      } catch (err) {
        toast.error("Failed to delete update");
        console.error("Error deleting update:", err);
      } finally {
        setLoading(false);
      }
    },
    [getUpdates]
  );

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter and sort updates
  const filteredAndSortedUpdates = useMemo((): UpdateType[] => {
    return updates
      .filter((update) => {
        const matchesSearch = update.update
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          default:
            return 0;
        }
      });
  }, [updates, searchTerm, sortBy]);

  useEffect(() => {
    getUpdates();
  }, [getUpdates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-10 h-10 text-blue-700 drop-shadow" />
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Update Management
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Create, edit, and manage your updates
          </p>
        </div>

        <div className="space-y-8">
          {/* Form Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                {editId ? "Edit Update" : "Create New Update"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Update <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="update"
                    placeholder="Enter your update..."
                    value={form.update}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-base bg-gray-50 text-black resize-none"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : editId ? "Update" : "Create"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Updates List Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              {/* Search and Sort */}
              <div className="p-6 border-b border-gray-100 space-y-4 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search updates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-base bg-gray-50 text-black"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-base bg-gray-50 text-black"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Updates List */}
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="px-8 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-500 text-lg">
                        Loading updates...
                      </span>
                    </div>
                  </div>
                ) : filteredAndSortedUpdates.length === 0 ? (
                  <div className="px-8 py-12 text-center text-gray-400 text-lg">
                    {searchTerm
                      ? "No updates found matching your search."
                      : "No updates found. Create your first update!"}
                  </div>
                ) : (
                  filteredAndSortedUpdates.map((update) => (
                    <div
                      key={update._id}
                      className="p-8 hover:bg-blue-50/60 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap break-words">
                            {update.update}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(update.createdAt)}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(update)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-transparent hover:border-blue-300"
                            title="Edit update"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(update._id, update.update)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-transparent hover:border-red-300"
                            title="Delete update"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Stats Footer */}
              {!loading && filteredAndSortedUpdates.length > 0 && (
                <div className="px-8 py-4 border-t border-gray-100 bg-blue-50 rounded-b-2xl">
                  <p className="text-base text-blue-700 font-medium">
                    Showing {filteredAndSortedUpdates.length} of{" "}
                    {updates.length} updates
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;