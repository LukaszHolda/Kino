const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({ message: 'Użytkownik o podanym adresie email już istnieje' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik o podanym adresie email nie istnieje' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Użytkownik nie istnieje' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: 'Nieprawidłowy adres email lub hasło' });
  }

  try {
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: 'Zalogowano pomyślnie' });
    } else {
      res.status(400).json({ message: 'Nieprawidłowy adres email lub hasło' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;