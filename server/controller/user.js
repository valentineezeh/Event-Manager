
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/';


dotenv.config();

const User = db.Users;
const secret = process.env.SECRET_KEY;

class UserController {
  // functions to create a new user
  static signUp(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        Message: 'Password Mismatch!',
      });
    }
    User.findOne({
      where: {
        email: req.body.email.trim().toLowerCase(),
        username: req.body.username.trim().toLowerCase()
      }
    }).then((existingUser) => {
      if (existingUser.email === req.body.email){
        return res.status(409).send({
          status: 'Error',
          message: 'Email has already been used'
      });
    }
    if (existingUser.username === req.body.username){
      return res.status(409).send({
        status: 'Error',
        message: 'This Username has already been used'
    });
  }
      }).catch(error => res.status(400).json(error.message))
  const hash = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT))
    User
      .create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        sex: req.body.sex,
        userName: req.body.username,
        password: hash,
        confirmPassword: req.body.confirmPassword,
        admin: false,
      })
      .then(user => res.status(201).json({
        user
      }))
      .catch(error => res.status(400).json(error.message) // {error, data: req.body}
      );
  }


  // function that handles login
  static signIn(req, res) {
    if (!req.body.email || req.body.email.trim().length === 0) {
      return res.status(400).json({
        message: 'Email Feild should not be Empty'
      });
    } if (!req.body.password || req.body.password.trim().length === 0) {
      return res.status(400).json({
        message: 'Password Field should not be Empty'
      });
    }
    // User.getUsername(req.body.username, (user) =>{
    //   if(!user){
    //     res.status(401).json({
    //       message: 'Username or Password is incorrect'
    //     })
    //   }
    //   else{
    //     User.prototype.verifyPassword(password, user.password, (isMatch) => {
    //       if(isMatch) {
    //         const payload = {
    //           userId: user.id,
    //           admin: user.admin 
    //         };
    //         const token = jwt.sign(payload, secret, {
    //           expiresIn: '200h'
    //         });
    //         res.status(200).json({
    //           message: 'Token generated. Sign in Successful...',
    //           admin: user.admin,
    //           success: true,
    //           token: token
    //         });
    //       }
    //       else{
    //         res.status(401).json({ message: 'Username or Password does not match'})
    //       }
    //     })
    //   }
    // })
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if(!user) {
          return res.status(404).send({
            msg: 'Invalid Username or Password.'
          });
        }else{
          bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (err) {
              return res.status(500).send({error: err.message});
            }
            // if (user.password != req.body.password){
            //   return res.status(400).send({
            //     message: 'Incorrect password'
            //   })
            // }
            else{
              const token = jwt.sign({
                username: user.userName,
                userId: user.id,
                admin_status: user.admin
              }, secret, { expiresIn: 1440});
              return res.status(200).send({
                msg: `Welcome ${user.firstName} ${user.lastName} to Event Manager`,
                token,
                admin_status: user.admin
              });
            }
          })
        }
      }).catch(error => {
        return console.log( error.message );
        res.status(500).send({ error: `an error occoured: ${error.message}`})
      })
  }

  // this function gets all the users from the database
  static getAllUser(req, res) {
    User.all()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(400).send(err));
  }

  static logOut (req, res) {
    res.setHeader('authorization', null);
    return res.status(200).send({
      msg: 'User has been logged out',
      data: {
        token: null,
      }
    })
  }
}

export default UserController;
