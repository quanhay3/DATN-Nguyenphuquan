
import express from 'express';
import { clearToken, refresh, signIn, signUp } from '../controllers/auth.js';
import { responseSender } from '../middleware/configResponse.js';
const router = express.Router();

router.post('/login', signIn, responseSender);
router.post('/signup', signUp, responseSender);
router.get('/token', refresh, responseSender);
router.delete('/token', clearToken, responseSender);

export default router;
