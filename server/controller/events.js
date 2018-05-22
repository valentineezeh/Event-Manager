import nodemailer from 'nodemailer';
import moment from 'moment';
import db from '../models';


const events = db.Events;
const centers = db.Centers;
const users = db.Users;

class EventController {
  static createEvent(req, res) {
    centers
      .findOne({
        where: {
          id: req.body.centerId,
        }
      }).then((center) => {
        if (!center) {
          return res.status(404).send({
            status: 'Error',
            message: 'Center is not found',
          });
        }
        return events
          .findOne({
            where: {
              date: new Date(req.body.date).toISOString(),
              centerId: req.body.centerId,
            }
          }).then((existingEvent) => {
            if (existingEvent) {
              return res.status(409).send({
                status: 'Error Conflit..',
                massage: 'This Center has already been booked for this date...'
              });
            }

            return events
            // .create(req.body, { fields: Object.keys(req.body) })
              .create({
                userId: req.decoded.userId,
                centerId: req.body.centerId,
                title: req.body.title,
                type: req.body.type,
                date: new Date(req.body.date).toISOString(),
                image: req.body.image,
                description: req.body.description,
              })
              .then(newevent => res.status(201).send({
                msg: 'Event has been successfully created...',
                newevent
              })).catch((error) => {
                return console.log(error.message);
                res.status(400).send(error);
              });
          }).catch((error) => {
            console.log(error.message);
            res.status(400).send(error);
          });
      }).catch(error => res.status(500).send(error.message));
  }


  // Get all events allocated to a User
  static getUserEvents(req, res) {
    events.findAll({
      where: {
        userId: req.decoded.userId
      },
    })
      .then(events => res.status(200).send(events))
      .catch(err => res.status(400).send(err));
  }

  // Get all events in the application
  static getAllEvents(req, res) {
    events
      .all()
      .then((events) => {
        res.status(200).send(events);
      })
      .catch(err => res.status(400).send(err));
  }

  // To update a event
  static updateEvent(req, res) {
    events.findOne({
      where: {
        id: req.params.eventId,
        userId: req.decoded.userId
      },
    }).then((event) => {
      if (!event) {
        return res.status(404).send({
          msg: ' event does not exist...'
        });
      }
      event
        .update(req.body, { fields: Object.keys(req.body) })
        .then(updatedEvent => res.status(200).send({
          updatedEvent
        })).catch(error => res.status(500).send(error.message));
    }).catch(error => res.status(500).send(error.message));
  }


  // delet a single event
  static deleteSingleEvent(req, res) {
    events
      .findOne({
        where: {
          userId: req.decoded.userId,
          id: req.params.eventId,
        }
      })
      .then((event) => {
        if (req.userId != event.userId) {
          return res.status(400).send({
            error: 'You do not have the privilege to delete this event'
          });
        }
        event
          .destroy()
          .then(res.status(200).send({
            message: `Event with id number ${event.id} has been deleted successfully`
          }))
          .catch(err => res.status(400).send(err));
      })
      .catch(() => res.status(404).send({
        message: 'Record not Found!'
      }));
  }
  // Get a single event
  static GetSingleEvent(req, res) {
    events
      .findById(req.params.eventId)
      .then((event) => {
        if (event) {
          res.status(200).send({ event });
        } else {
          res.status(404).send({
            message: 'Record not found!'
          });
        }
      })
      .catch((error) => {
        return console.log(error.message);
        res.status(404).send(error.message);
      });
  }
  // Admin cancel an event...
  static cancelEvent(req, res) {
    if (!req.decoded.admin) {
      res.status(400).send({
        msg: 'You do not have this priviledge...'
      });
    }
    events.update({
      venue: 'NOT AVAILABLE',
    }, {
      where: {
        id: req.params.eventId,
      }
    }).then((updatedEvent) => {
      if (updatedEvent == [0]) {
        res.status(500).send({
          status: 'Server Error',
          message: 'Cannot update event',
        });
      }
      events
        .findOne({
          where: { id: req.params.eventId },
          include: [
            {
              model: users,
            }
          ]
        }).then((event) => {
          console.log('FOUND');
          console.log(event.users.dataValues.email.toString());
          if (event) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
              },
              tls: {
                rejectUnauthorized: false
              }
            });


            const mailOption = {
              from: 'admin@eventsmanager.com',
              to: event.users.dataValues.email.toString(),
              subject: 'Notification on Cancellation of event',
              html: `<p> Your Event <b>
            ${event.title}</b>, holding on <b>
              ${moment(event.date).format('DD MMMM YYYY')} </b>
              has been \ cancelled on our platform. This is because \
              the center you choose will not  be available.</b></p><br>\
              <p> Contact Admin at <b>
                admin@eventsmanager.com</b><br>
                Sorry for the inconvenience </p>`
            };
            transporter.sendMail(mailOptions, (err, info) => {
              console.log('ERROR: ', err);
              console.log('ENVELOPE: ', info.envelope);
              console.log('MESSAGE ID:', info.messageId);
            });
          }
        }).catch((error) => {
          console.log(error.message);
          res.status(500).send(error.messageId);
        });
      res.status(200).send({
        status: 'Success',
        message: 'Event Updated',
        data: updatedEvent
      });
    }).catch((error) => {
      return console.log(error);
      res.status(500).send(error);
    });
  }
}


export default EventController;
