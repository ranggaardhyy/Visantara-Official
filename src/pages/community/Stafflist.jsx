import React, { useState, useEffect } from "react";

export default function StaffList() {
  const [staffsData, setStaffsData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("All");
  const [loading, setLoading] = useState(true);

  // Load data dari public/staff.json
  useEffect(() => {
    fetch("/data/staff.json")
      .then((res) => res.json())
      .then((data) => {
        setStaffsData(data);
        setLoading(false);
      })
      .catch(() => {
        setStaffsData([]);
        setLoading(false);
      });
  }, []);

  // Ambil role unik untuk filter group
  const groups = ["All", ...Array.from(new Set(staffsData.map((s) => s.role)))];

  // Filter data
  const filteredStaffs = staffsData.filter((staff) => {
    const matchesGroup = filterGroup === "All" || staff.role === filterGroup;
    const matchesSearch = staff.name.toLowerCase().includes(search.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Mapping warna role
  const roleColors = {
    Owner: "#0000FF", // Biru
    Admin: "#C71585", // Pink Keunguan
    Developer: "#6A5ACD", // Ungu Kebiruan
    Moderator: "#87CEEB", // Biru Muda
    Helper: "#7FFF00", // Hijau Stabilo
  };

  return (
    <>
      <style>{`
        :root {
          --navbar-height: 60px;
          --sidebar-width: 260px;
          --spacing: 16px;
          --bg-dark: #1b1b1b;
          --bg-sidebar: #2c2c2c;
          --bg-card:rgb(20, 20, 20);
          --text-light: #eee;
          --text-muted: #aaa;
          --accent-color: #3ea6ff;
          --btn-hover: #3399ff;
        }

        * {
          box-sizing: border-box;
        }

        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          background: var(--bg-dark);
          color: var(--text-light);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .app-container {
          display: flex;
          margin-top: var(--navbar-height);
          min-height: calc(100vh - var(--navbar-height));
        }

        /* Sidebar desktop */
        .sidebar {
          width: var(--sidebar-width);
          background: var(--bg-sidebar);
          padding: var(--spacing);
          position: sticky;
          top: var(--navbar-height);
          height: calc(100vh - var(--navbar-height));
          overflow-y: auto;
          flex-shrink: 0;
          border-right: 1px solid #444;
        }

        .search-input {
          width: 100%;
          padding: 10px 14px;
          margin-bottom: 16px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          background: #222;
          color: var(--text-light);
          outline: none;
          transition: background-color 0.3s;
        }
        .search-input::placeholder {
          color: var(--text-muted);
        }
        .search-input:focus {
          background: #333;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .filter-btn {
          background: transparent;
          border: 2px solid var(--accent-color);
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          color: var(--accent-color);
          transition: all 0.3s ease;
          text-align: center;
        }

        .filter-btn:hover {
          background: var(--btn-hover);
          border-color: var(--btn-hover);
          color: white;
        }

        .filter-btn.active {
          background: var(--accent-color);
          color: white;
          border-color: var(--accent-color);
        }

        .content {
          flex: 1;
          padding: var(--spacing);
          overflow-y: auto;
        }

        .staff-list {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
          gap: var(--spacing);
        }

        .staff-card {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 0 8px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.3s;
        }
        .staff-card:hover {
          box-shadow: 0 0 14px var(--accent-color);
        }

        .avatar {
          width: 96px;
          height: 96px;
          margin-bottom: 14px;
          background: #111;
        }

        .staff-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .staff-role, .staff-username {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 2px 0;
        }

        .no-results {
          font-style: italic;
          color: var(--text-muted);
          padding: var(--spacing);
          text-align: center;
          font-size: 1.1rem;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
            margin-top: var(--navbar-height);
          }

          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
            border-right: none;
            border-bottom: 1px solid #444;
            padding-bottom: var(--spacing);
            margin-bottom: var(--spacing);
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .filter-group {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
          }

          .filter-btn {
            flex: 1 1 30%;
            min-width: 80px;
          }

          .content {
            padding: var(--spacing);
          }

          .staff-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="app-container" role="main">
        <aside className="sidebar" aria-label="Filter staff groups and search">
          <input
            type="search"
            className="search-input"
            placeholder="Search staff..."
            aria-label="Search staff"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-group" role="list" aria-label="Filter by group">
            {groups.map((group) => (
              <button
                key={group}
                className={`filter-btn ${filterGroup === group ? "active" : ""}`}
                onClick={() => setFilterGroup(group)}
                role="listitem"
                aria-pressed={filterGroup === group}
              >
                {group}
              </button>
            ))}
          </div>
        </aside>

        <main className="content">
          {loading ? (
            <p className="no-results">Loading staff...</p>
          ) : filteredStaffs.length === 0 ? (
            <p className="no-results">No staff found.</p>
          ) : (
            <div className="staff-list">
              {filteredStaffs.map((staff) => (
                <article className="staff-card" key={staff.id}>
                  <img
                    className="avatar"
                    src={`https://minepic.org/avatar/128/${staff.username}`}
                    alt={`Avatar of ${staff.name}`}
                    loading="lazy"
                    width={96}
                    height={96}
                  />
                  <h3 className="staff-name">{staff.name}</h3>
                  <p
                    className="staff-role"
                    style={{ color: roleColors[staff.role] || "#aaa" }}
                  >
                    {staff.role}
                  </p>
                  <p className="staff-username">@{staff.username}</p>
                  {staff.premium}
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}