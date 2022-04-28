const express = require('express');
const userController = require('../controllers/userController');

const app = express();

const userRouter = express.Router();
app.use('/api/v1/tours', userRouter);

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
