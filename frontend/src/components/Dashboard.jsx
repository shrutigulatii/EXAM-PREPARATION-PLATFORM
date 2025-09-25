import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicCard from "../components/TopicCard";
import axios from "axios";
import '../App.css';

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const userName = localStorage.getItem("name");
    setName(userName || "User");
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/topics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopics(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching topics");
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {name}!</h2>
        <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
      </header>

      <div className="topic-grid">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} refresh={fetchTopics} />
          ))
        ) : (
          <p className="no-topics">No topics found. Add some!</p>
        )}
      </div>
    </div>
  );
}
