  const db = require('../models');

  const express = require('express');
  const passport = require('passport');
  const router = express.Router();





  module.exports = (app) => {

      //Get route for getting all of the Users
      app.get("/index", function(req, res) {
          db.User.findAll({})
              .then(function(data) {
                  //console.log(data);
                  let hbsObject = {
                      foobar: data
                  };
                  //console.log(hbsObject);
                  res.render("index", hbsObject);
              });
      });

  };
