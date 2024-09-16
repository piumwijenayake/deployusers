const express = require('express');
const { addUser, getAllUsers } = require('../controllers/useController');

const router = express.Router();

router.post('/users', addUser);
router.get('/users', getAllUsers);

module.exports = router;
