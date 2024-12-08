import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { acceptFriendRequest, getChats, getFriendRequest } from '../controllers/chat.controller';
const router = express.Router();

router.route('/chat/:receiver').get(isAuthenticated, getChats);

router.route('/accept-request/:sender').post(isAuthenticated, acceptFriendRequest);

router.route('/friend-request').get(isAuthenticated, getFriendRequest);

export default router;