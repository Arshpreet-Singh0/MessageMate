import express from "express";
import { getUsersByUserName, login, signup } from "../controllers/user.controller";
const router = express.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/user/:username').get(getUsersByUserName);

export default router;