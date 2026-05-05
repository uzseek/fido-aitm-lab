const renderPage = require('./layout');

function loginPage() {
  return renderPage(
    'Shinano Securities Login',
    `
    <div class="container">

      <div class="row justify-content-center mt-5">

        <div class="col-md-5">

          <div class="card shadow">

            <div class="card-body p-4">

              <h2 class="text-center mb-4">
                Shinano Securities
              </h2>

              <p class="text-center text-muted">
                Secure Account Login
              </p>

              <form method="POST" action="/login">

                <div class="mb-3">
                  <label class="form-label">
                    Username
                  </label>

                  <input
                    name="username"
                    class="form-control"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    class="form-control"
                  />
                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

              <hr>

              <div class="d-grid">
              
                <a
                  href="/webauthn/login"
                  class="btn btn-outline-dark"
                >
                  Login with Passkey
                </a>
              
              </div>

              <div class="text-center">
                <a href="/mfa/setup">
                  Setup MFA
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    `
  );
}

module.exports = loginPage;
