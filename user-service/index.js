const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({
    app: "User Service",
    version: "v2.0.0",
    message: "Déploiement GitOps automatisé réussi !",
    podName: os.hostname(),
    nodeEnv: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});