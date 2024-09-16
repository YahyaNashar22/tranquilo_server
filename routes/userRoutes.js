import express from "express";
import { deleteUser, editUser, login, logout, signup, getOneUserById } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.get('/one/:id', getOneUserById)

userRouter.get('/logout', logout);

userRouter.put('/edit/:id', editUser);

userRouter.delete('/delete/:id', deleteUser);

export default userRouter;