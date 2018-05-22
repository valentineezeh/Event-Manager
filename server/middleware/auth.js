import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import all from '../controller/user';


dotenv.config();
const secret = process.env.SECRET_KEY;

const Auth = {
  // function to authenticate to users with a token
  verify: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(401).send({
            message: 'You do not have permission to this page'
          });
        } else {
        // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No token provided' });
    }
  },
};

export default Auth;
