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

const log4js = require('log4js');
const createError = require('http-errors');
const config = require('config');

const util = require('../helpers/util');

/**
 * Set up logging
 */
const logger = log4js.getLogger('error handler');
logger.setLevel(config.logLevel);

/**
 * Error Handler object
 */
const errorHandler = {};

/**
 * Catch 404 Error and forward to error handler function
 */
errorHandler.catchNotFound = (req, res, next) => {
  logger.debug('catching 404 error...');
  next(createError(404, '404: Page not found'));
};

/**
 * Error handler function
 */
errorHandler.handleError = (err, req, res, next) => {
  logger.debug('error handler...');
  const jsonRes = {
    statusCode: err.status || 500,
    success: false,
    message: err.message,
  };
  util.sendResponse(res, jsonRes);
};

module.exports = errorHandler;
