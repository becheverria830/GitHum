const express = require("express");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const sgMail  = require('@sendgrid/mail')

const models  = require("../models");
const keys    = require("../../config/keys");

const router  = express.Router();

const User = models['user'];
const ResetPassword = models['resetpassword'];

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

sgMail.setApiKey(keys.Twilio_Key)

router.post("/signup", (req, res, err) => {
  //Getting the information from the request
  const firstname = req.body.fname;
  const lastname  = req.body.lname;
  const email     = req.body.email;
  const username  = req.body.username;
  const password  = req.body.password;

  if(firstname == undefined || lastname == undefined || email == undefined || username == undefined || password == undefined){
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      "message":"Please submit all requested information!"
    });
  } else {
    //Finding if a user with the email exists already
    User.find({ 'credentials.email': email }, function (find_error, users) {
      if (find_error) throw find_error;
      //Checking if the user existed, if not creating an entry for them.
      if(users.length == 0) {
        //Encrypting the user's password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            //Generating the JSON to insert into the DB
            var user_data = {
              username: username,
              first_name: firstname,
              last_name: lastname,
              credentials: {
                email: email,
                password: hash
              },
              icon: "",
              friend: {
                list: [],
                incoming_requests: [],
                outgoing_requests: []
              },
              library: {
                favorites: [],
                my_forests: [],
                saved_forests: []
              }
            }
            //Inserting into the DB
            User.insertMany([user_data], function(create_error, result) {
              if (create_error) throw create_error;
              res.status(200).json({
                "message":"Successfully created account!"
              });
            });
          });
        });
      } else {
        res.status(400).json({
          "message":"Email Address already in use!"
        });
      }
    })
  }
});

router.post("/login", (req, res, err) => {
  //Getting the information from the request
  const email    = req.body.email;
  const password = req.body.password;

  if(email == undefined || password == undefined){
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      "message":"Please submit all requested information!"
    });
  } else {
    //Finding if a user with the email exists
    User.find({ 'credentials.email': email }, function (find_error, users) {
      if (find_error) throw find_error;
      if(users.length != 0) {
        //Comparing the passwords
        bcrypt.compare(password, users[0].credentials.password).then(isMatch => {
          if (isMatch) {
            //Successfully logging the user in
            const payload = {
              id: users[0].id,
              firstname: users[0].firstname,
              lastname: users[0].lastname
            };

            jwt.sign(
              payload,
              keys.Passport_Secret,
              { expiresIn: 60 * 60 * 24 * 365 },
              (err, token) => {
                res.status(200).json({
                  "success": true,
                  "token": token
                });
              }
            );
          } else {
            res.status(400).json({
              "message":"Unable to login with the provided credentials!"
            });
          }
        });
      } else {
        res.status(400).json({
          "message":"Unable to login with the provided credentials!"
        });
      }
    })
  }
});

router.post("/resetpassword", (req, res, err) => {
  //Getting the information from the request
  const email = req.body.email;

  if(email == undefined){
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      "message":"Please submit all requested information!"
    });
  } else {
    //Finding if a user with the email exists
    User.find({ 'credentials.email': email }, function (find_error, users) {
      if (find_error) throw find_error;
      if(users.length != 0) {
        //Generating an id and token which will be used to securely send a password reset link to the user.
        let token = randomString(20);

        // Hashing the generated token
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(token, salt, (err, hash) => {
            if (err) throw err;
            //Generating the JSON to insert into the DB
            var reset_password_data = {
              user_id: users[0].id,
              hashed_token: hash,
              request_time: new Date(),
              expiration_time: new Date(new Date().getTime()+(24*60*60*1000)),
              reset_time: null,
            }
            //Inserting into the DB
            ResetPassword.insertMany([reset_password_data], function(create_error, result) {
              if (create_error) throw create_error;
              //Sending an email to the user.
              let url = "/" + result.id + "/" + token;
              url = "localhost/passwordreset" + url;
              const msg = {
                to: 'jeremy.herrmann@notouchorders.com', // Change to your recipient
                from: 'jeremycherrmann@gmail.com', // Change to your verified sender
                subject: 'Reset Password',
                text: 'Follow the link below to reset your password: ' + url,
                html: '<strong>Follow the link below to reset your password: <a href="' + url + '">reset</a></strong>',
              }
              sgMail.send(msg).then(() => {
                console.log("Email sent!");
              })
              .catch((error) => {
                console.log(error)
              })
            });
          });
        });
      }
      res.status(200).json({
        "message":"If the account exists, an email was sent to reset the password! Please check your inbox."
      });
    })
  }
});

router.post("/passwordreset", (req, res, err) => {
  //Getting the information from the request
  const id       = req.body.id;
  const token    = req.body.token;
  const password = req.body.password;

  if(id == undefined || token == undefined || password == undefined){
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      "message":"Please submit all requested information!"
    });
  } else {
    //Finding if a user with the email exists
    ResetPassword.find({ 'id': id }, function (find_error, reset_passwords) {
      if (find_error) throw find_error;
      if(reset_passwords.length != 0) {

        //Comparing the tokens
        bcrypt.compare(token, reset_passwords[0].hashed_token).then(isMatch => {
          if (isMatch) {

            //Hashing the new password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                User.findAndModify({'id': reset_passwords[0].user_id}, {$set: {'password': hash}}, {}, function(update_error, user) {
                  if (update_error) throw update_error;
                  res.status(200).json({
                    "message": "Successfully updated your password!"
                  });
                });
              });
            });

          } else {
            res.status(400).json({
              "message":"We didn't find any matching reset requests in our database!"
            });
          }
        });
      } else {
        res.status(400).json({
          "message":"We didn't find any matching reset requests in our database!"
        });
      }
    })
  }
});

module.exports = router;
