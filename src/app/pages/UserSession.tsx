import logout from "../../auth/helpers/logout";
import { useAuth } from "../../auth/hooks/useAuth";

export default function UserSession() {
  const { user, isLoading } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-2">User session</h1>

              {isLoading ? (
                <div className="alert alert-secondary mb-0" role="alert">
                  Loading your session...
                </div>
              ) : (
                user && (
                  <>
                    <div className="alert alert-success mb-0" role="alert">
                      Signed in as{" "}
                      <span className="fw-semibold">{user.full_name}</span>
                    </div>
                    <button
                      onClick={() => logout()}
                      className="btn btn-primary"
                    >
                      Logout
                    </button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
