function renderPage(title, body) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${title}</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    >
  </head>

  <body class="bg-light">

    ${body}

  </body>
  </html>
  `;
}

module.exports = renderPage;
