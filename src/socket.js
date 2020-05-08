const app = require('express')();
const express = require("express");
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const foldir = process.cwd() + "/public";
  
    app.set("view engine", "pug");
    app.use(express.static(foldir));
    
  
    app.get("/", function (req, res, next) {
      res.render("acte/index", {
        title: "Acte"
      });
      next();
    });

    io.on('connection', (socket) => {
        socket.on('channel1', (msg) => {
          console.log('message: ' + msg);
          io.emit('channel1', msg);
        });
      });

      
      
server.listen(80);