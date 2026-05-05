const renderPage = require('./layout');

function loginFailedPage() {
  return renderPage(
    'Login Failed',
    `
    <div class="container">

      <div class="row justify-content-center mt-5">

        <div class="col-md-5">

          <div class="card shadow">

            <div class="card-body p-4 text-center">

              <div class="alert alert-danger">
                Invalid username or password.
              </div>

              <h3 class="mb-3">
                Authentication Failed
              </h3>

              <p class="text-muted mb-4">
                Please verify your login credentials
                and try again.
              </p>

              <a
                href="/login"
                class="btn btn-primary"
              >
                Return to Login
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
    `
  );
}

module.exports = loginFailedPage;
