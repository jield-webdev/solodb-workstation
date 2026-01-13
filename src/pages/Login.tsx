import { useAuth } from "../app/auth/useAuth";

export default function Login() {
  const { user } = useAuth(null);

  return (
    <div>
      <h1>Login</h1>
      { user && <span>You are loged in with {user.full_name}</span>}
    </div>
  );
}
