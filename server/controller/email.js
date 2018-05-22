import db from '../models';

const nodemailer = require('nodemailer');

const User = db.Users;
const event = db.Events;

const emailHandler = (req, res) => {
    if (req.decoded.admin){
        User
        .find({
            where: {
                id: req.decoded.userId,
            },
        }).then(user => {
            if (user){
                let smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'Gmail', // Sets automatically host, port and connection security settings
                    auth: {
                      user: user.email,
                      pass: user.password,
                    }
                  })
                  return res.status(200).send({
                      user: user.email,
                      pass: user.password
                  })
            }
    
        }).catch( error => res.status(400).send(error))
         
    if (req.decoded.admin) {
        event.find({
            where: {
                id: req.params.eventId,
                userId: req.decoded.userId,
            }
        }).then( event => {
            if(event){
                smtpTransport.sendMail(
                    {
                      from: user.email, // sender address. Must be the same with authenticated user if using gmail
                      to: event.userId, // email of the receiver
                      subject: 'Emailing with nodemailer', // subject of the mail
                      text: 'Sending email with nodemailer for the first time', // body of the mail
                    }, (error, response) => {
                      if (error) console.log(error);
                      else console.log(`Message sent ${response.message}`);
                    },
                    // shut down the connection pool, no more messages. cmment this line out to continue sending emails
                    smtpTransport.close()
                  );
            }
        } ).catch( error => res.status(400).send( error ))
    }
}
};


export default emailHandler;
