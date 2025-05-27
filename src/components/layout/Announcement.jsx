import { useEffect, useState } from "react";
import "./Announcement.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("/data/announcements.json")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Failed to load announcements:", err));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="announcement-wrapper">
      {announcements.map((ann) => (
        <div key={ann.id} className={`announcement ${ann.type}`}>
          <strong>{ann.title}</strong>
          <p>{ann.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
