import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint de verificación inicial
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Servidor SnailPay activo' });
});

app.listen(PORT, () => {
  console.log(`Servidor SnailPay corriendo en http://localhost:${PORT}`);
});