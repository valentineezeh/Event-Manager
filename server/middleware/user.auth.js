import validator from 'validator';

class userValidation {
  static signUp(req, res, next) {
    const errors = [];
    if (req.body.email == undefined) {
      errors.push('Email is required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (!validator.isEmail(req.body.email.toString())) {
      errors.push('Valid Email is required');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (!validator.isAlpha(req.body.firstname.toString())) {
      errors.push('First name must be alphabetic');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (req.body.firstname === '') {
      errors.push('First name cannot be empty');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (req.body.firstname <= 1) {
      errors.push('Length of the first name should be greater than 1 character..');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (!validator.isAlpha(req.body.lastname.toString())) {
      errors.push('First name must be alphabetic');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (req.body.lastname == '') {
      errors.push('First name cannot be empty');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (req.body.lastname <= 1) {
      errors.push('Length of the first name should be greater than 1 character..');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (req.body.password == undefined) {
      errors.push('Valid Password required...');
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    if (req.body.password.length <= 6) {
      errors.push('Password must exceed 6 characters..');
      return res.status(400).send({
        status: 'Errors',
        message: errors
      });
    }
    if (req.body.password != req.body.confirmPassword) {
      errors.push('Mismatch Password');
      return res.status(400).send({
        status: 'Error',
        msg: errors
      });
    }
    if (errors.length > 0) {
      return res.status(400).send({
        status: 'Error',
        message: errors
      });
    }
    return next();
  }
  static signIn(req, res, next) {
    const errors = [];
    if (req.body.email == '') {
      errors.push('Email should not be empty');
      return res.status(400).send({
        status: 'Error',
        msg: errors
      });
    }
    if (!validator.isEmail(req.body.email.toString())) {
      errors.push('Email must be valid..');
      return res.status(400).send({
        status: 'Error',
        msg: errors
      });
    }
    if (req.body.email == undefined) {
      errors.push('Email is required..');
      return res.status(400).send({
        status: 'Error',
        msg: errors
      });
    }
    if (req.body.password == undefined) {
      errors.push('Password is required...');
      return res.status(400).send({
        status: 'Error',
        msg: errors
      });
    }
    if (req.body.password == '') {
      errors.push('Password should not be empty.');
      return res.status(400).send({
        status: 'Error',
        msg: errors
      });
    }
    return next();
  }
}

export default userValidation;
