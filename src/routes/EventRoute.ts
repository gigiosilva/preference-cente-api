import { Router } from 'express';
import EventController from '@controllers/EventController';
import { createEventValidator } from '@middlewares/validators/EventValidator';

const router: Router = Router();

router
  .route('/events')
  .post(createEventValidator, EventController.addEvent);

export const EventRoutes: Router = router;