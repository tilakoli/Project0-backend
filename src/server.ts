import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '@/config/database';
import authRoutes from '@/routes/auth.routes';
import { errorHandler } from '@/middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/collections', async (req, res) => {
  try {
    if (!mongoose.connection.db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ 
      database: mongoose.connection.name,
      collections: collections.map(c => c.name) 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// Routes
app.use('/api/auth', authRoutes);

// Error handler (MUST be last)
app.use(errorHandler);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});