const renderPage = require('./layout');

function dashboardPage(username) {
  return renderPage(
    'Account Dashboard',
    `
    <nav class="navbar navbar-dark bg-primary">

      <div class="container-fluid">

        <span class="navbar-brand">
          Shinano Securities
        </span>

        <span class="text-white">
          ${username}
        </span>

      </div>

    </nav>

    <div class="container mt-4">

      <div class="row">

        <div class="col-md-4">

          <div class="card shadow-sm mb-4">

            <div class="card-body">

              <h6 class="text-muted">
                Total Assets
              </h6>

              <h3>
                ¥12,480,000
              </h3>

            </div>

          </div>

        </div>

        <div class="col-md-4">

          <div class="card shadow-sm mb-4">

            <div class="card-body">

              <h6 class="text-muted">
                Available Cash
              </h6>

              <h3>
                ¥1,240,000
              </h3>

            </div>

          </div>

        </div>

        <div class="col-md-4">

          <div class="card shadow-sm mb-4">

            <div class="card-body">

              <h6 class="text-muted">
                Last Login
              </h6>

              <h3>
                Today
              </h3>

            </div>

          </div>

        </div>

      </div>

      <div class="card shadow-sm">

        <div class="card-body">

          <h5 class="mb-3">
            Portfolio Overview
          </h5>

          <table class="table">

            <thead>
              <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>NVDA</td>
                <td>120</td>
                <td>¥3,200,000</td>
              </tr>

              <tr>
                <td>MSFT</td>
                <td>80</td>
                <td>¥2,100,000</td>
              </tr>

              <tr>
                <td>7203.T</td>
                <td>300</td>
                <td>¥900,000</td>
              </tr>

            </tbody>

          </table>

          <a
            href="/webauthn/register"
            class="btn btn-primary me-2"
          >
            Register Passkey
          </a>

          <a
            href="/logout"
            class="btn btn-outline-danger"
          >
            Logout
          </a>

        </div>

      </div>

    </div>
    `
  );
}

module.exports = dashboardPage;
