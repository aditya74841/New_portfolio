"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import JournalHeader from "./components/JournalHeader";
import JournalEditor from "./components/JournalEditor";
import JournalSearch from "./components/JournalSearch";
import JournalEntryList from "./components/JournalEntryList";
import { JournalEntry } from "./components/types";
import {
  fetchUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./api";

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [entryText, setEntryText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  // Fetch entries
  const getEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUpdates();
      setEntries(data || []);
    } catch (err) {
      toast.error("Failed to load journal");
      console.error("Error fetching entries:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryText.trim()) {
      toast.error("Please write something...");
      return;
    }

    try {
      setLoading(true);
      if (editId) {
        await updateUpdate(editId, { update: entryText });
        toast.success("Entry updated");
      } else {
        await createUpdate({ update: entryText });
        toast.success("Entry saved");
      }
      setEntryText("");
      setEditId(null);
      setShowEditor(false);
      getEntries();
    } catch (err) {
      toast.error("Failed to save entry");
      console.error("Error saving entry:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = useCallback((entry: JournalEntry) => {
    setEntryText(entry.update);
    setEditId(entry._id);
    setShowEditor(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEntryText("");
    setEditId(null);
    setShowEditor(false);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm("Delete this entry?")) return;
      try {
        setLoading(true);
        await deleteUpdate(id);
        toast.success("Entry deleted");
        getEntries();
      } catch (err) {
        toast.error("Failed to delete");
        console.error("Error deleting:", err);
      } finally {
        setLoading(false);
      }
    },
    [getEntries]
  );

  // Group entries by date
  const groupedEntries = useMemo(() => {
    const filtered = entries.filter((entry) =>
      entry.update.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by newest first
    const sorted = [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Group by date
    const groups: { [key: string]: JournalEntry[] } = {};
    sorted.forEach((entry) => {
      const dateKey = new Date(entry.createdAt).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
    });

    return groups;
  }, [entries, searchTerm]);

  useEffect(() => {
    getEntries();
  }, [getEntries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        theme="dark"
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <JournalHeader
          entryCount={entries.length}
          showEditor={showEditor}
          onToggleEditor={() => setShowEditor(!showEditor)}
        />

        {/* Editor */}
        {showEditor && (
          <JournalEditor
            entryText={entryText}
            onTextChange={setEntryText}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={!!editId}
            loading={loading}
          />
        )}

        {/* Search */}
        <JournalSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Entries List */}
        <JournalEntryList
          groupedEntries={groupedEntries}
          loading={loading}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default JournalPage;