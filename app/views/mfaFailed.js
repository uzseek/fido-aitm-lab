const renderPage = require('./layout');

function mfaFailedPage() {
  return renderPage(
    'Verification Failed',
    `
    <div class="container">

      <div class="row justify-content-center mt-5">

        <div class="col-md-5">

          <div class="card shadow">

            <div class="card-body p-4 text-center">

              <div class="alert alert-danger">

                Invalid verification code.

              </div>

              <h3 class="mb-3">
                Verification Failed
              </h3>

              <p class="text-muted mb-4">

                The provided authentication code
                could not be verified.

              </p>

              <a
                href="/mfa/verify"
                class="btn btn-primary"
              >
                Try Again
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
    `
  );
}

module.exports = mfaFailedPage;
