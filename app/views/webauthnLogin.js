const renderPage = require('./layout');

function webauthnLoginPage() {

  return renderPage(
    'Passkey Login',

    `
    <div class="container mt-5">

      <div class="row justify-content-center">

        <div class="col-md-6">

          <div class="card shadow">

            <div class="card-body p-4">

              <h2 class="text-center mb-3">
                Passkey Login
              </h2>

              <p class="text-muted text-center mb-4">
                Authenticate using your registered passkey.
              </p>

              <button
                id="loginButton"
                class="btn btn-dark w-100"
              >
                Login with Passkey
              </button>

              <div
                id="status"
                class="mt-4 text-center text-muted"
              ></div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/@simplewebauthn/browser/dist/bundle/index.umd.min.js"></script>

    <script>

      const button =
        document.getElementById('loginButton');

      const status =
        document.getElementById('status');

      button.addEventListener('click', async () => {

        try {

          status.innerText =
            'Creating authentication challenge...';

          const resp = await fetch(
            '/webauthn/login/options',
            {
              method: 'POST',
            }
          );

          const options =
            await resp.json();

          console.log(options);

          const authenticationResponse =
            await SimpleWebAuthnBrowser.startAuthentication(
              options
            );

          status.innerText =
            'Verifying authentication...';

          const verificationResp =
            await fetch(
              '/webauthn/login/verify',
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',
                },

                body: JSON.stringify(
                  authenticationResponse
                ),
              }
            );

          const verificationJSON =
            await verificationResp.json();

          if (verificationJSON.verified) {

            window.location =
              '/dashboard';

          } else {

            status.innerText =
              'Authentication failed.';
          }

        } catch (err) {

          console.error(err);

          status.innerText =
            'Login failed.';
        }
      });

    </script>
    `
  );
}

module.exports =
  webauthnLoginPage;
