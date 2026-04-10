import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import UserList from "../../components/login/UserList";

export default function Login() {
  const { user, isLoading } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-2">Login</h1>
              <p className="text-secondary">
                Pick a user to sign in to continue to the workstation.
              </p>

              {isLoading ? (
                <div className="alert alert-secondary mb-0" role="alert">
                  Checking session status...
                </div>
              ) : user ? (
                <Navigate to="/session" replace />
              ) : (
                <UserList />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
