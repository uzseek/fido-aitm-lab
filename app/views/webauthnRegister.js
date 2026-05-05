const renderPage = require('./layout');

function webauthnRegisterPage() {
  return renderPage(
    'Passkey Registration',
    `
    <div class="container mt-5">

      <div class="row justify-content-center">

        <div class="col-md-6">

          <div class="card shadow">

            <div class="card-body p-4">

              <h2 class="mb-3 text-center">
                Register Passkey
              </h2>

              <p class="text-muted text-center mb-4">
                Secure your account with FIDO/WebAuthn.
              </p>

              <button
                id="registerButton"
                class="btn btn-primary w-100"
              >
                Register Passkey
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
        document.getElementById('registerButton');
    
      const status =
        document.getElementById('status');
    
      button.addEventListener('click', async () => {
    
        try {
    
          status.innerText =
            'Creating registration challenge...';
    
          const resp = await fetch(
            '/webauthn/register/options',
            {
              method: 'POST',
            }
          );
    
          const options =
            await resp.json();
	  console.log(options);
    
          const registrationResponse =
            await SimpleWebAuthnBrowser.startRegistration(
              options
            );
    
          status.innerText =
            'Verifying passkey registration...';
    
          const verificationResp =
            await fetch(
              '/webauthn/register/verify',
              {
                method: 'POST',
    
                headers: {
                  'Content-Type': 'application/json',
                },
    
                body: JSON.stringify(
                  registrationResponse
                ),
              }
            );
    
          const verificationJSON =
            await verificationResp.json();
    
          if (verificationJSON.verified) {
    
            status.innerText =
              'Passkey registration completed.';
    
          } else {
    
            status.innerText =
              'Passkey verification failed.';
          }
    
        } catch (err) {
    
          console.error(err);
    
          status.innerText =
            'Registration failed.';
        }
      });
    
    </script>

    `
  );
}

module.exports = webauthnRegisterPage;
