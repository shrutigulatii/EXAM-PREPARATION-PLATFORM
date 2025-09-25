// import AuthForm from "../components/AuthForm";

// export default function LoginPage() {
//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Login / Register</h2>
//       <AuthForm />
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../App.css';
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        form
      );

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name); // store name
        navigate("/dashboard");
      } else {
        alert("User registered successfully. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p>
        {isLogin ? "New user?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>

      {/* Dashboard link for testing */}
      {isLogin && (
        <p>
          Or view <Link to="/dashboard">Dashboard</Link> (for testing)
        </p>
      )}
    </div>
  );
}
