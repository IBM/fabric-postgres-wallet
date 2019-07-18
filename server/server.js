/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const bodyParser = require('body-parser');
const express = require('express');
const log4js = require('log4js');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const config = require('config');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const IBMCloudEnv = require('ibm-cloud-env');
const errorHandler = require('../server/middlewares/error-handler');
IBMCloudEnv.init();
const routes = require('./routes');
const walletHelper = require('./helpers/wallet');
const postgresDbHelper=require('./helpers/postgres-db-helper');
const node_env = process.env.NODE_ENV || 'development';

const app = express();

app.use(cors());
/**
 * Set up logging
 */
const logger = log4js.getLogger('server');
logger.setLevel(config.logLevel);

logger.debug('setting up app: registering routes, middleware...');


/**
 * Load swagger document
 */

const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../public', 'open-api.yaml'), 'utf8'));


//block  un secure connection

if (node_env === 'production') {

	app.use(function (req, res, next) {
		if (!req.secure) {
			res.status(401).send('request is unauthorized');
		} else {
			next();
		}
	});
	app.enable('trust proxy');
}

/**
 * Support json parsing
 */
app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json({
	limit: '50mb'
}));


logger.debug('setting up app: registering routes, middleware...');

/** 
 * middleware for authentication
 */

app.use(cookieParser());
app.enable("trust proxy");
/**
 * GET home page
 */
app.get('/', (req, res) => {
	logger.debug('GET /');
	res.redirect('/api-docs');
});

var swaggerOptions = {
	defaultModelsExpandDepth: -1,
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, swaggerOptions));
/**
 * Register routes
 */

app.use('/api', routes);

/**
 * Error handler
 */
app.use(errorHandler.catchNotFound);
app.use(errorHandler.handleError);

/**
 * Start server
 */
const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

//initialize wallet
postgresDbHelper.init(IBMCloudEnv.getDictionary('postgres-db-credentials'));
walletHelper.init();
app.listen(port, () => {
	logger.info(`app listening on http://${host}:${port}`);
	logger.info(`Swagger UI is available at http://${host}:${port}/api-docs`);
	// app.emit("listened", null);
});
module.exports = app;