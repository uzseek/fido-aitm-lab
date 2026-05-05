const express = require('express');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const webauthnRoutes = require('./routes/webauthn');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(authRoutes);
app.use(dashboardRoutes);
app.use(webauthnRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
