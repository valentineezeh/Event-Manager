import db from '../models';

const centers = db.Centers;
const events = db.Events;

class CenterController {
  static createCenter (req, res) {
    if (!req.decoded.admin) {
      res.status(400).json({
        success: false,
        message: 'Only an admin can access this page.'
      });
    } else {
      return centers
        .create({
          userId: req.decoded.userId,
          name: req.body.name,
          description: req.body.description,
          capacity: req.body.capacity,
          price: req.body.price,
          location: req.body.location,
          state: req.body.state,
          image: req.body.image
        })
        .then(center => res.status(201).send( {
          message: 'Center has been created successfully',
          center
        } ))
        .catch( error => {
          return console.log(error.message)
          res.status(400).send( error )})
      }
  
  };
  
  // this function handles retrieving a single center
  static singleCenterDetails (req, res) {
    centers
    .findById(req.params.centerId, {
      include: [{
        model: events,
        as: 'events',
      }],
    }).then((center) => {
      if (!center) {
        return res.status(404).send({
          message: 'centers not found'
        });
      }
      return res.status(200).send(center);
    }).catch((err) => {
      // console.log(error)
      res.status(400).send(err);
    });
  }
  
  // This function handle get all center details
  static getCenterDetails (req, res) {
    centers
    .findAll({
      include: [{
        model: events,
        as: 'events',
      }],
    })
    .then(center => res.status(200).send(center))
    .catch(err => res.status(400).send(err));
  }
  
  // This function handles the update of a center by an Admin
  static updateCenterDetails (req, res) {
    if (!req.decoded.admin) {
      return res.status(400).send({
        message: 'Only an Admin can update/modify a center'
      });
    }
    return centers
      .findById(req.params.centerId, {
        include: [
          {
            model: events,
            as: 'events',
          }
        ],
      }).then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center does not exist',
          });
        }
        return center
          .update(req.body, { fields: Object.keys(req.body)})
          .then(updatedCenter => res.status(200).send(updatedCenter))
          .catch((error) => {
            res.status(400).send(error);
          });
      }).catch((error) => { res.status(400).send(error); });
  };
}


export default CenterController;

