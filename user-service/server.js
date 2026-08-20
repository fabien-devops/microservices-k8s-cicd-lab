const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// In-memory mock database for testing and demonstration
let users = [
  { id: 1, name: 'Fabien', role: 'DevOps Engineer', status: 'Active' },
  { id: 2, name: 'Alex', role: 'SRE Specialist', status: 'Active' }
];

// -----------------------------------------------------------------------------
// KUBERNETES PROBES (Health Checks)
// -----------------------------------------------------------------------------

// Liveness Probe: Verifies if the Node.js process is alive
app.get('/health/liveness', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Readiness Probe: Verifies if the service is ready to handle incoming traffic
app.get('/health/readiness', (req, res) => {
  res.status(200).json({ status: 'READY', service: 'user-service' });
});

// Fallback /health endpoint for backward compatibility
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'user-service' });
});

// -----------------------------------------------------------------------------
// BUSINESS ROUTES (CRUD Users)
// -----------------------------------------------------------------------------

// GET: Retrieve all users
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET: Retrieve a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: user });
});

// POST: Create a new user
app.post('/api/users', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, message: 'Name and role are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role,
    status: 'Active'
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// DELETE: Remove a user by ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ success: true, message: `User ${id} deleted successfully` });
});

// Catch-all route handler for 404 responses
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// -----------------------------------------------------------------------------
// SERVER START & GRACEFUL SHUTDOWN (Kubernetes Best Practices)
// -----------------------------------------------------------------------------
const server = app.listen(PORT, () => {
  console.log(`[USER-SERVICE] Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('[USER-SERVICE] SIGTERM signal received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('[USER-SERVICE] HTTP server closed gracefully.');
    process.exit(0);
  });
});

module.exports = app;