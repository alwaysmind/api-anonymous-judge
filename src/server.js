const http = require('http');

const app = require('./app')

const PORT = process.env.PORT || 2004;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
  });
}

startServer();
