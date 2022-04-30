const express = require('express');
const tourController = require('../controllers/tourController');

const app = express();

const tourRouter = express.Router();

// ----- Middleware runs when specific param is in the url. (Param middleware)

// tourRouter.param('id', tourController.checkID);

// create a checkbody middleware
// check if body contains the name and price property.
// if not send back 400 (Bad request)
// Add it to post handler stack

app.use('/api/v1/tours', tourRouter);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addTour);
// .post(tourController.checkBody, tourController.addTour);
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
