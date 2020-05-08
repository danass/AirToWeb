#!/usr/bin/env node

//modules
const express = require("express");
const site = express();
const _ = require("lodash");
const http = require('http');
const https = require('https');
const fs = require("fs");

//routing	
require('./sites/dcvm')(site);

//maintaining uptodate databases
var updateData = require("./update.js");


//env variables
// only read https when on server. set false if no https.
const aws = process.platform != "win32" ? true : false

// setup http server
const httpServer = http.createServer(site);
const httpPort = 80
if (aws) {
	httpPort = 8081
}

httpServer.listen(httpPort, () => {
	console.log('HTTP Server running on port ' + httpPort);
});

// setup https. (only on webserver) //modify with your letsencrypt files
if (aws) {
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