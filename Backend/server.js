import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, service: 'Bartender API' }));

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend on http://localhost:${PORT}`));



