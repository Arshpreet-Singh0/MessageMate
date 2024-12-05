import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { acceptFriendRequest, getChats } from '../controllers/chat.controller';
const router = express.Router();

router.route('/chat/:receiver').get(isAuthenticated, getChats);

router.route('/accept-request/:sender').post(isAuthenticated, acceptFriendRequest);

export default router;