import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { getChats } from '../controllers/chat.controller';
const router = express.Router();

router.route('/chat/:receiver').get(isAuthenticated, getChats);

export default router;