const express = require('express');
const user = require('../controllers/user-controller')
const router = express.Router();

// GET paths
router.get('/profile', user.getProfile);

// POST Paths
router.post('/verify-google-token', user.googleLogin);
router.post('/check-users-email', user.checkUsersEmail);
router.post('/generate-validation-code', user.generateValidationCode);
router.post('/submit-validation-code', user.submitValidationCode);
router.post('/set-new-password', user.setNewPassword);
router.post('/update-account', user.updateAccount);
router.post('/login', user.login);
router.post('/logout', user.logout);

// UPDATE (patch) Paths


module.exports = router;