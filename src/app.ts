import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route utama
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend Todo Praktikum Berjalan Mulus!' });
});

// Route API
app.use('/api', apiRoutes);

export default app;
