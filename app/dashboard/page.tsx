"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Issue = {
  id: string;
  title: string;
  description: string;
  type: string;
  priority?: string;
  status?: string;
};

function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("NO_TOKEN");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}

export default function DashboardPage() {
  const router = useRouter();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);

  // Create Issue
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Cloud Security");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");

  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    fetchIssues();
  }, []);

  async function fetchIssues() {
    setLoading(true);
    try {
      const res = await authFetch("/api/issues");
      const data = await res.json();
      setIssues(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function createIssue(e: React.FormEvent) {
    e.preventDefault();
    await authFetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({ title, description, type, priority, status }),
    });
    setTitle("");
    setDescription("");
    setStatus("Open");
    fetchIssues();
  }

  async function updateStatus(id: string, status: string) {
    await authFetch(`/api/issues/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    fetchIssues();
  }

  async function deleteIssue(id: string) {
    if (!confirm("Delete this issue?")) return;
    await authFetch(`/api/issues/${id}`, { method: "DELETE" });
    fetchIssues();
  }

  const filteredIssues = issues.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? i.type === filterType : true)
  );

  const stats = {
    total: issues.length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:block">
        <h1 className="text-xl font-semibold mb-8">ApniSec</h1>
        <nav className="space-y-3 text-sm">
          <p className="text-blue-400">📊 Dashboard</p>
          <Link href="/profile" className="text-gray-400 hover:text-white">
            👤 Profile
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 space-y-8">
        <h2 className="text-2xl font-semibold">Welcome back 👋</h2>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard label="📦 Total Issues" value={stats.total} />
          <StatCard label="🟡 In Progress" value={stats.inProgress} />
          <StatCard label="🟢 Resolved" value={stats.resolved} />
        </div>

        {/* FILTERS */}
        <div className="flex gap-4">
          <input
            placeholder="🔍 Search by title"
            className="px-4 py-2 rounded bg-black border border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded bg-black border border-white/10 text-white"
          >
            <option value="">All Types</option>
            <option className="bg-white text-black">Cloud Security</option>
            <option className="bg-white text-black">Redteam Assessment</option>
            <option className="bg-white text-black">VAPT</option>
          </select>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CREATE ISSUE */}
          <form
            onSubmit={createIssue}
            className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
          >
            <h3 className="font-semibold">➕ Create Issue</h3>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black border border-white/10 text-white"
            >
              <option className="bg-white text-black">Cloud Security</option>
              <option className="bg-white text-black">Redteam Assessment</option>
              <option className="bg-white text-black">VAPT</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black border border-white/10 text-white"
            >
              <option className="bg-white text-black">Low</option>
              <option className="bg-white text-black">Medium</option>
              <option className="bg-white text-black">High</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black border border-white/10 text-white"
            >
              <option className="bg-white text-black">Open</option>
              <option className="bg-white text-black">In Progress</option>
              <option className="bg-white text-black">Resolved</option>
            </select>

            <input
              className="w-full px-3 py-2 rounded bg-black border border-white/10"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="w-full px-3 py-2 rounded bg-black border border-white/10"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700">
              🚀 Create Issue
            </button>
          </form>

          {/* ISSUE LIST */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl">
            <div className="p-4 border-b border-white/10 font-semibold">
              📋 My Issues
            </div>

            {filteredIssues.map((i) => (
              <div
                key={i.id}
                className="p-4 border-b border-white/10 hover:bg-white/5"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{i.title}</p>
                    <p className="text-xs text-gray-400">{i.description}</p>
                  </div>
                  <button
                    onClick={() => deleteIssue(i.id)}
                    className="text-red-400 text-xs"
                  >
                    🗑
                  </button>
                </div>

                <div className="flex gap-3 mt-3 text-xs items-center">
                  <span className="px-2 py-1 rounded bg-blue-600/20 text-blue-400">
                    🛡 {i.type}
                  </span>

                  {i.priority && (
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                      ⚠ {i.priority}
                    </span>
                  )}

                  <select
                    value={i.status}
                    onChange={(e) => updateStatus(i.id, e.target.value)}
                    className="px-2 py-1 rounded bg-black border border-white/10 text-white"
                  >
                    <option className="bg-white text-black">Open</option>
                    <option className="bg-white text-black">
                      In Progress
                    </option>
                    <option className="bg-white text-black">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
