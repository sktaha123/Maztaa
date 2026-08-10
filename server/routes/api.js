import express from 'express';
import { getWelcomeMessage } from '../controllers/apiController.js';

const router = express.Router();

router.get('/welcome', getWelcomeMessage);

export default router;
