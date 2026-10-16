
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();
const FRONT_PATH = path.join(__dirname, '../front');

app.use(express.static(FRONT_PATH));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(FRONT_PATH, 'index.html'));
});

// Connexion MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

// Route de test
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend Express fonctionne correctement'
    });
});

// Route de connexion
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email et mot de passe obligatoires'
            });
        }

        // La vérification des identifiants sera ajoutée
        // avec le modèle User et les mots de passe hashés.

        return res.status(501).json({
            message: 'Route prête, authentification à implémenter'
        });

    } catch (error) {
        console.error('Login error:', error.message);

        res.status(500).json({
            message: 'Erreur interne du serveur'
        });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
