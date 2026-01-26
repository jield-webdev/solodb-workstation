import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { mockLogin } from "../../auth/helpers/login";

export default function Login() {
  const { user, isLoading } = useAuth();

  const login = () => {
    mockLogin().then(() => {
        window.location.reload();
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-2">Login</h1>
              <p className="text-secondary">
                Sign in to continue to the workstation.
              </p>

              {isLoading ? (
                <div className="alert alert-secondary mb-0" role="alert">
                  Checking session status...
                </div>
              ) : user ? (
                <div className="d-grid gap-2">
                  <div className="alert alert-success mb-0" role="alert">
                    You are already signed in as{" "}
                    <span className="fw-semibold">{user.full_name}</span>.
                  </div>
                  <Link className="btn btn-primary" to="/session">
                    Go to session
                  </Link>
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={login}
                  >
                    Mock Log In
                  </button>
                  <div className="text-secondary small text-center">
                    Authentication will be enabled in the full experience.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
