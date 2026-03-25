// test.js
const express = require('express');
const http = require('http');

const app = express();
app.get('/', (req, res) => res.send('Hello from Express App'));

const server = app.listen(5000, () => {
  console.log('Server started, running smoke test...');

  http.get('http://localhost:5000/', (res) => {
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('Smoke test passed ✅');
      server.close();       // <-- stop the server
      process.exit(0);      // <-- exit cleanly
    } else {
      server.close();
      process.exit(1);      // <-- exit with failure
    }
  }).on('error', (err) => {
    console.error('Request failed:', err.message);
    server.close();
    process.exit(1);
  });
});