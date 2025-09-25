// import { useState } from "react";
// import axios from "axios";
// import '../App.css'; // Ensure CSS is imported

// export default function AuthForm() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [isLogin, setIsLogin] = useState(true);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isLogin ? "/auth/login" : "/auth/register";

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}${endpoint}`,
//         form
//       );
//       if (isLogin) {
//         localStorage.setItem("token", res.data.token);
//         window.location.href = "/dashboard";
//       } else {
//         alert("User registered successfully. Please login.");
//         setIsLogin(true);
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>{isLogin ? "Login" : "Register"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">{isLogin ? "Login" : "Register"}</button>
//       </form>
//       <p>
//         {isLogin ? "New user?" : "Already have an account?"}{" "}
//         <button onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? "Register here" : "Login here"}
//         </button>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import '../App.css'; // Ensure CSS is imported

export default function AuthForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

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
        // Login: store token and redirect
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        // Register: show alert and switch to login
        alert("User registered successfully. Please login.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" }); // reset form
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
    </div>
  );
}
