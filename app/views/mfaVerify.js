const renderPage = require('./layout');

function mfaVerifyPage() {
  return renderPage(
    'MFA Verification',
    `
    <div class="container">

      <div class="row justify-content-center mt-5">

        <div class="col-md-5">

          <div class="card shadow">

            <div class="card-body p-4">

              <h2 class="text-center mb-3">
                Security Verification
              </h2>

              <p class="text-center text-muted mb-4">
                Enter the 6-digit verification code
                from your authenticator app.
              </p>

              <form method="POST" action="/mfa/verify">

                <div class="mb-4">

                  <label class="form-label">
                    Verification Code
                  </label>

                  <input
                    name="token"
                    class="form-control form-control-lg text-center"
                    maxlength="6"
                    autocomplete="off"
                    placeholder="000000"
                  />

                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100 btn-lg"
                >
                  Verify Identity
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
    `
  );
}

module.exports = mfaVerifyPage;
