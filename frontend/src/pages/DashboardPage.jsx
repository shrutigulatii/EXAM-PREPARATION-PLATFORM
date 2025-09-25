import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicCard from "../components/TopicCard";
import '../App.css';

export default function DashboardPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const topics = [
    { id: 1, title: "Math", description: "Learn Math concepts" },
    { id: 2, title: "Science", description: "Learn Science" },
    { id: 3, title: "History", description: "Learn History" },
    { id: 4, title: "Geography", description: "Learn Geography" },
  ];

  useEffect(() => {
    const userName = localStorage.getItem("name");
    setName(userName || "User");
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h2>Welcome, {name}!</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </header>

      <div className="topic-grid">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
