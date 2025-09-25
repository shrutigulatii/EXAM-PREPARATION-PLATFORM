import axios from "axios";
import './TopicCard.css';

export default function TopicCard({ topic, refresh }) {
  const token = localStorage.getItem("token");

  const deleteTopic = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/topics/${topic.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refresh();
    } catch (err) {
      alert("Error deleting topic");
    }
  };

  return (
    <div className="topic-card">
      <div className="topic-details">
        <h3>{topic.title}</h3>
        <p>{topic.notes}</p>
      </div>
      <button className="delete-button" onClick={deleteTopic}>Delete</button>
    </div>
  );
}
