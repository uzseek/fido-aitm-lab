const express = require('express');

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

app.listen(4000, () => {

  console.log(
    'Attacker app started on port 4000'
  );
});
