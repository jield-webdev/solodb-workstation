import { useAuth } from "../../auth/context/useAuth";

export default function Login() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-2">Session preview</h1>
              <p className="text-secondary">
                This demo uses a preloaded session to showcase how operators will enter the
                workstation.
              </p>

              {user ? (
                <div className="alert alert-success mb-0" role="alert">
                  Signed in as <span className="fw-semibold">{user.full_name}</span>. Jump back to the
                  dashboard to explore devices.
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="button" disabled>
                    Fetching session...
                  </button>
                  <div className="text-secondary small text-center">
                    Authentication is mocked for the demo.
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
