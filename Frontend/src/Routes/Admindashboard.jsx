import { useState, useRef, useEffect } from "react";
import './AdminDashboard.css'

const COLORS = {
  navy: "#1F3864", blue: "#2E75B6", lblue: "#D6E4F0",
  teal: "#0F6E56", green: "#3B6D11", amber: "#854F0B",
  coral: "#993C1D", red: "#A32D2D", purple: "#534AB7",
  gray: "#5F5E5A", lgray: "#F1EFE8",
};

const MOCK = {
  stats: { projects: 24, contacts: 138, unread: 7, views: 4821 },
  projects: [
    { id: 1, title: "Brand Identity System", category: "Graphic", tech: ["Illustrator", "Figma"], featured: true, published: true, date: "2025-03-12" },
    { id: 2, title: "Motion Reel 2025", category: "Video", tech: ["Premiere", "After Effects"], featured: true, published: true, date: "2025-02-28" },
    { id: 3, title: "The Quiet Architecture", category: "Book", tech: ["InDesign", "Notion"], featured: false, published: true, date: "2025-01-15" },
    { id: 4, title: "E-Commerce Redesign", category: "Portfolio", tech: ["React", "Figma", "Node.js"], featured: true, published: true, date: "2024-12-05" },
    { id: 5, title: "Type Specimen Poster", category: "Graphic", tech: ["Illustrator"], featured: false, published: false, date: "2024-11-20" },
    { id: 6, title: "Documentary Short: Flux", category: "Video", tech: ["DaVinci", "Premiere"], featured: false, published: true, date: "2024-10-08" },
  ],
  contacts: [
    { id: 1, name: "Priya Menon", email: "priya@designstudio.in", subject: "Brand collaboration enquiry", status: "unread", date: "2025-05-29", message: "Hi, I came across your portfolio and would love to discuss a potential brand identity project for our new venture." },
    { id: 2, name: "James Okafor", email: "j.okafor@agencyblue.com", subject: "Freelance video project", status: "unread", date: "2025-05-28", message: "We need a short motion piece for a product launch. Your motion reel is exactly the style we're after." },
    { id: 3, name: "Sofia Lindqvist", email: "sofia@publish.se", subject: "Book cover commission", status: "read", date: "2025-05-26", message: "We are a small Scandinavian publisher looking for a designer for an upcoming literary fiction cover." },
    { id: 4, name: "Arjun Patel", email: "arjun@techfirm.io", subject: "UI/UX consultation", status: "replied", date: "2025-05-22", message: "Looking for a design consultant to audit our SaaS product's UX. Budget is flexible for the right fit." },
    { id: 5, name: "Maria Castillo", email: "m.castillo@freelance.mx", subject: "Collaboration on portfolio piece", status: "read", date: "2025-05-18", message: "I admire your work and wondered if you'd be open to a creative exchange / collaborative piece." },
    { id: 6, name: "Chen Wei", email: "chen@creatives.cn", subject: "Exhibition catalogue design", status: "replied", date: "2025-05-10", message: "We are organising a group exhibition and need a designer for the printed catalogue and digital assets." },
  ],
  recentActivity: [
    { type: "contact", text: "New message from Priya Menon", time: "2h ago" },
    { type: "contact", text: "New message from James Okafor", time: "8h ago" },
    { type: "project", text: "Project published: Motion Reel 2025", time: "2d ago" },
    { type: "project", text: "Project updated: E-Commerce Redesign", time: "3d ago" },
    { type: "contact", text: "Replied to Arjun Patel", time: "8d ago" },
  ],
  monthlyViews: [210, 340, 280, 520, 390, 610, 480, 720, 530, 840, 670, 960],
};

