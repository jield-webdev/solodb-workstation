import { useAuth } from "../../auth/context/useAuth";

export default function Login() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      { user && <span>You are loged in with {user.full_name}</span>}
    </div>
  );
}
