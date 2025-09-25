import { useState, useEffect } from "react";
import axios from "axios";
import TopicCard from "./TopicCard";
import './Dashboard.css'; // Import CSS for dashboard

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/topics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTopics(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load topics");
    }
  };

  const addTopic = async () => {
    if (!newTopic) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/topics`,
        { title: newTopic, notes: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTopic("");
      fetchTopics();
    } catch (err) {
      alert("Error adding topic");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="add-topic">
        <input
          type="text"
          placeholder="New topic title"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button onClick={addTopic}>Add Topic</button>
      </div>

      <div className="topics-list">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} refresh={fetchTopics} />
        ))}
      </div>
    </div>
  );
}
