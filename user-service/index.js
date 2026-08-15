const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: "Bienvenue sur le User Service - Lab DevOps !", status: "running" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});