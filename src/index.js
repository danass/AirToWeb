#!/usr/bin/env node

const express = require("express");
const site = express();
const _ = require("lodash");
const http = require('http');
const https = require('https');
const fs = require("fs");

var UpdateData = require("./updateData.js");
require('./villettemakerz')(site);

const aws = process.platform != "win32"? true: false


const rootdir = process.cwd()
console.log(rootdir)

const httpServer = http.createServer(site);

httpServer.listen(8081, () => {
	console.log('HTTP Server running on port 8081');
});


if(aws) {
const privateKey = fs.readFileSync('/etc/letsencrypt/live/dc.villettemakerz.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/dc.villettemakerz.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/dc.villettemakerz.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, site);
httpsServer.listen(8082, () => {
	console.log('HTTPS Server running on port 8082');
});
}





// const fields = ["Prenom", "Nom", "Moto"]; //clés de lecture

// const mapfield = _.map(fields, field => {

//   return data.map(d => d[field] && console.log(field));
// });
