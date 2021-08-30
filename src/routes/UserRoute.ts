import { Router } from 'express';
import UserController from '@controllers/UserController';
import { createUserValidator, deleteUserValidator, getUserValidator } from '@middlewares/validators/UserValidator';

const router: Router = Router();

router
  .route('/users')
  .post(createUserValidator, UserController.addUser)
  .get(UserController.getUsers);

router
  .route('/users/:idUser')
  .get(getUserValidator, UserController.getUser)
  .delete(deleteUserValidator, UserController.deleteUser);

export const UserRoutes: Router = router;