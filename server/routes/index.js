import express from 'express';

import UserController from '../controller/user';
import EventController from '../controller/events';
import CenterController from '../controller/centers';

/* Middleware and Validations */
import Auth from '../middleware/auth';
import userValidation from '../middleware/user.auth';
import eventValidation from '../middleware/event.auth';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Test-Users' });
});

/* All API Routes */

// Register a new User
router.post('/users/signup', userValidation.signUp, UserController.signUp);

// Login route
router.post('/users/signin', UserController.signIn);

// LogOut Route
router.get('/users/logout', UserController.logOut);

// Get all users route
router.get('/users', Auth.verify, UserController.getAllUser);

// create a new event as a user not an admin
router.post('/users/events', Auth.verify, eventValidation.eventValidator, EventController.createEvent);

// create a center by admin
router.post('/users/centers', Auth.verify, CenterController.createCenter);

// Get user all events allocated to a user
router.get('/users/events', Auth.verify, eventValidation.eventValidator, EventController.getUserEvents);

// Get all events in the application
router.get('/users/all/events', Auth.verify, eventValidation.eventValidator, EventController.getAllEvents);

// Retrieve a single event
router.get('/users/events/:eventId', Auth.verify, eventValidation.eventValidator, EventController.GetSingleEvent);

router.get('/users/centers/:centerId', Auth.verify, CenterController.singleCenterDetails);

router.get('/users/centers/', Auth.verify, CenterController.getCenterDetails);

// To Update an Event
router.put('/users/events/:eventId', Auth.verify, eventValidation.eventValidator, EventController.updateEvent);

router.put('/users/events/:eventId/cancel', Auth.verify, EventController.cancelEvent);

router.put('/users/centers/:centerId', Auth.verify, CenterController.updateCenterDetails);

// To delete an event
router.delete('/users/events/:eventId', Auth.verify, EventController.deleteSingleEvent);

// catch all invalid routes
router.get('*', (req, res) => res.status(404).json({
  message: 'Invalid Route'
}));

router.post('*', (req, res) => res.status(404).json({
  message: 'Invalid Route'
}));

export default router;
