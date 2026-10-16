const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const FRONT_PATH = path.join(__dirname, '../front');

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(FRONT_PATH));

// Routes API
app.use('/api', authRoutes);

// Page d'accueil Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(FRONT_PATH, 'index.html'));
});

// Démarrage du serveur
const PORT = process.env.PORT || 4001;

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
