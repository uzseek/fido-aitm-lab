const renderPage = require('./layout');

function mfaSetupPage(qrCodeImage, secret) {
  return renderPage(
    'MFA Setup',
    `
    <div class="container">

      <div class="row justify-content-center mt-5">

        <div class="col-md-6">

          <div class="card shadow">

            <div class="card-body p-4">

              <h2 class="text-center mb-3">
                Multi-Factor Authentication Setup
              </h2>

              <p class="text-center text-muted mb-4">
                Scan the QR code below with your
                authenticator application.
              </p>

              <div class="text-center mb-4">

                <img
                  src="${qrCodeImage}"
                  class="img-fluid"
                />

              </div>

              <div class="alert alert-secondary">

                <strong>Manual Setup Key</strong>

                <hr>

                <code>
                  ${secret}
                </code>

              </div>

              <div class="d-grid">

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

    </div>
    `
  );
}

module.exports = mfaSetupPage;
