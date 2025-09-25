import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login / Register</h2>
      <AuthForm />
    </div>
  );
}
