import { UserRoutes } from '@routes/UserRoute';
import { EventRoutes } from '@routes/EventRoute';

const API = '/api';

export default (app) => {
  app.use(API, EventRoutes);
  app.use(API, UserRoutes);

  app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
    next(error);
  });
};