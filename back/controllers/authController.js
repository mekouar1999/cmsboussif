const User = require('../models/User');

// @desc    Test de fonctionnement du backend
// @route   GET /api/test
exports.test = (req, res) => {
    res.json({
        message: 'Backend Express fonctionne correctement'
    });
};

// @desc    Inscription d'un utilisateur
// @route   POST /api/register
exports.register = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email et mot de passe obligatoires'
            });
        }

        email = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: 'Adresse email invalide'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Le mot de passe doit contenir au moins 8 caractères'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'Cette adresse email est déjà utilisée'
            });
        }

        // Le mot de passe sera automatiquement hashé par le hook pre('save') du modèle User
        const user = new User({
            email,
            password
        });

        await user.save();

        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                id: user._id,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Cette adresse email est déjà utilisée'
            });
        }

        console.error('Register error:', error.message);
        return res.status(500).json({
            message: 'Erreur interne du serveur'
        });
    }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email et mot de passe obligatoires'
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        return res.status(200).json({
            message: 'Connexion réussie !',
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({
            message: 'Erreur interne du serveur'
        });
    }
};
