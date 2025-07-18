const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

exports.register = async (req, res) => {
  console.log(req.body);
  try {
    const { code, username, email, phone, password } = req.body;

    const existingUser = await User.findOne({where: {username}});
    console.log(existingUser);

    if (!username || !password) {
      return res.status(400).json({ error: "Le nom d'utilisateur et mot de passe" });
    }

    if(existingUser) {
      console.log("Yess");
      return res.status(404).json({message: "L'utilisateur n'existe pas"});
    }

    const newUser = await User.create({ code, username, email, phone, password });
    
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        "code": newUser.code,
        "username": newUser.username,
        "email": newUser.email,
        "phone": newUser.phone
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Impossible de créé l'utilisateur",
      error: err
    });
  }
}

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    //console.log({ "user": user.password });
    //console.log({ "valid pass": await user.validPassword(password) });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Génère un token JWT avec l'ID de l'utilisateur
    const token = jwt.sign(
      { code: user.code, username: user.username }, // Payload du token
      process.env.JWT_SECRET, // Clé secrète pour signer le token
      { expiresIn: '15d' } // Durée de validité du token
    );

    res.cookie("token", token, {
      maxAge: 15 * 24 * 3600,
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });

    res.status(200).json({ message: 'Connexion réussie', user, token });
  } catch (err) {
    res.status(500).json({ message: "Une erreur s'est produite pendant la connexion", error: err.message });
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });

    res.status(200).json({ message: 'Déconnexion...' });
  } catch (err) {
    res.status(500).json({ message: "Une erreur s'est produite pendant la connexion", error: err.message });
  }
}