const CATEGORIES = ["Portfolio", "Graphic", "Video", "Book"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function StatusBadge({ status }) {
  const map = {
    unread: { bg: "#FCEBEB", color: "#A32D2D", label: "Unread" },
    read:   { bg: "#F1EFE8", color: "#5F5E5A", label: "Read" },
    replied:{ bg: "#EAF3DE", color: "#3B6D11", label: "Replied" },
  };
  const s = map[status] || map.read;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 500,
      padding: "2px 8px", borderRadius: 4, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function CategoryBadge({ cat }) {
  const map = {
    Graphic:   { bg: "#E6F1FB", color: "#185FA5" },
    Video:     { bg: "#FAEEDA", color: "#854F0B" },
    Book:      { bg: "#EEEDFE", color: "#534AB7" },
    Portfolio: { bg: "#E1F5EE", color: "#0F6E56" },
  };
  const s = map[cat] || { bg: "#F1EFE8", color: "#5F5E5A" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 500,
      padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>
      {cat}
    </span>
  );
}

function MiniChart({ data }) {
  const max = Math.max(...data);
  const h = 48, w = 320, pad = 2;
  const barW = (w - pad * (data.length - 1)) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h, display: "block" }}>
      {data.map((v, i) => {
        const bh = Math.max(3, (v / max) * (h - 4));
        const x = i * (barW + pad);
        const isLast2 = i >= data.length - 2;
        return (
          <rect key={i} x={x} y={h - bh} width={barW} height={bh} rx={2}
            fill={isLast2 ? COLORS.blue : COLORS.lblue} />
        );
      })}
    </svg>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 10,
      padding: "1rem 1.1rem", flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ color: color || COLORS.blue, fontSize: 18 }}><i className={`ti ${icon}`} /></span>
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500, letterSpacing: "0.03em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1, color: "var(--color-text-primary)" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { title: "", category: "Portfolio", tech: "", featured: false, published: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 3 }}>Project title</label>
        <input value={form.title} onChange={e => set("title", e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", fontSize: 14, padding: "7px 10px",
            border: "0.5px solid var(--color-border-secondary)", borderRadius: 6,
            background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 3 }}>Category</label>
          <select value={form.category} onChange={e => set("category", e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", fontSize: 14, padding: "7px 10px",
              border: "0.5px solid var(--color-border-secondary)", borderRadius: 6,
              background: "var(--color-background-primary)", color: "var(--color-text-primary)" }}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 3 }}>Technologies (comma-separated)</label>
          <input value={form.tech} onChange={e => set("tech", e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", fontSize: 14, padding: "7px 10px",
              border: "0.5px solid var(--color-border-secondary)", borderRadius: 6,
              background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {[["featured","Featured"],["published","Published"]].map(([k,l]) => (
          <label key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", color: "var(--color-text-primary)" }}>
            <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} />
            {l}
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
        <button onClick={onCancel} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 6,
          border: "0.5px solid var(--color-border-secondary)", background: "transparent",
          cursor: "pointer", color: "var(--color-text-primary)" }}>Cancel</button>
        <button onClick={() => onSave(form)} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 6,
          border: "none", background: COLORS.blue, color: "#fff", cursor: "pointer", fontWeight: 500 }}>
          {initial ? "Save changes" : "Add project"}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [page, setPage] = useState("overview");
  const [stats, setStats] = useState(MOCK.stats);
  const [projects, setProjects] = useState(MOCK.projects);
  const [contacts, setContacts] = useState(MOCK.contacts);
  const [editProject, setEditProject] = useState(null);
  const [addingProject, setAddingProject] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactFilter, setContactFilter] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toastTimer = useRef(null);

  const showToast = (msg, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const API_URL = 'http://localhost:5000/api';

  const fetchWithAuth = async (path, opts = {}) => {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.message || 'Request failed');
    return body;
  };

  useEffect(() => {
    // Load admin dashboard data (stats, projects, contacts)
    let mounted = true;
    (async () => {
      try {
        const d = await fetchWithAuth('/admin/dashboard');
        const p = await fetchWithAuth('/admin/projects');
        const c = await fetchWithAuth('/admin/contacts');
        if (!mounted) return;
        if (d && d.stats) setStats(d.stats);
        if (Array.isArray(p)) setProjects(p);
        if (Array.isArray(c)) setContacts(c);
      } catch (err) {
        // If unauthenticated, show a toast (user should login)
        showToast(err.message || 'Could not load admin data', 'danger');
      }
    })();
    return () => { mounted = false; };
  }, []);

  const unreadCount = contacts.filter(c => c.status === "unread").length;

  const saveProject = (form) => {
    (async () => {
      const techArr = typeof form.tech === "string" ? form.tech.split(",").map(t => t.trim()).filter(Boolean) : form.tech;
      try {
        if (editProject) {
          // Update
          const updated = await fetchWithAuth(`/admin/projects/${editProject.id}`, { method: 'PUT', body: JSON.stringify({ ...form, tech: techArr }) });
          setProjects(ps => ps.map(p => p.id === editProject.id ? updated.project || { ...p, ...form, tech: techArr } : p));
          showToast('Project updated');
          setEditProject(null);
        } else {
          // Create
          const created = await fetchWithAuth('/admin/projects', { method: 'POST', body: JSON.stringify({ ...form, tech: techArr }) });
          setProjects(ps => [created.project || { ...form, tech: techArr, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...ps]);
          showToast('Project added');
          setAddingProject(false);
        }
      } catch (err) {
        showToast(err.message || 'Project save failed', 'danger');
      }
    })();
  };

  const deleteProject = (id) => {
    (async () => {
      try {
        await fetchWithAuth(`/admin/projects/${id}`, { method: 'DELETE' });
        setProjects(ps => ps.filter(p => p.id !== id));
        showToast('Project deleted', 'danger');
      } catch (err) {
        showToast(err.message || 'Delete failed', 'danger');
      }
    })();
  };

  const togglePublish = (id) => {
    (async () => {
      try {
        const proj = projects.find(p => p.id === id);
        if (!proj) return;
        const updated = await fetchWithAuth(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify({ ...proj, published: !proj.published }) });
        setProjects(ps => ps.map(p => p.id === id ? updated.project || { ...p, published: !p.published } : p));
        showToast('Project updated');
      } catch (err) {
        showToast(err.message || 'Update failed', 'danger');
      }
    })();
  };

  const markRead = (id) => {
    // Optimistic UI update + server call
    setContacts(cs => cs.map(c => c.id === id && c.status === "unread" ? { ...c, status: "read" } : c));
    (async () => {
      try { await fetchWithAuth(`/admin/contacts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'read' }) }); } catch (err) { showToast(err.message || 'Could not mark read', 'danger'); }
    })();
  };

  const markReplied = (id) => {
    setContacts(cs => cs.map(c => c.id === id ? { ...c, status: "replied" } : c));
    (async () => {
      try { await fetchWithAuth(`/admin/contacts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'replied' }) }); showToast('Marked as replied'); }
      catch (err) { showToast(err.message || 'Could not update', 'danger'); }
    })();
  };

  const deleteContact = (id) => {
    (async () => {
      try {
        await fetchWithAuth(`/admin/contacts/${id}`, { method: 'DELETE' });
        setContacts(cs => cs.filter(c => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
        showToast('Contact deleted', 'danger');
      } catch (err) {
        showToast(err.message || 'Delete failed', 'danger');
      }
    })();
  };

  const filteredContacts = contacts.filter(c => contactFilter === "all" || c.status === contactFilter);
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const navItems = [
    { id: "overview", icon: "ti-layout-dashboard", label: "Overview" },
    { id: "projects", icon: "ti-folder", label: "Projects", count: projects.length },
    { id: "contacts", icon: "ti-mail", label: "Contacts", count: unreadCount || null },
    { id: "settings", icon: "ti-settings", label: "Settings" },
  ];

  const SIDEBAR_W = sidebarOpen ? 200 : 52;

  return (
    <div style={{ display: "flex", minHeight: 640, fontFamily: "var(--font-sans)", position: "relative",
      background: "var(--color-background-primary)", borderRadius: 12,
      border: "0.5px solid var(--color-border-tertiary)", overflow: "hidden" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 100,
          background: toast.type === "danger" ? "#FCEBEB" : "#EAF3DE",
          color: toast.type === "danger" ? COLORS.red : COLORS.green,
          border: `0.5px solid ${toast.type === "danger" ? "#F09595" : "#97C459"}`,
          borderRadius: 7, padding: "8px 14px", fontSize: 13, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s" }}>
          <i className={`ti ${toast.type === "danger" ? "ti-alert-circle" : "ti-circle-check"}`} style={{ fontSize: 15 }} />
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <div style={{ width: SIDEBAR_W, minWidth: SIDEBAR_W, background: "var(--color-background-secondary)",
        borderRight: "0.5px solid var(--color-border-tertiary)", display: "flex", flexDirection: "column",
        transition: "width 0.2s, min-width 0.2s", overflow: "hidden" }}>

        {/* Logo row */}
        <div style={{ padding: "14px 12px", display: "flex", alignItems: "center",
          gap: 8, borderBottom: "0.5px solid var(--color-border-tertiary)", minHeight: 52 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: COLORS.blue,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <i className="ti ti-bolt" style={{ color: "#fff", fontSize: 16 }} aria-hidden="true" />
          </div>
          {sidebarOpen && (
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>
              Portfolio Admin
            </span>
          )}
          <button onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar"
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer",
              color: "var(--color-text-secondary)", padding: 2, display: "flex" }}>
            <i className={`ti ${sidebarOpen ? "ti-layout-sidebar-left-collapse" : "ti-layout-sidebar-left-expand"}`} style={{ fontSize: 17 }} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 6px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 9, width: "100%",
                padding: sidebarOpen ? "8px 10px" : "8px", borderRadius: 7, marginBottom: 2,
                background: page === item.id ? "var(--color-background-primary)" : "transparent",
                border: page === item.id ? "0.5px solid var(--color-border-tertiary)" : "0.5px solid transparent",
                cursor: "pointer", textAlign: "left", justifyContent: sidebarOpen ? "flex-start" : "center" }}
              title={!sidebarOpen ? item.label : undefined}>
              <i className={`ti ${item.icon}`} style={{
                fontSize: 17, flexShrink: 0,
                color: page === item.id ? COLORS.blue : "var(--color-text-secondary)" }} />
              {sidebarOpen && (
                <>
                  <span style={{ fontSize: 13, fontWeight: page === item.id ? 500 : 400,
                    color: page === item.id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    flex: 1 }}>
                    {item.label}
                  </span>
                  {item.count != null && (
                    <span style={{ fontSize: 11, fontWeight: 500, background: COLORS.blue,
                      color: "#fff", borderRadius: 10, padding: "1px 7px", minWidth: 18, textAlign: "center" }}>
                      {item.count}
                    </span>
                  )}
                </>
              )}
              {!sidebarOpen && item.count != null && (
                <span style={{ position: "absolute", top: 5, right: 5, fontSize: 9, fontWeight: 700,
                  background: COLORS.blue, color: "#fff", borderRadius: 10, padding: "1px 4px" }}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User row */}
        <div style={{ padding: "10px 10px", borderTop: "0.5px solid var(--color-border-tertiary)",
          display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.lblue,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: COLORS.blue }}>AD</span>
          </div>
          {sidebarOpen && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Admin</div>
              <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Super admin</div>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>

        {/* ── Overview ── */}
        {page === "overview" && (
          <div style={{ padding: "20px 22px" }}>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>Overview</h2>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 20px" }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <StatCard icon="ti-folder" label="TOTAL PROJECTS" value={stats.projects} sub={`${projects.filter(p => p.published).length} published`} color={COLORS.blue} />
              <StatCard icon="ti-mail" label="MESSAGES" value={stats.contacts} sub={`${stats.unread} unread`} color={COLORS.purple} />
              <StatCard icon="ti-eye" label="PORTFOLIO VIEWS" value={stats.views.toLocaleString()} sub="Last 12 months" color={COLORS.teal} />
              <StatCard icon="ti-star" label="FEATURED" value={projects.filter(p => p.featured).length} sub="projects" color={COLORS.amber} />
            </div>

            {/* Chart + Activity */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {/* Views chart */}
              <div style={{ flex: 2, minWidth: 220, background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>Portfolio views</div>
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 12 }}>Monthly — 2025</div>
                <MiniChart data={MOCK.monthlyViews} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  {MONTHS.map(m => <span key={m} style={{ fontSize: 9, color: "var(--color-text-secondary)" }}>{m}</span>)}
                </div>
              </div>

              {/* Activity */}
              <div style={{ flex: 1, minWidth: 180, background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 12 }}>Recent activity</div>
                {MOCK.recentActivity.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8,
                    paddingBottom: 10, marginBottom: i < MOCK.recentActivity.length - 1 ? 10 : 0,
                    borderBottom: i < MOCK.recentActivity.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                    <span style={{ color: a.type === "contact" ? COLORS.purple : COLORS.blue, fontSize: 15, marginTop: 1 }}>
                      <i className={`ti ${a.type === "contact" ? "ti-mail" : "ti-folder"}`} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "var(--color-text-primary)", lineHeight: 1.4 }}>{a.text}</div>
                      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unread contacts */}
            {unreadCount > 0 && (
              <div style={{ marginTop: 16, background: "#E6F1FB", border: "0.5px solid #B5D4F4",
                borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <i className="ti ti-mail" style={{ color: COLORS.blue, fontSize: 16 }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#185FA5" }}>
                      {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
                    </span>
                  </div>
                  <button onClick={() => setPage("contacts")} style={{ fontSize: 12, color: COLORS.blue,
                    background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    View all <i className="ti ti-arrow-right" style={{ fontSize: 13 }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Projects ── */}
        {page === "projects" && (
          <div style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>Projects</h2>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "2px 0 0" }}>{projects.length} total</p>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <i className="ti ti-search" style={{ position: "absolute", left: 9, top: "50%",
                  transform: "translateY(-50%)", fontSize: 14, color: "var(--color-text-secondary)" }} />
                <input placeholder="Search projects…" value={projectSearch} onChange={e => setProjectSearch(e.target.value)}
                  style={{ paddingLeft: 30, width: "100%", boxSizing: "border-box", fontSize: 13,
                    border: "0.5px solid var(--color-border-secondary)", borderRadius: 7,
                    background: "var(--color-background-secondary)", color: "var(--color-text-primary)", padding: "7px 10px 7px 30px" }} />
              </div>
              <button onClick={() => { setAddingProject(true); setEditProject(null); }}
                style={{ fontSize: 13, padding: "7px 14px", borderRadius: 7, border: "none",
                  background: COLORS.blue, color: "#fff", cursor: "pointer", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", flexShrink: 0 }}>
                <i className="ti ti-plus" style={{ fontSize: 15 }} /> Add project
              </button>
            </div>

            {addingProject && (
              <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-secondary)",
                borderRadius: 10, padding: "16px", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 12 }}>New project</div>
                <ProjectForm onSave={saveProject} onCancel={() => setAddingProject(false)} />
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 0,
              border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, overflow: "hidden" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 100px 70px 70px 80px",
                background: "var(--color-background-secondary)", padding: "8px 14px",
                borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                {["Title","Category","Technologies","Featured","Published","Actions"].map(h => (
                  <span key={h} style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)",
                    letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</span>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div style={{ padding: "24px", textAlign: "center", color: "var(--color-text-secondary)", fontSize: 13 }}>
                  No projects found.
                </div>
              )}

              {filteredProjects.map((p, i) => (
                <div key={p.id}>
                  {editProject?.id === p.id ? (
                    <div style={{ padding: "14px", background: "var(--color-background-secondary)" }}>
                      <ProjectForm initial={{ ...editProject, tech: editProject.tech.join(", ") }}
                        onSave={saveProject} onCancel={() => setEditProject(null)} />
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 100px 70px 70px 80px",
                      padding: "10px 14px", alignItems: "center",
                      background: i % 2 === 0 ? "var(--color-background-primary)" : "var(--color-background-secondary)",
                      borderBottom: i < filteredProjects.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{p.title}</div>
                        <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{p.date}</div>
                      </div>
                      <div><CategoryBadge cat={p.category} /></div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {p.tech.slice(0, 2).map(t => (
                          <span key={t} style={{ fontSize: 10, background: "var(--color-background-secondary)",
                            border: "0.5px solid var(--color-border-tertiary)", borderRadius: 4,
                            padding: "1px 5px", color: "var(--color-text-secondary)" }}>{t}</span>
                        ))}
                        {p.tech.length > 2 && <span style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>+{p.tech.length - 2}</span>}
                      </div>
                      <div>
                        {p.featured
                          ? <i className="ti ti-star-filled" style={{ color: "#EF9F27", fontSize: 16 }} aria-label="Featured" />
                          : <i className="ti ti-star" style={{ color: "var(--color-text-secondary)", fontSize: 16 }} aria-label="Not featured" />}
                      </div>
                      <div>
                        <button onClick={() => togglePublish(p.id)} title={p.published ? "Unpublish" : "Publish"}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                          {p.published
                            ? <i className="ti ti-circle-check" style={{ color: COLORS.teal, fontSize: 17 }} />
                            : <i className="ti ti-circle-dashed" style={{ color: "var(--color-text-secondary)", fontSize: 17 }} />}
                        </button>
                      </div>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button onClick={() => { setEditProject(p); setAddingProject(false); }}
                          title="Edit" style={{ background: "none", border: "none", cursor: "pointer",
                            color: COLORS.blue, padding: 3 }}>
                          <i className="ti ti-edit" style={{ fontSize: 16 }} />
                        </button>
                        <button onClick={() => deleteProject(p.id)} title="Delete"
                          style={{ background: "none", border: "none", cursor: "pointer",
                            color: COLORS.red, padding: 3 }}>
                          <i className="ti ti-trash" style={{ fontSize: 16 }} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Contacts ── */}
        {page === "contacts" && (
          <div style={{ padding: "20px 22px" }}>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>Contacts</h2>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 14px" }}>
              {contacts.length} total · {unreadCount} unread
            </p>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
              {[["all","All"],["unread","Unread"],["read","Read"],["replied","Replied"]].map(([v,l]) => (
                <button key={v} onClick={() => setContactFilter(v)}
                  style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, cursor: "pointer",
                    fontWeight: contactFilter === v ? 500 : 400,
                    background: contactFilter === v ? COLORS.blue : "transparent",
                    color: contactFilter === v ? "#fff" : "var(--color-text-secondary)",
                    border: `0.5px solid ${contactFilter === v ? COLORS.blue : "var(--color-border-secondary)"}` }}>
                  {l}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14 }}>
              {/* Contact list */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0,
                border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, overflow: "hidden" }}>
                {filteredContacts.length === 0 && (
                  <div style={{ padding: "24px", textAlign: "center", color: "var(--color-text-secondary)", fontSize: 13 }}>
                    No contacts in this category.
                  </div>
                )}
                {filteredContacts.map((c, i) => (
                  <div key={c.id} onClick={() => { setSelectedContact(c); markRead(c.id); }}
                    style={{ padding: "11px 14px", cursor: "pointer",
                      background: selectedContact?.id === c.id
                        ? "var(--color-background-info)"
                        : i % 2 === 0 ? "var(--color-background-primary)" : "var(--color-background-secondary)",
                      borderBottom: i < filteredContacts.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                      borderLeft: c.status === "unread" ? `3px solid ${COLORS.blue}` : "3px solid transparent" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                          background: COLORS.lblue, display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: 11, fontWeight: 500, color: COLORS.blue }}>
                          {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: c.status === "unread" ? 500 : 400,
                            color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {c.name}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", whiteSpace: "nowrap",
                            overflow: "hidden", textOverflow: "ellipsis" }}>
                            {c.subject}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>{c.date}</span>
                        <StatusBadge status={c.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact detail */}
              {selectedContact && (
                <div style={{ width: 260, flexShrink: 0, background: "var(--color-background-primary)",
                  border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "16px",
                  display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.lblue,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 500, color: COLORS.blue }}>
                        {selectedContact.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{selectedContact.name}</div>
                        <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{selectedContact.email}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedContact(null)} aria-label="Close"
                      style={{ background: "none", border: "none", cursor: "pointer",
                        color: "var(--color-text-secondary)", padding: 2 }}>
                      <i className="ti ti-x" style={{ fontSize: 16 }} />
                    </button>
                  </div>

                  <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 10 }}>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 4 }}>Subject</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{selectedContact.subject}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 4 }}>Message</div>
                    <div style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.55,
                      background: "var(--color-background-secondary)", borderRadius: 7, padding: "10px" }}>
                      {selectedContact.message}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button onClick={() => markReplied(selectedContact.id)}
                      style={{ fontSize: 12, padding: "7px 12px", borderRadius: 7, fontWeight: 500,
                        border: "none", background: COLORS.blue, color: "#fff", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                      <i className="ti ti-send" style={{ fontSize: 14 }} /> Mark as replied
                    </button>
                    <button onClick={() => deleteContact(selectedContact.id)}
                      style={{ fontSize: 12, padding: "7px 12px", borderRadius: 7,
                        border: "0.5px solid #F09595", background: "#FCEBEB",
                        color: COLORS.red, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                      <i className="ti ti-trash" style={{ fontSize: 14 }} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Settings ── */}
        {page === "settings" && (
          <div style={{ padding: "20px 22px" }}>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 20px", color: "var(--color-text-primary)" }}>Settings</h2>

            {[
              {
                title: "Admin credentials",
                icon: "ti-lock",
                fields: [
                  { label: "Username", type: "text", placeholder: "admin" },
                  { label: "Current password", type: "password", placeholder: "••••••••" },
                  { label: "New password", type: "password", placeholder: "••••••••" },
                  { label: "Confirm password", type: "password", placeholder: "••••••••" },
                ],
                action: "Update password"
              },
              {
                title: "Email notifications",
                icon: "ti-mail",
                fields: [
                  { label: "Admin email (receives contact alerts)", type: "email", placeholder: "you@example.com" },
                  { label: "SMTP host", type: "text", placeholder: "smtp.gmail.com" },
                  { label: "SMTP port", type: "text", placeholder: "587" },
                  { label: "SMTP username", type: "text", placeholder: "smtp-user@example.com" },
                ],
                action: "Save email config",
                extra: (
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13,
                    color: "var(--color-text-primary)", cursor: "pointer", marginTop: 8 }}>
                    <input type="checkbox" defaultChecked />
                    Enable auto-reply to submitters
                  </label>
                )
              },
              {
                title: "Site settings",
                icon: "ti-settings",
                fields: [
                  { label: "Site title", type: "text", placeholder: "My Portfolio" },
                  { label: "Portfolio URL", type: "url", placeholder: "https://yourportfolio.com" },
                ],
                action: "Save settings",
                extra: (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    {[["Enable rate limiting (100 req/15min)", true], ["Maintenance mode", false]].map(([l, d]) => (
                      <label key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13,
                        color: "var(--color-text-primary)", cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked={d} />
                        {l}
                      </label>
                    ))}
                  </div>
                )
              }
            ].map(section => (
              <div key={section.title} style={{ background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10,
                padding: "16px", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <i className={`ti ${section.icon}`} style={{ fontSize: 17, color: COLORS.blue }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{section.title}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  {section.fields.map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 3 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        style={{ width: "100%", boxSizing: "border-box", fontSize: 13,
                          padding: "7px 10px", border: "0.5px solid var(--color-border-secondary)",
                          borderRadius: 6, background: "var(--color-background-secondary)",
                          color: "var(--color-text-primary)" }} />
                    </div>
                  ))}
                </div>
                {section.extra}
                <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => showToast(`${section.title} saved`)}
                    style={{ fontSize: 13, padding: "7px 16px", borderRadius: 7, border: "none",
                      background: COLORS.blue, color: "#fff", cursor: "pointer", fontWeight: 500 }}>
                    {section.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}