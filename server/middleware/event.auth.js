import validator from 'validator';

class eventValidation {
  static eventValidator(req, res, next) {
    const error = [];
    if (req.body.title === undefined) {
      return res.status(400).send({
        msg: 'Title is required'
      });
    }
    if (req.body.description === undefined) {
      return res.status(400).send({
        msg: 'Description is required'
      });
    }
    if (req.body.date === undefined) {
      return res.status(400).send({
        msg: 'Date is required'
      });
    }
    if (req.body.centerId === undefined) {
      return res.status(400).send({
        msg: 'centerId is required..'
      });
    }
    if (req.body.type === undefined) {
      return res.status(400).send({
        msg: 'type is required'
      });
    }
    if (req.body.title.toString().trim() === '') {
      error.push('Title is required...');
    }
    if (req.body.description.toString().trim() === '') {
      error.push('Description is required.');
    }
    if (req.body.date.toString().trim() === '') {
      error.push('Date is required.');
    }
    if ((new Date(req.body.date) - Date.now()) < 0) {
      error.push('Cannot set a past date for event');
    }
    if (req.body.centerId.toString().trim() === '') {
      error.push('Center is required...');
    }
    if (error.length > 0) {
      return res.status(400).send({
        msg: error
      });
    }
    return next();
  }
}

export default eventValidation;
